import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { List, Divider, Button, useTheme } from 'react-native-paper';

const SettingsScreen = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean; setIsDarkMode: (value: boolean) => void }) => {
    const { colors } = useTheme();
    const [backgroundColor, setBackgroundColor] = useState(colors.background);

    const handleLogout = () => {
        // Code to handle logout
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        setBackgroundColor(isDarkMode ? colors.surface : colors.background);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <List.Section style={{ marginTop: 10}}>
                <List.Subheader>Account</List.Subheader>
                <List.Item
                    title="Change Password"
                    left={(props) => <List.Icon {...props} icon="lock" />}
                />
            </List.Section>
            <Divider />
            <List.Section>
                <List.Subheader>Device Settings</List.Subheader>
                <List.Item
                    title="Notifications"
                    left={(props) => <List.Icon {...props} icon="bell" />}
                />
                <List.Item
                    title="Device Preferences"
                    left={(props) => <List.Icon {...props} icon="tablet-cellphone" />}
                />
                <List.Item
                    title="Dark Mode"
                    left={(props) => <List.Icon {...props} icon="weather-night" />}
                    right={() => (
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleDarkMode}
                            trackColor={{ true: colors.primary }}
                            thumbColor={colors.background}
                        />
                    )}
                />
            </List.Section>
            <Divider />
            <Button mode="contained" onPress={handleLogout}>
                Logout
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default SettingsScreen;
