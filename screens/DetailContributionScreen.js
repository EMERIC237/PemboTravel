import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import PaymentsGridTile from "../components/Projects/PaymentsGridTile";
import React from "react";

const DetailContributionScreen = ({ navigation }) => {
  const payments = useSelector((state) => state.payment.payments);

  return <PaymentsGridTile dataList={payments} />;
};

export default DetailContributionScreen;

const styles = StyleSheet.create({});
