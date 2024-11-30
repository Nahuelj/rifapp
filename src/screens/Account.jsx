import {
  Image,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
import * as FileSystem from "expo-file-system";
import {
  getUserProfilePhoto,
  updateUserProfilePhoto,
} from "../utils/user_functions";

// Función para convertir imagen a base64
const imageToBase64 = async (uri) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error("Error convirtiendo imagen a base64:", error);
    return null;
  }
};

export function Account() {
  const { logout } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(default_img);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga

  // Cargar datos de usuario y foto de perfil al iniciar el componente
  useEffect(() => {
    const fetchUserDataAndPhoto = async () => {
      try {
        setIsLoading(true); // Iniciar carga

        // Obtener datos de sesión
        const sessionData = await getSessionLocalId();
        const { localId, displayName, email } = sessionData;

        setUserId(localId);
        setDisplayName(displayName);
        setEmail(email);

        // Intentar obtener la foto de perfil desde Firebase
        const firebaseProfilePhoto = await getUserProfilePhoto(localId);

        if (firebaseProfilePhoto && firebaseProfilePhoto !== "default") {
          // Si hay una foto en Firebase, establecerla
          setProfileImage({
            uri: `data:image/jpeg;base64,${firebaseProfilePhoto}`,
          });
        } else {
          // Si no hay foto, usar imagen por defecto
          setProfileImage(default_img);
        }
      } catch (error) {
        console.error("Error al cargar datos de usuario:", error);
        setProfileImage(default_img);
      } finally {
        setIsLoading(false); // Finalizar carga
      }
    };

    fetchUserDataAndPhoto();
  }, []);

  const handleImageSelection = async (selectedImageUri) => {
    try {
      // Convertir imagen a base64
      const base64Image = await imageToBase64(selectedImageUri);

      if (base64Image && userId) {
        // Actualizar foto en Firebase
        const updateResult = await updateUserProfilePhoto(userId, base64Image);

        if (updateResult) {
          // Actualizar estado local de la imagen
          setProfileImage({ uri: `data:image/jpeg;base64,${base64Image}` });
        } else {
          console.error("No se pudo actualizar la foto de perfil");
        }
      }
    } catch (error) {
      console.error("Error manejando selección de imagen:", error);
    }
  };

  // El resto del código de takePicture y pickImage se mantiene igual
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

  // El resto del componente se mantiene igual
  // ...

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
          {isLoading ? (
            // Mostrar spinner de carga
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <ActivityIndicator size="large" color="white" />
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  fontSize: 16,
                }}
              >
                Cargando perfil...
              </Text>
            </View>
          ) : (
            // Contenido normal cuando no está cargando
            <>
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
            </>
          )}
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
