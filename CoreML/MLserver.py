from flask import Flask, request, jsonify

import tensorflow as tf
from io import BytesIO
from PIL import Image
import numpy as np
import base64
from tensorflow.keras.applications.vgg16 import preprocess_input

app = Flask(__name__)

# Load the pre-trained model
model = tf.keras.models.load_model('model/model.h5')


@app.route('/predict', methods=['POST'])
def predict():
    # Decode the image received in base64 format
    img_bytes = base64.b64decode(request.json['image'])
    img_pil = Image.open(BytesIO(img_bytes))

    # Preprocess the image if necessary
    img_pil = img_pil.resize((224, 224))
    img_array = np.array(img_pil)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    # Make predictions
    predictions = model.predict(img_array)
    print(predictions)
    predictions = np.argmax(predictions, axis=1)[0]

    # Return the predictions in JSON format
    return jsonify(predictions.tolist())


@app.route('/')
def index():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
