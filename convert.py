import os
import glob
from PIL import Image

def process_dir(directory, prefix):
    files = glob.glob(os.path.join(directory, "*.png"))
    for i, file_path in enumerate(sorted(files)):
        print(f"Processing {file_path}...")
        img = Image.open(file_path)
        # Convert to RGB if RGBA
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # New name
        new_name = f"{prefix}-{i+1}.webp"
        new_path = os.path.join(directory, new_name)
        
        # Save as webp with quality 80
        img.save(new_path, "webp", quality=80)
        
        # Remove old file
        os.remove(file_path)
        print(f"Saved {new_path}")

process_dir("src/assets/certifications/tensorflowDeveloper", "tf-course")
process_dir("src/assets/certifications/DeepLearning", "dl-course")
process_dir("src/assets/certifications/machineLearning", "ml-course")
