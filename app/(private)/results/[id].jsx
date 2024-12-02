import { View, Text, FlatList, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRaffleWinners } from "../../../src/utils/raffle_local_functions";
import background from "../../../assets/app/background.png";
import { StatusBar } from "expo-status-bar";
import { BackHeaderRaffle } from "../../../src/ui/BackHeader";
import { LargeText, NormalText } from "../../../src/ui/Texts";

export default function results() {
  const { id, name, countWinner } = useLocalSearchParams();
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getRaffleWinners(id);
      setWinners(result);
    }
    fetchData();
  }, []);

  const RenderWinnerCard = ({ item }) => {
    return (
      <>
        <View
          style={{
            backgroundColor: "#AD62CD",
            alignSelf: "flex-start",
            marginLeft: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
            paddingVertical: 1,
          }}
        >
          <NormalText content={`Puesto ${item.position}`} />
        </View>
        <View
          style={{
            width: 360,
            backgroundColor: "white",
            alignSelf: "center",
            height: 70,
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Text
            style={{
              height: 50,
              width: 50,
              backgroundColor: "#CEA3FF",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              textAlignVertical: "center",
              borderRadius: 5,
              fontSize: 25,
              marginLeft: 10,
            }}
          >{`${item.number}`}</Text>
          <NormalText
            formatText={"capitalize"}
            color={"black"}
            content={item.owner}
          />
        </View>
      </>
    );
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={background}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeaderRaffle raffleTitle={name} />

        <View style={{ marginTop: 25, marginBottom: 20, gap: 10 }}>
          <LargeText content={" 🎉 GANADORES  🎁"} />
          <NormalText
            content={`Se generaron ${countWinner} ganadores para este sorteo`}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={winners}
            renderItem={RenderWinnerCard}
            initialNumToRender={20}
            windowSize={5} // Ajusta este valor según tu necesidad
            keyExtractor={(item) => item?.number}
            contentContainerStyle={{
              padding: 16,
              gap: 30, // Funciona en versiones más recientes de React Native
              paddingBottom: 100,
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
