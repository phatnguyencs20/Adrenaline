import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, Snackbar, TouchableRipple, useTheme } from 'react-native-paper';

const endpoint = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-zcxbi/endpoint/data/v1/action/findOne'
const apiKey = 'BH4ZZFoMj1z7yc6Kjw1jPSJMhC3Ufv7dhAILm5XNlyQr3gKNTPLsGJWSRbiTmpuD'

import axios, { AxiosRequestConfig } from 'axios';

interface Filter {
    username: string;
    password: string;
}

interface Projection {
    _id: number;
    firstName: number;
    adafruitIOUsername: number;
    adafruitIOKey: number;
}

interface RequestBody {
    collection: string;
    database: string;
    dataSource: string;
    projection: Projection;
    filter: Filter;
}

interface ResponseData {
    document: {
        _id: string;
        firstName: string;
        adafruitIOUsername: string;
        adafruitIOKey: string;
    };
}

function getUserDataFromApi(username: string, password: string): Promise<ResponseData> {
    const requestBody: RequestBody = {
        collection: 'users',
        database: 'test',
        dataSource: 'Lambda',
        projection: {
            _id: 1,
            firstName: 1,
            adafruitIOUsername: 1,
            adafruitIOKey: 1
        },
        filter: {
            username: username,
            password: password,
        }
    };

    const config: AxiosRequestConfig = {
        method: 'post',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apiKey,
        },
        data: JSON.stringify(requestBody),
    };

    return axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

function LoginPage({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const handleSnackbarDismiss = () => {
        setSnackbarVisible(false);
    };

    const handleLogin = () => {
        // Call the API to authenticate the user
        getUserDataFromApi(email, password)
            .then((response) => {
                // If the authentication was successful, navigate to the Home screen
                if (response.document !== null)
                    navigation.navigate('Home');
                else
                    setSnackbarVisible(true);
            })
            .catch((error) => {
                // If there was an error, log it to the console
                console.log(error);
                setSnackbarVisible(true);
            });
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
            <Snackbar
                visible={snackbarVisible}
                onDismiss={handleSnackbarDismiss}
                duration={5000}
            >
                Invalid credentials, please try again
            </Snackbar>
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
