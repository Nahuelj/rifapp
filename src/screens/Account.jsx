import {
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
} from "react-native";
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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Importamos FileSystem

export function Account() {
  const { logout } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(default_img);
  const [isModalVisible, setModalVisible] = useState(false);

  // Cargar la imagen persistente al iniciar el componente
  useEffect(() => {
    loadPersistedImage();
    fetchUserData();
  }, []);

  // Cargar datos de usuario
  const fetchUserData = async () => {
    const sessionData = await getSessionLocalId();
    const { displayName, email } = sessionData;

    setDisplayName(displayName);
    setEmail(email);
  };

  // Cargar imagen persistente
  const loadPersistedImage = async () => {
    try {
      const persistedImageUri = await AsyncStorage.getItem("userProfileImage");
      if (persistedImageUri) {
        // Verificar si el archivo existe antes de establecerlo
        const fileInfo = await FileSystem.getInfoAsync(persistedImageUri);
        if (fileInfo.exists) {
          setProfileImage({ uri: persistedImageUri });
        }
      }
    } catch (error) {
      console.error("Error loading persisted image:", error);
    }
  };

  // Persistir imagen
  const persistImage = async (imageUri) => {
    try {
      // Crear un nombre de archivo único
      const fileName = `profile_${Date.now()}.jpg`;
      const destPath = `${FileSystem.documentDirectory}${fileName}`;

      // Copiar la imagen al directorio de documentos de la aplicación
      await FileSystem.copyAsync({
        from: imageUri,
        to: destPath,
      });

      // Guardar la ruta de la imagen en AsyncStorage
      await AsyncStorage.setItem("userProfileImage", destPath);

      return destPath;
    } catch (error) {
      console.error("Error persisting image:", error);
      return null;
    }
  };

  const handleImageSelection = async (selectedImageUri) => {
    try {
      // Persistir la imagen
      const persistedImagePath = await persistImage(selectedImageUri);

      if (persistedImagePath) {
        // Actualizar estado local de la imagen
        setProfileImage({ uri: persistedImagePath });

        // Opcional: Actualizar también la sesión
        const sessionData = await getSessionLocalId();
        await AsyncStorage.setItem(
          "userSession",
          JSON.stringify({
            ...sessionData,
            profilePhoto: persistedImagePath,
          })
        );
      }
    } catch (error) {
      console.error("Error handling image selection:", error);
    }
  };

  // Resto del código de selección de imagen (takePicture, pickImage) se mantiene igual
  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Lo siento, necesitamos permisos para usar la cámara");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      await handleImageSelection(selectedImageUri);
    }

    setModalVisible(false);
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
      await handleImageSelection(selectedImageUri);
    }

    setModalVisible(false);
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
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
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
            onPressFunction={async () => {
              await logout();
            }}
            content={"Cerrar sesión"}
            backgroundColor={"white"}
          />
        </View>

        {/* Modal for image selection */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Seleccionar Imagen</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={takePicture}
              >
                <Text style={styles.modalButtonText}>Tomar Foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                <Text style={styles.modalButtonText}>Elegir de Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: "#D7B4FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    width: "100%",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "lightgray",
  },
  cancelButtonText: {
    color: "black",
    textAlign: "center",
  },
});
