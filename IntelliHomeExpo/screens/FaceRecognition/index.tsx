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
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Entypo name={'camera'} size={28} color={'#f1f1f1'} /><Text style={styles.content}> Take a picture to unlock</Text>
          </TouchableOpacity>
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
    width: '85%',
    borderRadius: 20,
  },
  capture: {},
  button: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aba6a4',
    borderRadius: 10,
  },
  content: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
  },
});

export default FaceRecognition;
