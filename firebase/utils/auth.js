import { firebase_key, google_client_web } from "../firebase_key";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function registerWithEmailPassword(email, password, displayName) {
  try {
    // Primer paso: Registrar el usuario
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebase_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const data = await response.json();

    if (data.idToken) {
      await AsyncStorage.setItem("userSession", JSON.stringify(data));
      console.log("session guardada en storage");
    }

    // Segundo paso: Actualizar el perfil del usuario con el displayName
    const updateResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebase_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: data.idToken,
          displayName: displayName,
          returnSecureToken: true,
        }),
      }
    );

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      throw new Error(error.error.message);
    }

    const updatedData = await updateResponse.json();
    // Guarda el token de autenticación en AsyncStorage
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

export async function signInWithEmailPassword(email, password) {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase_key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    const data = await response.json();
    console.log("🚀 ~ signInWithEmailPassword ~ data:", data);

    // Guarda el token de autenticación en AsyncStorage
    if (data.idToken) {
      await AsyncStorage.setItem("userSession", JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}

export const logoutUser = async () => {
  // Eliminar el token guardado
  await AsyncStorage.removeItem("userSession");
  const userSession = await AsyncStorage.getItem("userSession");
  const userSessionParsed = JSON.parse(userSession);
  console.log("session eliminada");
  console.log("🚀 ~ logoutUser ~ userSessionParsed:", userSessionParsed);
};
