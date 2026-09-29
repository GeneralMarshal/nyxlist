import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
export default function HomeScreen() {
    return (
        <View>
            <ThemedText type="title">Home</ThemedText>
        </View>
    )
}