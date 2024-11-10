import { View } from "react-native";
import { HeaderHome } from "../components/HeaderHome";
import { RaffleCard } from "../components/RaffleCard";
import { BtnNewRaffle } from "../components/BtnNewRaffle";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <HeaderHome />
        <View style={{ gap: 15 }}>
          <RaffleCard />
          <RaffleCard />
          <RaffleCard />
          <RaffleCard />
        </View>
      </View>
      <BtnNewRaffle />
    </SafeAreaView>
  );
}
