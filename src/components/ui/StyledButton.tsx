import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const StyledButton = ({ title, onPress, style }: StyledButtonProps) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00FFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default StyledButton;
