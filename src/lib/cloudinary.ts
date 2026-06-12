// Helpers that build Cloudinary delivery URLs for our `ganstever/` folder.
// Originals are uploaded once by scripts/upload-to-cloudinary.py; this
// module is the only place the cloud name lives in source.

const CLOUD = "dprx4pret";
const FOLDER = "ganstever";

const IMG_BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;

// f_auto = best format per browser (AVIF/WebP/JPEG)
// q_auto = best quality/size trade-off
// c_limit,w_<n> = cap the longest edge without upscaling
const DEFAULT_IMG_TRANSFORMS = "f_auto,q_auto,c_limit,w_1600";

export function cldImage(publicId: string, transforms = DEFAULT_IMG_TRANSFORMS): string {
  return `${IMG_BASE}/${transforms}/${FOLDER}/${publicId}`;
}