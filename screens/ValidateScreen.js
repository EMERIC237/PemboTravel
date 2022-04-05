import { StyleSheet, Text, View } from "react-native";
import PaymentsGridTile from "../components/Projects/PaymentsGridTile";
import { updatePaymentStatus } from "../store/actions/paymentActions";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

const ValidateScreen = () => {
  //get all payments
  //TODO: change the payment value so that we ca get the project name before getting to this screen
  const payments = useSelector((state) => state.payment.allPayments);
  //get check if the user is an admin
  const isAdmin = useSelector((state) => state.auth.userCredentials.isAdmin);
  const dispatch = useDispatch();

  if (payments.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>....Loading</Text>
      </View>
    );
  }
  //functions to dispatch the action to validate a payment
  const validatePayment = (paymentId) => {
    dispatch(updatePaymentStatus(paymentId, "validated"));
  };
  const rejectPayment = (paymentId) => {
    dispatch(updatePaymentStatus(paymentId, "rejected"));
  };
  return (
    <PaymentsGridTile
      dataList={payments}
      isValidating={isAdmin}
      onValidatePress={validatePayment}
      onRefusePress={rejectPayment}
    />
  );
};

export default ValidateScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
