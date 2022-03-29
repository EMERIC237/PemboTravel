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
} from "react-native";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import Input from "../components/UI/Input";
import { signup } from "../store/actions/authActions";
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
  const { projectId } = route.params;
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      prenom: "",
      nom: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
    inputValidities: {
      prenom: false,
      nom: false,
      phoneNumber: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the erros in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    dispatch(
      signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.nom,
        formState.inputValues.prenom,
        formState.inputValues.phoneNumber,
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
              id="prenom"
              label="Prenom"
              errorText="Please enter a valid name"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue=""
              initiallyValid={false}
            />
            <Input
              id="nom"
              label="Nom"
              errorText="Please enter a valid name"
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue=""
              initiallyValid={false}
            />
            <Input
              id="phoneNumber"
              label="Phone number"
              errorText="Please enter a valid number"
              keyboardType="phone-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue=""
              initiallyValid={false}
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
              initialValue=""
              initiallyValid={false}
            />
            <Input
              id="password"
              label="Password"
              errorText="Please enter a valid password"
              keyboardType="default"
              autoCorrect
              required
              secureTextEntry
              returnKeyType="done"
              onInputChange={inputChangeHandler}
              initialValue=""
              initiallyValid={false}
              minLength={8}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <Button title="Save" onPress={submitHandler} />
    </KeyboardAvoidingView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
