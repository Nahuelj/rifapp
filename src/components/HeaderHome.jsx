import { View, Text } from "react-native";
import { Link } from "expo-router";
import React from "react";

export function HeaderHome() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 30,
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <Link asChild href="/home">
        <Text style={{ borderWidth: 1, borderBlockColor: "red", padding: 10 }}>
          MIS SORTEOS
        </Text>
      </Link>
      <Link asChild href="/account">
        <Text style={{ borderWidth: 1, borderBlockColor: "red", padding: 10 }}>
          MI CUENTA
        </Text>
      </Link>
    </View>
  );
}
