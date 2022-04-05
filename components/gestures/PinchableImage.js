import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import {
  PinchGestureHandler,
  State,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const screen = Dimensions.get("window");

const PinchableImage = ({ imageUri }) => {
  const pinchRef = useRef();
  const panRef = useRef();
  //pincking values
  baseScale = new Animated.Value(1);
  pinchScale = new Animated.Value(1);
  scale = Animated.multiply(baseScale, pinchScale);
  lastScale = 1;

  //panning values
  offsetX = new Animated.Value(0);
  offsetY = new Animated.Value(0);
  lastOffsetX = { x: 0, y: 0 };

  //pan gesture handler
  onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: { translationX: this.offsetX, translationY: this.offsetY },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  // pan state change handler
  onPanStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffsetX.x += event.nativeEvent.translationX;
      this.lastOffsetX.y += event.nativeEvent.translationY;
      this.offsetX.setOffset(this.lastOffsetX.x);
      this.offsetX.setValue(0);
      this.offsetY.setOffset(this.lastOffsetX.y);
      this.offsetY.setValue(0);
    }
  };

  // picnh gesture event handler
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
      <PanGestureHandler
        ref={panRef}
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanStateChange}
      >
        <Animated.View style={styles.wrapper}>
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
                  transform: [
                    { perspective: 200 },
                    { scale: this.scale },
                    { translateX: this.offsetX },
                    { translateY: this.offsetY },
                  ],
                }}
              />
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default PinchableImage;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
  },
});
