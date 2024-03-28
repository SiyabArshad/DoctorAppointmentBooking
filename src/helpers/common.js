import { Platform } from "react-native";
import resps from "../assets/typo";
export const keyboardVerticalOffset = Platform.OS === "ios" ? resps.hp(6) : 0;
