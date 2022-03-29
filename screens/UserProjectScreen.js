import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import ProjectsGridTile from "../components/Projects/ProjectsGridTile";

const UserProjectScreen = ({ navigation }) => {
  const userProjects = useSelector((state) => state.projects.userProjects);
  return (
    <View style={{ flex: 1 }}>
      <ProjectsGridTile dataList={userProjects} navigation={navigation} />
    </View>
  );
};

export default UserProjectScreen;

const styles = StyleSheet.create({});
