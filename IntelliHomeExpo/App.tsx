import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';

import { store } from './store';
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Setting from "./screens/Setting";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    setTheme(isDarkMode ? MD3DarkTheme : DefaultTheme);
  }, [isDarkMode]);

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Setting">
              {props => <Setting {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
};