import { StyleSheet, Text, View } from "react-native";
import PaymentsGridTile from "../components/Projects/PaymentsGridTile";
import { useSelector } from "react-redux";
import React from "react";

const ValidateScreen = () => {
  //get all payments
  //TODO: change the payment value so that we ca get the project name before getting to this screen
  const payments = useSelector((state) => state.payment.allPayments);
  const projects = useSelector((state) => state.projects.projects);
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
  return <PaymentsGridTile dataList={paymentsWithProjectName} />;
};

export default ValidateScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
