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

import { UserState } from '../../store';
import FanSwitch from "../FanSwitch/index.js";
import LightSwitch from "../LightSwitch/index.js";
import { getAdafruitIOData, sendToAdafruitIOFeed } from "../../utils/api";
import ModeSwitch from "../ModeSwitch/index.js";
import { model } from "../../utils/coreML";

const { width, height } = Dimensions.get('window');

const LivingRoom = () => {
    const user = useSelector((state: { app: { user: UserState } }) => state.app.user);
    const AIOUsername = user.adafruitIOUsername;
    const AIOKey = user.adafruitIOKey;
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [autoMode, setAutoMode] = useState(false);
    // const [currentFs, setcurrentFs] = useState(0);
    const [fanSpeed, setFanSpeed] = useState(0);

    // getAdafruitIOData('minifan', AIOUsername, AIOKey)
    //     .then((data) => {
    //         const latestData = data[0];
    //         setcurrentFs(Number(latestData.value));
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

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
            if (autoMode) {
                const predict = async () => {
                    let result = model.predict([Number(temperature), Number(humidity)]);
                    console.log('KNN predict:', result);
                    // lọc giá trị fanSpeed
                    if (result < 0) result = 0;
                    else if (result < 25) result = 25;
                    else if (result < 50) result = 50;
                    else if (result < 100) result = 100;
                    else result = 100;

                    sendToAdafruitIOFeed(
                        "minifan",
                        "phatnt",
                        "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT",
                        String(result)
                    );

                    setFanSpeed(result);
                }
                predict();
            }
        }, 10_000);
        return () => clearInterval(intervalId);
    }, []);


    // console.log('Fan speed:', fanSpeed);
    // console.log('Mode:', autoMode);
    return (
        <View style={styles.container}>
            {/* Fan card */}
            <Card style={styles.card}>
                <List.Section style={{ marginTop: 10, marginBottom: 20 }}>
                    <List.Subheader style={styles.cardText}>Temperature monitoring</List.Subheader>
                    <List.Item
                        title="Temperature"
                        left={() => <List.Icon icon="coolant-temperature" />}
                        right={() => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.cardText, { lineHeight: 30 }]}>{temperature}°</Text>
                                <Text style={[styles.cardText, { lineHeight: 30 }]}>C</Text>
                            </View>
                        )}
                    />
                    <List.Item
                        title="Humidity"
                        left={() => <List.Icon icon="air-humidifier" />}
                        right={() => <Text style={styles.cardText}>{humidity}%</Text>}
                    />
                    <List.Item
                        title="Auto mode"
                        left={() => <List.Icon icon="robot-outline" />}
                        right={() => <ModeSwitch autoMode={autoMode} setAutoMode={setAutoMode} />}
                    />
                    
                    <FanSwitch autoMode={autoMode} predictedFanSpeed={fanSpeed} temp={Number(temperature)} humid={Number(humidity)} />
                    {/* {autoMode === false && <FanSwitch autoMode={autoMode} predictedFanSpeed={fanSpeed} temp={Number(temperature)} humid={Number(humidity)} />}
                    {autoMode === true &&
                        <View>
                            <Text style={styles.cardText}>KNN-predicted fan speed: {fanSpeed}</Text>
                        </View>
                    } */}

                </List.Section>
            </Card>

            {/* Light card */}
            <Card style={styles.card1}>
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
        height: '55%',
        margin: 10,
        borderRadius: 10,
    },
    card1: {
        padding: 10,
        width: '90%',
        height: '35%',
        margin: 10,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default LivingRoom;