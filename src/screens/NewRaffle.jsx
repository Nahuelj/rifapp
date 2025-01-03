import { View, Alert, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { addNewRaffle } from "../utils/raffle_functions";
import { LargeText, NormalText } from "../ui/Texts";
import { getSessionLocalId } from "../utils/storage_functions"; // Asegúrate de que esta importación esté presente
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../../assets/app/background.png";
import { BasicInput, NumericInput } from "../ui/Inputs";
import { SmallRedButton, SmallYellowButtonWithDesabled } from "../ui/Buttons";

export function NewRaffle() {
  const router = useRouter();
  const [raffleName, setRaffleName] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [quantityWinners, setQuantityWinners] = useState("");
  const [session, setSession] = useState(null);

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

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionLocalId();
      setSession(sessionData);
    };

    fetchSession(); // Obtener sesión cuando el componente se monte
  }, []);

  // Verifica si la sesión está disponible antes de permitir la creación del sorteo
  const handleCreateRaffle = async () => {
    const result = validateRaffleConfiguration(maxCapacity, quantityWinners);

    if (!result) {
      return null;
    }

    if (!session?.localId) {
      console.error("No se encontró sesión, no se puede crear el sorteo.");
      return;
    }

    await addNewRaffle(
      session.localId, // Usar session.localId en lugar de session?.localId
      raffleName,
      maxCapacity,
      quantityWinners
    );
    router.push("/home");
  };

  const handleBack = () => {
    router.back();
  };

  const validateComplete = () => {
    return !(raffleName.trim() && maxCapacity.trim() && quantityWinners.trim());
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={background}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          paddingHorizontal: 70,
        }}
      >
        <LargeText content={"CREAR SORTEO 🎁"} />
        <NormalText
          content={"Complete los siguientes campos para crear un nuevo sorteo"}
        />

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
  );
}
