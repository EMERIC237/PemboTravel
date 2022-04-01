import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera, takePic } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

const ImageSelector = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const camera = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const snap = async () => {
    if (camera) {
      let photo = await camera.current.takePictureAsync();
      props.navigation.push("Payment", {
        imageUri: photo.uri,
        amount: props.amount,
        projectId: props.projectId,
        userId: props.userId,
        projectName: props.projectName,
      });
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Camera type={type} style={{ flex: 1 }} ref={camera}>
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: "5%",
              top: "10%",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: "#000",
                borderRadius: "50%",
                height: 25,
                width: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                ⚡️
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 20,
                borderRadius: "50%",
                height: 25,
                width: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {type === "front" ? "🤳" : "📷"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={snap}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        </View>
      </Camera>
    </View>
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
