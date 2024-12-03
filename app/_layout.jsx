import { Stack } from "expo-router";
import { Platform, View } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.select({
          ios: "default",
          android: "slide_from_right",
        }),
      }}
    />
  );
}
