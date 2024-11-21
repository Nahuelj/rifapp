import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tickets from "../../assets/app/icons/tickets.png";
import people from "../../assets/app/icons/people.png";
import { router } from "expo-router";
import { useFonts } from "expo-font";

export function RaffleCard({
  title = "TitleRaffle",
  maxCapacity = 100,
  currentCapacity = 12,
  isActive = "activo",
  id,
}) {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/raffleDetail/${id}`);
      }}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: 345,
          height: 125,
          margin: "auto",
          gap: 10,
          padding: 20,
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "black",
        },
        !isActive && { opacity: 0.6 },
      ]}
    >
      <View
        style={[
          {
            padding: 10,
            borderRadius: 10,
            alignContent: "center",
            justifyContent: "center",
            height: 90,
            width: 90,
            position: "relative",
          },
          isActive
            ? { backgroundColor: "#D9356A" }
            : { backgroundColor: "#4F1787" },
        ]}
      >
        <Image
          style={{
            width: 59,
            height: 61,
            position: "relative",
            left: 6,
            top: 1,
          }}
          source={tickets}
        />
      </View>
      <View style={{ justifyContent: "space-evenly", height: 95 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 22,
            textTransform: "capitalize",
            maxWidth: 190,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            width: 200,
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              backgroundColor: "black",
              paddingHorizontal: 10,
              borderRadius: 5,
              maxWidth: 105,
              height: 35,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={people} />
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                lineHeight: 41,
              }}
            >
              {currentCapacity}/{maxCapacity}
            </Text>
          </View>
          <Text
            style={[
              {
                backgroundColor: "blue",
                padding: 5,
                borderRadius: 5,
                color: "white",
                fontFamily: "Poppins-SemiBold",
                textTransform: "uppercase",
                fontSize: 16,
                lineHeight: 31,
                height: 35,
                paddingHorizontal: 12,
              },
              isActive
                ? { backgroundColor: "#D9356A" }
                : { backgroundColor: "#4F1787" },
            ]}
          >
            {isActive ? "activo" : "pasado"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
