import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import default_img from "../../assets/app/default_image_raffle_card.png";
import { router } from "expo-router";

export function RaffleCard({
  img = default_img,
  title = "TitleRaffle",
  maxCapacity = 100,
  currentCapacity = 12,
  isActive = "activo",
  id,
}) {
  const imageSource = typeof img === "string" ? { uri: img } : img;

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/raffleDetail/${id}`);
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "80%",
        margin: "auto",
        gap: 10,
        padding: 20,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
      }}
    >
      <Image
        style={{
          borderWidth: 1,
          borderColor: "black",
          backgroundColor: "violet",
          width: 100,
          height: 80,
        }}
        source={imageSource}
      />
      <View style={{ justifyContent: "space-evenly" }}>
        <Text>{title}</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Text>
            {currentCapacity}/{maxCapacity}
          </Text>
          <Text>{isActive ? "activo" : "pasado"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
