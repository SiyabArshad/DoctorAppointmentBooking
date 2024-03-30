import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "../../../assets/icons";
import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";
import { routes } from "../../navigation/routes";
import { images } from "../../../assets/images/index";

import CustomStatusBar from "../../common/CustomStatusBar";
import Button from "../../common/Button";

export default function DetailScreen(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  //handle delete
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this service?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {},
        style: "destructive",
      },
    ]);
  };
  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      paddingTop: insets.top,
    },
    main: {
      flex: 1,
    },
    banner: {
      width: "100%",
      height: resps.hp(30),
      resizeMode: "cover",
      marginTop: resps.hp(1),
    },
    texts: {
      marginVertical: resps.hp(2),
      paddingHorizontal: resps.wp(2),
    },
    title: {
      marginBottom: resps.hp(1),
      color: theme.black,
      fontWeight: "700",
      fontSize: resps.hp(2),
    },
    location: {
      marginBottom: resps.hp(2),
      color: theme.grey600,
    },
    desc: {
      color: theme.black,
      lineHeight: resps.hp(2.9),
      fontSize: resps.hp(1.7),
    },
    slots: {
      marginTop: resps.hp(1),
      paddingHorizontal: resps.wp(2),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: resps.hp(2),
    },
    slot: {
      borderWidth: 1,
      borderColor: theme.primary,
      paddingHorizontal: resps.wp(2),
      paddingVertical: resps.hp(1),
      borderRadius: resps.wp(1),
    },
    time: {
      color: theme.black,
    },
    slotdisable: {
      borderWidth: 1,
      borderColor: theme.warning,
      paddingHorizontal: resps.wp(2),
      paddingVertical: resps.hp(1),
      borderRadius: resps.wp(1),
      backgroundColor: theme.grey400,
    },
    bookinhcontrol: {
      width: "100%",
      paddingHorizontal: resps.wp(5),
      position: "absolute",
      bottom: insets.bottom + resps.hp(2),
      zIndex: 999,
    },
    scroll: {
      paddingBottom: resps.hp(20),
    },

    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: resps.wp(2),
      marginBottom: resps.hp(1),
    },
    actions: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: resps.wp(3),
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
        <TouchableOpacity onPress={() => props?.navigation?.pop()}>
          <Icon.MaterialIcons
            size={28}
            color={theme.black}
            name="keyboard-backspace"
          />
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate(routes.mapScreenSingle)}
          >
            <Icon.MaterialCommunityIcons
              size={28}
              color={theme.black}
              name="map-marker-radius"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate(routes.updateService)}
          >
            <Icon.MaterialCommunityIcons
              size={28}
              color={theme.black}
              name="file-edit-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Icon.MaterialIcons
              size={28}
              color={theme.black}
              name="delete-sweep"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.main}>
          <Image source={images.dummyServiceImage} style={styles.banner} />
          <View style={styles.texts}>
            <Text style={styles.title}>Title of the service.</Text>
            <Text style={styles.location}>Location of the service.</Text>
            <Text style={styles.desc}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose.
            </Text>
          </View>
          <View style={styles.slots}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <TouchableOpacity
                style={styles.slotdisable}
                key={index.toLocaleString()}
              >
                <Text style={styles.time}>9:00 - 10:00</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bookinhcontrol}>
        <Button text={"Book now"} onPress={() => {}} />
      </View>
    </View>
  );
}
