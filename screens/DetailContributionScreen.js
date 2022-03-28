import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import React, { useCallback } from "react";

const DetailContributionScreen = ({ navigation }) => {
  const payments = useSelector((state) => state.payment.payments);
  console.log("payments:", payments);
  const renderGridItem = useCallback((data) => {
    return (
      <View style={styles.contributionContainer}>
        <TouchableOpacity style={styles.detailImgItem} onPress={() => {}}>
          <View style={styles.projectItemContent}>
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
        </TouchableOpacity>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{data.item.amount}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={payments}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default DetailContributionScreen;

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
  amountContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  detailImgItem: {
    flex: 4,
    width: "100%",
  },
  projectItemContent: {
    width: "100%",
  },
});
