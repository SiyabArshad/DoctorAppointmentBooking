import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "../../../../context/themeContext";
import { images } from "../../../../assets/images";
import { ProfileSchema } from "../../../../utlis/schemas/auth";
import { keyboardVerticalOffset } from "../../../../helpers/common";
import { pickImage } from "../../../../helpers/permissions";

import resps from "../../../../assets/typo";
import CustomStatusBar from "../../../common/CustomStatusBar";
import PlainHeader from "../../../common/PlainHeader";
import Button from "../../../common/Button";
import CustomTextInput from "../../../common/TextInput";
import CustomMultiLineTextInput from "../../../common/MultiLineInput";
import Icon from "../../../../assets/icons";

export default function UpdateProfile(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [image, setImage] = React.useState(null);
  const handleUploadImage = async () => {
    try {
      const img = await pickImage();
      if (!img) {
        return;
      }
      setImage(img);
      Toast.show("Profile chnaged", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.primary,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } catch {
      Toast.show("Failed to access gallery", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    }
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
    profilesection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: resps.hp(2),
      marginTop: resps.hp(4),
    },
    dp: {
      height: resps.hp(9),
      width: resps.hp(9),
      borderRadius: resps.hp(4.5),
      resizeMode: "cover",
    },
    dpparent: {
      borderRadius: resps.hp(5),
      padding: resps.hp(0.5),
      backgroundColor: theme.grey300,
    },
    plus: {
      position: "absolute",
      right: 1,
      backgroundColor: theme.primary,
      borderRadius: 50,
      zIndex: 999,
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
      <PlainHeader
        name="Update Profile"
        onPress={() => {
          props?.navigation?.pop();
        }}
      />
      <View style={styles.profilesection}>
        <TouchableOpacity onPress={handleUploadImage}>
          <View style={styles.dpparent}>
            <Icon.AntDesign
              style={styles.plus}
              name="plus"
              size={24}
              color={theme.white}
            />
            <Image
              style={styles.dp}
              source={
                image ? { uri: image?.assets[0]?.uri } : images.UserProfile
              }
            />
          </View>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Formik
            enableReinitialize={true}
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{ name: "", bio: "" }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.inps}>
                  <CustomTextInput
                    placeholder={"Enter your name"}
                    onChange={handleChange("name")}
                    value={values.name}
                    message={touched.name && errors.name && errors.name}
                  />
                  <CustomMultiLineTextInput
                    onChange={handleChange("bio")}
                    value={values.bio}
                    message={touched.bio && errors.bio && errors.bio}
                    placeholder={"Enter Bio"}
                  />
                </View>

                <Button text={"Update"} onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
