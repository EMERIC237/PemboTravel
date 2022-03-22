import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import { auth } from "../firebase";

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

const SubscriptionScreen = () => {
  const dispatch = useDispatch();
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async () => {};
  const logout = async () => {};
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      price: "",
      imageUrl: "",
      description: "",
    },
    inputValidities: {
      title: false,
      price: false,
      imageUrl: false,
      description: false,
    },
    formIsValid: false,
  });
  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the erros in the form.", [
        { text: "Okay" },
      ]);
      return;
      dispatch();
    }
  });
  return (
    <View>
      <Text>SubscriptionScreen</Text>
    </View>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
