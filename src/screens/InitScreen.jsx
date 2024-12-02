import { StyleSheet, View, ImageBackground } from "react-native";
import background from "../../assets/app/background.png";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { NormalText, HeaderText } from "../ui/Texts";
import { LargeYellowButton } from "../ui/Buttons";
import { RifappLogo } from "../ui/RifappLogo";

export const InitScreen = () => {
  const handleStart = () => {
    router.push("/home");
  };

  return (
    <>
      <ImageBackground source={background}>
        <SafeAreaView style={styles.cont}>
          <View style={{ marginTop: 10 }}>
            <HeaderText content={"🎉 Te damos la Bienvenida 🥳"} />
          </View>

          <RifappLogo />
          <NormalText
            content={"Gestiona tus sorteos de forma comoda y segura"}
          />
          <NormalText
            content={
              "Aqui podras crear tus sorteos personalizados, anotar quienes participan con su numero elegido y realizar un sorteo de forma sencilla y transparente."
            }
          />
          <NormalText content={"¡Crea, anotá y sortea!"} />
          <LargeYellowButton
            content={"COMENZAR"}
            onPressFunction={handleStart}
          />

          <View style={{ marginBottom: 10 }}></View>
        </SafeAreaView>
      </ImageBackground>
    </>
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
