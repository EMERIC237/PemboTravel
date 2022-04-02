import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";

const CustomModal = (props) => {
  return (
    <Modal animationType="slide" visible={props.visible}>
      {props.children}
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
