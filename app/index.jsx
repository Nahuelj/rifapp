import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function index() {
  return (
    <View>
      <Text>index</Text>
      <Link href="/about">about</Link>
    </View>
  );
}
