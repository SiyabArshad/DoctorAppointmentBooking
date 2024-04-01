import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Image,
} from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "../../../../context/themeContext";
import { images } from "../../../../assets/images";

import resps from "../../../../assets/typo";
import CustomStatusBar from "../../../common/CustomStatusBar";
import PlainHeader from "../../../common/PlainHeader";
import Empty from "../../../common/Empty";

export default function History(props) {
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
      resizeMode: "cover",
      borderRadius: resps.hp(0.6),
    },
    scroll: {
      paddingTop: resps.hp(2),
      paddingBottom: resps.hp(5),
    },
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
      <PlainHeader
        name="Appointments History"
        onPress={() => {
          props?.navigation?.pop();
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={images.dummyServiceImage}
              style={styles.serviceimg}
            />
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
        )}
        keyExtractor={(_item, index) => index.toLocaleString()}
      />
      {/* <Empty /> */}
    </View>
  );
}
