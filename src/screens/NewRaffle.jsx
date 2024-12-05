import {
  View,
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { LargeText, NormalText } from "../ui/Texts";
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../../assets/app/background.png";
import { BasicInput, NumericInput } from "../ui/Inputs";
import { SmallRedButton, SmallYellowButtonWithDesabled } from "../ui/Buttons";
import { addNewRaffle } from "../utils/raffle_local_functions";

export function NewRaffle() {
  const { width, height } = Dimensions.get("window");
  const router = useRouter();
  const [raffleName, setRaffleName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [quantityWinners, setQuantityWinners] = useState("");

  const validateRaffleConfiguration = (participants, totalWinners) => {
    const MAX_PARTICIPANTS = 500;
    const totalParticipants = parseInt(participants, 10); // Convertir a número
    const winners = parseInt(totalWinners, 10); // Convertir a número

    // Verificar que los valores son números válidos
    if (isNaN(totalParticipants) || isNaN(winners)) {
      Alert.alert("Error", "Por favor ingrese números válidos");
      return false;
    }

    if (totalParticipants > MAX_PARTICIPANTS) {
      Alert.alert(
        "Límite excedido",
        `El número máximo de participantes es ${MAX_PARTICIPANTS}.`
      );
      return false;
    }

    if (winners > totalParticipants) {
      Alert.alert(
        "Número de ganadores inválido",
        "La cantidad de ganadores no puede ser mayor al número de participantes."
      );
      return false;
    }

    return true;
  };

  // Verifica si la sesión está disponible antes de permitir la creación del sorteo
  const handleCreateRaffle = async () => {
    const result = validateRaffleConfiguration(maxCapacity, quantityWinners);

    if (!result) {
      return null;
    }

    // add new raffle
    await addNewRaffle(raffleName, maxCapacity, quantityWinners);

    // Redirigir y pasar un parámetro
    router.push({ pathname: "/home", params: { scrollToTop: true } });
  };

  const handleBack = () => {
    router.back();
  };

  const validateComplete = () => {
    return !(raffleName.trim() && maxCapacity.trim() && quantityWinners.trim());
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ImageBackground style={{ flex: 1 }} source={background}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            paddingHorizontal: 70,
          }}
        >
          <LargeText content={"CREAR SORTEO 🎁"} />

          {height > 700 && (
            <NormalText
              content={
                "Complete los siguientes campos para crear un nuevo sorteo"
              }
            />
          )}

          <View
            style={{
              gap: 40,
              width: 300,
              alignSelf: "center",
              height: 400,
              marginBottom: 5,
            }}
          >
            <BasicInput
              setState={setRaffleName}
              state={raffleName}
              placeholder={"Nombre del sorteo"}
            />
            <NumericInput
              setState={setMaxCapacity}
              state={maxCapacity}
              placeholder={"Cantidad de personas"}
            />
            <NumericInput
              setState={setQuantityWinners}
              state={quantityWinners}
              placeholder={"Cantidad de ganadores"}
            />

            <NormalText
              content={
                "Ingresa el nombre del sorteo, el número de participantes y la cantidad de ganadores que se generaran al realizar el sorteo"
              }
            />
          </View>

          <View
            style={{ flexDirection: "row", gap: 15, justifyContent: "center" }}
          >
            <SmallRedButton onPressFunction={handleBack} content={"Volver"} />

            <SmallYellowButtonWithDesabled
              onPressFunction={handleCreateRaffle}
              content={"+ Crear"}
              disabled={validateComplete()}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Pressable>
  );
}
