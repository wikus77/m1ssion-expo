import React from "react";
import { Text, TextProps } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

interface GradientTextProps extends TextProps {
  colors?: string[];
  children: React.ReactNode;
}

const GradientText = ({ children, style, colors = ["#00FFFF", "#FFFFFF"], ...props }: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...props} style={style}>{children}</Text>}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text {...props} style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
