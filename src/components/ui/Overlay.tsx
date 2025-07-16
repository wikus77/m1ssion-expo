import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface OverlayProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Overlay = ({ children, style }: OverlayProps) => {
  return <View style={[styles.overlay, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Overlay;
