import ffmpeg
import os
from PIL import Image
import torch
from transformers import ViTForImageClassification, ViTFeatureExtractor

# Load the model and feature extractor
model = ViTForImageClassification.from_pretrained("jaranohaal/vit-base-violence-detection")
feature_extractor = ViTFeatureExtractor.from_pretrained("jaranohaal/vit-base-violence-detection")

# Function to extract frames from video
def extract_frames(video_path, output_folder="frames"):
    os.makedirs(output_folder, exist_ok=True)
    
    # Using ffmpeg-python to extract frames
    ffmpeg.input(video_path).output(f"{output_folder}/frame%04d.jpg").run()

# Function to process each frame
def process_frames(frame_folder="frames"):
    for frame_name in os.listdir(frame_folder):
        if frame_name.endswith(".jpg"):
            frame_path = os.path.join(frame_folder, frame_name)
            
            # Open the frame as an image
            image = Image.open(frame_path)
            
            # Preprocess the image
            inputs = feature_extractor(images=image, return_tensors="pt")
            
            # Perform inference
            with torch.no_grad():
                outputs = model(**inputs)
                logits = outputs.logits
                predicted_class_idx = logits.argmax(-1).item()
            
            # Print the predicted class
            print(f"Frame: {frame_name} - Predicted class:", model.config.id2label[predicted_class_idx])

# Example usage
video_path = 'IMG_2208.mp4'
extract_frames(video_path)
process_frames()
