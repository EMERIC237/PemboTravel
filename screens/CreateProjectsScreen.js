import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, updateProject } from "../store/actions/projectActions";
import ButtonImagePicker from "../components/extends/ButtonImagePicker";
const CreateProjectsScreen = ({ route, navigation }) => {
  const projectId = route.params ? route.params.projectId : null;
  const currentProject = useSelector((state) =>
    state.projects.projects.find((project) => project.projectId === projectId)
  );
  const {
    projectName: currentName,
    description: currentDescription,
    imageUrl: currentImage,
    price: currentPrice,
  } = currentProject || {};
  //component states
  const [projectName, setProjectName] = useState(currentName || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [image, setImage] = useState(currentImage || null);
  const dispatch = useDispatch();

  const saveProjectHandler = () => {
    currentProject
      ? dispatch(
          updateProject(projectId, projectName, description, price, image)
        )
      : dispatch(createProject(projectName, description, price, image));

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
      <ButtonImagePicker onImageTaken={setImage} />
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
