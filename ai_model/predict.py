import tensorflow as tf
import numpy as np
from PIL import Image
import json

MODEL_PATH = 'mobilenetv2_skinologyke.h5'
LABELS_PATH = 'labels.json'

# Load model
model = tf.keras.models.load_model(MODEL_PATH)

# Load labels
with open(LABELS_PATH, 'r') as f:
    labels = json.load(f)

def preprocess_image(image_path):
    img = Image.open(image_path).resize((224, 224))
    arr = np.array(img) / 255.0
    if arr.shape[-1] == 4:
        arr = arr[..., :3]
    return np.expand_dims(arr, axis=0)

def predict(image_path):
    x = preprocess_image(image_path)
    preds = model.predict(x)[0]
    idx = int(np.argmax(preds))
    confidence = float(np.max(preds)) * 100
    diagnosis = labels[str(idx)]
    return diagnosis, confidence

if __name__ == '__main__':
    import sys
    image_path = sys.argv[1]
    diagnosis, confidence = predict(image_path)
    print(f'Diagnosis: {diagnosis}, Confidence: {confidence:.2f}%')