import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { getAdafruitIOData } from '../../utils/api';

const Statistic = () => {
    // const [label, setLabel] = useState([]);
    const [chart, setChart] = useState(<></>);

    const draw_chart = (input: number[])=>{
        setChart(
            <LineChart
                data={{
                labels: [],
                datasets: [
                    {
                    data: input
                    }
                ]
                }}
                width={Dimensions.get("window").width-40} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=" C"
                yAxisInterval={9} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#AB5AE0",
                backgroundGradientFrom: "#B589FA",
                backgroundGradientTo: "#610DE2",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
        )
    }

    let data_temp: number[] = [];
    useEffect(()=>{
        const intervalId = setInterval(() => {
            getAdafruitIOData("temperature", "phatnt", "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT")
                .then((res) =>{
                    data_temp = [...data_temp, +res[0].value];
                    if (data_temp.length >7) {
                        data_temp.splice(0);
                    }
                    console.log(data_temp);
                    draw_chart(data_temp);
                })
                .catch(err => {console.log(err)});
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
            <Text>Temperature</Text>
            {chart}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Statistic;