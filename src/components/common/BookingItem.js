import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import PropTypes from "prop-types";
import { Swipeable } from "react-native-gesture-handler";
import { images } from "../../assets/images";
import { useTheme } from "../../context/themeContext";

import Icon from "../../assets/icons";
import resps from "../../assets/typo";

export default function BookingItem({ item, index }) {
  const { theme } = useTheme();
  const ref = React.useRef(null);

  const declineFunction = () => {
    ref?.current?.close();
  };
  const confirmedFunction = () => {
    ref?.current?.close();
  };
  //styles
  const styles = StyleSheet.create({
    serviceimg: {
      height: resps.hp(13),
      width: resps.hp(13),
      objectFit: "cover",
      borderRadius: resps.hp(0.6),
    },

    card: {
      width: "100%",
      marginBottom: resps.hp(1),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: resps.wp(5),
      backgroundColor: theme.grey300,
      paddingHorizontal: resps.wp(2),
      paddingVertical: resps.hp(1),
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
      marginBottom: resps.hp(1),
      color: theme.black,
    },
    p: {
      marginBottom: resps.hp(0.5),
      color: theme.black,
      fontWeight: "500",
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
    declinemain: {
      backgroundColor: theme.warning,
      width: 120,
      marginBottom: resps.hp(1),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    confirmedmain: {
      backgroundColor: theme.success,
      width: 120,
      marginBottom: resps.hp(1),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  //left
  const LeftUi = () => {
    return (
      <TouchableOpacity onPress={declineFunction} style={styles.declinemain}>
        <Icon.Entypo name="cross" size={36} color={theme.white} />
      </TouchableOpacity>
    );
  };
  //right
  const RightUi = () => {
    return (
      <TouchableOpacity
        onPress={confirmedFunction}
        style={styles.confirmedmain}
      >
        <Icon.MaterialIcons name="done" size={36} color={theme.white} />
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      ref={ref}
      renderLeftActions={LeftUi}
      renderRightActions={RightUi}
    >
      <View style={styles.card}>
        <Image source={images.dummyServiceImage} style={styles.serviceimg} />
        <View style={styles.texts}>
          <Text style={styles.h2}>Asteria hotel</Text>
          <Text style={styles.h5}>Wilora NT 0872, Australia</Text>
          <Text style={styles.p}>Json King</Text>
          <Text style={styles.p}>09/08/2024 17:30</Text>
          <View style={styles.tag}>
            <Text style={styles.price}>Pending</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

BookingItem.propTypes = {
  item: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
};
