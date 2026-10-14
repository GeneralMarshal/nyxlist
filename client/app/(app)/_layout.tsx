import { Stack, useRouter, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { Pressable } from "react-native";
import Button from "@/components/ui/button";

export default function HomeRoutesLaoyout() {
  const { isSignedIn, isLoaded } = useAuth();

  const router = useRouter();

  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                backgroundColor: "transparent",
              },
            }),
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Shopping Lists" }} />
      <Stack.Screen
        name="list/new/index"
        options={{
          presentation: "formSheet",
          headerShown: false,
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="list/new/scan"
        options={{
          presentation: "fullScreenModal",
          headerLargeTitle: false,
          headerTitle: "Scan QR Code",
          headerLeft: () => (
            <Button variant="ghost" onPress={() => router.back()}>
              Cancel
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          presentation: "formSheet",
          headerShown: false,
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.75, 1],
        }}
      />
    </Stack>
  );
}
