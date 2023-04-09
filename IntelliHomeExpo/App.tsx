import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';

import Bedroom from "./screens/Bedroom";
import FaceRecognition from "./screens/FaceRecognition";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Setting from "./screens/Setting";

export default function App() {
  return (
    <PaperProvider>
      <Profile />
    </PaperProvider>
  );
}