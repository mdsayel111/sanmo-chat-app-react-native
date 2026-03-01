import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function DraggableModal({
  visible,
  onClose,
  children,
}: Props) {

  const translateY = useSharedValue(SCREEN_HEIGHT);
  const contextY = useSharedValue(0);

  // Open animation
  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const closeAnimation = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 });
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newValue = contextY.value + event.translationY;
      // Only allow dragging downward
      if (newValue >= 0) {
        translateY.value = newValue;
      }
    })
    .onEnd(() => {
      try {
        if (translateY.value > SCREEN_HEIGHT * 0.25) {
          runOnJS(closeAnimation)();
          runOnJS(onClose)();
        } else {
          translateY.value = withSpring(0);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;
  return (

    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.modal, animatedStyle]}>
        <View style={styles.dragIndicator} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: SCREEN_HEIGHT * 0.90,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
  },
  dragIndicator: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
});