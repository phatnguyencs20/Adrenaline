import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput, Button, Text, Snackbar, TouchableRipple, useTheme, } from 'react-native-paper';

import { login } from '../../store';
import Welcome from '../../components/Welcome';
import { getUserDataFromApi } from '../../utils/api';

function LoginPage({ navigation }: any) {
    const { colors, dark } = useTheme();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handleSnackbarDismiss = () => {
        setSnackbarVisible(false);
    };

    const handleLogin = () => {
        // Call the API to authenticate the user
        getUserDataFromApi(email, password)
            .then((response) => {
                // If the authentication was successful, navigate to the Home screen
                if (response.document !== null) {
                    // dispatch the login action with the user information
                    dispatch(login(response.document));
                    navigation.navigate('Home');
                    setEmail('');
                    setPassword('');
                } else {
                    setSnackbarVisible(true);
                }
            })
            .catch((error) => {
                // If there was an error, log it to the console
                console.log(error);
                setSnackbarVisible(true);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.smaller}>
                <Image
                    source={require('../../assets/pana.png')}
                    style={styles.img}
                />
                <Text
                    variant='displaySmall'
                    style={{ color: colors.primary, margin: '5%', fontWeight: '600', }}
                >
                    <Welcome />
                </Text>

                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleLogin}>
                        Log in
                    </Button>
                </View>
            </View>
            <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>Don't have an account?</Text>
                <TouchableRipple onPress={() => { navigation.navigate('Signup') }}>
                    <Text style={styles.createAccountLink}>Create one now</Text>
                </TouchableRipple>
            </View>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={handleSnackbarDismiss}
                duration={5000}
                onIconPress={handleSnackbarDismiss}
            >
                Invalid credentials, please try again!
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smaller: {
        flex: .8,
        alignItems: 'center',
        padding: 25,
        width: '100%',
    },
    img: {
        width: '80%',
        height: '30%',
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
