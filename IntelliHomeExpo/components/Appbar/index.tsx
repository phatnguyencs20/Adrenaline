import React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => {
    return (
        <Appbar>
            <Appbar.Content title="Welcome back, Phát!" />
            <Appbar.Action isLeading icon="dots-horizontal" onPress={() => { }} />
        </Appbar>
    );
};

export default AppBar;