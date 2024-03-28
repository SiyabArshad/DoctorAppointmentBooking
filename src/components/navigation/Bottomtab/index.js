import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import resps from "../../../assets/typo";
import Icon from "../../../assets/icons";
import { routes } from "../routes";
import { useTheme } from "../../../context/themeContext";

//screens
import Bookings from "../../screens/Bookings/index";
import Services from "../../screens/Services/index";
import Notifications from "../../screens/Notification";

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={routes.homeScreen}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.grey600,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.white,
          height: resps.hp(8) + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Services",
          tabBarLabelStyle: {
            marginBottom: resps.hp(0.8),
          },
          tabBarIcon: ({ color }) => (
            <Icon.Feather name="home" color={color} size={28} />
          ),
        }}
        name={routes.servicesScreen}
        component={Services}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Bookings",
          tabBarLabelStyle: {
            marginBottom: resps.hp(0.8),
          },
          tabBarIcon: ({ color }) => (
            <Icon.AntDesign name="book" color={color} size={28} />
          ),
        }}
        name={routes.bookingScreen}
        component={Bookings}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Notifications",
          tabBarLabelStyle: {
            marginBottom: resps.hp(0.8),
          },
          tabBarIcon: ({ color }) => (
            <Icon.MaterialCommunityIcons name="bell" color={color} size={28} />
          ),
        }}
        name={routes.notificationScreen}
        component={Notifications}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Settings",
          tabBarLabelStyle: {
            marginBottom: resps.hp(0.8),
          },
          tabBarIcon: ({ color }) => (
            <Icon.AntDesign name="setting" color={color} size={28} />
          ),
        }}
        name={routes.settingScreen}
        component={Bookings}
      />
    </Tab.Navigator>
  );
}
