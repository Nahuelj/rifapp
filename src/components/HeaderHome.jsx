import { View, Text } from "react-native";
import { useFonts } from "expo-font";

export function HeaderHome() {
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
        marginBottom: 11,
        borderRadius: 10,
        width: 345,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
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
          ]}
        >
          🎁 MIS SORTEOS 💖
        </Text>
      </View>
    </View>
  );
}
