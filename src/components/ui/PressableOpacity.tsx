import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";

const PressableOpacity = ({ style, ...props }: PressableProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        { opacity: pressed ? 0.6 : 1 },
        styles.pressable,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  pressable: {
    transitionDuration: "150ms",
  },
});

export default PressableOpacity;
