import React from "react";
import { ThemedText } from "@/components/themed-text";
import { Link, useRouter } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { View } from "react-native";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import type { ClerkAPIError } from "@clerk/types";

export default function SignUpScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [code, setCode] = React.useState("");

  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

  const [pendingVerification, setPendingVerification] = React.useState(false);

  const onResetPasswordPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    setErrors([]);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setPendingVerification(true);
    } catch (e) {
      if (isClerkAPIResponseError(e)) {
        setErrors(e.errors);
        console.error(JSON.stringify(e, null, 2));
      }
    } finally {
      setIsLoading(false);
    }
  }, [emailAddress, isLoaded, signIn]);

  const onVerifyPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    setErrors([]);
    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
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
      setIsLoading(false);
    }
  }, [isLoaded, code, password, signIn, setActive, router]);

  if (pendingVerification) {
    return (
      <BodyScrollView
        contentContainerStyle={{ padding: 16 }}
        automaticallyAdjustKeyboardInsets={false}
      >
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${emailAddress}`}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        ></TextInput>
        <TextInput
          value={password}
          label="New password"
          placeholder="Enter your new password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={setPassword}
        />
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
    <BodyScrollView contentContainerStyle={{ padding: 16 }} automaticallyAdjustKeyboardInsets={false}>
      <TextInput
        value={emailAddress}
        label="Email"
        placeholder="Enter Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmailAddress}
      />
      <Button onPress={onResetPasswordPress} disabled={!emailAddress}>Continue</Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{color: "red"}}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
