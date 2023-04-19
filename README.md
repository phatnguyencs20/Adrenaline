# Adrenaline

## Installation

## Usage

### Run the CoreML server in a separate terminal
This is the server that will handle Face Recognition requests.
```bash
$ cd CoreML
$ pip3 install -r requirements.txt
$ python3 MLServer.py
```
### Run the app in a separate terminal
This is our app, which can be accessed from any device on the same network using the Expo Go app.
```bash
$ cd IntelliHomeExpo
$ npm i
$ npx expo start
```
**Important note**: All your devices should be on the same network!