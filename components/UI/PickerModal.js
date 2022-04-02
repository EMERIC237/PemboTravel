import { StyleSheet, Text, View, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

const PickerModal = (props) => {
  return (
    <View style={styles.modalStyle}>
      <Modal animationType="slide" visible={props.isOpen}>
        <View style={styles.modalView}>
          <View style={styles.doneView}>
            <Text
              onPress={props.onDone}
              style={{ fontSize: 25, color: "green", textAlign: "center" }}
            >
              Done
            </Text>
          </View>
          <Picker
            selectedValue={props.selectedValue}
            onValueChange={props.onValueChange}
          >
            {props.pickItems}
          </Picker>
        </View>
      </Modal>
    </View>
  );
};

export default PickerModal;

const styles = StyleSheet.create({
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
  doneView: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
