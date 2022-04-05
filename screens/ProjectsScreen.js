import {
  StyleSheet,
  View
} from "react-native";
import { useSelector } from "react-redux";
import ProjectsGridTile from "../components/Projects/ProjectsGridTile";

import React from "react";

const ProjectsScreen = ({ navigation }) => {
  const allProjects = useSelector((state) => state.projects.projects);

  return (
    <View style={{ flex: 1 }}>
      <ProjectsGridTile dataList={allProjects} navigation={navigation} />
    </View>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({});
