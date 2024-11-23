import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import { HeaderHome } from "../components/HeaderHome";
import { SafeAreaView } from "react-native-safe-area-context";
import default_img from "../../assets/app/icons/add_image.png";
import { useAuth } from "../hooks/useAuth";
import background from "../../assets/app/background.png";
import { LargeYellowButton } from "../ui/Buttons";
import { EmailText, NameText, NormalText } from "../ui/Texts";

export function Account() {
  const { logout } = useAuth();

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <SafeAreaView>
        <HeaderHome />
        <View
          style={{
            marginHorizontal: "auto",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D7B4FF",
            padding: 20,
            borderRadius: 10,
            marginTop: 15,
            width: 315,
            height: 210,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: 85,
              width: 85,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              marginBottom: 10,
            }}
          >
            <Image source={default_img} />
          </View>
          <NameText color={"white"} content={"Nombre del usuario"} />
          <EmailText color={"black"} content={"correoelectyronico@gmailc.om"} />
        </View>

        <View style={{ marginTop: 30, gap: 30 }}>
          <LargeYellowButton
            content={"Cambiar nombre"}
            backgroundColor={"white"}
          />
          <LargeYellowButton content={"Seguridad"} backgroundColor={"white"} />
          <LargeYellowButton
            content={"Cambiar idioma"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={async () => {
              await logout();
            }}
            content={"Cerrar sesión"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            content={"Eliminar cuenta"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            content={"Terminos y condiciones"}
            backgroundColor={"white"}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
