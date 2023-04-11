/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-paper/lib/typescript/src/components/Icon';

const FaceRecognition = () => {
  const [type, setType] = useState(CameraType.front);//dont toouch this
  const [permission, requestPermission] = useState(false);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

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
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rec}>
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
        >
        </Camera>
        <View>
          <Button mode='contained' onPress={takePicture}>Take</Button>
          <Button mode='contained' onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>Flip</Button>
        </View>
      </View>
    </View>
  );
};

const takePicture = () => {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  rec: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  camera: {
    height: '65%',
    width: '80%',
    borderRadius: 20,
  },
  capture: {},
  button: {
    flexDirection: 'row',
    height: 40,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aba6a4',
    borderRadius: 10,
  },
  content: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
  },
});

export default FaceRecognition;
