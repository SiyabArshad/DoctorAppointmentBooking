import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";

import PropTypes from "prop-types";

import { useTheme } from "../../context/themeContext";

import Icon from "../../assets/icons";
import resp from "../../assets/typo";

export default function CustomTextInput({
  disabled = false,
  maincon,
  placeholder,
  placeholdercolor,
  onChange,
  isPassword = false,
  icon,
  value,
  main1,
  message,
}) {
  const { theme } = useTheme();
  const [isSecuretext, setIsSecuretext] = React.useState(false);
  //styles
  const styles = StyleSheet.create({
    container: {
      height: resp.hp(7),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: resp.wp(3),
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
          secureTextEntry={isSecuretext}
          value={value}
          style={styles.inp}
          editable={!disabled}
          placeholder={placeholder}
          placeholdercolor={placeholdercolor}
          onChangeText={onChange}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setIsSecuretext((prev) => !prev)}>
            <Icon.Feather
              name={isSecuretext ? "eye-off" : "eye"}
              size={24}
              color={theme.grey600}
            />
          </TouchableOpacity>
        )}
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

CustomTextInput.propTypes = {
  disabled: PropTypes.bool,
  maincon: PropTypes.object,
  placeholder: PropTypes.string,
  placeholdercolor: PropTypes.string,
  onChange: PropTypes.func,
  isPassword: PropTypes.bool,
  icon: PropTypes.element,
  value: PropTypes.string,
  main1: PropTypes.object,
  message: PropTypes.string,
};
