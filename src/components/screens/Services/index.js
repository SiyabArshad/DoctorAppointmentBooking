import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";

import CustomStatusBar from "../../common/CustomStatusBar";
import Icon from "../../../assets/icons";
import ServiceItem from "../../common/ServiceItem";

export default function Services() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
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
        <Text style={styles.head}>Services</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onDatepickerOpen}>
            <Icon.Fontisto name="date" size={28} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item, index }) => (
          <ServiceItem item={item} index={index} />
        )}
        keyExtractor={(_item, index) => index.toLocaleString()}
      />
    </View>
  );
}
