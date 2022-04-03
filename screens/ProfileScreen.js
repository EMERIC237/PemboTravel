import { StyleSheet, Text, View, Button, Image } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/authActions";
import React, { useEffect, useState } from "react";
import { fetchInfos } from "../utils/database";

const ProfileScreen = ({ navigation }) => {
  const [infos, setInfos] = useState();
  const dispacth = useDispatch();

  //fetch user infos from the database
  useEffect(() => {
    async function loadInfos() {
      const fetchedInfos = await fetchInfos();
      setInfos(fetchedInfos);
    }
    loadInfos();
  }, []);

  const onLogoutHandler = () => {
    dispacth(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "ProjectsTab" }],
    });
  };

  if (!infos) {
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
            Your picture:{" "}
            <Text>{infos.picture ? null : "Not picture yet"}</Text>
          </Text>

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: infos.picture,
              }}
              resizeMethod="resize"
              resizeMode="center"
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>First name: {infos.firstName}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Last name: {infos.lastName}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Your phone number: {infos.phone}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Your email: {infos.email}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="See your payments Here"
          onPress={() => {
            navigation.navigate("PaymentTab", {
              screen: "DetailContribution",
            });
          }}
          style={styles.button}
        />
        <Button
          title="Change my informations"
          onPress={() => {
            navigation.navigate("Subscribe", { infos });
          }}
          style={styles.button}
        />
        <Button
          onPress={onLogoutHandler}
          title="Logout"
          style={styles.button}
        />
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 5,
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
  }
});
