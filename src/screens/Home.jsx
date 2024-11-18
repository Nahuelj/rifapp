import { View, FlatList, Text } from "react-native";
import { HeaderHome } from "../components/HeaderHome";
import { RaffleCard } from "../components/RaffleCard";
import { BtnNewRaffle } from "../components/BtnNewRaffle";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getRafflesByUserId } from "../utils/raffle_functions";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { getSessionLocalId } from "../utils/storage_functions";

export function Home() {
  const [session, setSession] = useState(null); // Estado para la sesión
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionLocalId();
      console.log("🚀 ~ fetchSession ~ sessionData:", sessionData);
      setSession(sessionData);
    };

    fetchSession(); // Obtener sesión cuando el componente se monte
  }, []);

  async function fetch() {
    if (session?.localId) {
      // Asegúrate de que la sesión esté disponible antes de hacer la solicitud
      const response = await getRafflesByUserId(session.localId);
      setData(response);
    }
  }

  useFocusEffect(
    useCallback(() => {
      // Solo hacer la solicitud si la sesión ya se obtuvo
      if (session) {
        fetch();
      }
      return () => {
        console.log(
          "ya no estoy focusadooo ---------------------------------------------------------------"
        );
      };
    }, [session]) // Dependencia para que se vuelva a ejecutar cuando la sesión cambie
  );

  const renderRaffleCard = ({ item }) => (
    <RaffleCard
      img={item?.image}
      maxCapacity={item?.maxCapacity}
      currentCapacity={item?.currentCapacity}
      title={item?.title}
      isActive={item?.isActive}
      id={item.id}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <HeaderHome />

        <View style={{ height: 680 }}>
          {data?.length === 0 ? (
            <View style={{ margin: "auto", alignItems: "center", gap: 15 }}>
              <Text>No tienes sorteos creados te invitamos a crear uno</Text>
              <Text>⬇️⬇️⬇️</Text>
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={renderRaffleCard}
              initialNumToRender={20}
              windowSize={5} // Ajusta este valor según tu necesidad
              keyExtractor={(item) => item?.id}
              contentContainerStyle={{
                padding: 16,
                gap: 20, // Funciona en versiones más recientes de React Native
              }}
            />
          )}
        </View>
      </View>

      <BtnNewRaffle />
    </SafeAreaView>
  );
}
