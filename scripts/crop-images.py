from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / "public" / "images"

def crop_to_aspect(image_path: Path, aspect_w: int, aspect_h: int) -> None:
    with Image.open(image_path) as img:
        w, h = img.size
        # Calculate target dimensions
        target_ratio = aspect_w / aspect_h
        current_ratio = w / h
        
        if current_ratio > target_ratio:
            # Current image is too wide, crop sides
            new_w = int(h * target_ratio)
            new_h = h
            left = (w - new_w) // 2
            top = 0
            right = left + new_w
            bottom = h
        else:
            # Current image is too tall, crop top and bottom (center crop)
            new_w = w
            new_h = int(w / target_ratio)
            left = 0
            top = (h - new_h) // 2
            right = w
            bottom = top + new_h
            
        cropped = img.crop((left, top, right, bottom))
        cropped.save(image_path)
        print(f"Cropped {image_path.name} to {aspect_w}:{aspect_h} ({new_w}x{new_h})")

def main():
    crops = {
        "road-trip-cover.png": (16, 10),
        "elgin-orchards-n2.png": (3, 2),
        "r316-wheat-country.png": (3, 2),
        "suiderstrand-gravel-road.png": (3, 2),
        "tortoise-gravel-verge.png": (3, 2),
    }
    
    for filename, aspect in crops.items():
        p = IMAGE_DIR / filename
        if p.exists():
            crop_to_aspect(p, aspect[0], aspect[1])
        else:
            print(f"File not found: {filename}")

if __name__ == "__main__":
    main()
