import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderHome } from "../components/HeaderHome";
import { SafeAreaView } from "react-native-safe-area-context";
import default_img from "../../assets/app/icons/add_image.png";
import { useAuth } from "../hooks/useAuth";
import background from "../../assets/app/background.png";
import { LargeYellowButton } from "../ui/Buttons";
import { EmailText, NameText, NormalText } from "../ui/Texts";
import { getSessionLocalId } from "../utils/storage_functions";

export function Account() {
  const { logout } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionLocalId();
      const { displayName, email } = sessionData;
      setDisplayName(displayName);
      setEmail(email);
    };

    fetchSession(); // Obtener sesión cuando el componente se monte
  }, []);

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
          <NameText
            formatText={"capitalize"}
            color={"white"}
            content={displayName}
          />
          <EmailText color={"black"} content={email} />
        </View>

        <View style={{ marginTop: 30, gap: 30 }}>
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Cambiar nombre"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Seguridad"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
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
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Eliminar cuenta"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Terminos y condiciones"}
            backgroundColor={"white"}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
