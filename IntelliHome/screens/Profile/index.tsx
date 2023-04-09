import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function ProfilePage() {
    const { colors } = useTheme();

    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('johndoe@email.com');
    const [password, setPassword] = useState('password');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSave = () => {
        // Your save logic here
    };

    return (
        <View style={styles.container}>
            <View style={{
                width: '80%', alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Avatar.Image
                    size={100}
                    source={require('../../assets/profile.jpeg')}
                    style={styles.avatar}
                />
                <View style={styles.formContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            label="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                            style={[styles.input, { flex: 1, marginRight: 5 }]}
                        />
                        <TextInput
                            label="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                            style={[styles.input, { flex: 1, marginLeft: 5 }]}
                        />
                    </View>
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
                    <TextInput
                        label="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                    <TextInput
                        label="Confirm New Password"
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                <Button mode="contained" onPress={handleSave} style={styles.button}>
                    Save
                </Button>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>About Us</Text>
                <Text style={styles.footerText}>Contact Us</Text>
                <Text style={styles.footerText}>Privacy Policy</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        marginBottom: 50,
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        width: '100%',
        marginTop: 10,
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
    },
    footerText: {
        marginRight: 10,
        color: '#808080',
        fontSize: 12,
    },
});