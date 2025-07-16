import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";

interface GlassContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

const GlassContainer = ({ children, style, intensity = 50 }: GlassContainerProps) => {
  return (
    <BlurView intensity={intensity} tint="light" style={[styles.container, style]}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});

export default GlassContainer;
