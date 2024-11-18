import {
  Text,
  Image,
  Pressable,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import rifapp from "../../assets/app/rifapp_logo.png";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { signInWithEmailPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.cont}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Link href={"/"}>
          <Text>volver</Text>
        </Link>
        <Text>-</Text>
        <Text>Iniciar sesión</Text>
      </View>
      <Image source={rifapp} />
      <Text>Ingrese sus datos para iniciar sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={{ borderWidth: 1, width: 200 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      ></TextInput>
      <TextInput
        placeholder="Contraseña"
        style={{ borderWidth: 1, width: 200 }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      ></TextInput>
      <Pressable
        style={styles.btn}
        onPress={() => {
          signInWithEmailPassword(email, password);
        }}
      >
        <Text>INICIAR SESIÓN</Text>
      </Pressable>
      <Text>o ingresa con Google</Text>
      <Pressable style={styles.btn}>
        <Text>ingresar con Google</Text>
      </Pressable>

      <Text>
        Aun no tienes cuenta?{"  "}
        <Link href="/signup">
          <Text>Registrarme</Text>
        </Link>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    height: "100%",
    paddingVertical: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    borderWidth: 2,
    borderColor: "red",
  },
});
