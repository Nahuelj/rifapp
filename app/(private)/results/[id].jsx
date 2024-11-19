import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRaffleWinners } from "../../../src/utils/raffle_functions";

export default function results() {
  const { id } = useLocalSearchParams();
  const [winners, setWinners] = useState([]);
  console.log("🚀 ~ results ~ id:", id);

  useEffect(() => {
    async function fetchData() {
      const result = await getRaffleWinners(id);
      setWinners(result);
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>results</Text>
      </View>
    </SafeAreaView>
  );
}
