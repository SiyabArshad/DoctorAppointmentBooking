import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import PropTypes from "prop-types";

import { images } from "../../assets/images";
import { useTheme } from "../../context/themeContext";

import resps from "../../assets/typo";

export default function ServiceItem({ item, index, onPress }) {
  const { theme } = useTheme();

  //styles
  const styles = StyleSheet.create({
    card: {
      width: "100%",
      marginBottom: resps.hp(1),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: resps.wp(5),
      backgroundColor: theme.grey300,
      borderRadius: resps.hp(1),
      paddingHorizontal: resps.wp(2),
      paddingVertical: resps.hp(1),
    },
    serviceimg: {
      height: resps.hp(13),
      width: resps.hp(13),
      resizeMode: "cover",
      borderRadius: resps.hp(0.6),
    },
    texts: {
      flex: 1,
    },
    h2: {
      marginBottom: resps.hp(1.4),
      fontWeight: "bold",
      color: theme.black,
    },
    h5: {
      marginBottom: resps.hp(2),
      color: theme.black,
    },
    tag: {
      backgroundColor: theme.primary,
      alignSelf: "flex-end",
      paddingHorizontal: resps.wp(3),
      paddingVertical: resps.hp(0.5),
      borderRadius: resps.hp(100),
    },
    price: {
      color: theme.white,
      fontWeight: "600",
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={images.dummyServiceImage} style={styles.serviceimg} />
      <View style={styles.texts}>
        <Text style={styles.h2}>Asteria hotel</Text>
        <Text style={styles.h5}>Wilora NT 0872, Australia</Text>
        <View style={styles.tag}>
          <Text style={styles.price}>Service</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ServiceItem.propTypes = {
  item: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};
