import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
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
    dispacth(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "ProjectsTab" }],
    });
  };

  if (!userInfos) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
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
          <Text style={styles.infoText}>First name: {userInfos.firstName}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Last name: {userInfos.lastName}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>
            Your phone number: {userInfos.phone}
          </Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Your email: {userInfos.email}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          disabled={userId === null}
          onPress={() => {
            navigation.navigate("PaymentTab", {
              screen: "DetailContribution",
            });
          }}
        >
          <Card style={styles.button}>
            <Text style={styles.buttonText}>See your payments Here</Text>
          </Card>
        </Pressable>
        <Pressable
          disabled={userId === null}
          onPress={() => {
            navigation.navigate("Subscribe", { infos: userInfos });
          }}
        >
          <Card style={styles.button}>
            <Text style={styles.buttonText}>Change my informations</Text>
          </Card>
        </Pressable>
        <Pressable disabled={userId === null} onPress={onLogoutHandler}>
          <Card style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </Card>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#348ceb",
    padding: 10,
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
