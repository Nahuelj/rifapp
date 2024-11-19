import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRaffleWinners } from "../../../src/utils/raffle_functions";

export default function results() {
  const { id } = useLocalSearchParams();
  const [winners, setWinners] = useState([]);
  console.log("🚀 ~ results ~ winners:", winners);
  console.log("🚀 ~ results ~ id:", id);

  useEffect(() => {
    async function fetchData() {
      const result = await getRaffleWinners(id);
      setWinners(result);
    }
    fetchData();
  }, []);

  const RenderWinnerCard = ({ item }) => {
    return (
      <View>
        <Text>{`${item.number} ${item.owner}`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>results</Text>
      </View>

      <FlatList
        data={winners}
        renderItem={RenderWinnerCard}
        initialNumToRender={20}
        windowSize={5} // Ajusta este valor según tu necesidad
        keyExtractor={(item) => item?.number}
        contentContainerStyle={{
          padding: 16,
          gap: 20, // Funciona en versiones más recientes de React Native
        }}
      />
    </SafeAreaView>
  );
}
