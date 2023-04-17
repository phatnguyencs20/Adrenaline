import * as React from "react";
import { Switch } from "react-native-paper";

const ModeSwitch = ({ autoMode, setAutoMode }) => {
  const handleSwitch = (value) => {
    setAutoMode(value);
  };

  return <Switch value={autoMode} onValueChange={handleSwitch} />;
};

export default ModeSwitch;
