import cv2
import numpy as np
from transformers import AutoFeatureExtractor, AutoModelForImageClassification
import torch

# Load Microsoft ResNet-50 model and feature extractor
model_name = "microsoft/resnet-50"
feature_extractor = AutoFeatureExtractor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)

# Emotion labels (adjust based on your dataset)
emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

# Function to predict emotion
def predict_emotion(face_img):
    face_resized = cv2.resize(face_img, (224, 224))  # Resize to ResNet-50 input size
    face_rgb = cv2.cvtColor(face_resized, cv2.COLOR_BGR2RGB)
    inputs = feature_extractor(images=face_rgb, return_tensors="pt")
    outputs = model(**inputs)
    predicted_class = torch.argmax(outputs.logits, dim=-1).item()
    return emotion_labels[predicted_class % len(emotion_labels)]  # Prevent index error

# Initialize webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        face = frame[y:y+h, x:x+w]
        emotion = predict_emotion(face)

        # Draw rectangle and display emotion
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(frame, emotion, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    cv2.imshow('Emotion Detection (ResNet-50)', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()