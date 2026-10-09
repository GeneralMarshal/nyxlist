import { ThemedText } from "@/components/themed-text";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { useRouter, Link } from "expo-router";
import { useState, useCallback } from "react";
import { View, ScrollView } from "react-native";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import type { ClerkAPIError } from "@clerk/types";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onSignInPress = useCallback( async() => {
    if(!isLoaded) return;
    setIsSigningIn(true);

    try {
      const signInAttempt = await signIn.create({
        identifier:emailAddress,
        password,
      })
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(app)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (e) {
      if (isClerkAPIResponseError(e)) {
        setErrors(e.errors)
      }
      console.error(JSON.stringify(e, null, 2));
    }
    finally {
      setIsSigningIn(false);
    }

  }, [isLoaded, emailAddress, password])

  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        value={emailAddress}
        label="Email"
        placeholder="Enter Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <TextInput
        value={password}
        label="Password"
        placeholder="Enter Password"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setPassword}
      />
      <Button
        onPress={onSignInPress}
        disabled={isSigningIn || !emailAddress || !password}
      >
        Sign In
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}

      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Do not have an account?</ThemedText>
        <Button onPress={() => router.push("/sign-up")} variant="ghost">
          Sign Up
        </Button>
      </View>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <ThemedText>Forgot Password?</ThemedText>
        <Button onPress={() => router.push("/reset-password")} variant="ghost">
          Reset Password
        </Button>
      </View>
    </BodyScrollView>
  );
}
