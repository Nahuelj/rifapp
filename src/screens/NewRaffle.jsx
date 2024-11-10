import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

export function NewRaffle() {
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
      />
      <TextInput
        placeholder="Cantidad de personas"
        style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
      />
      <TextInput
        placeholder="Cantidad de ganadores"
        style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }}
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

        <Link href="/home" asChild>
          <Pressable
            style={{ borderWidth: 1, borderColor: "red", padding: 10 }}
            onPress={() => {
              console.log("Creando sorteo....");
              console.log("Sorteo creado.");
            }}
          >
            <Text>+CREAR</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
