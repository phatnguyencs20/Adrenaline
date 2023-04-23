import * as React from "react";
import { Switch } from "react-native-paper";
import * as Updates from "expo-updates";

const ModeSwitch = ({ autoMode, setAutoMode }) => {
  const handleSwitch = (value) => {
    setAutoMode(value);
  };
  
  // uncomment this when code are ready to publish
  // React.useEffect(() => {
  //   Updates.reloadAsync();
  // }, [autoMode]);

  return <Switch value={autoMode} onValueChange={handleSwitch} />;
};

export default ModeSwitch;
