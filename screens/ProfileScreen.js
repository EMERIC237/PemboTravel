import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import Card from "../components/UI/Card";
import React, { useEffect, useState } from "react";

//* The information here are coming from the phone's database
//* so only the user of the phone can acces his informations here
const ProfileScreen = ({ navigation }) => {
  //Get the user ID from the redux store
  const userId = useSelector((state) => state.auth.userCredentials.userId);
  const dispacth = useDispatch();
  //get the user userInfos from the redux store
  const userInfos = useSelector((state) => state.user);
  const onLogoutHandler = () => {
    // if the user is not logged in, he will be redirected to the login screen
    if (!userId) {
      navigation.navigate("Auth");
      return;
    }
    dispacth(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "ProjectsTab" }],
    });
  };
  const onPressUpdateHandler = () => {
    if (!userId) {
      Alert.alert(
        "No account available",
        "You need to be logged in to update your profile",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate("Subscribe", { infos: userInfos });
  };
  const onPressPaymentHandler = () => {
    if (!userId) {
      Alert.alert(
        "No account available",
        "You need to be logged in to see your payments",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate("PaymentTab", {
      screen: "DetailContribution",
    });
  };
  console.log({ userInfos });
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.screenView}>
        {userInfos.email ? (
          <View style={styles.infoContainer}>
            <View style={{ ...styles.infoView, ...styles.picture }}>
              <Text style={styles.infoText}>
                Your picture:
                <Text>{userInfos.picture ? null : "Not picture yet"}</Text>
              </Text>

              <View style={styles.imageContainer}>
                {userInfos.picture ? (
                  <Image
                    source={{
                      uri: userInfos.picture,
                    }}
                    resizeMethod="resize"
                    resizeMode="center"
                    style={styles.image}
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                First name: {userInfos.firstName || "No first name yet"}
              </Text>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                Last name: {userInfos.lastName || "No last name yet"}
              </Text>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                phone number: {userInfos.phone || "No Phone number yet"}
              </Text>
            </View>
            <View style={styles.infoView}>
              <Text style={styles.infoText}>
                Email: {userInfos.email || "No email yet"}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>
              You need to have an account to access your informations here!
            </Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPressPaymentHandler}>
            <Card style={styles.button}>
              <Text style={styles.buttonText}>See your payments Here</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressUpdateHandler}>
            <Card style={styles.button}>
              <Text style={styles.buttonText}>Change my informations</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogoutHandler}>
            <Card style={styles.button}>
              <Text style={styles.buttonText}>
                {userId ? "Logout" : "Login or Sign up here "}
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenView: {
    marginHorizontal: 5,
  },
  infoContainer: {
    backgroundColor: "white",
    width: "100%",
  },
  infoView: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    backgroundColor: "#e1dfe6",
    shadowColor: "#afedce",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  infoText: {
    fontSize: 18,
    marginTop: 15,
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#e1dfe6",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#348ceb",
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 100,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
