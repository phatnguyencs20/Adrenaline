import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Surface, useTheme, Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

import { getAdafruitIOData } from '../../utils/api';
const color_code = "#684EA5";

const Statistic = () => {
    // const [label, setLabel] = useState([]);
    const [temperature, setTemper] = useState(<></>);
    const [humid, setHumid] = useState(<></>);
    const draw_temper = (input: number[]) => {
        setTemper(
            <LineChart
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: input
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 40} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=" C"
                yAxisInterval={9} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: color_code,
                    backgroundGradientFrom: color_code,
                    backgroundGradientTo: color_code,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    // propsForDots: {
                    //     r: "1",
                    //     strokeWidth: "2",
                    //     stroke: "#ffa726"
                    // }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        )
    }

    const draw_humid = (input: number[]) => {
        setHumid(
            <LineChart
                data={{
                    labels: [],
                    datasets: [
                        {
                            data: input
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 40} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=" %"
                yAxisInterval={9} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: color_code,
                    backgroundGradientFrom: color_code,
                    backgroundGradientTo: color_code,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    // propsForDots: {
                    //     r: "1",
                    //     strokeWidth: "2",
                    //     stroke: "#ffa726"
                    // }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        )
    }
    const limit = 20;
    let data_temp: number[] = [];
    let data_humid: number[] = [];
    useEffect(() => {
        const intervalId = setInterval(() => {
            getAdafruitIOData("temperature", "phatnt", "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT")
                .then((res) => {
                    if (data_temp.length == 0) {
                        for (let i = 0; i < res.length; i++) {
                            data_temp = [+res[i].value, ...data_temp];
                        }
                    }
                    else {
                        data_temp = [...data_temp, +res[0].value];
                        if (data_temp.length > limit) {
                            data_temp.splice(0, 1);
                        }
                    }
                    console.log(data_temp);
                    draw_temper(data_temp);
                })
                .catch(err => { console.log(err) });
            getAdafruitIOData("humidity", "phatnt", "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT")
                .then((res) => {
                    if (data_humid.length == 0) {
                        for (let i = 0; i < res.length; i++) {
                            data_humid = [+res[i].value, ...data_humid];
                        }
                    }
                    else {
                        data_humid = [...data_humid, +res[0].value];
                        if (data_humid.length > limit) {
                            data_humid.splice(0, 1);
                        }
                    }
                    console.log(data_humid);
                    draw_humid(data_humid);
                })
                .catch(err => { console.log(err) });
        }, 5000);
        return () => clearInterval(intervalId);
        //     getAdafruitIOData("temperature", "phatnt", "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT")
        //         .then((res) =>{
        //             console.log(res);
        //             for (let i = 0; i < res.length; i++) {
        //                 data_temp = [+res[i].value, ...data_temp];
        //             }
        //             console.log(data_temp);
        //             draw_chart(data_temp);
        //         })
    }, []);
    // data_temp = [12,25,32,26,40,50,46,31];
    // data_temp = [30, ...data_temp];
    return (
        <View style={styles.container}>
            <Text style={styles.cardText}>Temperature</Text>
            {temperature}
            <Text style={styles.cardText}>Humidity</Text>
            {humid}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        padding: 10,
        fontSize: 20,
    },
})
export default Statistic;