import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import PaymentsGridTile from "../components/Projects/PaymentsGridTile";
import React from "react";

const DetailContributionScreen = ({ navigation }) => {
  const payments = useSelector((state) => state.payment.payments);
  const projects = useSelector((state) => state.projects.projects);
  // add the project name to every payment using the project id
  const paymentsWithProjectName = payments.map((payment) => {
    const project = projects.find(
      (project) => project.projectId === payment.projectId
    );

    return {
      ...payment,
      projectName: project ? project.city : "Pembo",
    };
  });

  return <PaymentsGridTile dataList={paymentsWithProjectName} />;
};

export default DetailContributionScreen;

const styles = StyleSheet.create({});
