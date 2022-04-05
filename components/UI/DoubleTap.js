import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
let doubletap = () => null;
const DoubleTap = ({
  delay = 300,
  onDoubleTap = doubletap,
  style,
  children,
}) => {
  let lastTap = null;

  // function to handle double tap using the date to compare the time delay between taps
  const handleDoubleTap = () => {
    const now = new Date().getTime();
    if (lastTap && now - lastTap < delay) {
      onDoubleTap();
    } else {
      lastTap = now;
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={{ ...style }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DoubleTap;

const styles = StyleSheet.create({});
