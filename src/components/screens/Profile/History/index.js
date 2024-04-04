import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React from "react";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { useTheme } from "../../../../context/themeContext";
import { images } from "../../../../assets/images";
import { getAppointmentsHistoryByUserId } from "../../../../helpers/firebasefunctions/firebasefuncs";
import { validValue } from "../../../../helpers/common";

import resps from "../../../../assets/typo";
import CustomStatusBar from "../../../common/CustomStatusBar";
import PlainHeader from "../../../common/PlainHeader";
import Empty from "../../../common/Empty";
import Loading from "../../../common/Loading";

export default function History(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state?.auth);
  const [bookings, setBookings] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  //loading data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAppointmentsHistoryByUserId(
        user?.user?.userid,
        user?.user?.isAdmin
      );
      setBookings(data);
    } catch {
      Toast.show("Failed to load appointments.", {
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
      Toast.show("Failed to load appointments.", {
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
      <Loading show={isLoading} />
      <PlainHeader
        name="Appointments History"
        onPress={() => {
          props?.navigation?.pop();
        }}
      />
      {bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          data={bookings}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={
                  validValue(item?.picture)
                    ? { uri: item?.picture }
                    : images.dummyServiceImage
                }
                style={styles.serviceimg}
              />
              <View style={styles.texts}>
                <Text style={styles.h2}>{item?.title}</Text>
                <Text style={styles.h5}>{item?.address}</Text>
                {user?.user?.isAdmin && (
                  <Text style={styles.p}>{item?.name}</Text>
                )}
                <Text style={styles.p}>{`${item?.bookingdate} ${"  "} ${
                  item?.slot
                }`}</Text>
                <View style={styles.tag}>
                  <Text style={styles.price}>{item?.status}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(_item, index) => index.toLocaleString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Empty text="No History" />
      )}
    </View>
  );
}
