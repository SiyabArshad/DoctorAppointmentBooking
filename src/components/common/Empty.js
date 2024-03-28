import { View, Text, StyleSheet } from "react-native";
import React from "react";

import PropTypes from "prop-types";

import { useTheme } from "../../context/themeContext";

import Icon from "../../assets/icons";
import resp from "../../assets/typo";

export default function Empty({ text = "No data found" }) {
  const { theme } = useTheme();

  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    h1: {
      color: theme.black,
      fontSize: resp.hp(3),
      fontWeight: "bold",
      marginTop: resp.hp(1),
    },
    col: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Icon.Feather name="alert-triangle" size={40} color={theme.black} />
        <Text style={styles.h1}>{text}</Text>
      </View>
    </View>
  );
}

Empty.propTypes = {
  text: PropTypes.string,
};
