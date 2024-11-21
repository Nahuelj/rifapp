import { Pressable, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { Link } from "expo-router";

export const LargeYellowButton = ({ content, onPressFunction }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Pressable
      style={{
        width: 300,
        height: 55,
        backgroundColor: "#FFC600",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 50,
      }}
      onPress={() => {
        onPressFunction();
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          color: "#49108B",
          fontSize: 20,
          maxWidth: 300,
          textAlign: "center",
          textTransform: "uppercase",
          lineHeight: 30,
          paddingTop: 4,
        }}
      >
        {content}
      </Text>
    </Pressable>
  );
};
