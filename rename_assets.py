import os

base_dir = r"c:\Users\kikio\OneDrive\Desktop\dev\16bit_frontend\submission_assets"
renames = {
    "16_16bit_KOK_트랙1-1.pdf": "16bit_hackathon_presentation.pdf",
    "2026_02_09 00_20.mp4": "demo_video.mp4",
    "1770564041177.jpg": "screenshot_1.jpg",
    "1770564039628.jpg": "screenshot_2.jpg"
}

print(f"Checking directory: {base_dir}")
if not os.path.exists(base_dir):
    print(f"Directory not found: {base_dir}")
    exit(1)

try:
    files = os.listdir(base_dir)
    print(f"Files found: {files}")
except Exception as e:
    print(f"Error listing directory: {e}")
    exit(1)

for old_name, new_name in renames.items():
    old_path = os.path.join(base_dir, old_name)
    new_path = os.path.join(base_dir, new_name)
    
    if os.path.exists(new_path):
        print(f"Target {new_name} already exists. Skipping.")
        continue
        
    if old_name in files:
        try:
            os.rename(old_path, new_path)
            print(f"Successfully renamed '{old_name}' to '{new_name}'")
        except Exception as e:
            print(f"Failed to rename '{old_name}': {e}")
    else:
        print(f"Source file '{old_name}' not found in directory.")
