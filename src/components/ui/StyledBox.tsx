import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface StyledBoxProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const StyledBox = ({ children, style }: StyledBoxProps) => {
  return <View style={[styles.box, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  box: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "#222",
  },
});

export default StyledBox;
