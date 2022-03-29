import ImageSelector from "../components/ImageSelector";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Image,
} from "react-native";
import React, { useCallback, useState, useRef, useEffect } from "react";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { addPayment } from "../store/actions/paymentActions";

const PaymentScreen = ({ route, navigation }) => {
  //get the amount value sent previously when calling the imageSelector and set it as a default state
  const { amount: prevAmount, imageUri } = route.params;
  const [amount, setAmount] = useState(prevAmount);
  const [ontakenImage, setOnTakenImage] = useState(false);
  const amountRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  const titleChangeHandler = (text) => {
    setAmount(text);
  };

  const savePaymentHandler = () => {
    dispatch(addPayment(imageUri, amount));
    navigation.navigate("DetailContribution");
  };

  if (ontakenImage) {
    //set the amount value as a props so we can get it in the next render
    return <ImageSelector navigation={navigation} amount={amount} />;
  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          placeholder="enter amount here"
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={amount}
        />
        {imageUri && (
          <View style={styles.imageContainer}>
            {/* <Image
              source={{
                uri: imageUri,
              }}
              style={styles.image}
            /> */}
            {/*image use for demonstration*/}
            <Image
              source={{
                uri: "https://cdn.britannica.com/22/187022-138-64E249E2/facts-paper-money.jpg?w=800&h=450&c=crop",
              }}
              style={styles.image}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button
            title={imageUri ? "Take new picture" : "Take picture"}
            onPress={() => {
              setOnTakenImage((ontakenImage) => !ontakenImage);
            }}
            disabled={!amount && !imageUri}
            style={styles.takePictureButton}
          />

          <Button
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
});
