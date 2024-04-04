import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";

import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import Icon from "../../../assets/icons";
import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";
import { getNotificationsByUserId } from "../../../helpers/firebasefunctions/firebasefuncs";

import CustomStatusBar from "../../common/CustomStatusBar";
import Empty from "../../common/Empty";
import Loading from "../../common/Loading";

export default function Notifications(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state?.auth);
  const [notifications, setNotifications] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  //loading data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getNotificationsByUserId(user?.user?.userid);
      setNotifications(data);
    } catch {
      Toast.show("Failed to load notifications.", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsLoading(false);
    }
  };
  //onRefresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      loadData();
    } catch {
      Toast.show("Failed to load notifications.", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } finally {
      setRefreshing(false);
    }
  };
  //sideeffects
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );
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
      marginBottom: resps.hp(1.2),
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
      width: "70%",
      overflow: "hidden",
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
      <Loading show={isLoading} />
      {notifications?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          data={notifications}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Icon.Entypo name="bell" size={28} color={theme.primary} />
              <View style={styles.texts}>
                <Text style={styles.h2}>{item?.title}</Text>
                <Text style={styles.p}>{item?.desc}</Text>
              </View>
            </View>
          )}
          keyExtractor={(_item, index) => index.toLocaleString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Empty text="No Notification Found" />
      )}
    </View>
  );
}
