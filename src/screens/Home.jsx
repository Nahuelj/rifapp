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
      id: `jfa234-jasdklf-${Math.random() * (1234 - 0) + 0}`,
      image:
        "https://i0.wp.com/ahora.com.ar/wp-content/uploads/2024/09/brinco-sorteojpg-1.webp?w=696&quality=80&ssl=1",
    },
    {
      title: "Titulo de Sorteo",
      numbers: "object",
      maxCapacity: 100,
      currentCapacity: 25,
      isActive: true,
      id: `jfa234-jasdklf-${Math.random() * (1234 - 0) + 0}`,
      image:
        "https://i0.wp.com/ahora.com.ar/wp-content/uploads/2024/09/brinco-sorteojpg-1.webp?w=696&quality=80&ssl=1",
    },
    {
      title: "Titulo de Sorteo",
      numbers: "object",
      maxCapacity: 100,
      currentCapacity: 25,
      isActive: true,
      id: `jfa234-jasdklf-${Math.random() * (1234 - 0) + 0}`,
      image:
        "https://i0.wp.com/ahora.com.ar/wp-content/uploads/2024/09/brinco-sorteojpg-1.webp?w=696&quality=80&ssl=1",
    },
    {
      title: "Titulo de Sorteo",
      numbers: "object",
      maxCapacity: 100,
      currentCapacity: 25,
      isActive: true,
      id: `jfa234-jasdklf-${Math.random() * (1234 - 0) + 0}`,
      image:
        "https://i0.wp.com/ahora.com.ar/wp-content/uploads/2024/09/brinco-sorteojpg-1.webp?w=696&quality=80&ssl=1",
    },
    {
      title: "Titulo de Sorteo",
      numbers: "object",
      maxCapacity: 100,
      currentCapacity: 25,
      isActive: true,
      id: `jfa234-jasdklf-${Math.random() * (1234 - 0) + 0}`,
      image:
        "https://i0.wp.com/ahora.com.ar/wp-content/uploads/2024/09/brinco-sorteojpg-1.webp?w=696&quality=80&ssl=1",
    },
    {
      title: "Titulo de Sorteo",
      numbers: "object",
      maxCapacity: 100,
      currentCapacity: 25,
      isActive: true,
      id: `jfa234-jasdklf-${Math.random() * (1234 - 0) + 0}`,
      image:
        "https://i0.wp.com/ahora.com.ar/wp-content/uploads/2024/09/brinco-sorteojpg-1.webp?w=696&quality=80&ssl=1",
    },
  ];

  const renderRaffleCard = ({ item }) => (
    <RaffleCard
      img={item.image}
      maxCapacity={item.maxCapacity}
      currentCapacity={item.currentCapacity}
      title={item.title}
      isActive={item.isActive}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <HeaderHome />

        <View style={{ height: 680 }}>
          <FlatList
            data={data}
            renderItem={renderRaffleCard}
            initialNumToRender={20}
            windowSize={5} // Ajusta este valor según tu necesidad
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              padding: 16,
              gap: 20, // Funciona en versiones más recientes de React Native
            }}
          />
        </View>
      </View>

      <BtnNewRaffle />
    </SafeAreaView>
  );
}
