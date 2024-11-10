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

export function Login() {
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
      ></TextInput>
      <TextInput
        placeholder="Contraseña"
        style={{ borderWidth: 1, width: 200 }}
      ></TextInput>
      <Pressable style={styles.btn}>
        <Link href="/home">
          <Text>INICIAR SESIÓN</Text>
        </Link>
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
