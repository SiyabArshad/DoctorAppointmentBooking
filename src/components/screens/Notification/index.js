import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "../../../assets/icons";
import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";

import CustomStatusBar from "../../common/CustomStatusBar";
import Empty from "../../common/Empty";

export default function Notifications() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      paddingTop: insets.top,
      paddingHorizontal: resps.wp(4),
    },

    scroll: {
      paddingTop: resps.hp(2),
      paddingBottom: resps.hp(5),
    },
    card: {
      width: "100%",
      marginBottom: resps.hp(1.4),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: resps.wp(3),
      backgroundColor: theme.grey300,
      borderRadius: resps.hp(1),
      paddingHorizontal: resps.wp(2),
      paddingVertical: resps.hp(1),
    },
    texts: {},
    h2: {
      marginTop: resps.hp(1),
      marginBottom: resps.hp(0.3),
      fontWeight: "bold",
      color: theme.primary,
      fontSize: resps.hp(2),
    },
    p: {
      color: theme.black,
      marginBottom: resps.hp(0.5),
    },
  });
  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <CustomStatusBar
          removeExtraHeight={true}
          backgroundColor={"transparent"}
          translucent={true}
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon.Entypo name="bell" size={28} color={theme.primary} />
            <View style={styles.texts}>
              <Text style={styles.h2}>Congratulations</Text>
              <Text style={styles.p}>Jhon has just booked an appointment.</Text>
            </View>
          </View>
        )}
        keyExtractor={(_item, index) => index.toLocaleString()}
      />
      {/* <Empty /> */}
    </View>
  );
}
