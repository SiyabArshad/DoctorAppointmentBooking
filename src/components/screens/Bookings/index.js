import { View, StyleSheet, Platform, FlatList } from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";

import CustomStatusBar from "../../common/CustomStatusBar";
import BookingItem from "../../common/BookingItem";
import Empty from "../../common/Empty";

export default function Bookings() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      paddingTop: insets.top,
    },

    scroll: {
      paddingTop: resps.hp(2),
      paddingBottom: resps.hp(5),
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
        renderItem={({ item, index }) => (
          <BookingItem index={index} item={item} />
        )}
        keyExtractor={(_item, index) => index.toLocaleString()}
      />
      {/* <Empty /> */}
    </View>
  );
}
