import * as ImagePicker from "expo-image-picker";

export const pickImage = () => {
  return new Promise((resolve, reject) => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        if (!result.canceled) {
          resolve(result);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
