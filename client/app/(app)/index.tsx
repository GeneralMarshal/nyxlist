import { ThemedText } from "@/components/themed-text";
import { Pressable, View } from "react-native";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { Redirect, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { appleBlue } from "@/constants/Colors";

export default function HomeScreen() {
  const router = useRouter();
  const { signOut } = useClerk();

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => { router.push("/list/new") }}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    )

  }
  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => { router.push("/profile") }}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    )

  }
  
  return (
    <>
      <Stack.Screen options={{ headerRight: renderHeaderRight, headerLeft: renderHeaderLeft }} />
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <ThemedText type="title">Home In</ThemedText>
        <Button onPress={() => signOut()}>Sign Out</Button>
      </BodyScrollView>
    </>
  );
}
 