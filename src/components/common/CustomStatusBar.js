import React from "react";
import { View, StatusBar } from "react-native";

import PropTypes from "prop-types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomStatusBar = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height: props.removeExtraHeight ? null : insets.top,
        backgroundColor: props.backgroundColor,
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={props.backgroundColor}
        hidden={props.hidden}
        translucent={props.translucent}
        barStyle={"dark-content"}
      />
    </View>
  );
};

CustomStatusBar.propTypes = {
  removeExtraHeight: PropTypes.bool,
  backgroundColor: PropTypes.string,
  hidden: PropTypes.bool,
  translucent: PropTypes.bool,
};

export default CustomStatusBar;
