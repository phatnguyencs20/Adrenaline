import React from 'react';
import { View } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { UserState } from '../../store';

import AppBar from '../../components/Appbar';
import NavBar from '../../components/NavBar';
import { Button } from 'react-native-paper';

const Home = ({ navigation }: any) => {
    const user = useSelector((state: { app: { user: UserState } }) => state.app.user);
    const AIOUsername = user.adafruitIOUsername;
    const AIOKey = user.adafruitIOKey;
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