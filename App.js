import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import RootNavigation from "./src/components/navigation";
import { ThemeProvider } from "./src/context/themeContext";
import { store, persistor } from "./src/store/store";

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <RootNavigation />
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
