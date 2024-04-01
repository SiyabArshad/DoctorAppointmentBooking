import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Authslice from "./reducers/auth";
import ServiceSlice from "./reducers/services";

const persistConfig = {
  key: "appointmentsBook",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, Authslice);

const rootReducer = combineReducers({
  auth: persistedReducer,
  services: ServiceSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
