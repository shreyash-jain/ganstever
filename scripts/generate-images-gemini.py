"""
Generate the AI-illustrative images for the journal with Google Gemini.

These are the non-photograph images referenced in src/lib/images.ts (the
`elimVineyard` / `sauvignonPour` keys for the Agulhas Wine Triangle post).
Every file is written to public/images/<public_id>.png so that the existing
scripts/upload-to-cloudinary.py picks it up and pushes it to the same
`ganstever/` Cloudinary folder as the real photographs.

So the full "generate one image" flow is two commands:

    python scripts/generate-images-gemini.py      # writes PNGs to public/images/
    python scripts/upload-to-cloudinary.py        # uploads them to Cloudinary

Reads GEMINI_API_KEY from .env.local (gitignored), the same way
upload-to-cloudinary.py reads CLOUDINARY_URL. The repo never sees the key.

These are clearly illustrative cool-climate wine scenes, not photographs of a
specific named farm — keep them honest, or replace them with the owner's own
cellar-door photos once she has some.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Load .env.local without a third-party dotenv dep (mirrors upload-to-cloudinary.py).
env_path = ROOT / ".env.local"
if env_path.exists():
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip())

API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
if not API_KEY:
    print("GEMINI_API_KEY not set — add it to .env.local", file=sys.stderr)
    sys.exit(1)

try:
    from google import genai
    from google.genai import types
except ImportError:
    print("install first: python -m pip install google-genai", file=sys.stderr)
    sys.exit(1)

# Gemini's native image model ("Nano Banana"). If Google renames it, update here.
MODEL = "gemini-2.5-flash-image"

IMAGE_DIR = ROOT / "public" / "images"

# public_id (filename stem, must match the cldImage() ids in src/lib/images.ts)
# -> prompt. Ask for a wide landscape frame so it sits well in the figure block.
PROMPTS: dict[str, str] = {
    # Cover + OG image. Must read well behind the dark hero gradient and crop
    # sanely to 16:10 on the /blog index card — so keep the horizon low and the
    # subject away from the centre, where the H1 sits.
    "elim-vineyard-cover": (
        "A wide cinematic landscape photograph of a cool-climate vineyard at the "
        "southern tip of Africa. Long rows of low, wind-bent vines sweep from the "
        "foreground to a low horizon; stony iron-red laterite and shale soil "
        "between the rows; coastal fynbos and a distant grey sea beyond. A huge "
        "overcast Overberg sky fills the upper two-thirds, soft diffused light "
        "just before rain, wind visibly moving through the leaves. No people, no "
        "buildings, no text, no logos. Muted natural colours, documentary "
        "photography, 16:10 wide landscape aspect ratio."
    ),
    "elim-vineyard": (
        "A realistic documentary photograph looking down a row of cool-climate "
        "Sauvignon Blanc vines in the Elim ward near Cape Agulhas, South Africa. "
        "Low, wind-pruned vines on stony, iron-rich shale and laterite soil; the "
        "stones sharp in the foreground. Overcast grey southeaster sky, coastal "
        "fynbos on the horizon. No people, no buildings, no text, soft diffused "
        "light, natural muted colours, 3:2 landscape aspect ratio."
    ),
    "sauvignon-pour": (
        "A realistic close-up photograph of a glass of pale, cool-climate "
        "Sauvignon Blanc being poured at a rustic wooden tasting-room counter, "
        "condensation on the glass, out-of-focus green vineyards through a "
        "window behind, soft natural daylight, warm and understated mood, no "
        "text, no logos, 3:2 landscape aspect ratio."
    ),
    # --- Whale post (land-based-whale-watching-cape-agulhas) ----------------
    # Cover: low horizon, subject off-centre — dark hero gradient sits on top.
    "whale-coast-cover": (
        "A wide cinematic landscape photograph from the top of a fynbos-covered "
        "dune at the southern tip of Africa, looking out over a cold grey-green "
        "winter sea. Offshore, right of centre, a southern right whale's dark "
        "back and V-shaped blow break the surface. Low horizon, huge soft "
        "overcast sky, muted winter light, empty coast, no people, no boats, no "
        "text, no logos. Muted natural colours, documentary photography, 16:10 "
        "wide landscape aspect ratio."
    ),
    "southern-right-shore": (
        "A realistic documentary photograph of a southern right whale surfacing "
        "very close to a pale, empty South African beach — dark back and rough "
        "white callosities on the head clearly visible above cold green water, "
        "small waves breaking between the whale and the sand. Overcast soft "
        "light, no people, no boats, no text, no logos. Muted natural colours, "
        "3:2 landscape aspect ratio."
    ),
    "storm-sea-winter": (
        "A realistic moody landscape photograph of a winter cold front arriving "
        "over the sea, seen from low coastal fynbos dunes at the southern tip "
        "of Africa. A dark curtain of rain hangs offshore, shafts of silver "
        "light break through heavy cloud onto the water, wind-flattened fynbos "
        "in the foreground. No people, no buildings, no text, no logos. Muted "
        "natural colours, documentary photography, 3:2 landscape aspect ratio."
    ),
}


def main() -> int:
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    client = genai.Client(api_key=API_KEY)

    print(f"Generating {len(PROMPTS)} images with {MODEL}\n")
    for public_id, prompt in PROMPTS.items():
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(response_modalities=["IMAGE"]),
        )

        saved = False
        for part in response.candidates[0].content.parts:
            inline = getattr(part, "inline_data", None)
            if inline is not None and inline.data:
                out = IMAGE_DIR / f"{public_id}.png"
                out.write_bytes(inline.data)
                print(f"  {public_id:<20} -> {out.relative_to(ROOT)}  ({len(inline.data) / 1024:.1f} KB)")
                saved = True
                break

        if not saved:
            print(f"  {public_id:<20} -> no image returned (check model/quota)", file=sys.stderr)

    print("\nDone. Now run: python scripts/upload-to-cloudinary.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())