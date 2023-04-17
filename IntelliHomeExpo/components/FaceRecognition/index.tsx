/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { Snackbar } from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { sendPredictionRequest } from '../../utils/coreML';

const FaceRecognition = () => {
  const [image, setImage] = useState(null);

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = useState(false);
  const cameraRef = useRef(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const camera = await Camera.requestCameraPermissionsAsync();
      requestPermission(camera.status === 'granted');
    })();
  }, []);

  if (permission === false) {
    return (<Text>Camera denied</Text>)
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const predictImage = async () => {
    if (image) {
      const prediction = await sendPredictionRequest(image);
      const message = 'Class ' + prediction + '!';
      setSnackbarMessage(message);
      setSnackbarVisible(true);
      console.log(prediction); // Display the prediction
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
      >
      </Camera>
      <View style={styles.buttonsContainer}>
        <Button mode='contained' onPress={takePicture} style={styles.button}>Take</Button>
        <Button mode='contained' onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} style={styles.button}>Flip</Button>
        <Button mode='contained' onPress={predictImage} style={styles.button}>Predict</Button>
      </View>

      <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={Snackbar.DURATION_SHORT}
        >
            {snackbarMessage}
        </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: '80%',
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    width: '80%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default FaceRecognition;
