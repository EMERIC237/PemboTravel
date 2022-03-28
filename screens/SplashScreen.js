import { StyleSheet, Text, View, Image } from "react-native";
import { auth } from "../firebase";
import Colors from "../constants/Colors";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    NavigatetoAuth();
  }, [navigation]);

  function NavigatetoAuth() {
    setTimeout(() => {
      onAuthStateChanged(auth, (user) => {
        console.log({ user });
        if (user) {
          console.log("login case");
          navigation.reset({
            index: 0,
            routes: [{ name: "Projects" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
        }
      });
    }, 1000);
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://scontent-ort2-1.xx.fbcdn.net/v/t39.30808-6/271654302_468874447916846_4315726368909044011_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=7iT-dCniRvIAX8b_7EY&_nc_ht=scontent-ort2-1.xx&oh=00_AT_GywwNfxcDgBhUkabE4CULc1_PL8-e25wy2oDKElY_Sg&oe=623E89E2",
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  imageContainer: {
    width: 300,
    borderRadius: 30,
  },
});
