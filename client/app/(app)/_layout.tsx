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
              headerBackground: () => (
                <BlurView
                  intensity={80}
                  tint="systemChromeMaterial"
                  style={{ flex: 1 }}
                />
              ),
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
            }),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
