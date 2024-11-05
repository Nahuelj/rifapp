import { Text, Image, Pressable, StyleSheet, View } from "react-native";
import rifapp from "../../assets/app/rifapp_logo.png";

export const InitScreen = () => {
  return (
    <View style={styles.cont}>
      <Text>🎉 Te damos la Bienvenida 🥳</Text>
      <Image source={rifapp} />
      <Text>Gestiona tus sorteos de forma comoda y segura</Text>
      <Pressable style={styles.btn}>
        <Text>INICIAR SESIÓN</Text>
      </Pressable>
      <Text>aun no tienes una cuenta ?</Text>
      <Pressable style={styles.btn}>
        <Text>CREAR CUENTA</Text>
      </Pressable>
      <Text>Problemas para ingresar ? recuperar mi cuenta</Text>
      <Text>terminos y condiciones</Text>
    </View>
  );
};

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
