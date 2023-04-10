import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';

import { StatusBar } from "expo-status-bar";

import Bedroom from "./screens/Bedroom";
import FaceRecognition from "./screens/FaceRecognition";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Setting from "./screens/Setting";
import AppBar from "./components/Appbar";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <PaperProvider>
      <AppBar/>
      <NavBar/>
    </PaperProvider>
  );
}