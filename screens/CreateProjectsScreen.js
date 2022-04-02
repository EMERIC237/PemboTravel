import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../store/actions/projectActions";
import * as ImagePicker from "expo-image-picker";
const CreateProjectsScreen = ({ navigation }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveProjectHandler = () => {
    dispatch(createProject(projectName, description, price, image));
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        placeholder="Project name"
        onChangeText={(text) => setProjectName(text)}
        value={projectName}
        returnKeyType="next"
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
        returnKeyType="next"
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        onChangeText={(text) => setPrice(text)}
        value={price}
        returnKeyType="done"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="upload Images" onPress={pickImage} />
      </View>
      <View style={styles.imageContainer}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="save" onPress={saveProjectHandler} />
      </View>
    </View>
  );
};

export default CreateProjectsScreen;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
const screenOptions = (navData) => {
  return {
    headerTitle: "Create a new Project",
    headerL
  };
}