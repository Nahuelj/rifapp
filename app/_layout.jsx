import { Stack, Slot } from "expo-router";
import { Platform } from "react-native";
import { useAuth } from "../src/hooks/useAuth";

export default function Layout() {
  useAuth();

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
