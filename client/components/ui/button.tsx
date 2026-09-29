import React from "react";
import {
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  useColorScheme,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { appleBlue, zincColors } from "@/constants/Colors";
import { ThemedText } from "../themed-text";

type ButtonVariant = "filled" | "ghost" | "outlined";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  loading?: boolean;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  size = "md",
  children,
  onPress,
  disabled = false,
  style,
  loading = false,
  textStyle,
}: ButtonProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; paddingHorizontal: number }
  > = {
    sm: { height: 36, fontSize: 14, paddingHorizontal: 12 },
    md: { height: 44, fontSize: 16, paddingHorizontal: 16 },
    lg: { height: 55, fontSize: 18, paddingHorizontal: 20 },
  };

  const getVariantStyles = (buttonVariant: ButtonVariant): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    };

    switch (buttonVariant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDarkMode ? zincColors[50] : zincColors[900],
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      case "outlined":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDarkMode ? zincColors[700] : zincColors[300],
        };
    }
  };

  const getTextColor = (): string => {
    if (disabled) {
      return isDarkMode ? zincColors[500] : zincColors[400];
    }

    switch (variant) {
      case "filled":
        return isDarkMode ? zincColors[900] : zincColors[50];
      case "ghost":
        return appleBlue;
      case "outlined":
        return appleBlue;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || loading}
      style={[
        getVariantStyles(variant),
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText
          style={StyleSheet.flatten([
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              marginBottom: 0,
              fontWeight: "700",
            },
            textStyle,
          ])}
        >
          {children}
        </ThemedText>
      )}
    </Pressable>
  );
};

export default Button;