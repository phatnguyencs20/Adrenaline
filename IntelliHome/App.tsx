import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';

import Login from "./screens/Login";
import Profile from "./screens/Profile";

export default function App() {
  return (
    <PaperProvider>
      <Profile />
    </PaperProvider>
  );
}