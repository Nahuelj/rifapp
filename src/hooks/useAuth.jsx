import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const firebase_key = process.env.EXPO_PUBLIC_FIREBASE_KEY;
console.log("🚀 ~ firebase_key:", firebase_key);

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para guardar sesión y navegar directamente
  const saveSession = async (data) => {
    try {
      await AsyncStorage.setItem("userSession", JSON.stringify(data));
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error saving session:", error);
      throw error;
    }
  };

  async function createUserInRealtime(uid, raffleSetting) {
    try {
      const response = await fetch(
        `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${uid}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ raffles: raffleSetting }),
        }
      );

      if (response.ok) {
        console.log("Datos actualizados exitosamente");
      } else {
        console.error("Error al actualizar los datos:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  // Función para registrar usuario
  const registerWithEmailPassword = async (email, password, displayName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebase_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();

      const updateResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebase_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: data.idToken,
            displayName,
            returnSecureToken: true,
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.error.message);
      }

      await createUserInRealtime(data.localId, false);

      // Usar la nueva función para guardar y navegar
      await saveSession({
        ...data,
        displayName,
      });

      return router.replace("/");
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para iniciar sesión
  const signInWithEmailPassword = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );

      if (!response?.ok) {
        const errorData = await response?.json();
        throw new Error(errorData?.error?.message);
      }

      const data = await response?.json();
      // Usar la nueva función para guardar y navegar
      await saveSession(data);
      router.replace("/home");
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userSession");
      setIsAuthenticated(false);
      router.replace("/");
    } catch (error) {
      console.error("Error during logout:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    registerWithEmailPassword,
    signInWithEmailPassword,
    logout,
  };
};
