import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import PickerModal from "../components/UI/PickerModal";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeAdmin } from "../store/actions/userActions";
import { deleteProject } from "../store/actions/projectActions";
import { getAllPayments } from "../store/actions/paymentActions";


const AdminScreen = ({ navigation }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [onDelete, setOnDelete] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userCredentials);
  const projects = useSelector((state) => state.projects.projects);
  if (!user.isAdmin) {
    Alert.alert(
      "Permission denied",
      "You need to be an admin to access this page",
      [{ text: "OK", onPress: () => navigation.navigate("PemboStack") }]
    );
  }
  const validatePaymenHandler = async () => {
    try {
      await dispatch(getAllPayments());
      navigation.navigate("Validate");
    } catch (err) {
      console.log(err);
    }
  };
  const makeAdminHandler = async () => {
    try {
      await dispatch(makeAdmin(adminEmail));
      setModalVisible(false);
    } catch (error) {
      Alert.alert("An error occured", error.message, [{ text: "Okay" }]);
    }
  };
  const addProjectHandler = () => {
    navigation.navigate("AddProject");
  };
  const updateProjectHandler = () => {
    if (onDelete) {
      dispatch(deleteProject(selectedProject));
      setPickerVisible(!pickerVisible);
      return;
    }
    setPickerVisible(!pickerVisible);
    selectedProject &&
      navigation.navigate("AddProject", { projectId: selectedProject });
  };
  const onClickDeleteOption = () => {
    setPickerVisible(!pickerVisible);
    setOnDelete(!onDelete);
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.titleContainer}>
        <Text style={styles.title}>Welcome here !</Text>
      </Card>
      <Text style={styles.subtitle}>What will you like to do ?</Text>
      <TouchableOpacity style={styles.task} onPress={addProjectHandler}>
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}>Add a new project ?</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.task}
        onPress={() => {
          setPickerVisible(!pickerVisible);
        }}
      >
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}>Update a project ?</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={styles.task} onPress={onClickDeleteOption}>
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}>Delete project ?</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.task}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}>Add a new admin ?</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={styles.task} onPress={validatePaymenHandler}>
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}> Validate a payment ?</Text>
        </Card>
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <View style={styles.modalContent}>
          <Text>Enter the email of the admin you want to add:</Text>
          <TextInput
            onChangeText={(text) => {
              setAdminEmail(text);
            }}
            style={styles.input}
            value={adminEmail}
          />
          <Button
            title="Save"
            color={Colors.primary}
            onPress={makeAdminHandler}
          />
          <Button
            title="Cancel"
            color="red"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
      <PickerModal
        isOpen={pickerVisible}
        onCancel={() => {
          setPickerVisible(!pickerVisible);
        }}
        onDone={updateProjectHandler}
        selectedValue={selectedProject}
        onValueChange={(value, index) => setSelectedProject(value)}
        itemsList={projects}
        itemLabel="projectName"
        itemValue="projectId"
        itemKeyValue="projectId"
      />
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
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 20,
  },
});
