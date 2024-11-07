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

export function Signup() {
  return (
    <View style={styles.cont}>
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
      ></TextInput>
      <TextInput
        placeholder="Correo electrónico"
        style={{ borderWidth: 1, width: 200 }}
      ></TextInput>
      <TextInput
        placeholder="Contraseña"
        style={{ borderWidth: 1, width: 200 }}
      ></TextInput>
      <Pressable style={styles.btn}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    height: "100%",
    paddingVertical: 40,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    borderWidth: 2,
    borderColor: "red",
  },
});
