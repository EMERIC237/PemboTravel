import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import ButtonImageSelector from "../components/extends/ButtonImageSelector";
import ButtonImagePicker from "../components/extends/ButtonImagePicker";
import Colors from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../store/actions/paymentActions";
import PickerModal from "../components/UI/PickerModal";

const PaymentScreen = ({ route, navigation }) => {
  //get the amount value sent previously when calling the imageSelector and set it as a default state
  const { projectId, projectName } = route.params;
  //get the current user

  // TODO : Find a way to handle data commuication between screens more easily
  const userId = useSelector((state) => state.auth.userCredentials.userId);
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedProject, setSelectedProject] = useState();
  const userProjects = useSelector((state) => state.projects.userProjects);
  const amountRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  const titleChangeHandler = (text) => {
    setAmount(text);
  };

  const savePaymentHandler = () => {
    if (!amount || !imageUri || !userId) {
      Alert.alert("Error", "Please fill all the fields", [{ text: "Okay" }]);
      return;
    }
    dispatch(addPayment(userId, projectId, projectName, imageUri, amount));
    navigation.navigate("DetailContribution");
  };

  let HeadPage;

  if (projectId) {
    HeadPage = (
      <View style={styles.head}>
        <Text style={styles.headText}>
          You are making a payment for the project{" "}
        </Text>
        <Text style={styles.city}>{projectName}</Text>
      </View>
    );
  } else if (!userProjects.length) {
    HeadPage = (
      <View style={styles.head}>
        <Text style={styles.headText}>
          You don't have any curent project now. Please subscribe to one of our
          beatiful projects{" "}
          <Text
            onPress={() => {
              navigation.navigate("ProjectsTab");
            }}
            style={styles.link}
          >
            here{" "}
          </Text>
        </Text>
      </View>
    );
  } else {
    HeadPage = (
      <View style={styles.head}>
        <Text style={styles.headText}>
          Please select the project you want to make a payment for{" "}
        </Text>
        <Text
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.choiceTextStyle}
        >
          {selectedProject
            ? userProjects.find(
                (project) => project.projectId === selectedProject
              ).projectName
            : "Select a project"}
        </Text>
        <PickerModal
          isOpen={modalVisible}
          onCancel={() => {
            setSelectedProject(undefined);
            setModalVisible(!modalVisible);
          }}
          onDone={() => {
            setModalVisible(!modalVisible);
          }}
          selectedValue={selectedProject}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedProject(itemValue)
          }
          itemsList={userProjects}
          itemLabel="city"
          itemValue="projectId"
          itemKeyValue="projectId"
        />
      </View>
    );
  }
  return (
    <ScrollView style={{ flex: 1, marginVertical: 5 }}>
      {HeadPage}
      <View style={styles.form}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          placeholder="enter amount here"
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={amount}
        />
        {image && (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.image}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <ButtonImageSelector onPictureTaken={setImage} />
          <Text>Or</Text>
          <ButtonImagePicker onPictureTaken={setImage} />
          <Button
            disabled={userId === null}
            title="Save payment"
            color={Colors.primary}
            onPress={savePaymentHandler}
            style={styles.saveButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    width: 350,
    height: 200,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  link: {
    color: "#19b2e0",
    fontWeight: "bold",
    marginStart: 5,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  takePictureButton: {
    marginBottom: 10,
  },
  saveButton: {
    fontSize: 80,
    fontWeight: "500",
  },
  head: {
    margin: 5,
  },
  headText: {
    fontSize: 20,
  },
  city: {
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textShadowColor: "#1fedbd",
    margin: 20,
  },
  doneView: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 300,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  choiceTextStyle: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
    textDecorationStyle: "solid",
    textDecorationColor: "green",
    textDecorationLine: "underline",
  },
});
