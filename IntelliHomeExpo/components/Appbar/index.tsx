import React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => {
    return (
        <Appbar elevated>
            <Appbar.Content title="Welcome back, Phát!" />
            <Appbar.Action isLeading icon="account-settings" onPress={() => { }} />
        </Appbar>
    );
};

export default AppBar;