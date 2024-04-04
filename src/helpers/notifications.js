import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function sendPushNotification(expoPushToken, title, body, desc) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: desc },
  };
  console.log("Message", expoPushToken);
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
//schedule notifications
export async function scheduleNotificationAsync(
  title,
  body,
  seconds,
  recipientToken
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      seconds: seconds,
    },
    channelId: "default",
    data: {},
    to: recipientToken,
  });
}

//end
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert("Failed to get push token for push notification!");
      return null;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: "d3e8a8a6-6d62-4b67-8268-74c0f0728592",
    });
  } else {
    // alert("Must use physical device for Push Notifications");
    return null;
  }

  return token.data;
}
