import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ThemedText } from "@/components/themed-text";

export default function NewListScreen() {
  return (
    <BodyScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemedText type="subtitle">Better Together</ThemedText>
      <ThemedText type="defaultSemiBold">Create shared shopping lists and collaborate in real-time with family and friends.</ThemedText>
    </BodyScrollView>
  );
}
