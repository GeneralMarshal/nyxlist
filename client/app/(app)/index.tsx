import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Button } from "@/components/ui/button";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
export default function HomeScreen() {
  const { signOut } = useClerk();
  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemedText type="title">Home</ThemedText>
      <Button onPress={() => signOut()}>Sign Out</Button>
    </BodyScrollView>
  );
}
