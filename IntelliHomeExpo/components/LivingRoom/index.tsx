import React from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
} from "react-native";

import {
    Card,
    List,
} from 'react-native-paper';

//import data
import { fvalue } from '../../mockup-data/fan.js';

//re-usable components
import LightSwitch from "../LightSwitch/index.js";
import FanSwitch from "../FanSwitch/index.js";

//set const height and width of devices
const { width, height } = Dimensions.get('window');

//create Living Room component
const LivingRoom = () => {
    return (
        <View style={styles.container}>
            {/* Fan card */}
            <Card style={styles.card} >
                <List.Section style={{ marginTop: 10 }}>
                    <List.Subheader style={styles.cardText}>Fan</List.Subheader>
                    <List.Item
                        title="Tempature"
                        left={() => <List.Icon icon="temperature-celsius" />}
                        right={() =>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={[styles.cardText1, { lineHeight: 30 }]}>{fvalue[0].temp}</Text>
                                <Text style={{ fontSize: 11, lineHeight: 18 }}>o</Text>
                                <Text style={[styles.cardText1, { lineHeight: 30 }]}>C</Text>
                            </View>
                        }
                    />
                    <List.Item
                        title="Humidity"
                        left={() => <List.Icon icon="water-percent" />}
                        right={() => <Text style={styles.cardText1}>{fvalue[0].humid}</Text>}
                    />
                </List.Section>

                <FanSwitch />
            </Card>

            {/* Light card */}
            <Card style={styles.lcard} >
                <List.Section>
                    <List.Subheader style={styles.cardText}>Light</List.Subheader>
                    <List.Item
                        title="Light 1"
                        left={() => <List.Icon icon="lightbulb" />}
                        right={() => <LightSwitch />}
                    />
                    <List.Item
                        title="Light 2"
                        left={() => <List.Icon icon="lightbulb" />}
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
        width: width * 0.9,
        height: height * 0.35,
        margin: 10,
        borderRadius: 10,
    },
    lcard: {
        padding: 10,
        width: width * 0.9,
        height: height * 0.3,
        margin: 10,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardText1: {
        fontSize: 15,
    },
});

export default LivingRoom;