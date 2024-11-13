import {
  Text,
  Image,
  Pressable,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import rifapp from "../../assets/app/rifapp_logo.png";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("🚀 ~ Signup ~ name:", name);
  console.log("🚀 ~ Signup ~ email:", email);
  console.log("🚀 ~ Signup ~ password:", password);

  const handleRegister = (email, password) => {};

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
        <Text>Crear una cuenta</Text>
      </View>
      <Image source={rifapp} />
      <Text>Complete los siguientes campos para registrarse</Text>
      <TextInput
        placeholder="Nombre"
        style={{ borderWidth: 1, width: 200 }}
        onChangeText={(text) => setName(text)}
        value={name}
      ></TextInput>
      <TextInput
        textContentType="emailAddress"
        placeholder="Correo electrónico"
        style={{ borderWidth: 1, width: 200 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      ></TextInput>
      <TextInput
        placeholder="Contraseña"
        style={{ borderWidth: 1, width: 200 }}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      ></TextInput>
      <Pressable
        style={styles.btn}
        onPress={() => {
          handleRegister(email, password);
        }}
      >
        <Text>REGISTRARME</Text>
      </Pressable>
      <Text>o registrate con Google</Text>
      <Pressable style={styles.btn}>
        <Text>continuar con Google</Text>
      </Pressable>

      <Text>
        Ya tienes una cuenta?{"  "}
        <Link href="/login">
          <Text>Iniciar sesión</Text>
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
