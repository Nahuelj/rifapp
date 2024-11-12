import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { HeaderHome } from "../components/HeaderHome";
import { SafeAreaView } from "react-native-safe-area-context";
import default_img from "../../assets/app/default_image_raffle_card.png";

export function Account() {
  return (
    <SafeAreaView>
      <HeaderHome />
      <View
        style={{
          marginHorizontal: "auto",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "grey",
          padding: 20,
          borderRadius: 10,
          gap: 10,
          marginTop: 20,
        }}
      >
        <Image source={default_img} />
        <Text>Nombre Usuario</Text>
        <Text>correoelectronico@algo.com</Text>
      </View>

      <View style={{ marginTop: 100, gap: 50 }}>
        <TouchableOpacity
          style={{
            marginHorizontal: "auto",
            borderBlockColor: "red",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text>Cambiar nombre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: "auto",
            borderBlockColor: "red",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text>Cambiar mi contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: "auto",
            borderBlockColor: "red",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text>Cambiar idioma</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: "auto",
            borderBlockColor: "red",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text>Terminos y condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginHorizontal: "auto",
            borderBlockColor: "red",
            borderWidth: 1,
            padding: 10,
          }}
        >
          <Text>Eliminar cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
