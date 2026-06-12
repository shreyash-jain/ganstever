"""
Provenance: one-shot pull of the owner's own Gans-te-Ver photographs.

Madelaine's photo set is published on her Best Getaways listing
(https://www.bestgetaways.co.za/go/gans-te-versuiderstrand) under gallery
35120, served via CloudFront at a requestable width. These are her own
uploads — the approved photo source for this site (per project brief:
owner listing photos, never third-party scrapes).

This script re-downloads the full set at 2400px into raw_photos/ (gitignored).
The curated, renamed subset is committed at public/images/<descriptive>.jpg
and uploaded to Cloudinary by upload-to-cloudinary.py. When Madelaine's
original files arrive (Drive/local shoot), replace the curated files one at
a time, keeping the same names, and re-run the uploader.
"""

from __future__ import annotations

import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "raw_photos"
OUT.mkdir(parents=True, exist_ok=True)

LISTING = "https://www.bestgetaways.co.za/go/gans-te-versuiderstrand"
GALLERY = "35120"
WIDTH = 2400

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
)


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def main() -> int:
    html = fetch(LISTING).decode("utf-8", errors="replace")
    pattern = rf"https://[a-z0-9]+\.cloudfront\.net/image/\d+/gallery/{GALLERY}/(?:property/)?(\d+)\.jpg"
    ids = sorted(set(re.findall(pattern, html)))
    if not ids:
        print("No gallery images found — has the listing layout changed?", file=sys.stderr)
        return 1

    host_match = re.search(r"https://([a-z0-9]+\.cloudfront\.net)/image/", html)
    host = host_match.group(1) if host_match else "d1zyr4xmqw3mni.cloudfront.net"

    print(f"Fetching {len(ids)} photos at {WIDTH}px to {OUT}\n")
    total = 0
    for i, image_id in enumerate(ids, 1):
        url = f"https://{host}/image/{WIDTH}/gallery/{GALLERY}/property/{image_id}.jpg"
        dst = OUT / f"gv-{image_id}.jpg"
        try:
            data = fetch(url)
        except Exception:
            # Some ids live outside /property/ — try the bare path.
            url = f"https://{host}/image/{WIDTH}/gallery/{GALLERY}/{image_id}.jpg"
            data = fetch(url)
        dst.write_bytes(data)
        total += len(data)
        print(f"  [{i:02}/{len(ids)}] gv-{image_id}.jpg  {len(data)/1024:7.1f} KB")
    print(f"\nDone. {total/1024/1024:.1f} MB across {len(ids)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())