import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const screen = Dimensions.get("window");

const PinchableImage = ({ imageUri }) => {
  const pinchRef = useRef();
  //pincking values
  baseScale = new Animated.Value(1);
  pinchScale = new Animated.Value(1);
  scale = Animated.multiply(baseScale, pinchScale);
  lastScale = 1;

  // gesture event handler
  onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: { scale: this.pinchScale },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  // pinch state change handler
  onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale;
      this.baseScale.setValue(this.lastScale);
      this.pinchScale.setValue(1);
    }
  };

  return (
    <GestureHandlerRootView>
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={this.onPinchGestureEvent}
        onHandlerStateChange={this.onPinchStateChange}
      >
        <Animated.View style={styles.container} collapsable={false}>
          <Animated.Image
            source={{ uri: imageUri }}
            style={{
              width: 300,
              height: 300,
              transform: [{ perspective: 200 }, { scale: this.scale }],
            }}
          />
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
};

export default PinchableImage;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
