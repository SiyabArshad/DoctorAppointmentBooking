import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";
import { routes } from "../../navigation/routes";
import { fetchServicesByUserId } from "../../../store/reducers/services";

import CustomStatusBar from "../../common/CustomStatusBar";
import Icon from "../../../assets/icons";
import ServiceItem from "../../common/ServiceItem";
import Loading from "../../common/Loading";
import Empty from "../../common/Empty";

export default function DashBoard(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const { services, loading } = useSelector((state) => state?.services);
  const [refreshing, setRefreshing] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [showPicker, setShowPicker] = React.useState(false);
  const futureDate = new Date(); // Get today's date
  futureDate.setDate(futureDate.getDate() + 1); // Increment by one day
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const onDatepickerOpen = () => {
    setShowPicker(true);
  };
  //onRefresh
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchServicesByUserId(user?.user?.userid))
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };
  //sideffects
  React.useEffect(() => {
    dispatch(fetchServicesByUserId(user?.user?.userid))
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);
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
      gap: resps.wp(2),
    },
    selecteddate: {
      paddingLeft: resps.wp(2),
      color: theme.black,
      fontWeight: "600",
    },
  });
  return (
    <View style={styles.container}>
      <Loading show={loading} />
      {Platform.OS === "android" && (
        <CustomStatusBar
          removeExtraHeight={true}
          backgroundColor={"transparent"}
          translucent={true}
        />
      )}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          minimumDate={futureDate} // Set the minimum date to tomorrow
          onChange={onDateChange}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.head}>Your Services</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate(routes.addService)}
          >
            <Icon.AntDesign name="pluscircle" size={28} color={theme.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDatepickerOpen}>
            <Icon.Fontisto name="date" size={28} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.selecteddate}>{`Selected date ${new Date(
        date
      ).toLocaleDateString()}`}</Text>
      {services?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          data={services}
          renderItem={({ item, index }) => (
            <ServiceItem
              onPress={() =>
                props?.navigation?.navigate(routes.detailScreen, {
                  item,
                  date,
                })
              }
              item={item}
              index={index}
            />
          )}
          keyExtractor={(_item, index) => index.toLocaleString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Empty text="No Service Found" />
      )}
    </View>
  );
}
