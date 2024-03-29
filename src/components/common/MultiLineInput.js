import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

import PropTypes from "prop-types";

import { useTheme } from "../../context/themeContext";

import resp from "../../assets/typo";

export default function CustomMultiLineTextInput({
  disabled = false,
  maincon,
  placeholder,
  placeholdercolor,
  onChange,
  icon,
  value,
  main1,
  message,
}) {
  const { theme } = useTheme();
  //styles
  const styles = StyleSheet.create({
    container: {
      height: resp.hp(25),
      paddingHorizontal: resp.wp(3),
      paddingVertical: resp.hp(1),
      backgroundColor: theme.grey300,
      borderRadius: resp.hp(1),
      ...maincon,
    },
    inp: {
      flex: 1,
      marginHorizontal: resp.wp(3),
      paddingVertical: resp.hp(0.8),
      color: theme.black,
      fontWeight: "500",
      textAlignVertical: "top",
    },
    main: {
      marginBottom: resp.hp(2),
      ...main1,
    },
    message: {
      marginTop: resp.hp(0.8),
      marginLeft: resp.wp(1),
      color: theme.primary,
    },
  });
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {icon}
        <TextInput
          cursorColor={theme.primary}
          value={value}
          style={styles.inp}
          editable={!disabled}
          placeholder={placeholder}
          placeholdercolor={placeholdercolor}
          onChangeText={onChange}
        />
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

CustomMultiLineTextInput.propTypes = {
  disabled: PropTypes.bool,
  maincon: PropTypes.object,
  placeholder: PropTypes.string,
  placeholdercolor: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.element,
  value: PropTypes.string,
  main1: PropTypes.object,
  message: PropTypes.string,
};
