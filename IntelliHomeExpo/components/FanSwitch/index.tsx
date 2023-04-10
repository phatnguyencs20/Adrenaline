import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

const FanSwitch = () => {
    const [value, setValue] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FanSwitch;