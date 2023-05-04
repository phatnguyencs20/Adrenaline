import time
import math
import requests

ADAFRUIT_IO_USERNAME = 'phatnt'
ADAFRUIT_IO_KEY = 'aio_xVna17f5ZfmsGHob3HMGeZ7dryiT'

TEMPERATURE_FEED = 'temperature'
HUMIDITY_FEED = 'humidity'

TEMPERATURE_UNIT = 'C'
HUMIDITY_UNIT = '%'

# Set the initial temperature and time
temperature_init = 25.0
humidity_init = 50.0
start_time = time.time()

while True:
    # Calculate the temperature and humidity values based on sine and cosine curves, respectively
    elapsed_time = time.time() - start_time
    temperature = round(temperature_init + 10.0 * math.sin(elapsed_time / 60.0), 2)
    humidity = round(humidity_init + 40.0 * math.cos(elapsed_time / 60.0), 2)

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

    print('Temperature Response:', temperature_response.status_code,
          'Temperature:', temperature, TEMPERATURE_UNIT)
    print('Humidity Response:', humidity_response.status_code,
          'Humidity:', humidity, HUMIDITY_UNIT)
    time.sleep(5)
