import time
import math
import requests

# Set your Adafruit IO key and username here
ADAFRUIT_IO_KEY = 'aio_xVna17f5ZfmsGHob3HMGeZ7dryiT'
ADAFRUIT_IO_USERNAME = 'phatnt'

# Set the feed name and temperature unit
FEED_NAME = 'temperature'
TEMP_UNIT = 'C'

# Set the initial temperature and time
temperature = 25.0
start_time = time.time()

# Loop forever
while True:
    # Calculate the temperature based on a sine-like curve
    elapsed_time = time.time() - start_time
    temperature = 25.0 + 10.0 * math.sin(elapsed_time / 120.0)
    
    # Create the data payload for the Adafruit feed
    data = {'value': temperature, 'unit': TEMP_UNIT}
    
    # Make the HTTP request to update the Adafruit feed
    url = 'https://io.adafruit.com/api/v2/{0}/feeds/{1}/data'.format(ADAFRUIT_IO_USERNAME, FEED_NAME)
    headers = {'X-AIO-Key': ADAFRUIT_IO_KEY, 'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, json=data)
    
    # Print the response status code and temperature
    print('Response:', response.status_code, 'Temperature:', temperature, TEMP_UNIT)
    
    # Wait for 10 seconds before updating the feed again
    time.sleep(10)
