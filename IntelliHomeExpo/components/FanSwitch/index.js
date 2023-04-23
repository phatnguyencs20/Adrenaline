import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

import { sendToAdafruitIOFeed } from "../../utils/api";
import { model } from "../../utils/coreML";

const FanSwitch = ({ autoMode, predictedFanSpeed, temp, humid }) => {
  const [manualFanSpeed, setManualFanSpeed] = React.useState(1);
  const fanSpeed = autoMode ? predictedFanSpeed : manualFanSpeed;
  const addModelData = (temp, humid, fanSpeed) => {
    model.updateKnowledge([temp, humid, fanSpeed]);
  };

  const handleValueChange = (newValue) => {
    setManualFanSpeed(parseInt(newValue));
    if (!autoMode) {
      sendToAdafruitIOFeed(
        "minifan",
        "phatnt",
        "aio_xVna17f5ZfmsGHob3HMGeZ7dryiT",
        newValue
      );
      addModelData(temp, humid, parseInt(newValue));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={String(fanSpeed)}
        onValueChange={handleValueChange}
        buttons={[
          {
            value: "0",
            label: "Off",
          },
          {
            value: "25",
            label: "Low",
          },
          {
            value: "50",
            label: "Mid",
          },
          {
            value: "100",
            label: "High",
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
});

export default FanSwitch;
