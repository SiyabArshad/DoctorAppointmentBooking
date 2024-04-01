import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";

import * as Location from "expo-location";
import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import Icon from "../../../../assets/icons";
import resps from "../../../../assets/typo";
import { useTheme } from "../../../../context/themeContext";
import { keyboardVerticalOffset } from "../../../../helpers/common";
import { pickImage } from "../../../../helpers/permissions";
import {
  uploadImage,
  updatedoc,
} from "../../../../helpers/firebasefunctions/firebasefuncs";
import { fetchServicesByUserId } from "../../../../store/reducers/services";
import { routes } from "../../../navigation/routes";

import serviceSchema from "../../../../utlis/schemas/service";
import CustomStatusBar from "../../../common/CustomStatusBar";
import PlainHeader from "../../../common/PlainHeader";
import Button from "../../../common/Button";
import CustomTextInput from "../../../common/TextInput";
import CustomMultiLineTextInput from "../../../common/MultiLineInput";
import Loading from "../../../common/Loading";

export default function UpdateService(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.services);
  const [image, setImage] = React.useState(null);
  const item = props?.route?.params?.item;
  const user = useSelector((state) => state?.auth);

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const coords = await getAddressCoordinates(values.address);
      let body = {
        desc: values?.desc,
        title: values?.title,
        address: values?.address,
        location: {
          latitude: coords.latitude ?? item?.location?.latitude,
          longitude: coords.longitude ?? item?.location?.longitude,
        },
      };
      if (image !== null) {
        const res = await uploadImage("services", image?.assets[0]);
        if (res?.status) {
          body.picture = res?.url;
        }
      }
      await updatedoc("services", item?.id, body);
      Toast.show("Service updated", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.success,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
      dispatch(fetchServicesByUserId(user?.user?.userid));
      props?.navigation?.navigate(routes?.tabScreen);
    } catch (e) {
      console.log("ERROR", e);
      Toast.show("Failed to update", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsLoading(false);
    }
  }

  //add image
  const handleUploadImage = async () => {
    try {
      const img = await pickImage();
      if (!img) {
        return;
      }
      setImage(img);
    } catch {
      Toast.show("Failed to access gallery", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    }
  };
  //geocoding
  const getAddressCoordinates = async (address) => {
    try {
      const location = await Location.geocodeAsync(address);
      if (!location) {
        Toast.show("Address not found", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.warning,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
        return;
      }
      const { latitude, longitude } = location[0];
      return { latitude, longitude };
    } catch (error) {
      console.error("Error geocoding address:", error);
      Toast.show("An error occurred. Please try again later.", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    }
  };

  //sideffects
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show("Permission to access location was denied", {
          duration: Toast.durations.LONG,
          backgroundColor: theme.warning,
          opacity: 0.8,
          position: Toast.positions.TOP,
        });
      }
    })();
  }, []);
  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingHorizontal: resps.wp(4),
    },
    scroll: {
      paddingBottom: resps.hp(5),
    },
    imgcomp: {
      height: 200,
      width: "100%",
      marginBottom: resps.hp(5),
    },
    days: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      paddingHorizontal: resps.wp(2),
      gap: resps.wp(3),
    },
    upload: {
      height: "100%",
      borderWidth: 1,
      borderColor: theme.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderStyle: "dashed",
    },
    serviceimg: {
      height: "100%",
      width: "100%",
      resizeMode: "cover",
    },
    err: {
      marginTop: resps.hp(0.8),
      marginLeft: resps.wp(1),
      color: theme.primary,
    },
    tag: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.primary,
      paddingHorizontal: resps.wp(4),
      paddingVertical: resps.hp(1),
    },
    tagtext: {
      color: theme.black,
    },
    activetag: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: resps.wp(4),
      paddingVertical: resps.hp(1),
      backgroundColor: theme.primary,
    },
    activetagtext: {
      color: theme.white,
    },
    time: {
      marginBottom: resps.hp(3),
      fontWeight: "bold",
      paddingHorizontal: resps.wp(3),
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
      <Loading show={isLoading || loading} />
      <PlainHeader
        onPress={() => {
          props?.navigation?.pop();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1, paddingBottom: resps.hp(2) }}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Formik
            enableReinitialize={true}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              title: item?.title,
              desc: item?.desc,
              address: item?.address,
            }}
            validationSchema={serviceSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.inps}>
                  <CustomTextInput
                    placeholder={"Enter your service title"}
                    onChange={handleChange("title")}
                    value={values.title}
                    message={touched.title && errors.title && errors.title}
                  />
                  <CustomTextInput
                    placeholder={"Enter address"}
                    onChange={handleChange("address")}
                    value={values.address}
                    message={
                      touched.address && errors.address && errors.address
                    }
                  />
                  <CustomMultiLineTextInput
                    placeholder={"Enter your service description"}
                    onChange={handleChange("desc")}
                    value={values.desc}
                    message={touched.desc && errors.desc && errors.desc}
                  />
                  <View style={styles.imgcomp}>
                    <TouchableOpacity
                      onPress={handleUploadImage}
                      style={styles.upload}
                    >
                      {image || item?.picture ? (
                        <Image
                          style={styles.serviceimg}
                          source={{
                            uri: image ? image?.assets[0]?.uri : item?.picture,
                          }}
                        />
                      ) : (
                        <Icon.AntDesign
                          name="plus"
                          size={32}
                          color={theme.primary}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.time}>
                    Weekdays are from 9 to 5 and Saturday is from 12 to 3.
                  </Text>
                </View>

                <Button text={"Update Service"} onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
