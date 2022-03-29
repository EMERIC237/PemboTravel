import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";

const CreateProjectsScreen = () => {
  const [projectName, setProjectName] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Project name"
        onChangeText={(text) => setProjectName(text)}
        value={projectName}
        returnKeyType="done"
      />
      <Button title="upload Images" onPress={() => {}} />
      <Button title="save" onPress={() => {}} />
    </View>
  );
};

export default CreateProjectsScreen;

const styles = StyleSheet.create({});
