import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";
import { images } from "../../../assets/images";

import CustomStatusBar from "../../common/CustomStatusBar";
import Icon from "../../../assets/icons";

export default function Services() {
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
    serviceimg: {
      height: resps.hp(13),
      width: resps.hp(13),
      objectFit: "cover",
      borderRadius: resps.hp(0.6),
    },
    scroll: {
      paddingTop: resps.hp(2),
      paddingBottom: resps.hp(5),
    },
    card: {
      width: "100%",
      marginBottom: resps.hp(2),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: resps.wp(5),
      backgroundColor: theme.grey300,
      borderRadius: resps.hp(1),
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
      gap: resps.wp(2),
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
        <Text style={styles.head}>Services</Text>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Icon.AntDesign name="pluscircle" size={28} color={theme.black} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon.Fontisto name="date" size={28} color={theme.black} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image
              source={images.dummyServiceImage}
              style={styles.serviceimg}
            />
            <View style={styles.texts}>
              <Text style={styles.h2}>Asteria hotel</Text>
              <Text style={styles.h5}>Wilora NT 0872, Australia</Text>
              <View style={styles.tag}>
                <Text style={styles.price}>194 £</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(_item, index) => index.toLocaleString()}
      />
    </View>
  );
}
