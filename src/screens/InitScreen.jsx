import { StyleSheet, View, ImageBackground } from "react-native";
import background from "../../assets/app/background.png";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NormalText, HeaderText } from "../ui/Texts";
import { LargeYellowButton } from "../ui/Buttons";
import { RifappLogo } from "../ui/RifappLogo";
import { useEffect } from "react";
import { StatusBar, Dimensions } from "react-native";

export const InitScreen = () => {
  const { width, height } = Dimensions.get("window");

  const handleStart = () => {
    router.push("/home");
  };

  useEffect(() => {
    StatusBar.setBackgroundColor("#AD62CD");
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <ImageBackground source={background}>
      <SafeAreaView style={styles.cont}>
        <View style={{ marginTop: 10 }}>
          <HeaderText content={"🎉 Te damos la Bienvenida 🥳"} />
        </View>
        <RifappLogo />
        {height > 700 && (
          <NormalText
            content={"📋 Gestiona tus sorteos de forma cómoda 🛋️ y segura 🔒!"}
          />
        )}
        <NormalText
          content={
            "Crea sorteos personalizados, anota participantes con sus números 🔢 y realiza sorteos de forma sencilla y transparente. ✨"
          }
        />
        <NormalText content={"¡Crea 🌟, anotá 📝 y sortea 🎲!"} />
        <LargeYellowButton content={"COMENZAR"} onPressFunction={handleStart} />
        <View style={{ marginBottom: 10 }}></View>
      </SafeAreaView>
    </ImageBackground>
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
    backgroundColor: "#9631c3",
  },
  btn: {
    borderWidth: 2,
    borderColor: "red",
  },
});
