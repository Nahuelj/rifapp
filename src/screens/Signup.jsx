import {
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { BackHeader } from "../ui/BackHeader";
import { RifappLogo } from "../ui/RifappLogo";
import background from "../../assets/app/background.png";
import { NormalText, UnderlineText } from "../ui/Texts";

export function Signup() {
  const { registerWithEmailPassword } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <ImageBackground source={background}>
      <SafeAreaView style={styles.cont}>
        <BackHeader onPressFunction={handleBack} content={"Volver al inicio"} />
        <RifappLogo />

        <NormalText
          content={"Complete los siguientes campos para registrarse"}
        />
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
            registerWithEmailPassword(email, password, name);
          }}
        >
          <Text>REGISTRARME</Text>
        </Pressable>

        <View
          style={{
            alignItems: "center",
            width: 300,
            marginBottom: 10,
          }}
        >
          <NormalText content={"¿Ya tienes una cuenta?"} />
          <UnderlineText
            onPressFunction={handleLogin}
            content={"Iniciar Sesión"}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
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
