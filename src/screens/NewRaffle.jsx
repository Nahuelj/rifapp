import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";

export function NewRaffle() {
  return (
    <View>
      <Text>CREAR SORTEO 🎁</Text>
      <Text>Complete los siguientes campos para crear un nuevo sorteo</Text>
      <TextInput placeholder="Nombre del sorteo" />
      <TextInput placeholder="Cantidad de personas" />
      <TextInput placeholder="Cantidad de ganadores" />
      <TextInput placeholder="+ Agregar imagen" />
      <View style={{ flexDirection: "row", gap: 20, justifyContent: "center" }}>
        <Pressable>
          <Text>VOLVER</Text>
        </Pressable>
        <Pressable>
          <Text>+CREAR</Text>
        </Pressable>
      </View>
    </View>
  );
}
