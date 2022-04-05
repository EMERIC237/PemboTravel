import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import ProjectsGridTile from "../components/Projects/ProjectsGridTile";

const UserProjectScreen = ({ navigation }) => {
  const userProjects = useSelector((state) => state.projects.userProjects);
  if (!userProjects.length) {
    return (
      <View style={styles.screen}>
        <Text style={{ fontSize: 18 }}>
          You don't have any project yet, please subscribe to one of our project
          by tapping on the project picture to see it here!
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ProjectsGridTile dataList={userProjects} navigation={navigation} />
    </View>
  );
};

export default UserProjectScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
