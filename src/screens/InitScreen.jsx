import {
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  View,
  ImageBackground,
  Linking,
} from "react-native";
import rifapp from "../../assets/app/rifapp_logo.png";
import background from "../../assets/app/background.png";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getSessionLocalId } from "../utils/storage_functions";
import { NormalText, UnderlineText, HeaderText } from "../ui/Texts";
import { LargeYellowButton } from "../ui/Buttons";
import { StatusBar } from "expo-status-bar";

export const InitScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      const localId = await getSessionLocalId();
      if (localId) {
        // Si existe la sesión, redirigir a Home
        return router.replace("/home");
      }
      setIsLoading(false); // Detener el loader si no hay sesión
    }
    getSession();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        {/* Muestra el loader mientras se obtiene la sesión */}
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleRecover = () => {
    router.push("/recover");
  };

  const handleTerms = () => {
    Linking.openURL("https://www.tu-sitio-web.com").catch((err) =>
      console.error("Error al abrir el sitio web:", err)
    );
  };

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground source={background}>
        <SafeAreaView style={styles.cont}>
          <View style={{ marginTop: 10 }}>
            <HeaderText content={"🎉 Te damos la Bienvenida 🥳"} />
          </View>
          <Image style={{ width: 330, height: 100 }} source={rifapp} />
          <NormalText
            content={"Gestiona tus sorteos de forma comoda y segura"}
          />
          <LargeYellowButton
            content={"INICIAR SESIÓN"}
            onPressFunction={handleLogin}
          />
          <NormalText content={"Aun no tienes una cuenta ?"} />
          <LargeYellowButton
            content={"CREAR CUENTA"}
            onPressFunction={handleSignUp}
          />
          <View style={{ marginBottom: 60 }}>
            <NormalText content={`Problemas para ingresar ?`} />
            <UnderlineText
              onPressFunction={handleRecover}
              content={"recuperar mi cuenta"}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <UnderlineText
              onPressFunction={handleTerms}
              content={"terminos y condiciones"}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  cont: {
    height: "100%",
    paddingVertical: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    borderWidth: 2,
    borderColor: "red",
  },
});
