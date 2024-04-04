import {
  View,
  StyleSheet,
  Platform,
  FlatList,
  RefreshControl,
} from "react-native";
import React from "react";

import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";
import { fetchBookings } from "../../../store/reducers/bookings";
import {
  updatedoc,
  addnewdocumenttofiretore,
  getsingledoc,
} from "../../../helpers/firebasefunctions/firebasefuncs";
import { bookingStatus, validValue } from "../../../helpers/common";
import {
  sendPushNotification,
  scheduleNotificationAsync,
} from "../../../helpers/notifications";
import { getSecondsUntil } from "../../../helpers/dates";

import CustomStatusBar from "../../common/CustomStatusBar";
import BookingItem from "../../common/BookingItem";
import Empty from "../../common/Empty";
import Loading from "../../common/Loading";

export default function Bookings(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const bookings = useSelector((state) => state?.bookings);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  //onConfirmed
  const onConfirmBooking = async (item) => {
    setIsLoading(true);
    try {
      const currentStatus = await getsingledoc("bookings", item?.id);
      if (currentStatus?.data()?.status === bookingStatus.pending) {
        let notificationBody = {
          to: item?.from, //to whom notification will be delivered
          from: user?.user?.userid, //who send this
          title: "Booking Request",
          desc: `${user?.user?.name} has ${bookingStatus.confirmed} appointment on ${item?.bookingdate} between ${item?.slot}`,
          isread: false,
        };
        await updatedoc("bookings", item?.id, {
          status: bookingStatus.confirmed,
        });
        await addnewdocumenttofiretore("notifications", notificationBody, null);
        Toast.show("Booking status updated successfully.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.success,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
        const currentUser = await getsingledoc("users", item?.from);
        if (validValue(currentUser?.data()?.devicetoken)) {
          await sendPushNotification(
            currentUser?.data()?.devicetoken,
            "Booking Request",
            `${user?.user?.name} has ${bookingStatus.confirmed} appointment on ${item?.bookingdate} between ${item?.slot}`,
            `${user?.user?.name} has ${bookingStatus.confirmed} appointment on ${item?.bookingdate} between ${item?.slot}`
          );
          const inputDateTime = `${item?.bookingdate} ${hr(
            item?.slot?.split(":")[0]
          )}`;
          const secs = getSecondsUntil(inputDateTime);
          await scheduleNotificationAsync(
            "Appointment Reminder",
            `You have an appointment with ${user?.user?.name} in next 1 hour`,
            secs,
            currentUser?.data()?.devicetoken
          );
        }
        dispatch(
          fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
        );
      } else {
        Toast.show("This Booking Status already changed.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.warning,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
        dispatch(
          fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
        );
      }
    } catch (e) {
      Toast.show("Failed to Confirm bookings.", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsLoading(false);
    }
  };
  //helper
  const hr = (inp) => {
    switch (inp) {
      case 9:
        return `${inp}am`;
      case 10:
        return `${inp}am`;
      case 11:
        return `${inp}am`;
      case 12:
        return `${inp}pm`;
      case 1:
        return `${inp}pm`;
      case 2:
        return `${inp}pm`;
      case 3:
        return `${inp}pm`;
      case 4:
        return `${inp}pm`;
      case 5:
        return `${inp}pm`;
      default:
        return `${inp}pm`;
    }
  };
  //onDeclined
  const onDeclinedBooking = async (item) => {
    setIsLoading(true);
    try {
      const currentStatus = await getsingledoc("bookings", item?.id);
      if (currentStatus?.data()?.status === bookingStatus.pending) {
        let notificationBody = {
          to: item?.from, //to whom notification will be delivered
          from: user?.user?.userid, //who send this
          title: "Booking Request",
          desc: `${user?.user?.name} has ${bookingStatus.declined} appointment on ${item?.bookingdate} between ${item?.slot}`,
          isread: false,
        };
        await updatedoc("bookings", item?.id, {
          status: bookingStatus.declined,
        });
        await addnewdocumenttofiretore("notifications", notificationBody, null);
        Toast.show("Booking status updated successfully.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.success,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
        const currentUser = await getsingledoc("users", item?.from);
        if (validValue(currentUser?.data()?.devicetoken)) {
          await sendPushNotification(
            currentUser?.data()?.devicetoken,
            "Booking Request",
            `${user?.user?.name} has ${bookingStatus.declined} appointment on ${item?.bookingdate} between ${item?.slot}`,
            `${user?.user?.name} has ${bookingStatus.declined} appointment on ${item?.bookingdate} between ${item?.slot}`
          );
        }
        dispatch(
          fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
        );
      } else {
        Toast.show("This Booking Status already changed.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.warning,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
        dispatch(
          fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
        );
      }
    } catch {
      Toast.show("Failed to Declined bookings.", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsLoading(false);
    }
  };
  //onCancelled
  const onCancelBooking = async (item) => {
    setIsLoading(true);
    try {
      const currentStatus = await getsingledoc("bookings", item?.id);
      if (currentStatus?.data()?.status === bookingStatus.pending) {
        let notificationBody = {
          to: item?.to, //to whom notification will be delivered
          from: user?.user?.userid, //who send this
          title: "Booking Request",
          desc: `${user?.user?.name} has ${bookingStatus.cancelled} appointment on ${item?.bookingdate} between ${item?.slot}`,
          isread: false,
        };
        await updatedoc("bookings", item?.id, {
          status: bookingStatus.cancelled,
        });
        await addnewdocumenttofiretore("notifications", notificationBody, null);

        const currentUser = await getsingledoc("users", item?.to);
        if (validValue(currentUser?.data()?.devicetoken)) {
          await sendPushNotification(
            currentUser?.data()?.devicetoken,
            "Booking Request",
            `${user?.user?.name} has ${bookingStatus.cancelled} appointment on ${item?.bookingdate} between ${item?.slot}`,
            `${user?.user?.name} has ${bookingStatus.cancelled} appointment on ${item?.bookingdate} between ${item?.slot}`
          );
        }
        Toast.show("Booking status updated successfully.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.success,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
        dispatch(
          fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
        );
      } else {
        Toast.show("This Booking Status already changed.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.warning,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
        dispatch(
          fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
        );
      }
    } catch (e) {
      console.log("err", e);
      Toast.show("Failed to Cancel bookings.", {
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
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
    )
      .then(() => setRefreshing(false))
      .catch(() => {
        setRefreshing(false);
        Toast.show("Failed to load bookings.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.warning,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
      });
  };
  //sideffects
  React.useEffect(() => {
    dispatch(
      fetchBookings({ id: user?.user?.userid, admin: user?.user?.isAdmin })
    )
      .then(() => setRefreshing(false))
      .catch(() => {
        setRefreshing(false);
        Toast.show("Failed to load bookings.", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.warning,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
      });
  }, []);
  //end
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
      <Loading show={bookings?.loading || isLoading} />
      {bookings?.bookings?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          data={bookings?.bookings}
          renderItem={({ item, index }) => (
            <BookingItem
              index={index}
              item={item}
              onCancelledFunc={onCancelBooking}
              onConfirmFunc={onConfirmBooking}
              onDeclineFunc={onDeclinedBooking}
            />
          )}
          keyExtractor={(_item, index) => index.toLocaleString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Empty text="No Booking Found" />
      )}
    </View>
  );
}
