import { View } from "react-native";
import { HeaderHome } from "../components/HeaderHome";
import { RaffleCard } from "../components/RaffleCard";
import { BtnNewRaffle } from "../components/BtnNewRaffle";

export function Home() {
  return (
    <>
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
    </>
  );
}
