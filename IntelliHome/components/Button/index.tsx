import React from 'react';
import { Button } from 'react-native-paper';

const MyButton = () => {
    return (
        <Button mode="contained" onPress={() => console.log('Pressed')}>
            Press me
        </Button>
    );
};

export default MyButton;