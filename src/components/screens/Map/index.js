import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "../../../context/themeContext";

import Icon from "../../../assets/icons";

export default function MapViewAppointment(props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825, // Default latitude (adjust as needed)
    longitude: -122.4324, // Default longitude (adjust as needed)
    latitudeDelta: 0.2922, // Adjust for desired zoom level
    longitudeDelta: 0.0421, // Adjust for desired zoom level
  });

  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
    back: {
      position: "absolute",
      top: insets.top,
      left: insets.left + 10,
      zIndex: 999,
    },
    callout: {
      height: 100,
      width: 200,
      backgroundColor: theme.white,
    },
    title: {
      marginBottom: 5,
      color: theme.black,
      fontWeight: "700",
    },
    address: {
      color: theme.black,
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props?.navigation?.pop()}
        style={styles.back}
      >
        <Icon.Ionicons name="arrow-back-sharp" size={32} color={theme.black} />
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.title}>Enty Services</Text>
              <Text style={styles.address}>Address random address here</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}
