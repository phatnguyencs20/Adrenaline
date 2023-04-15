import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';

const SignUpScreen = ({ navigation }: any) => {
    const { colors } = useTheme();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [adafruitIOUsername, setAdafruitIOUsername] = useState('');
    const [adafruitIOKey, setAdafruitIOKey] = useState('');

    const handleSignUp = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text
                variant='displayMedium'
                style={{ color: colors.primary, margin: '5%', fontWeight: '500', }}
            >
                Sign up
            </Text>
            <TextInput
                label="Username"
                value={username}
                style={styles.inputField}
                onChangeText={setUsername}
            />
            <TextInput
                label="Password"
                value={password}
                style={styles.inputField}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={{ flexDirection: 'row', width: '90%' }}>
                <TextInput
                    label="First Name"
                    value={firstName}
                    style={[styles.inputField, { flex: 1, marginRight: 5 }]}
                    onChangeText={setFirstName}
                />
                <TextInput
                    label="Last Name"
                    value={lastName}
                    style={[styles.inputField, { flex: 1, marginLeft: 5 }]}
                    onChangeText={setLastName}
                />
            </View>

            <TextInput
                label="Adafuit IO Username"
                value={adafruitIOUsername}
                style={styles.inputField}
                onChangeText={setAdafruitIOUsername}
            />
            <TextInput
                label="Adafuit IO Key"
                value={adafruitIOKey}
                style={styles.inputField}
                onChangeText={setAdafruitIOKey}
            />
            <Button mode="contained" style={{ width: '90%'}} onPress={handleSignUp}>
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
