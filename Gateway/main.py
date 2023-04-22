import time
import math
import requests

ADAFRUIT_IO_KEY = 'aio_xVna17f5ZfmsGHob3HMGeZ7dryiT'
ADAFRUIT_IO_USERNAME = 'phatnt'

TEMPERATURE_FEED = 'temperature'
HUMIDITY_FEED = 'humidity'

TEMPERATURE_UNIT = 'C'
HUMIDITY_UNIT = '%'

# Set the initial temperature and time
temperature = 25.0
humidity = 50.0
start_time = time.time()

while True:
    # Calculate the temperature and humidity values based on sine and cosine curves, respectively
    elapsed_time = time.time() - start_time
    temperature = round(25.0 + 10.0 * math.sin(elapsed_time / 120.0), 2)
    humidity = round(50.0 + 20.0 * math.cos(elapsed_time / 120.0), 2)

    # Create the data payloads for the Adafruit feeds
    temperature_data = {'value': temperature, 'unit': TEMPERATURE_UNIT}
    humidity_data = {'value': humidity, 'unit': HUMIDITY_UNIT}

    # Make the HTTP requests to update the Adafruit feeds
    temperature_url = 'https://io.adafruit.com/api/v2/{0}/feeds/{1}/data'.format(
        ADAFRUIT_IO_USERNAME, TEMPERATURE_FEED)
    humidity_url = 'https://io.adafruit.com/api/v2/{0}/feeds/{1}/data'.format(
        ADAFRUIT_IO_USERNAME, HUMIDITY_FEED)

    headers = {'X-AIO-Key': ADAFRUIT_IO_KEY,
               'Content-Type': 'application/json'}

    temperature_response = requests.post(
        temperature_url, headers=headers, json=temperature_data)
    humidity_response = requests.post(
        humidity_url, headers=headers, json=humidity_data)

    # Print the response status codes and temperature/humidity values
    print('Temperature Response:', temperature_response.status_code,
          'Temperature:', temperature, TEMPERATURE_UNIT)
    print('Humidity Response:', humidity_response.status_code,
          'Humidity:', humidity, HUMIDITY_UNIT)

    # Wait for 3 seconds before updating the feeds again
    time.sleep(3)
