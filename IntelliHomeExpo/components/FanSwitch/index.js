import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import { sendToAdafruitIOFeed } from "../../utils/api";


const FanSwitch = () => {

    const [value, setValue] = React.useState('');
    const handleValueChange = (newValue) => {
        setValue(newValue);
        sendToAdafruitIOFeed('minifan', 'phatnt', 'aio_xVna17f5ZfmsGHob3HMGeZ7dryiT', newValue);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={value}
                onValueChange={handleValueChange}
                buttons={[
                    {
                        value: '0',
                        label: 'Off',
                    },
                    {
                        value: '25',
                        label: 'Low',
                    },
                    { 
                        value: '50',
                        label: 'Mid' 
                    },
                    {
                        value: '100',
                        label: 'High' 
                    },
                ]}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
    },
});

export default FanSwitch;