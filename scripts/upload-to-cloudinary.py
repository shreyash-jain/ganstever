"""
Upload every photo in public/images/ to Cloudinary under the `ganstever/`
folder. Each asset's public_id matches its filename without extension, so
the URL is stable and predictable.

Run once after adding new media to public/images/. Idempotent — overwrites
on collision so re-runs after a photo refresh just replace the asset.

Reads CLOUDINARY_URL from .env.local (gitignored). The repo never sees
your API secret.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Load .env.local without a third-party dotenv dep — small and robust.
env_path = ROOT / ".env.local"
if env_path.exists():
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip())

try:
    import cloudinary
    import cloudinary.uploader
except ImportError:
    print("install first: python -m pip install cloudinary", file=sys.stderr)
    sys.exit(1)

cloudinary_url = os.environ.get("CLOUDINARY_URL")
if not cloudinary_url:
    print("CLOUDINARY_URL not set — put it in .env.local", file=sys.stderr)
    sys.exit(1)

# Parse cloudinary://<key>:<secret>@<cloud> ourselves — the SDK reads
# env vars at import time and `config(cloudinary_url=...)` doesn't
# always override cleanly when CLOUDINARY_CLOUD_NAME is also set.
from urllib.parse import urlparse

parsed = urlparse(cloudinary_url)
if parsed.scheme != "cloudinary" or not parsed.username or not parsed.password or not parsed.hostname:
    print("CLOUDINARY_URL malformed. Expected cloudinary://<key>:<secret>@<cloud>", file=sys.stderr)
    sys.exit(1)

cloudinary.config(
    cloud_name=parsed.hostname,
    api_key=parsed.username,
    api_secret=parsed.password,
    secure=True,
)

FOLDER = "ganstever"
IMAGE_DIR = ROOT / "public" / "images"
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def main() -> int:
    images = sorted(
        p for p in IMAGE_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in IMAGE_EXTS
    )
    if not images:
        print(f"No images found in {IMAGE_DIR}", file=sys.stderr)
        return 1

    print(f"Uploading {len(images)} images to {parsed.hostname}/{FOLDER}/\n")
    for p in images:
        public_id = p.stem
        res = cloudinary.uploader.upload(
            str(p),
            folder=FOLDER,
            public_id=public_id,
            overwrite=True,
            resource_type="image",
        )
        print(f"  {public_id:<24} {res['width']}x{res['height']}  {res['bytes']/1024:7.1f} KB")
    print("\nDone.")
    return 0


if __name__ == "__main__":
    sys.exit(main())