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

import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-native-paper";

import { images } from "../../../assets/images/index";
import { useTheme } from "../../../context/themeContext";
import { routes } from "../../navigation/routes";
import { logout } from "../../../store/reducers/auth";
import { fetchOwnProfile } from "../../../store/reducers/profile";
import { validValue } from "../../../helpers/common";
import { updatedoc } from "../../../helpers/firebasefunctions/firebasefuncs";

import Icon from "../../../assets/icons";
import resps from "../../../assets/typo";
import CustomStatusBar from "../../common/CustomStatusBar";
import Loading from "../../common/Loading";

export default function ProfileScreen(props) {
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const profile = useSelector((state) => state?.profile);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const onToggleSwitch = () => {
    toggleTheme();
    setIsSwitchOn(!isSwitchOn);
  };
  //logout Func
  const logoutFunc = async () => {
    setIsloading(true);
    try {
      await updatedoc("users", user?.user?.userid, { devicetoken: "" });
      dispatch(logout());
      Toast.show("Loggedout Sucessfully", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.success,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
      props?.navigation?.navigate(routes.signupScreen);
    } catch {
      Toast.show("Logout Failed", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsloading(false);
    }
  };
  //sideffects
  React.useEffect(() => {
    dispatch(fetchOwnProfile(user?.user?.userid));
  }, []);
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
      resizeMode: "cover",
      marginVertical: resps.hp(2),
      borderRadius: resps.hp(4),
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
    themecon: {
      marginBottom: resps.hp(2),
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingRight: resps.wp(2),
    },
    togglecon: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: resps.wp(3),
    },
    themetext: {
      color: theme.black,
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
      <Loading show={profile?.isLoading || isloading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.center}>
            <Image
              style={styles.dp}
              source={
                validValue(profile?.profile?.profilepic)
                  ? { uri: profile?.profile?.profilepic }
                  : images.UserProfile
              }
            />
          </View>
          <Text style={styles.name}>
            {validValue(profile?.profile?.name)
              ? profile?.profile?.name
              : "No name"}
          </Text>
          <Text style={styles.desc}>
            {validValue(profile?.profile?.bio)
              ? profile?.profile?.bio
              : "No Bio added yet"}
          </Text>
        </View>
        <View style={styles.controls}>
          <View style={styles.themecon}>
            <View style={styles.togglecon}>
              <Text style={styles.themetext}>Switch Theme</Text>
              <Switch
                color={theme.primary}
                thumbColor={theme.primary}
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
              />
            </View>
          </View>

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
          <TouchableOpacity onPress={logoutFunc} style={styles.btn}>
            <Icon.AntDesign name="logout" size={28} color={theme.primary} />
            <Text style={styles.btntext}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
