import { Pressable, Text, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useFonts } from "expo-font";

export const PodioText = ({ content, color, formatText }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{
        fontFamily: "Poppins-Regular",
        color: color ? color : "#F3F8FF", // Color del texto
        fontSize: 20,
        maxWidth: 200,
        textAlign: "center",
        alignSelf: "center",
        textTransform: formatText ? formatText : "none",
      }}
    >
      {content}
    </Text>
  );
};

export const NormalText = ({ content, color, formatText }) => {
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
        color: color ? color : "#F3F8FF", // Color del texto
        fontSize: 20,
        maxWidth: 300,
        textAlign: "center",
        alignSelf: "center",
        textTransform: formatText ? formatText : "none",
      }}
    >
      {content}
    </Text>
  );
};

export const NameText = ({ content, color, formatText }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../../assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{
        fontFamily: "Poppins-Bold",
        color: color ? color : "#F3F8FF", // Color del texto
        fontSize: 25,
        maxWidth: 300,
        textAlign: "center",
        alignSelf: "center",
        textTransform: formatText ? formatText : "none",
      }}
    >
      {content}
    </Text>
  );
};

export const EmailText = ({ content, color, formatText }) => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>..</Text>;
  }

  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{
        fontFamily: "Poppins-Regular",
        color: color ? color : "#F3F8FF", // Color del texto
        fontSize: 18,
        maxWidth: 300,
        textAlign: "center",
        alignSelf: "center",
        textTransform: formatText ? formatText : "none",
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

export const UnderlineText = ({ content, onPressFunction }) => {
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
    return <Text>...</Text>;
  }

  return (
    <Pressable
      onPress={() => {
        onPressFunction();
      }}
    >
      <View style={{ position: "relative", alignItems: "center" }}>
        <Text
          ref={textRef} // Asignamos la referencia
          style={{
            color: "#F3F8FF",
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
    </Pressable>
  );
};

export const LargeText = ({ content }) => {
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
        fontSize: 32,
        width: 400,
        alignSelf: "center",
        textAlign: "center",
      }}
    >
      {content}
    </Text>
  );
};
