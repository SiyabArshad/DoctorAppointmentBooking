import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { routes } from "./routes";
//screens
import ProfileScreen from "../screens/Profile";
import History from "../screens/Profile/History/index";
import UpdateProfile from "../screens/Profile/Update/index";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={routes.profileScreen}
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={routes.profileScreen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.historyScreen}
        component={History}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.updateProfile}
        component={UpdateProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
