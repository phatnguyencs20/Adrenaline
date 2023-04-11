import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppBar from '../../components/Appbar';
import NavBar from '../../components/NavBar';

const Home = () => {
    return (
        <SafeAreaView style={{ height: '100%'}}>
            <AppBar />
            <NavBar />
        </SafeAreaView>
    );
};

export default Home;