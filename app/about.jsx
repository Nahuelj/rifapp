import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function index() {
  return (
    <View>
      <Text>about</Text>
      <Link href="/">index</Link>
    </View>
  );
}
