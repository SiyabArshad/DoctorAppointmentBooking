import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";

import { ThemeProvider } from "./src/context/themeContext";

import RootNavigation from "./src/components/navigation";

export default function App() {
  return (
    <RootSiblingParent>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <RootNavigation />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
