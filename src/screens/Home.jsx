import {
  View,
  FlatList,
  Text,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import background from "../../assets/app/background.png";
import { HeaderHome } from "../components/HeaderHome";
import { RaffleCard } from "../components/RaffleCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getRafflesByUserId } from "../utils/raffle_functions";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { getSessionLocalId } from "../utils/storage_functions";
import { NewRaffleButton } from "../ui/Buttons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export function Home() {
  const [session, setSession] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionLocalId();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  async function fetch() {
    setIsLoading(true);
    try {
      if (session?.localId) {
        const response = await getRafflesByUserId(session.localId);
        setData(response);
      }
    } catch (error) {
      console.error("Error fetching raffles:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (session) {
        fetch();
      }
      return () => {};
    }, [session])
  );

  const handleNewRaffle = () => {
    return router.push("/newRaffle");
  };

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

  // Renderizado condicional basado en los tres estados
  const renderContent = () => {
    if (isLoading) {
      // Estado de carga
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
            backgroundColor: "transparent",
            height: 650,
          }}
        >
          <ActivityIndicator size="large" color="#FFC600" />
        </View>
      );
    }

    if (data.length === 0) {
      // Estado sin sorteos
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
            backgroundColor: "transparent",
            height: 650,
          }}
        >
          <Text style={{ color: "#FFC600", fontSize: 18, textAlign: "center" }}>
            Aún no has creado ningún sorteo
          </Text>
          <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center" }}>
            Presiona el botón para crear tu primer sorteo
          </Text>
        </View>
      );
    }

    // Estado con sorteos
    return (
      <View style={{ height: 685 }}>
        <FlatList
          data={data}
          renderItem={renderRaffleCard}
          initialNumToRender={20}
          windowSize={5}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={{
            gap: 15,
            paddingBottom: 50,
          }}
        />
      </View>
    );
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={background}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, position: "relative" }}>
        <View>
          <HeaderHome />
          <View>{renderContent()}</View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: 15,
          }}
        >
          <NewRaffleButton
            onPressFunction={handleNewRaffle}
            content={"+ NUEVO SORTEO"}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
