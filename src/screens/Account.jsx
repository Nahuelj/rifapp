import { Text } from "react-native";
import React from "react";
import { HeaderHome } from "../components/HeaderHome";
import { SafeAreaView } from "react-native-safe-area-context";

export function Account() {
  return (
    <SafeAreaView>
      <HeaderHome />
      <Text>Account</Text>
    </SafeAreaView>
  );
}
