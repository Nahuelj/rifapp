import { View, FlatList } from "react-native";
import { HeaderHome } from "../components/HeaderHome";
import { RaffleCard } from "../components/RaffleCard";
import { BtnNewRaffle } from "../components/BtnNewRaffle";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  // simulacion de data traida desde la db
  const data = [
    {
      title: "Titulo de Sorteo",
      numbers: "object",
      maxCapacity: 100,
      currentCapacity: 25,
      isActive: true,
      id: "jfa234-jasdklf-2l34j",
      image:
        "https://i0.wp.com/ahora.com.ar/wp-content/uploads/2024/09/brinco-sorteojpg-1.webp?w=696&quality=80&ssl=1",
    },
  ];

  const renderRaffleCard = ({ item }) => (
    <RaffleCard
      img={item.image}
      raffleLimits={item.maxCapacity}
      title={item.title}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <HeaderHome />

        <View style={{ height: 715 }}>
          <FlatList
            data={data}
            renderItem={renderRaffleCard}
            numColumns={5}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 10,
              marginBottom: 10,
            }}
            contentContainerStyle={""}
            initialNumToRender={20}
            windowSize={5} // Ajusta este valor según tu necesidad
          />
        </View>
      </View>

      <BtnNewRaffle />
    </SafeAreaView>
  );
}
