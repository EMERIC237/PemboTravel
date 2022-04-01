import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";
import React from "react";

const ProfileScreen = ({ navigation }) => {
  const dispacth = useDispatch();
  const onLogoutHandler = () => {
    dispacth(logout());
    console.log("logout");
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    });
  };
  return (
    <View>
      <Text>Your profile</Text>
      <View>
        <Text>Your picture:</Text>
        <Text>Your name:</Text>
        <Text>Your surname:</Text>
        <Text>Your phone number:</Text>
        <Text>Your email:</Text>
        <Button title="See your payments Here" onPress={() => {}} />
      </View>
      <Button onPress={onLogoutHandler} title="Logout" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
