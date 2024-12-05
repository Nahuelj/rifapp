import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRaffleWinners } from "../../../src/utils/raffle_local_functions";
import background from "../../../assets/app/background.png";
import { BackHeaderRaffle } from "../../../src/ui/BackHeader";
import { LargeText, NormalText, PodioText } from "../../../src/ui/Texts";
import ConfettiCannon from "react-native-confetti-cannon";
import first from "../../../assets/app/icons/1.png";
import second from "../../../assets/app/icons/2.png";
import third from "../../../assets/app/icons/3.png";

const { width, height } = Dimensions.get("window");

export default function Results() {
  const { id, name, countWinner, confeti } = useLocalSearchParams();
  const [winners, setWinners] = useState([]);
  const [isLoadingWinners, setIsLoadingWinners] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getRaffleWinners(id);
        setWinners(result);
        setIsLoadingWinners(false);
      } catch (error) {
        console.error("Error fetching winners:", error);
        setIsLoadingWinners(false);
      }
    }

    fetchData();
  }, [id]);

  const RenderWinnerCard = ({ item }) => (
    <>
      <View style={{ flexDirection: "row" }}>
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
            backgroundColor: "#AD62CD",
            alignSelf: "flex-start",
            marginLeft: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
            paddingVertical: 1,
          }}
        >
          <NormalText content={`Ticket número: ${item.number}`} />
        </View>
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
          numberOfLines={1}
          ellipsizeMode="tail"
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
            overflow: "hidden",
            color: "white",
            borderWidth: 3,
            borderColor: "white",
          }}
        >
          {`${item.number}`}
        </Text>
        <View>
          <PodioText
            formatText={"capitalize"}
            color={"black"}
            content={item.owner}
          />
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 10,
          }}
        >
          {item.position == "1" && (
            <Image
              style={{ width: 70, height: 70, resizeMode: "cover" }}
              source={first}
            />
          )}
          {item.position == "2" && (
            <Image
              style={{ width: 70, height: 70, resizeMode: "cover" }}
              source={second}
            />
          )}
          {item.position == "3" && (
            <Image
              style={{ width: 70, height: 70, resizeMode: "cover" }}
              source={third}
            />
          )}
        </View>
      </View>
    </>
  );

  return (
    <ImageBackground style={{ flex: 1 }} source={background}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginTop: 10 }}>
          <BackHeaderRaffle raffleTitle={name} />
        </View>

        <View style={{ marginTop: 25, marginBottom: 20, gap: 10 }}>
          <LargeText content={" 🎉 GANADORES  🎁"} />
          <NormalText
            content={`Se ${countWinner == 1 ? "generó" : "generaron"} ${countWinner} ${countWinner == 1 ? "ganador" : "ganadores"} para este sorteo`}
          />
        </View>

        {isLoadingWinners ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#AD62CD" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={winners}
              renderItem={RenderWinnerCard}
              initialNumToRender={20}
              windowSize={5}
              keyExtractor={(item) => item?.number}
              contentContainerStyle={{
                padding: 16,
                gap: 30,
                paddingBottom: 100,
              }}
            />
          </View>
        )}
      </SafeAreaView>

      {confeti === "true" && (
        <ConfettiCannon
          onAnimationStart={() => {
            setTimeout(() => {
              setIsLoadingWinners(false);
            }, 350);
          }}
          count={100}
          fadeOut={true}
          fallSpeed={5500}
          origin={{
            x: width / 2,
            y: -height - 50,
          }}
        />
      )}
    </ImageBackground>
  );
}
