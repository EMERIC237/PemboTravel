import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Card from "../components/UI/Card";
import React from "react";

const AdminScreen = () => {
  return (
    <View style={styles.screen}>
      <Card style={styles.titleContainer}>
        <Text style={styles.title}>Welcome here !</Text>
      </Card>
      <Text style={styles.subtitle}>What will you like to do ?</Text>
      <TouchableOpacity style={styles.task}>
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}>Add a new project ?</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={styles.task}>
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}>Add a new admin ?</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={styles.task}>
        <Text style={styles.taskText}> Validate a payment ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  titleContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#457524",
    borderRadius: 5,
  },
  taskContainer: {
    borderRadius: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  task: {
    margin: 8,
  },
  taskText: {
    fontSize: 20,
  },
});
