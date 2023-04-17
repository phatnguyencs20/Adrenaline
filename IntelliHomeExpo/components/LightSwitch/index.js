import * as React from 'react';
import { Switch } from 'react-native-paper';
import { sendToAdafruitIOFeed } from "../../utils/api";

const LightSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = (newValue) => {
    setIsSwitchOn(newValue);
    const valueToSend = newValue ? 1 : 0;
    sendToAdafruitIOFeed('miniled', 'phatnt', 'aio_xVna17f5ZfmsGHob3HMGeZ7dryiT', valueToSend);
  };

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default LightSwitch;