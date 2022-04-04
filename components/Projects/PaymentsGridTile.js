import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import PinchableImage from "../gestures/PinchableImage";
import DoubleTap from "../UI/DoubleTap";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState, useRef } from "react";
import SwipeComponent from "../gestures/SwipeComponent";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
const flexCenter = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const PaymentsGridTile = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isValidating, onValidatePress, onRefusePress } = props;
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
      case "rejected":
        properties.bgColor = { backgroundColor: "#FF0000" };
        properties.iconName = "md-close-circle-outline";
      default:
        return properties;
    }
  };

  const LeftItem = useCallback(
    ({ paymentId, status }) => {
      // stop non admin users from swiping
      if (!isValidating) {
        return null;
      }
      return (
        <View style={styles.rightItem}>
          <Card style={styles.validate}>
            <Pressable
              style={{ flex: 1, width: "90%" }}
              onLongPress={() => {
                onValidatePress(paymentId);
                Alert.alert(
                  "Payment Validated",
                  "Payment has been validated succefully",
                  [{ text: "OK" }]
                );
              }}
              disabled={status !== "pending"}
            >
              <View style={{ ...flexCenter }}>
                <Text style={styles.textButtonStyle}>Validate</Text>
              </View>
            </Pressable>
          </Card>
          <Card style={styles.rejected}>
            <Pressable
              disabled={status !== "pending"}
              onLongPress={() => {
                onRefusePress(paymentId);
                Alert.alert(
                  "Payment Rejected",
                  "Payment has been updated to rejected successfully!",
                  [{ text: "OK" }],
                  { cancelable: false }
                );
              }}
              style={{ flex: 1, width: "90%" }}
            >
              <View style={{ ...flexCenter }}>
                <Text style={styles.archiveTextButtonStyle}>Reject</Text>
              </View>
            </Pressable>
          </Card>
        </View>
      );
    },
    [isValidating, onValidatePress, onRefusePress]
  );
  const renderGridItem = useCallback((data) => {
    return (
      <SwipeComponent
        onSwipeLeft={() => {}}
        leftComponent={(progress, drags) => (
          <LeftItem paymentId={data.item.paymentId} status={data.item.status} />
        )}
      >
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
      </SwipeComponent>
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
          <View>
            <Text style={styles.modalText}>Zoom and explore the image</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentsGridTile;

const styles = StyleSheet.create({
  archiveTextButtonStyle: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textButtonStyle: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  rejected: {
    ...flexCenter,
    flex: 0.3,
    height: 80,
    backgroundColor: "#c00000",
  },
  validate: {
    ...flexCenter,
    flex: 0.4,
    height: 80,
    backgroundColor: Colors.primary,
  },
  rightItem: {
    ...flexCenter,
    flexDirection: "row",
  },
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
    margin: 20,
    backgroundColor: "white",
    marginVertical: 130,
    borderRadius: 20,
    padding: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImg: {
    width: "90%",
    height: "50%",
    transform: [{ scale: 1 }],
  },
  modalText: {
    fontSize: 20,
    fontWeight: "900",
    borderRadius: 100,
    borderColor: "#ccc",
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
