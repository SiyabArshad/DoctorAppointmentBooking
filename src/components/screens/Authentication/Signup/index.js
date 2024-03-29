import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";

import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "../../../../assets/icons";
import resps from "../../../../assets/typo";
import { useTheme } from "../../../../context/themeContext";
import { keyboardVerticalOffset } from "../../../../helpers/common";
import { SignupSchema } from "../../../../utlis/schemas/auth";
import { routes } from "../../../navigation/routes";

import CustomStatusBar from "../../../common/CustomStatusBar";
import PlainHeader from "../../../common/PlainHeader";
import Button from "../../../common/Button";
import CustomTextInput from "../../../common/TextInput";

export default function Signup(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  function handleSubmit(values) {
    console.log(values);
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
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.texts}>
                  <Text style={styles.h1}>Create Your</Text>
                  <Text style={styles.h1}>Account With us</Text>
                </View>

                <View style={styles.inps}>
                  <CustomTextInput
                    icon={
                      <Icon.AntDesign
                        name="user"
                        size={24}
                        color={theme.grey600}
                      />
                    }
                    placeholder={"Enter your name"}
                    onChange={handleChange("name")}
                    value={values.name}
                    message={touched.name && errors.name && errors.name}
                  />
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
                  <CustomTextInput
                    isPassword={true}
                    onChange={handleChange("password")}
                    value={values.password}
                    message={
                      touched.password && errors.password && errors.password
                    }
                    icon={
                      <Icon.AntDesign
                        name="lock"
                        size={24}
                        color={theme.grey600}
                      />
                    }
                    placeholder={"Enter Password"}
                  />
                </View>

                <Button text={"Signup"} onPress={handleSubmit} />
                <TouchableOpacity
                  onPress={() => {
                    props?.navigation?.navigate(routes.loginScreen);
                  }}
                  style={styles.alreadybtn}
                >
                  <Text style={styles.h5}> Already have an account ?</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
