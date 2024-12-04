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
import { useState, useCallback, useRef, useEffect } from "react";
import { NewRaffleButton } from "../ui/Buttons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { getRaffles } from "../utils/raffle_local_functions";

export function Home() {
  const flatListRef = useRef(null); // Referencia al FlatList
  const { scrollToTop } = useLocalSearchParams(); // Leer parámetros de la URL
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function fetch() {
        const raffles = await getRaffles();
        setData(raffles);
        setIsLoading(false);
      }
      fetch();
      // Función que se ejecuta cuando la pantalla gana el foco
    }, [])
  );

  // Desplazar al inicio si el parámetro `scrollToTop` está presente
  useEffect(() => {
    if (scrollToTop && flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [scrollToTop]);

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
          ref={flatListRef} // Asignar la referencia
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
            bottom: 5,
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
