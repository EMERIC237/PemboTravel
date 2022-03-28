import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const ImageSelector = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // const camera = useRef(camera);
  return (
    <Camera
      style={styles.camera}
      // ref={(r) => {
      //   camera = r;
      // }}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.captureButton}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  captureButton: {
    height: 80,
    width: 80,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    width: "100%",
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
