from flask import Flask, request, jsonify

import tensorflow as tf
import numpy as np
import cv2
import base64

app = Flask(__name__)

# Load the pre-trained model
model = tf.keras.models.load_model('model/model.h5')


@app.route('/predict', methods=['POST'])
def predict():
    # Decode the image received in base64 format
    img_bytes = base64.b64decode(request.json['image'])
    img_array = np.frombuffer(img_bytes, dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    # Preprocess the image if necessary
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    # Make predictions
    predictions = model.predict(img)

    # Return the predictions in JSON format
    return jsonify(predictions.tolist())


@app.route('/')
def index():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
