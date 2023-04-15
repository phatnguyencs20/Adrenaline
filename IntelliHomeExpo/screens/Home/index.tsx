import React from 'react';
import { View } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { UserState } from '../../store';
import AppBar from '../../components/Appbar';
import NavBar from '../../components/NavBar';

const Home = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1 }}>
            <AppBar navigation={navigation} />
            {/* <Button onPress={() => console.log(AIOKey) }>Setting</Button> */}
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