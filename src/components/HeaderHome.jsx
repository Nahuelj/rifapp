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
      style={{ height: 50, width: "100%", marginTop: 20, marginBottom: 10 }}
    >
      <Text
        style={[
          {
            fontFamily: "Poppins-SemiBold",
            paddingHorizontal: 10,
            textAlign: "center",
            fontSize: 24,
            flex: 1,
            textAlignVertical: "center",
            borderRadius: 5,
            lineHeight: 46,
            color: "white",
          },
        ]}
      >
        🎲 MIS SORTEOS 🏆
      </Text>
    </View>
  );
}
