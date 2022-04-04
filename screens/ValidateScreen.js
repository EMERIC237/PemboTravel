import { StyleSheet, Text, View } from "react-native";
import PaymentsGridTile from "../components/Projects/PaymentsGridTile";
import { updatePaymentStatus } from "../store/actions/paymentActions";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

const ValidateScreen = () => {
  //get all payments
  //TODO: change the payment value so that we ca get the project name before getting to this screen
  const payments = useSelector((state) => state.payment.allPayments);
  const projects = useSelector((state) => state.projects.projects);
  //get the useid from the redux store
  const userId = useSelector((state) => state.auth.userCredentials.userId);
  const dispatch = useDispatch();
  // add the project name to every payment using the project id
  // set a default value for the project name
  const paymentsWithProjectName = payments.map((payment) => {
    const project = projects.find(
      (project) => project.projectId === payment.projectId
    );

    return {
      ...payment,
      projectName: project ? project.city : "Pembo",
    };
  });
  if (paymentsWithProjectName.length === 0) {
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
      dataList={paymentsWithProjectName}
      isValidating={userId !== null}
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
