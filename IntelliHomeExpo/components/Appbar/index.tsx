import React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = ({ navigation }: any) => {
    return (
        <Appbar.Header elevated mode='small'>
            <Appbar.Content title="Welcome back, Phát!" />
            <Appbar.Action isLeading icon="dots-horizontal" onPress={() => { navigation.navigate('Setting') }} />
        </Appbar.Header>
    );
};

export default AppBar;