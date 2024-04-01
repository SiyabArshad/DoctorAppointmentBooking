import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import resps from "../../../assets/typo";
import Icon from "../../../assets/icons";
import { routes } from "../routes";
import { useTheme } from "../../../context/themeContext";

//screens
import Bookings from "../../screens/Bookings/index";
import Services from "../../screens/Services/index";
import DashBoard from "../../screens/DashBoard";
import Notifications from "../../screens/Notification";
import ProfileNavigator from "../ProfileNavigator";

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const isAdmin = true;
  const user = useSelector((state) => state?.auth);

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
          tabBarLabel: `${user?.user?.isAdmin ? "DashBoard" : "Services"}`,
          tabBarLabelStyle: {
            marginBottom: resps.hp(0.8),
          },
          tabBarIcon: ({ color }) => (
            <Icon.Feather name="home" color={color} size={28} />
          ),
        }}
        name={routes.servicesScreen}
        component={user?.user?.isAdmin ? DashBoard : Services}
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
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            marginBottom: resps.hp(0.8),
          },
          tabBarIcon: ({ color }) => (
            <Icon.AntDesign name="user" color={color} size={28} />
          ),
        }}
        name={routes.profileNavigator}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
}
