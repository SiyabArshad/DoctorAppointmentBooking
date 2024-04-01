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

import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../../../assets/icons";
import resps from "../../../assets/typo";
import { useTheme } from "../../../context/themeContext";
import { routes } from "../../navigation/routes";
import { deletdoc } from "../../../helpers/firebasefunctions/firebasefuncs";
import { fetchServicesByUserId } from "../../../store/reducers/services";

import CustomStatusBar from "../../common/CustomStatusBar";
import Button from "../../common/Button";
import Loading from "../../common/Loading";

export default function DetailScreen(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.services);
  const [isLoad, setIsLoad] = React.useState(false);
  const user = useSelector((state) => state?.auth);
  const item = props?.route?.params?.item;
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
        onPress: async () => {
          setIsLoad(true);
          try {
            await deletdoc("services", item?.id);

            dispatch(fetchServicesByUserId(user?.user?.userid));
            props?.navigation?.navigate(routes?.tabScreen);
            Toast.show("Service deleted successfully.", {
              duration: Toast.durations.LONG,
              backgroundColor: theme.success,
              opacity: 0.8,
              position: Toast.positions.TOP,
            });
          } catch {
            Toast.show("Failed to delete service.", {
              duration: Toast.durations.LONG,
              backgroundColor: theme.warning,
              opacity: 0.8,
              position: Toast.positions.TOP,
            });
          } finally {
            setIsLoad(false);
          }
        },
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
      <Loading show={isLoad || loading} />
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
            onPress={() =>
              props?.navigation?.navigate(routes.mapScreenSingle, { item })
            }
          >
            <Icon.MaterialCommunityIcons
              size={28}
              color={theme.black}
              name="map-marker-radius"
            />
          </TouchableOpacity>
          {item?.userid === user?.user?.userid && user?.user?.isAdmin && (
            <>
              <TouchableOpacity
                onPress={() =>
                  props?.navigation?.navigate(routes.updateService, { item })
                }
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
            </>
          )}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.main}>
          <Image source={{ uri: item?.picture }} style={styles.banner} />
          <View style={styles.texts}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.location}>{item?.address}</Text>
            <Text style={styles.desc}>{item?.desc}</Text>
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
      {item?.userid !== user?.user?.userid && (
        <View style={styles.bookinhcontrol}>
          <Button text={"Book now"} onPress={() => {}} />
        </View>
      )}
    </View>
  );
}
