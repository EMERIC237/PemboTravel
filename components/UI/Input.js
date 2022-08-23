import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useReducer, useEffect, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";
const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

/**
 * Thic component is used to create an input field
 * @param {*} props
 * @returns
 */
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: props.initialValue ? true : false,
  });
  const { onInputChange, id } = props;
  const phoneInputRef = useRef(null);

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkValidPhone =
      phoneInputRef.current && phoneInputRef.current.isValidNumber(text);
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.isNumberInput && !checkValidPhone) {
      isValid = false;
    }
    console.log(text, isValid);
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    console.log("running lostFocusHandler...");
    dispatch({ type: INPUT_BLUR });
  };
  return (
    <View>
      {props.isNumberInput ? (
        <View style={styles.formControl}>
          <Text style={styles.label}>{props.label}</Text>
          <PhoneInput
            {...props}
            ref={phoneInputRef}
            style={styles.input}
            defaultCode="CM"
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.phoneInput}
            onChangeText={textChangeHandler}
            value={inputState.value}
            textInputProps={{
              onEndEditing: lostFocusHandler,
              onBlur: lostFocusHandler,
            }}
          />
        </View>
      ) : (
        <View style={styles.formControl}>
          <Text style={styles.label}>{props.label}</Text>
          <TextInput
            {...props}
            style={styles.input}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
            onEndEditing={lostFocusHandler}
          />
        </View>
      )}

      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMsg}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorMsg: {
    color: "red",
    fontSize: 13,
  },
  phoneInput: {
    width: "10%",
    backgroundColor: "transparent",
  },
  phoneContainer: {
    width: "100%",
  },
});
