import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import ButtonImagePicker from "../components/extends/ButtonImagePicker";
import Input from "../components/UI/Input";
import { signup } from "../store/actions/authActions";
import { updateUser } from "../store/actions/userActions";
const FORM_UPDATE = "FORM_UPDATE";
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.inputValue,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SubscriptionScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { projectId, infos } = route.params;
  const [image, setImage] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: infos ? infos.firstName : "",
      lastName: infos ? infos.lastName : "",
      phone: infos ? infos.phone : "",
      email: infos ? infos.email : "",
      password: "",
    },
    inputValidities: {
      firstName: infos ? true : false,
      lastName: infos ? true : false,
      phone: infos ? true : false,
      email: infos ? true : false,
      password: infos ? true : false,
    },
    formIsValid: infos ? true : false,
  });
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the erros in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (infos) {
      dispatch(
        await updateUser(
          infos.id,
          formState.inputValues.firstName,
          formState.inputValues.lastName,
          formState.inputValues.phone,
          formState.inputValues.email,
          image
        )
      );
      navigation.goBack();
      return;
    }
    dispatch(
      signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.lastName,
        formState.inputValues.firstName,
        formState.inputValues.phone,
        image,
        projectId
      )
    );
    navigation.navigate("Projects");
  });
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        inputValue: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View>
            <Input
              id="firstName"
              label="firstName"
              errorText="Please enter a valid name"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={infos ? infos.firstName : ""}
              initiallyValid={!!infos}
            />
            <Input
              id="lastName"
              label="lastName"
              errorText="Please enter a valid name"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={infos ? infos.lastName : ""}
              initiallyValid={!!infos}
            />
            <Input
              id="phone"
              label="Phone number"
              errorText="Please enter a valid number"
              keyboardType="phone-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={infos ? infos.phone : ""}
              initiallyValid={!!infos}
            />
            <Input
              id="email"
              label="E-mail"
              errorText="Please enter a valid email"
              keyboardType="email-address"
              autoCorrect
              email
              required
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={infos ? infos.email : ""}
              initiallyValid={!!infos}
            />
            <Input
              id="password"
              label="Password"
              errorText="Please enter a valid password"
              keyboardType="default"
              autoCorrect
              required
              editable={infos ? false : true}
              secureTextEntry
              returnKeyType="done"
              onInputChange={inputChangeHandler}
              initialValue={infos ? infos.password : ""}
              initiallyValid={!!infos}
              minLength={8}
            />
          </View>
          <View>
            <View style={styles.buttonContainer}>
              <Text>You can add a picture here:</Text>
              <ButtonImagePicker onImageTaken={setImage} />
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Button title="Save" onPress={submitHandler} />
    </KeyboardAvoidingView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 200, height: 200 },
});
