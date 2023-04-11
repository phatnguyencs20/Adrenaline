import * as React from 'react';
import { Switch } from 'react-native-paper';

import { StyleSheet } from 'react-native';

const LightSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default LightSwitch;