import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemeProvider } from "./src/context/themeContext";

export default function App() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
