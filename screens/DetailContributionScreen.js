import { StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import PaymentsGridTile from "../components/Projects/PaymentsGridTile";
import React from "react";

const DetailContributionScreen = ({ navigation }) => {
  const payments = useSelector((state) => state.payment.payments);
  return (
    <>
      {payments.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <PaymentsGridTile dataList={payments} navigation={navigation} />
      )}
    </>
  );
};

export default DetailContributionScreen;

const styles = StyleSheet.create({});
