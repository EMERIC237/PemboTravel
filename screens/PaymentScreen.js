import ImageSelector from "../components/ImageSelector";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
} from "react-native";
import React, { useCallback, useState } from "react";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

const PaymentScreen = () => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [ontakenImage, setOnTakenImage] = useState(false);

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };
  if (ontakenImage) {
    return <ImageSelector />;
  }
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          placeholder="enter amount here"
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <Button
          title="Take the picture"
          onPress={() => {
            setOnTakenImage((ontakenImage) => !ontakenImage);
          }}
        />

        <Button
          title="Save payment"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
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
});
