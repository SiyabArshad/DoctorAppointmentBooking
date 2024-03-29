import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { images } from "../../../assets/images/index";
import { useTheme } from "../../../context/themeContext";
import { routes } from "../../navigation/routes";

import Icon from "../../../assets/icons";
import resps from "../../../assets/typo";
import CustomStatusBar from "../../common/CustomStatusBar";

export default function ProfileScreen(props) {
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
    header: {
      marginBottom: resps.hp(2),
    },
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontSize: resps.hp(2.2),
      marginVertical: resps.hp(1),
      fontWeight: "bold",
      color: theme.black,
    },
    dp: {
      height: resps.hp(8),
      width: resps.hp(8),
      resizeMode: "contain",
      marginVertical: resps.hp(2),
    },
    desc: {
      lineHeight: resps.hp(2.7),
      color: theme.black,
    },
    controls: {
      marginTop: resps.hp(2),
    },
    btn: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: resps.wp(4),
      paddingVertical: resps.hp(1),
      borderWidth: 1,
      borderColor: theme.primary,
      marginBottom: resps.hp(2),
    },
    btntext: {
      marginLeft: resps.wp(4),
      color: theme.black,
      fontWeight: "500",
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.center}>
            <Image style={styles.dp} source={images.UserProfile} />
          </View>
          <Text style={styles.name}>Ahmed ul Hassam</Text>
          <Text style={styles.desc}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose injected humour
            and the like.
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate(routes.updateProfile)}
            style={styles.btn}
          >
            <Icon.AntDesign name="user" size={28} color={theme.primary} />
            <Text style={styles.btntext}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate(routes.historyScreen)}
            style={styles.btn}
          >
            <Icon.MaterialIcons
              name="history"
              size={28}
              color={theme.primary}
            />
            <Text style={styles.btntext}>Appointments History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate(routes.signupScreen)}
            style={styles.btn}
          >
            <Icon.AntDesign name="logout" size={28} color={theme.primary} />
            <Text style={styles.btntext}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
