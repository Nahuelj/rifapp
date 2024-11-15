import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { addNewRaffle } from "../utils/raffle_functions";
import { getSessionLocalId } from "../utils/storage_functions"; // Asegúrate de que esta importación esté presente

export function NewRaffle() {
  const [raffleName, setRaffleName] = useState(false);
  const [maxCapacity, setMaxCapacity] = useState(false);
  const [quantityWinners, setQuantityWinners] = useState(false);
  const [session, setSession] = useState(null);
  console.log("🚀 ~ NewRaffle ~ session:", session);

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
        value={maxCapacity}
      />
      <TextInput
        placeholder="Cantidad de ganadores"
        style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
        onChangeText={(text) => setQuantityWinners(text)}
        value={quantityWinners}
      />
      <TextInput
        placeholder="+ Agregar imagen"
        style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
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
          onPress={handleCreateRaffle} // Llamar a la función para crear el sorteo
        >
          <Text>+CREAR</Text>
        </Pressable>
      </View>
    </View>
  );
}
