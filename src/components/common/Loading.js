import React from "react";
import { Modal, View, ActivityIndicator, Dimensions } from "react-native";

import PropTypes from "prop-types";

const windowHeight = Dimensions.get("window").height;

import { useTheme } from "../../context/themeContext";

function Loading({ show }) {
  const { theme: colors } = useTheme();
  return (
    <Modal
      visible={show}
      transparent={true}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          marginTop: windowHeight / 2 - 50,
          width: "100%",
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            elevation: 5,
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: colors.white,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={25} color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
}

Loading.propTypes = {
  show: PropTypes.bool.isRequired,
};
export default Loading;
