import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useAuth } from "../src/hooks/useAuth";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.select({
          ios: "default",
          android: "fade",
        }),
      }}
    />
  );
}
