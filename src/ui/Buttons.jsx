import {
  Pressable,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";

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

export const LargeYellowButtonWithDisabled = ({
  content,
  onPressFunction,
  disabled,
}) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Pressable
      style={[
        {
          width: 300,
          height: 55,
          backgroundColor: "#FFC600",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          borderRadius: 50,
        },
        disabled && {
          backgroundColor: "#924F72",
        },
      ]}
      disabled={disabled}
      onPress={() => {
        onPressFunction();
      }}
    >
      <Text
        style={[
          {
            fontFamily: "Poppins-Bold",
            color: "#49108B",
            fontSize: 20,
            maxWidth: 300,
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: 30,
            paddingTop: 4,
          },
        ]}
      >
        {content}
      </Text>
    </Pressable>
  );
};

export const NewRaffleButton = ({ content, onPressFunction }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.93 },
        {
          width: 345,
          height: 55,
          backgroundColor: "#FFC600",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          borderRadius: 10,
        },
      ]}
      onPress={() => {
        onPressFunction();
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          color: "#49108B",
          fontSize: 20,
          maxWidth: 345,
          textAlign: "center",
          textTransform: "uppercase",
          lineHeight: 30,
          paddingTop: 4,
          textAlignVertical: "center",
        }}
      >
        {content}
      </Text>
    </Pressable>
  );
};

export const SmallYellowButtonWithDesabled = ({
  content,
  onPressFunction,
  disabled,
}) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Pressable
      style={[
        {
          width: 160,
          height: 55,
          backgroundColor: "#FFC600",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          borderRadius: 50,
        },
        disabled && {
          backgroundColor: "#924F72",
        },
      ]}
      disabled={disabled}
      onPress={() => {
        onPressFunction();
      }}
    >
      <Text
        style={[
          {
            fontFamily: "Poppins-Bold",
            color: "#49108B",
            fontSize: 20,
            maxWidth: 300,
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: 30,
            paddingTop: 4,
          },
        ]}
      >
        {content}
      </Text>
    </Pressable>
  );
};

export const SmallRedButton = ({ content, onPressFunction }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Pressable
      style={{
        width: 160,
        height: 55,
        backgroundColor: "#D9356A",
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
