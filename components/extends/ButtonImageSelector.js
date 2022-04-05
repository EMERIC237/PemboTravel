import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";

/**
 * 
 * @param {*} props 
 * @required {function} onPictureTaken to be called when the user takes a picture
 * @returns a button that opens the camera
 */
const ButtonImageSelector = (props) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    Alert.alert(
      "No access to camera",
      "Please enable camera permissions to use this feature",
      [{ text: "OK" }]
    );
  }

  const onTakePicture = async () => {
    if (hasPermission === null) {
      return;
    }
    if (hasPermission === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      props.onPictureTaken(result.uri);
    }
  };
  return (
    <View style={styles.buttonContainer}>
      <Button title="Take a picture" onPress={onTakePicture} />
    </View>
  );
};

export default ButtonImageSelector;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
