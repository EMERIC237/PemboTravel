import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import PinchableImage from "../UI/PinchableImage";
import DoubleTap from "../UI/DoubleTap";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
const flexCenter = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const PaymentsGridTile = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const getProperties = (status) => {
    let properties = {
      bgColor: { backgroundColor: "white" },
      iconName: null,
    };

    switch (status) {
      case "validated":
        properties.bgColor = { backgroundColor: "#00FF00" };
        properties.iconName = "md-checkmark-circle-outline";
        return properties;
      case "pending":
        properties.bgColor = { backgroundColor: "#FFA500" };
        properties.iconName = "md-time";
        return properties;
      case "refused":
        properties.bgColor = { backgroundColor: "#FF0000" };
        properties.iconName = "md-close-circle-outline";
      default:
        return properties;
    }
  };

  const renderGridItem = useCallback((data) => {
    return (
      <View style={styles.contributionContainer}>
        {/* <Image
                  source={{ uri: data.item.imageUrl }}
                  style={styles.imgPayment}
                /> */}
        {/*image use for demonstration*/}
        <DoubleTap
          style={styles.detailImgItem}
          onDoubleTap={() => {
            setModalVisible(!modalVisible);
          }}
          delay={400}
        >
          <View>
            {/* <Image
                  source={{ uri: data.item.imageUrl }}
                  style={styles.imgPayment}
                /> */}
            {/*image use for demonstration*/}
            <Image
              source={{
                uri: "https://cdn.britannica.com/22/187022-138-64E249E2/facts-paper-money.jpg?w=800&h=450&c=crop",
              }}
              style={styles.imgPayment}
            />
          </View>
        </DoubleTap>
        <View style={styles.extraContainer}>
          <View style={styles.amountContainer}>
            <Text style={styles.amountText}>{data.item.amount}</Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              getProperties(data.item.status).bgColor,
            ]}
          >
            <Text style={styles.dateText}>{data.item.status}</Text>
            <Ionicons
              name={getProperties(data.item.status).iconName}
              size={24}
              color="white"
            />
          </View>
          <View style={styles.projectContainer}>
            <Text style={styles.dateText}>{data.item.projectName}</Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={props.dataList}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.paymentId}
      />
      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View>
            <Text
              style={styles.modalText}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              X
            </Text>
          </View>
          <PinchableImage
            imageUri={
              "https://cdn.britannica.com/22/187022-138-64E249E2/facts-paper-money.jpg?w=800&h=450&c=crop"
            }
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentsGridTile;

const styles = StyleSheet.create({
  contributionContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  imgPayment: {
    width: "100%",
    height: 200,
  },
  amountText: {
    fontSize: 20,
    fontWeight: "600",
  },
  extraContainer: {
    ...flexCenter,
    flex: 2,
  },
  detailImgItem: {
    flex: 4,
    width: "100%",
  },

  closeButton: {
    borderColor: "#ccc",
    borderWidth: 6,
    padding: 2,
    borderRadius: 100,
    position: "absolute",
    top: 80,
  },
  modalContainer: {
    ...flexCenter,
  },
  modalImg: {
    width: "90%",
    height: "50%",
    transform: [{ scale: 1 }],
  },
  scrollView: {
    marginHorizontal: 50,
    backgroundColor: "pink",
    flex: 0.8,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "900",
    borderRadius: 100,
    borderColor: "#ccc",
    borderWidth: 6,
    padding: 10,
  },
  amountContainer: {
    ...flexCenter,
    flex: 0.3,
  },
  statusContainer: {
    ...flexCenter,
    flex: 0.3,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
  },
  projectContainer: {
    ...flexCenter,
    flex: 0.3,
    width: "100%",
    borderColor: "#ccc",
    borderTopWidth: 1,
    backgroundColor: "#75b1ff",
  },
  dateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
  },
});
