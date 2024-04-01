import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";

import Toast from "react-native-root-toast";
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

import Icon from "../../../../assets/icons";
import resps from "../../../../assets/typo";
import { useTheme } from "../../../../context/themeContext";
import { keyboardVerticalOffset } from "../../../../helpers/common";
import { ForgotPassSchema } from "../../../../utlis/schemas/auth";
import { app } from "../../../../utlis/firebase";

import CustomStatusBar from "../../../common/CustomStatusBar";
import PlainHeader from "../../../common/PlainHeader";
import Button from "../../../common/Button";
import CustomTextInput from "../../../common/TextInput";
import Loading from "../../../common/Loading";

export default function ForgotPassword(props) {
  const auth = getAuth(app);
  const [isload, setIsload] = React.useState(false);
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  async function handleSubmit(values) {
    setIsload(true);
    try {
      await sendPasswordResetEmail(auth, values?.email);
      Toast.show("Password recovery email sent sucessfully", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.success,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } catch (e) {
      console.log("pass recovery err", e);
      Toast.show("Failed to send password recovery link", {
        duration: Toast.durations.LONG,
        backgroundColor: theme.warning,
        opacity: 0.8,
        position: Toast.positions.TOP,
      });
    } finally {
      setIsload(false);
    }
  }
  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingHorizontal: resps.wp(4),
    },
    texts: {
      marginVertical: resps.hp(6),
    },
    h1: {
      color: theme.black,
      fontSize: resps.hp(4),
      fontWeight: "bold",
    },
    alreadybtn: {
      marginTop: resps.hp(2),
      alignSelf: "center",
      textDecorationLine: "underline",
    },
    h5: {
      color: theme.black,
      fontWeight: "500",
    },
    inps: {
      marginBottom: resps.hp(5),
    },
    scroll: {
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
      <Loading show={isload} />
      <PlainHeader
        onPress={() => {
          props?.navigation?.pop();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{ email: "" }}
            validationSchema={ForgotPassSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.texts}>
                  <Text style={styles.h1}>Forgot Password?</Text>
                  <Text style={styles.h1}>Don't Worry</Text>
                </View>

                <View style={styles.inps}>
                  <CustomTextInput
                    icon={
                      <Icon.AntDesign
                        name="mail"
                        size={24}
                        color={theme.grey600}
                      />
                    }
                    placeholder={"Enter your email"}
                    onChange={handleChange("email")}
                    value={values.email}
                    message={touched.email && errors.email && errors.email}
                  />
                </View>

                <Button text={"Send Recovery Mail"} onPress={handleSubmit} />
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
