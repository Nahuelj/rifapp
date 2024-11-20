import { View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { addNewRaffle } from "../utils/raffle_functions";
import { getSessionLocalId } from "../utils/storage_functions"; // Asegúrate de que esta importación esté presente

export function NewRaffle() {
  const [raffleName, setRaffleName] = useState(false);
  const [maxCapacity, setMaxCapacity] = useState(false);
  const [quantityWinners, setQuantityWinners] = useState(false);
  const [session, setSession] = useState(null);

  // Validation function
  const validateRaffleConfiguration = (participants, totalWinners) => {
    const MAX_PARTICIPANTS = 500;
    const totalParticipants = participants;

    if (totalParticipants > MAX_PARTICIPANTS) {
      Alert.alert(
        "Límite excedido",
        `El número máximo de participantes es ${MAX_PARTICIPANTS}.`
      );
      return false;
    }

    if (totalWinners > totalParticipants) {
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
      console.log("🚀 ~ fetchSession ~ sessionData:", sessionData);
      setSession(sessionData);
    };

    fetchSession(); // Obtener sesión cuando el componente se monte
  }, []);

  // Verifica si la sesión está disponible antes de permitir la creación del sorteo
  const handleCreateRaffle = async () => {
    if (!session?.localId) {
      console.log("No se encontró sesión, no se puede crear el sorteo.");
      return;
    }

    console.log("Creando sorteo....");
    await addNewRaffle(
      session.localId, // Usar session.localId en lugar de session?.localId
      raffleName,
      maxCapacity,
      quantityWinners
    );
    console.log("Sorteo creado.");
    router.push("/home");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        paddingHorizontal: 70,
      }}
    >
      <Text style={{ marginHorizontal: "auto" }}>CREAR SORTEO 🎁</Text>
      <Text>Complete los siguientes campos para crear un nuevo sorteo</Text>
      <TextInput
        placeholder="Nombre del sorteo"
        style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
        onChangeText={(text) => setRaffleName(text)}
        value={raffleName}
      />
      <TextInput
        placeholder="Cantidad de personas"
        style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
        onChangeText={(text) => setMaxCapacity(text)}
        keyboardType="numeric"
        value={maxCapacity}
      />
      <TextInput
        placeholder="Cantidad de ganadores"
        style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
        onChangeText={(text) => setQuantityWinners(text)}
        keyboardType="numeric"
        value={quantityWinners}
      />

      <View style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}>
        <Link href="/home" asChild>
          <Pressable
            style={{ borderWidth: 1, borderColor: "red", padding: 10 }}
          >
            <Text>VOLVER</Text>
          </Pressable>
        </Link>

        <Pressable
          style={{ borderWidth: 1, borderColor: "red", padding: 10 }}
          onPress={() => {
            if (raffleName && maxCapacity && quantityWinners) {
              const validation = validateRaffleConfiguration(
                maxCapacity,
                quantityWinners
              );

              if (validation) {
                handleCreateRaffle();
                setTimeout(() => {
                  setRaffleName("");
                  setMaxCapacity("");
                  setQuantityWinners("");
                }, 1000);
              }
            } else {
              Alert.alert(
                "No se puede crear el sorteo",
                `Complete los campos requeridos para crear un nuevo sorteo.`,
                [{ text: "OK", onPress: () => "" }]
              );
            }
          }} // Llamar a la función para crear el sorteo
        >
          <Text>+CREAR</Text>
        </Pressable>
      </View>
    </View>
  );
}
