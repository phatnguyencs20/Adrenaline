import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [adafruitIOUsername, setAdafruitIOUsername] = useState('');
    const [adafruitIOKey, setAdafruitIOKey] = useState('');

    const handleSignUp = () => {
        // Code to handle sign up
    }

    return (
        <View style={styles.container}>
            <Text variant='headlineLarge'>Sign Up</Text>
            <TextInput
                mode='outlined'
                label="Username"
                value={username}
                style={styles.inputField}
                onChangeText={setUsername}
            />
            <TextInput
            mode='outlined'
                label="Password"
                value={password}
                style={styles.inputField}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={{ flexDirection: 'row', width: '90%' }}>
                <TextInput
                mode='outlined'
                    label="First Name"
                    value={firstName}
                    style={[styles.inputField, { flex: 1, marginRight: 5 }]}
                    onChangeText={setFirstName}
                />
                <TextInput
                mode='outlined'
                    label="Last Name"
                    value={lastName}
                    style={[styles.inputField, { flex: 1, marginLeft: 5 }]}
                    onChangeText={setLastName}
                />
            </View>

            <TextInput
            mode='outlined'
                label="Adafuit IO Username"
                value={adafruitIOUsername}
                style={styles.inputField}
                onChangeText={setAdafruitIOUsername}
            />
            <TextInput
            mode='outlined'
                label="Adafuit IO Key"
                value={adafruitIOKey}
                style={styles.inputField}
                onChangeText={setAdafruitIOKey}
            />
            <Button mode="contained" onPress={handleSignUp}>
                Sign Up
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    inputField: {
        width: '90%',
        marginBottom: 10,
    },
});

export default SignUpScreen;
