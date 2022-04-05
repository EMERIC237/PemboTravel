import { StyleSheet, Text, View, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

/**
 *
 * @param {*} props
 * @requires itemsList : array of items to be displayed in the picker
 * @requires onSelect : function to be called when an item is selected
 * @requires selectedItem : the item that is selected by default
 * @requires modalVisible : boolean to determine if the picker is visible or not
 * @requires setModalVisible : function to set the modal visibility
 * @requires itemLabel : the label of the item to be displayed in the picker
 * @requires itemValue : the value of the item to be displayed in the picker
 * @requires itemKeyValue : the key of the item to be displayed in the picker
 * @returns a modal with a picker
 */
const PickerModal = (props) => {
  const pickItems = props.itemsList.map((item) => {
    return (
      <Picker.Item
        label={item[props.itemLabel]}
        value={item[props.itemValue]}
        key={item[props.itemKeyValue]}
      />
    );
  });
  return (
    <View style={styles.modalStyle}>
      <Modal animationType="slide" visible={props.isOpen}>
        <View style={styles.modalView}>
          <View style={styles.doneView}>
            <Text
              onPress={props.onCancel}
              style={{ fontSize: 25, color: "green", textAlign: "center" }}
            >
              Cancel
            </Text>
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
            {pickItems}
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
    paddingVertical: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#e1dfe6",
  },
  doneView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    top: 10,
    width: "100%",
  },
});
