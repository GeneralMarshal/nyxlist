import React from "react";
import { ThemedText } from "@/components/themed-text";
import { Link, useRouter } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { View } from "react-native";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import type { ClerkAPIError } from "@clerk/types";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [code, setCode] = React.useState("");

  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

  const [pendingVerification, setPendingVerification] = React.useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    setErrors([]);
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    setErrors([]);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.log(signUpAttempt);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <BodyScrollView contentContainerStyle={{ padding: 16 }}>
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${emailAddress}`}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        ></TextInput>
        <Button
          onPress={onVerifyPress}
          disabled={isLoading || !code}
          loading={isLoading}
        >
          Verify
        </Button>
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
  }
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
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        onPress={onSignUpPress}
        disabled={isLoading || !emailAddress || !password}
      >
        Sign In
      </Button>

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
