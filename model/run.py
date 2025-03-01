# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("image-classification", model="jaranohaal/vit-base-violence-detection")

# Load model directly
from transformers import AutoModelForImageClassification
model = AutoModelForImageClassification.from_pretrained("jaranohaal/vit-base-violence-detection")

import torch
from transformers import ViTForImageClassification, ViTFeatureExtractor
from PIL import Image

# Load the model and feature extractor
model = ViTForImageClassification.from_pretrained('jaranohaal/vit-base-violence-detection')
feature_extractor = ViTFeatureExtractor.from_pretrained('jaranohaal/vit-base-violence-detection')

# Load an image
image = Image.open('/Users/chloekim/Downloads/IMG_2201.jpeg')

# Preprocess the image
inputs = feature_extractor(images=image, return_tensors="pt")

# Perform inference
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()

# Print the predicted class
if model.config.id2label[predicted_class_idx] == "LABEL_1":
    print("Violence")
else:
    print("Non-violence")

