import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationOptions } from '@react-navigation/stack';

import AppBar from '../../components/Appbar';
import NavBar from '../../components/NavBar';

const Home = ({ navigation }: any) => {
    return (
        <View style={{flex: 1}}>
            <AppBar navigation={navigation} />
            <NavBar />
        </View>
    );
};

const screenOptions: StackNavigationOptions = {
    headerLeft: undefined,
    gestureEnabled: false,
};

Home.navigationOptions = screenOptions;

export default Home;