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

export function Login() {
  return (
    <View style={styles.cont}>
      <View>
        <Link href={"/"}>
          <Text>volver</Text>
        </Link>
        <Text>Iniciar sesión</Text>
      </View>
      <Image source={rifapp} />
      <Text>Complete los siguientes campos para registrarse</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={{ borderWidth: 1, width: 200 }}
      ></TextInput>
      <TextInput
        placeholder="Contraseña"
        style={{ borderWidth: 1, width: 200 }}
      ></TextInput>
      <Text>aun no tienes una cuenta ?</Text>
      <Pressable style={styles.btn}>
        <Link href="/signup">
          <Text>CREAR CUENTA</Text>
        </Link>
      </Pressable>
      <Text>Problemas para ingresar ? recuperar mi cuenta</Text>
      <Text>terminos y condiciones</Text>
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
