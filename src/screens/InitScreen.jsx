import {
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import rifapp from "../../assets/app/rifapp_logo.png";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getSessionLocalId } from "../utils/storage_functions";

export const InitScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      console.log("obteniendo session..");
      const localId = await getSessionLocalId();
      if (localId) {
        // Si existe la sesión, redirigir a Home
        return router.replace("/home");
      }
      console.log("🚀 ~ getSession ~ localId:", localId);
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

  return (
    <SafeAreaView style={styles.cont}>
      <Text>🎉 Te damos la Bienvenida 🥳</Text>
      <Image source={rifapp} />
      <Text>Gestiona tus sorteos de forma comoda y segura</Text>
      <Pressable style={styles.btn}>
        <Link href="/login">
          <Text>INICIAR SESIÓN</Text>
        </Link>
      </Pressable>
      <Text>aun no tienes una cuenta ?</Text>
      <Pressable style={styles.btn}>
        <Link href="/signup">
          <Text>CREAR CUENTA</Text>
        </Link>
      </Pressable>

      <Text>
        Problemas para ingresar ?{"  "}
        <Link href="/recover">Recuperar mi cuenta</Link>
      </Text>
      <Text>terminos y condiciones</Text>
    </SafeAreaView>
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
