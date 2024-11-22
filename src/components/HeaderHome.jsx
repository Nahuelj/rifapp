import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Link, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";

export function HeaderHome() {
  const [home, setHome] = useState(true);
  const [account, setAccount] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (path == "/home") {
      setHome(true);
      setAccount(false);
    } else {
      setHome(false);
      setAccount(true);
    }
  }, [path]);

  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 9,
        padding: 10,
        height: 63,
        alignSelf: "center",
        backgroundColor: "#AD62CD",
        marginTop: 5,
        marginBottom: 15,
        borderRadius: 10,
        width: 345,
      }}
    >
      <Link asChild href="/home">
        <TouchableOpacity style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={[
              {
                fontFamily: "Poppins-SemiBold",
                paddingHorizontal: 10,
                backgroundColor: "#FFC600",
                textAlign: "center",
                fontSize: 18,
                flex: 1,
                textAlignVertical: "center",
                borderRadius: 5,
                lineHeight: 46,
                color: "#49108B",
              },
              !home && { opacity: 0.6 },
            ]}
          >
            MIS SORTEOS
          </Text>
        </TouchableOpacity>
      </Link>
      <Link asChild href="/account">
        <TouchableOpacity style={{ flex: 1 }}>
          <Text
            style={[
              {
                fontFamily: "Poppins-SemiBold",
                paddingHorizontal: 10,
                backgroundColor: "#FFC600",
                textAlign: "center",
                fontSize: 18,
                flex: 1,
                textAlignVertical: "center",
                borderRadius: 5,
                lineHeight: 46,
                color: "#49108B",
              },
              !account && { opacity: 0.6 },
            ]}
          >
            MI CUENTA
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
