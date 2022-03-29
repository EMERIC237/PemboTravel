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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeAdmin } from "../store/actions/userActions";

const AdminScreen = ({ navigation }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const makeAdminHandler = async () => {
    try {
      await dispatch(makeAdmin(adminEmail));
      setModalVisible(false);
    } catch (error) {
      Alert.alert("An error occured", error.message, [{ text: "Okay" }]);
    }
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.titleContainer}>
        <Text style={styles.title}>Welcome here !</Text>
      </Card>
      <Text style={styles.subtitle}>What will you like to do ?</Text>
      <TouchableOpacity
        style={styles.task}
        onPress={() => {
          navigation.navigate("AddProject");
        }}
      >
        <Card style={styles.taskContainer}>
          <Text style={styles.taskText}>Add a new project ?</Text>
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
      <TouchableOpacity style={styles.task}>
        <Text style={styles.taskText}> Validate a payment ?</Text>
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
        </View>
      </Modal>
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
});
