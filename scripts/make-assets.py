"""
Generate the static share/branding assets from the curated photos:

  public/og.jpg          1200x630 Open Graph card (hero photo crop)
  src/app/apple-icon.png 180x180 monogram tile (Next auto-links it)
  src/app/favicon.ico    32px favicon (Next serves app/favicon.ico)

Run after the hero photo changes. Requires Pillow:
  python -m pip install pillow
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("install first: python -m pip install pillow", file=sys.stderr)
    sys.exit(1)

SEA_DEEP = (30, 69, 67)
SHELL = (251, 249, 244)
DUNE = (185, 135, 74)

HERO = ROOT / "public" / "images" / "lounge-sea-view.jpg"


def make_og() -> None:
    src = Image.open(HERO).convert("RGB")
    target_w, target_h = 1200, 630
    ratio = max(target_w / src.width, target_h / src.height)
    resized = src.resize(
        (round(src.width * ratio), round(src.height * ratio)),
        Image.LANCZOS,
    )
    # Bias the crop toward the lower half — that's where the open doors,
    # chairs and sea sit in the hero frame.
    left = (resized.width - target_w) // 2
    top = min(resized.height - target_h, int(resized.height * 0.30))
    og = resized.crop((left, top, left + target_w, top + target_h))
    og.save(ROOT / "public" / "og.jpg", quality=85, optimize=True)
    print("public/og.jpg          1200x630")


def monogram(size: int) -> Image.Image:
    tile = Image.new("RGB", (size, size), SEA_DEEP)
    draw = ImageDraw.Draw(tile)
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", int(size * 0.56))
    except OSError:
        font = ImageFont.load_default(size=int(size * 0.56))
    # Center the G optically, slightly above the wave.
    bbox = draw.textbbox((0, 0), "G", font=font)
    gw, gh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        ((size - gw) / 2 - bbox[0], (size - gh) / 2 - bbox[1] - size * 0.07),
        "G",
        font=font,
        fill=SHELL,
    )
    # Dune wave under the G.
    w = size
    y = size * 0.80
    amp = size * 0.045
    pts = []
    import math

    for x in range(int(w * 0.22), int(w * 0.78) + 1):
        t = (x - w * 0.22) / (w * 0.56)
        pts.append((x, y + amp * math.sin(t * math.tau)))
    draw.line(pts, fill=DUNE, width=max(2, size // 18), joint="curve")
    return tile


def main() -> int:
    make_og()
    monogram(180).save(ROOT / "src" / "app" / "apple-icon.png")
    print("src/app/apple-icon.png 180x180")
    # Turbopack requires the ICO's embedded PNG to be RGBA.
    monogram(64).resize((32, 32), Image.LANCZOS).convert("RGBA").save(
        ROOT / "src" / "app" / "favicon.ico", sizes=[(32, 32)]
    )
    print("src/app/favicon.ico     32x32")
    return 0


if __name__ == "__main__":
    sys.exit(main())