import { StyleSheet, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import React from "react";

const SwipeComponent = (props) => {
  return (
    <Swipeable
      onSwipeableRightOpen={props.onSwipeRight}
      onSwipeableLeftOpen={props.onSwipeLeft}
      renderLeftActions={props.leftComponent}
      renderRightActions={props.rightComponent}
    >
      {props.children}
    </Swipeable>
  );
};

export default SwipeComponent;

const styles = StyleSheet.create({});
