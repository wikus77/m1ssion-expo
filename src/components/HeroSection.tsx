import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const HeroSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO</Text>
      <Text style={styles.brand}>M1SSION</Text>
      <Text style={styles.subtitle}>It is possible.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    color: "#888",
    fontWeight: "600",
  },
  brand: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#0ff",
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
  },
});

export default HeroSection;
