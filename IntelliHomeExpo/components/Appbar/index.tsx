import React from 'react';
import { Appbar } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { UserState } from '../../store';

const AppBar = ({ navigation }: any) => {
    const user = useSelector((state: { app: { user: UserState } }) => state.app.user);
    const firstName = user.firstName;

    return (
        <Appbar.Header elevated mode='small'>
            <Appbar.Content title={"Welcome back, " + firstName + "!"} />
            <Appbar.Action isLeading icon="dots-horizontal" onPress={() => { navigation.navigate('Setting') }} />
        </Appbar.Header>
    );
};

export default AppBar;