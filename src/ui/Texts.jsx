import { Text, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useFonts } from "expo-font";
import { Link } from "expo-router";

export const NormalText = ({ content }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Text
      style={{
        fontFamily: "Poppins-Regular",
        color: "#F3F8FF", // Color del texto
        fontSize: 20,
        maxWidth: 300,
        textAlign: "center",
      }}
    >
      {content}
    </Text>
  );
};

export const HeaderText = ({ content }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Text
      style={{
        fontFamily: "Poppins-Regular",
        fontSize: 18,
        maxWidth: 300,
        textAlign: "center",
        color: "#F3F8FF",
      }}
    >
      {content}
    </Text>
  );
};
export const UnderlineText = ({ content, href }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("../../assets/fonts/Poppins/Poppins-Light.ttf"),
  });

  const [textWidth, setTextWidth] = useState(0); // Estado para almacenar el ancho del texto
  const textRef = useRef(null); // Referencia para el Text

  useEffect(() => {
    // Cuando la fuente esté cargada, medimos el ancho del texto
    if (textRef.current) {
      textRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTextWidth(width); // Guardamos el ancho del texto
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Link href={href} asChild>
      <View style={{ position: "relative", alignItems: "center" }}>
        <Text
          ref={textRef} // Asignamos la referencia
          style={{
            color: "#E0E0E0", // Color del texto
            fontSize: 18,
            textAlign: "center",
            fontFamily: "Poppins-Light", // Fuente personalizada
          }}
        >
          {content}
        </Text>
        <View
          style={{
            position: "absolute",
            bottom: 2, // Colocamos la línea cerca del texto
            height: 1.5, // Grosor del subrayado
            backgroundColor: "#FFC600", // Color del subrayado
            width: textWidth, // Ajustamos el ancho del subrayado
            borderRadius: 100,
          }}
        />
      </View>
    </Link>
  );
};