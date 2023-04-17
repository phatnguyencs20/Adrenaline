import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
    View,
    Dimensions,
    StyleSheet,
} from "react-native";

import {
    Card,
    List,
    Text,
} from 'react-native-paper';

import { fvalue } from '../../mockup-data/fan.js';

import { UserState } from '../../store';
import FanSwitch from "../FanSwitch/index.js";
import LightSwitch from "../LightSwitch/index.js";
import { getAdafruitIOData } from "../../utils/api";

const { width, height } = Dimensions.get('window');

const LivingRoom = () => {
    const user = useSelector((state: { app: { user: UserState } }) => state.app.user);
    const AIOUsername = user.adafruitIOUsername;
    const AIOKey = user.adafruitIOKey;
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            getAdafruitIOData('temperature', AIOUsername, AIOKey)
                .then((data) => {
                    const latestData = data[0];
                    setTemperature(latestData.value);
                })
                .catch((error) => {
                    console.error(error);
                });

            getAdafruitIOData('humidity', AIOUsername, AIOKey)
                .then((data) => {
                    const latestData = data[0];
                    setHumidity(latestData.value);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <View style={styles.container}>
            {/* Fan card */}
            <Card style={styles.card} >
                <List.Section style={{ marginTop: 10, marginBottom: 20 }}>
                    <List.Subheader style={styles.cardText}>Temperature monitoring</List.Subheader>
                    <List.Item
                        title="Temperature"
                        left={() => <List.Icon icon="coolant-temperature" />}
                        right={() =>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={[styles.cardText, { lineHeight: 30 }]}>{temperature}°</Text>
                                <Text style={[styles.cardText, { lineHeight: 30 }]}>C</Text>
                            </View>
                        }
                    />
                    <List.Item
                        title="Humidity"
                        left={() => <List.Icon icon="air-humidifier" />}
                        right={() => <Text style={styles.cardText}>{humidity}%</Text>}
                    />
                </List.Section>

                <FanSwitch />
            </Card>

            {/* Light card */}
            <Card style={styles.card} >
                <List.Section>
                    <List.Subheader style={styles.cardText}>Light monitoring</List.Subheader>
                    <List.Item
                        title="Light 1"
                        left={() => <List.Icon icon="lightbulb-variant-outline" />}
                        right={() => <LightSwitch />}
                    />
                    <List.Item
                        title="Light 2"
                        left={() => <List.Icon icon="lightbulb-variant-outline" />}
                        right={() => <LightSwitch />}
                    />
                    <List.Item
                        title="Light 3"
                        left={() => <List.Icon icon="lightbulb-variant-outline" />}
                        right={() => <LightSwitch />}
                    />
                </List.Section>
            </Card>
        </View>
    )
};

// create a stylesheet 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: 10,
        width: '90%',
        height: '45%',
        margin: 10,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default LivingRoom;