import os
from PIL import Image

# === Settings ===
PARENT_DIR = "images"  # Replace with your parent/root directory
OUTPUT_DIR = "converted"  # Set the parent directory for output images
MAX_FILE_SIZE_KB = 200
MAX_WIDTH = 1920
MAX_HEIGHT = 1080
QUALITY_START = 90
QUALITY_MIN = 60

# === Allowed Extensions ===
SUPPORTED_EXTENSIONS = (".jpg", ".jpeg", ".png", ".bmp", ".tiff")

def resize_image(image):
    """Resize image to fit within 1920x1080 keeping aspect ratio."""
    image.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.Resampling.LANCZOS)  # Updated line
    return image

def compress_to_webp(image, output_path):
    """Try saving image in webp format under 200KB."""
    quality = QUALITY_START
    while quality >= QUALITY_MIN:
        image.save(output_path, "WEBP", quality=quality, method=6)
        size_kb = os.path.getsize(output_path) / 1024
        if size_kb <= MAX_FILE_SIZE_KB:
            return True, quality
        quality -= 5
    return False, None

def process_directory(root_dir):
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.lower().endswith(SUPPORTED_EXTENSIONS):
                continue

            input_path = os.path.join(dirpath, filename)

            # Create corresponding directory in OUTPUT_DIR
            relative_dir = os.path.relpath(dirpath, root_dir)
            output_dir = os.path.join(OUTPUT_DIR, relative_dir)

            # Ensure output directory exists
            os.makedirs(output_dir, exist_ok=True)

            output_filename = os.path.splitext(filename)[0] + ".webp"
            output_path = os.path.join(output_dir, output_filename)

            try:
                with Image.open(input_path) as img:
                    img = resize_image(img)
                    success, used_quality = compress_to_webp(img, output_path)

                    if success:
                        print(f"[✓] {input_path} → {output_path} (Q: {used_quality})")
                    else:
                        print(f"[✗] Could not compress {input_path} under 200KB.")

            except Exception as e:
                print(f"[!] Error processing {input_path}: {e}")

if __name__ == "__main__":
    process_directory(PARENT_DIR)
