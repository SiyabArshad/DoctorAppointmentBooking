import { Platform } from "react-native";
import resps from "../assets/typo";
export const keyboardVerticalOffset = Platform.OS === "ios" ? resps.hp(6) : 0;

export const bookingStatus = {
  pending: "Pending",
  confirmed: "Confirmed",
  declined: "Declined",
  cancelled: "Cancelled",
};

export const validValue = (value) => {
  return value !== undefined && value !== null && value !== "";
};
