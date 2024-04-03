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
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "../../../../context/themeContext";
import { images } from "../../../../assets/images";
import { ProfileSchema } from "../../../../utlis/schemas/auth";
import { keyboardVerticalOffset, validValue } from "../../../../helpers/common";
import { pickImage } from "../../../../helpers/permissions";
import { fetchOwnProfile } from "../../../../store/reducers/profile";
import {
  updatedoc,
  uploadImage,
} from "../../../../helpers/firebasefunctions/firebasefuncs";

import resps from "../../../../assets/typo";
import CustomStatusBar from "../../../common/CustomStatusBar";
import PlainHeader from "../../../common/PlainHeader";
import Button from "../../../common/Button";
import CustomTextInput from "../../../common/TextInput";
import CustomMultiLineTextInput from "../../../common/MultiLineInput";
import Icon from "../../../../assets/icons";
import Loading from "../../../common/Loading";

export default function UpdateProfile(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [image, setImage] = React.useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector((state) => state?.auth);
  const profile = useSelector((state) => state?.profile);

  //get img state
  const getImgState = (image, url) => {
    if (validValue(image)) {
      return { uri: image?.assets[0]?.uri };
    }
    if (validValue(url)) {
      return { uri: url };
    }
    return images.UserProfile;
  };
  //end
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
  //onSubmit
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      let body = {
        name: values?.name,
        bio: values?.bio,
      };
      if (image !== null) {
        const res = await uploadImage("profiles", image?.assets[0]);
        if (res?.status) {
          body.profilepic = res?.url;
        }
      }
      await updatedoc("users", user?.user?.userid, body);
      Toast.show("Profile updated", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.success,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
      dispatch(fetchOwnProfile(user?.user?.userid));
      props?.navigation?.pop();
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
      <Loading show={profile?.isLoading || isLoading} />
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
              source={getImgState(image, profile?.profile?.profilepic)}
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
            initialValues={{
              name: profile?.profile?.name,
              bio: profile?.profile?.bio,
            }}
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
