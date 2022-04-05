import { StyleSheet, Text, View, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";

/**
 *
 * @param {*} props
 * @required {function} onImageTaken to be called when the user chooses an image
 * @returns a button that opens the image picker
 */
const ButtonImagePicker = (props) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      props.onImageTaken(result.uri);
    }
  };
  return (
    <View style={styles.buttonContainer}>
      <Button title="upload Images" onPress={pickImage} />
    </View>
  );
};

export default ButtonImagePicker;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
