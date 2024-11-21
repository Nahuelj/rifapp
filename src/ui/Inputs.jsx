import { View, TextInput, Image, Pressable } from "react-native";
import React, { useState } from "react";
import eye from "../../assets/app/icons/eye.png";
import hide from "../../assets/app/icons/hide.png";

export function BasicInput({ placeholder, setState, state }) {
  return (
    <View
      style={{
        width: 300,
        height: 42,
        backgroundColor: "white",
        borderRadius: 5,
      }}
    >
      <TextInput
        onChangeText={(text) => {
          setState(text);
        }}
        value={state}
        placeholder={placeholder}
        style={{
          flex: 1, // Ocupa todo el espacio disponible
          color: "purple",
          fontSize: 20,
          textAlignVertical: "center", // Centra verticalmente el texto
          paddingHorizontal: 10, // Espaciado horizontal
        }}
      />
    </View>
  );
}

export function PasswordInput({ placeholder, setState, state }) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View
      style={{
        width: 300,
        height: 42,
        backgroundColor: "white",
        borderRadius: 5,
        position: "relative",
      }}
    >
      <TextInput
        onChangeText={(text) => {
          setState(text);
        }}
        value={state}
        placeholder={placeholder}
        style={{
          flex: 1, // Ocupa todo el espacio disponible
          color: "purple",
          fontSize: 20,
          textAlignVertical: "center", // Centra verticalmente el texto
          paddingHorizontal: 10, // Espaciado horizontal
        }}
        secureTextEntry={isHidden}
      />

      <Pressable
        onPress={() => {
          setIsHidden((prev) => !prev);
        }}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 60,
          height: 43,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isHidden ? <Image source={hide} /> : <Image source={eye} />}
      </Pressable>
    </View>
  );
}