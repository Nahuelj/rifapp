import { View, Pressable, Image, Text } from "react-native";
import { HeaderText } from "./Texts";
import arrow from "../../assets/app/icons/left_arrow_purple.png";
import arrow_white from "../../assets/app/icons/left_arrow.png";

import { Link } from "expo-router";
import { useFonts } from "expo-font";

export function BackHeader({ content }) {
  return (
    <Link href={"/"} asChild>
      <Pressable
        style={{
          flexDirection: "row",
          alignContent: "flex-start",
          gap: 15,
          width: 320,
          marginTop: 10,
          paddingRight: 80,
        }}
      >
        <View>
          <Image source={arrow_white} />
        </View>

        <View style={{ marginTop: 1 }}>
          <HeaderText content={content}></HeaderText>
        </View>
      </Pressable>
    </Link>
  );
}

export function BackHeaderRaffle({ raffleTitle }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Link href={"/home"} asChild>
      <Pressable
        style={{
          flexDirection: "row",
          alignContent: "flex-start",
          gap: 15,
          height: 40,
          marginTop: 5,
          marginBottom: 5,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#FFC600",
            borderRadius: 5,
            paddingHorizontal: 10,
            width: "90%",
            maxWidth: 360,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              marginTop: 5,
              alignSelf: "flex-start",
            }}
          >
            <Image source={arrow} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: "#49108B",
                fontFamily: "Poppins-Bold",
                fontSize: 21,
                textTransform: "capitalize",
                marginTop: 3,
                textAlign: "center",
              }}
            >
              {raffleTitle}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
