import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface GlowProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Glow = ({ size = 200, color = "#00FFFF", style }: GlowProps) => {
  return (
    <View
      style={[
        styles.glow,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  glow: {
    position: "absolute",
    opacity: 0.3,
    shadowColor: "#00FFFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 20,
  },
});

export default Glow;
