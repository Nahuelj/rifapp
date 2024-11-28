import { StyleSheet, ImageBackground, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { BackHeader } from "../ui/BackHeader";
import { RifappLogo } from "../ui/RifappLogo";
import background from "../../assets/app/background.png";
import { NormalText, UnderlineText } from "../ui/Texts";
import { LargeYellowButtonWithDisabled } from "../ui/Buttons";
import { BasicInput, PasswordInput } from "../ui/Inputs";

export function Signup() {
  const { registerWithEmailPassword } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.push("/login");
  };

  const validateComplete = () => {
    return !(name.trim() && email.trim() && password.trim());
  };

  const handleSignUp = async () => {
    await registerWithEmailPassword(email, password, name);
  };

  return (
    <ImageBackground source={background}>
      <SafeAreaView style={styles.cont}>
        <BackHeader content={"Volver al inicio"} />
        <RifappLogo />

        <NormalText
          content={"Complete los siguientes campos para registrarse"}
        />

        <View style={{ gap: 40, marginBottom: 60 }}>
          <BasicInput placeholder={"Nombre"} setState={setName} state={name} />
          <BasicInput
            placeholder={"Correo electronico"}
            setState={setEmail}
            state={email}
          />

          <PasswordInput
            placeholder={"Contraseña"}
            setState={setPassword}
            state={password}
          />
        </View>

        <View style={{ marginBottom: 55 }}>
          <LargeYellowButtonWithDisabled
            content={"registrarme"}
            onPressFunction={handleSignUp}
            disabled={validateComplete()}
          />
        </View>

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
