import { StyleSheet, Text, View, Image, Button } from "react-native";
import { PROJECTS } from "../data/dummy-data";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

const DetailProjectScreen = ({ route, navigation }) => {
  const { projectId } = route.params;
  const selectedProject = useSelector((state) =>
    state.projects.projects.find((projet) => projet.id === projectId)
  );

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: selectedProject.imageUrl }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{selectedProject.city}</Text>
        <Text style={styles.text}>Price: {selectedProject.price}</Text>
        <Text style={styles.text}>{selectedProject.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Subscribe"
          color={Colors.primary}
          onPress={() => {
            navigation.navigate("Subscribe", { projectId });
          }}
        />
      </View>
    </View>
  );
};

export default DetailProjectScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "100%",
    paddingBottom: 15,
  },
  image: {
    width: "100%",
    height: 300,
  },
  text: {
    fontSize: 20,
    margin: 20,
    fontWeight: "700",
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
