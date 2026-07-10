const MAX_DIMENSION = 1600;
const MAX_SIZE_BYTES = 1.5 * 1024 * 1024;
const INITIAL_QUALITY = 0.85;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

export async function compressImage(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Please select a valid image (JPEG, PNG, GIF, WEBP)");
  }

  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let { width, height } = image;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);

  let quality = INITIAL_QUALITY;
  let blob = await canvasToBlob(canvas, "image/jpeg", quality);

  while (blob.size > MAX_SIZE_BYTES && quality > 0.4) {
    quality -= 0.1;
    blob = await canvasToBlob(canvas, "image/jpeg", quality);
  }

  if (blob.size > MAX_SIZE_BYTES) {
    throw new Error("Image is too large. Try a smaller photo.");
  }

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}
