import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";
import { routes } from "../../navigation/routes";

import CustomStatusBar from "../../common/CustomStatusBar";
import Icon from "../../../assets/icons";
import ServiceItem from "../../common/ServiceItem";

export default function DashBoard(props) {
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

    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: resps.wp(2),
      marginTop: resps.hp(2),
      marginBottom: resps.hp(1),
    },
    head: {
      color: theme.primary,
      fontWeight: "bold",
      fontSize: resps.hp(3),
    },
    actions: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
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

      <View style={styles.header}>
        <Text style={styles.head}>Your Services</Text>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Icon.AntDesign name="pluscircle" size={28} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item, index }) => (
          <ServiceItem
            onPress={() => props?.navigation?.navigate(routes.detailScreen)}
            item={item}
            index={index}
          />
        )}
        keyExtractor={(_item, index) => index.toLocaleString()}
      />
    </View>
  );
}
