import { View, Text, Image } from "react-native";
import React from "react";
import default_img from "../../assets/app/default_image_raffle_card.png";

export function RaffleCard({
  img = default_img,
  title = "TitleRaffle",
  raffleLimits = "12/100",
  status = "past",
}) {
  return (
    <View
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
        }}
        source={img}
      />
      <View style={{ justifyContent: "space-evenly" }}>
        <Text>{title}</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Text>{raffleLimits}</Text>
          <Text>{status}</Text>
        </View>
      </View>
    </View>
  );
}
