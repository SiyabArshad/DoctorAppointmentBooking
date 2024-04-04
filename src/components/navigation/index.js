import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { routes } from "./routes";
//screens
import Signup from "../screens/Authentication/Signup";
import Login from "../screens/Authentication/Login";
import ForgotPassword from "../screens/Authentication/PasswordRecovery";
import DetailScreen from "../screens/Detail";
import AddService from "../screens/Services/Add";
import UpdateService from "../screens/Services/Update";
import MapViewAppointment from "../screens/Map";
import BottomTab from "./Bottomtab";

const Stack = createNativeStackNavigator();
export default function RootNavigation() {
  const user = useSelector((state) => state?.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user?.user ? routes.tabScreen : routes.signupScreen}
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
        <Stack.Screen
          name={routes.tabScreen}
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.detailScreen}
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.addService}
          component={AddService}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.updateService}
          component={UpdateService}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={routes.mapScreenSingle}
          component={MapViewAppointment}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
