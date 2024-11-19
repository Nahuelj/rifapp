import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function results() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <View>
        <Text>results</Text>
      </View>
    </SafeAreaView>
  );
}
