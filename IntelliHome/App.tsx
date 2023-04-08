import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';

import NavBar from "./components/NavBar";
import AppBar from "./components/Appbar";
import Button from "./components/Button";
import Bedroom from "./screens/Bedroom";

export default function App() {
  return (
    <PaperProvider>
      <AppBar/>
      <NavBar />
    </PaperProvider>
  );
}