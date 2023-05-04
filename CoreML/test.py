import requests
import json
import base64
import numpy as np
import cv2

# Load image
img = cv2.imread('/Users/phatnt/Documents/Adrenaline/CoreML/data/test/UNKNOWN/z4272001724783_acab67c5ced6f5ce18fd37cc58bb4104.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Encode image to base64 string
_, img_encoded = cv2.imencode('.jpg', img)
img_base64 = base64.b64encode(img_encoded).decode('utf-8')

# Set up request payload
payload = {'image': img_base64}
print(payload)
headers = {'Content-Type': 'application/json'}

# Send POST request to server
url = 'http://localhost:8000/predict'
response = requests.post(url, data=json.dumps(payload), headers=headers)

# Convert response to list of predictions
predictions = np.array(response.json())

# Print predictions
print(predictions)