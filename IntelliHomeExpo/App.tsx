import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';

import Bedroom from "./screens/Bedroom";
import FaceRecognition from "./screens/FaceRecognition";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Setting from "./screens/Setting";
import Signup from "./screens/Signup";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    setTheme(isDarkMode ? MD3DarkTheme : DefaultTheme);
  }, [isDarkMode]);
  return (
    <PaperProvider theme={theme}>
      <Setting isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </PaperProvider>
  );
}