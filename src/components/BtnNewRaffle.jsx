import { Text, Pressable } from "react-native";
import { Link } from "expo-router";

export function BtnNewRaffle() {
  return (
    <Link href="/newRaffle" asChild>
      <Pressable
        style={{
          backgroundColor: "orange",
          width: 200,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderRadius: 5,
          alignSelf: "center",
          position: "absolute",
          bottom: 10,
          borderWidth: 1,
          borderColor: "black",
          zIndex: 5,
        }}
      >
        <Text>+ NUEVO SORTEO</Text>
      </Pressable>
    </Link>
  );
}
