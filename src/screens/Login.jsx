import { StyleSheet, ImageBackground, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import background from "../../assets/app/background.png";
import { RifappLogo } from "../ui/RifappLogo";
import { BackHeader } from "../ui/BackHeader";
import { NormalText, UnderlineText } from "../ui/Texts";
import { LargeYellowButtonWithDisabled } from "../ui/Buttons";
import { BasicInput, PasswordInput } from "../ui/Inputs";

export function Login() {
  const { signInWithEmailPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    router.push("/");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
    await signInWithEmailPassword(email, password);
  };

  const validateComplete = () => {
    return !(email.trim() && password.trim());
  };

  return (
    <ImageBackground source={background}>
      <SafeAreaView style={styles.cont}>
        <BackHeader onPressFunction={handleBack} content={"Volver al inicio"} />

        <RifappLogo />

        <NormalText content={"Ingrese sus datos para iniciar sesión"} />

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

        <LargeYellowButtonWithDisabled
          content={"iniciar sesión"}
          onPressFunction={handleLogin}
          disabled={validateComplete()}
        />

        <View
          style={{
            alignItems: "center",
            width: 300,
            marginBottom: 10,
          }}
        >
          <NormalText content={"¿No tienes cuenta?"} />
          <UnderlineText
            onPressFunction={handleSignUp}
            content={"Registrarme"}
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
