import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, TouchableRipple, useTheme } from 'react-native-paper';

function LoginPage({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();

    const handleLogin = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text variant='headlineLarge' style={{ color: colors.primary, margin: '5%' }}>Welcome back!</Text>
            <View style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Log in
                </Button>
            </View>
            <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>Don't have an account?</Text>
                <TouchableRipple onPress={() => { navigation.navigate('Signup') }}>
                    <Text style={styles.createAccountLink}>Create one now</Text>
                </TouchableRipple>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    forgotPasswordText: {
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    formContainer: {
        width: '100%',
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        width: '100%',
    },
    createAccountContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
    },
    createAccountText: {
        marginRight: 5,
    },
    createAccountLink: {
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#777',
    },
});

export default LoginPage;
