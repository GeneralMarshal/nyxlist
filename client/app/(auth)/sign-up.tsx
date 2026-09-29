import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import TextInput from "@/components/ui/text-input";
import { Button } from "@/components/ui/button";
import { View } from "react-native";


export default function SignUpScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

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
        onChangeText={setEmailAddress}
      />
      <Button
        onPress={onSignInPress}
        disabled={isSigningIn || !emailAddress || !password}
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
