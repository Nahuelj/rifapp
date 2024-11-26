import { Image, View, ImageBackground, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { HeaderHome } from "../components/HeaderHome";
import { SafeAreaView } from "react-native-safe-area-context";
import default_img from "../../assets/app/icons/add_image.png";
import { useAuth } from "../hooks/useAuth";
import background from "../../assets/app/background.png";
import { LargeYellowButton } from "../ui/Buttons";
import { EmailText, NameText } from "../ui/Texts";
import { getSessionLocalId } from "../utils/storage_functions";
import * as ImagePicker from "expo-image-picker"; // Importar ImagePicker

export function Account() {
  const { logout } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(default_img);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSessionLocalId();
      console.log(
        "🚀 ~ fetchSession ~ sessionData:--------------------------------------------------------------------",
        sessionData
      );
      const { displayName, email, profilePhoto } = sessionData;

      setDisplayName(displayName);
      setEmail(email);

      // Si existe una foto de perfil guardada, usarla
      if (profilePhoto) {
        setProfileImage({ uri: profilePhoto });
      }
    };

    fetchSession();
  }, []);

  const saveSession = async (data, profilePhoto = null) => {
    try {
      // Crear una copia del objeto de datos para no modificar el original
      const sessionData = { ...data };

      // Si se proporciona una foto de perfil, agregarla al objeto de sesión
      if (profilePhoto) {
        sessionData.profilePhoto = profilePhoto;
      }

      await AsyncStorage.setItem("userSession", JSON.stringify(sessionData));
    } catch (error) {
      console.error("Error saving session:", error);
      throw error;
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Lo siento, necesitamos permisos para acceder a la galería");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;

      // Actualizar estado local de la imagen
      setProfileImage({ uri: selectedImageUri });

      // Obtener la sesión actual para guardarla con la nueva foto
      try {
        const sessionData = await getSessionLocalId();

        // Guardar la sesión con la nueva foto de perfil
        await saveSession(sessionData, selectedImageUri);
      } catch (error) {
        console.error("Error updating session with profile photo:", error);
      }
    }
  };

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <SafeAreaView>
        <HeaderHome />
        <View
          style={{
            marginHorizontal: "auto",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#D7B4FF",
            padding: 20,
            borderRadius: 10,
            marginTop: 15,
            width: 315,
            height: 210,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: 85,
              width: 85,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              marginBottom: 10,
            }}
          >
            {/* Envolver la imagen con TouchableOpacity para hacerla presionable */}
            <TouchableOpacity
              onPress={pickImage}
              style={{
                backgroundColor: "white",
                height: profileImage === default_img ? 60 : 85,
                width: profileImage === default_img ? 60 : 85,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
              }}
            >
              <Image
                source={profileImage}
                style={{
                  width: profileImage === default_img ? 60 : 85,
                  height: profileImage === default_img ? 60 : 85,
                  borderRadius: profileImage === default_img ? 0 : 100,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <NameText
            formatText={"capitalize"}
            color={"white"}
            content={displayName}
          />
          <EmailText color={"black"} content={email} />
        </View>

        <View style={{ marginTop: 30, gap: 25 }}>
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Cambiar nombre"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Seguridad"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Cambiar idioma"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={async () => {
              await logout();
            }}
            content={"Cerrar sesión"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Eliminar cuenta"}
            backgroundColor={"white"}
          />
          <LargeYellowButton
            onPressFunction={() => {
              console.log("función en desarrollo");
            }}
            content={"Terminos y condiciones"}
            backgroundColor={"white"}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
