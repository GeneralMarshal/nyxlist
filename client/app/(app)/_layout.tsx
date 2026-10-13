import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { BlurView } from "expo-blur";

export default function HomeLayoutScreen() {
  const { isSignedIn, isLoaded } = useAuth();
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
    </Stack>
  );
}
