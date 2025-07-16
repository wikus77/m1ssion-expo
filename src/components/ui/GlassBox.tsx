import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface GlassBoxProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const GlassBox = ({ children, style }: GlassBoxProps) => {
  return <View style={[styles.glass, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  glass: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    overflow: "hidden",
  },
});

export default GlassBox;
