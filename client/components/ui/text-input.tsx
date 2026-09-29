import React from "react";
import {
  ViewStyle,
  TextStyle,
  useColorScheme,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
  View
} from "react-native";
import { appleRed, zincColors } from "@/constants/Colors";
import { ThemedText } from "../themed-text";

type InputVariant = "filled" | "ghost" | "outlined" | "default";
type InputSize = "sm" | "md" | "lg";

interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  variant = "default",
  size = "md",
  disabled = false,
  label,
  error,
  containerStyle,
  inputStyle,
  ...props
}: TextInputProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const sizeStyles: Record<
    InputSize,
    { height?: number; fontSize: number; paddingHorizontal: number }
  > = {
    sm: { fontSize: 16, paddingHorizontal: 8 },
    md: { height: 50, fontSize: 16, paddingHorizontal: 14 },
    lg: { height: 55, fontSize: 32, paddingHorizontal: 16 },
  };

  const getVariantStyles = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      backgroundColor: isDarkMode ? zincColors[900] : "rgb(229, 229, 234)",
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDarkMode ? zincColors[700] : zincColors[100],
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
          borderColor: isDarkMode ? zincColors[600] : zincColors[200],
        };
      case "default":
        return {
          ...baseStyle,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDarkMode ? zincColors[500] : zincColors[400];
    }
    return isDarkMode ? zincColors[50] : zincColors[900];
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <View style={[getVariantStyles(), disabled && styles.disabled]}>
        <RNTextInput
          style={[
            {
              height: sizeStyles[size].height,
              fontSize: sizeStyles[size].fontSize,
              padding: sizeStyles[size].paddingHorizontal,
              color: getTextColor(),
            },
            inputStyle,
          ]}
          placeholderTextColor={isDarkMode ? zincColors[500] : zincColors[400]}
          editable={!disabled}
          {...props}
        />
      </View>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  error: {
    color: appleRed,
    marginTop: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default TextInput;
