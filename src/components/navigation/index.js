import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { routes } from "./routes";
//screens
import Signup from "../screens/Authentication/Signup";
import Login from "../screens/Authentication/Login";
import ForgotPassword from "../screens/Authentication/PasswordRecovery";

const Stack = createNativeStackNavigator();
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routes.signupScreen}
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={routes.signupScreen}
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.loginScreen}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.forgotScreen}
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
