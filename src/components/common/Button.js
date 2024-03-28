import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

import PropTypes from "prop-types";

import { useTheme } from "../../context/themeContext";

import resp from "../../assets/typo";

export default function Button({
  onPress,
  icon,
  btnStyle,
  text,
  loading,
  disabled,
}) {
  const { theme } = useTheme();
  //styles
  const styles = StyleSheet.create({
    btn: {
      height: resp.hp(6.5),
      width: "100%",
      backgroundColor: theme.primary,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: resp.hp(100),
      gap: resp.wp(2),
      ...btnStyle,
    },
    btntext: {
      color: theme.white,
      fontWeight: "500",
      fontSize: resp.hp(2),
    },
  });
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.btn}>
      {loading ? (
        <ActivityIndicator size={22} color={theme.white} />
      ) : (
        <>
          {icon}
          <Text style={styles.btntext}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.any,
  btnStyle: PropTypes.object,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
