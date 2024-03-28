import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import PropTypes from "prop-types";

import { useTheme } from "../../context/themeContext";

import Icon from "../../assets/icons";
import resp from "../../assets/typo";

export default function PlainHeader({
  onPress,
  name = "",
  conStyle = {},
  textStyle = {},
}) {
  const { theme } = useTheme();
  //styles
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: resp.hp(1),
      ...conStyle,
    },
    name: {
      color: theme.black,
      fontWeight: "600",
      marginLeft: resp.wp(4),
      fontSize: resp.hp(2),
      ...textStyle,
    },
  });
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress}>
        <Icon.MaterialIcons
          name="keyboard-backspace"
          size={24}
          color={theme.black}
        />
      </TouchableOpacity>
      {name && <Text style={styles.name}>{name}</Text>}
    </View>
  );
}

PlainHeader.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string,
  conStyle: PropTypes.object,
  textStyle: PropTypes.object,
};
