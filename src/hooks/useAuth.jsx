import { useEffect, useState } from "react";
import { useRouter, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebase_key = "AIzaSyC47rYcE77IeU9vIMva__-jA7cXRs5C0Uk";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log("🚀 ~ useAuth ~ isAuthenticated:", isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  console.log("🚀 ~ useAuth ~ isLoading:", isLoading);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  console.log("🚀 ~ useAuth ~ sessionData:", sessionData);
  const router = useRouter();
  const path = usePathname();
  console.log("🚀 ~ useAuth ~ path:", path);
  console.log(
    "-----------------------------------------------------------------------"
  );

  // Función para verificar la sesión
  const checkSession = async () => {
    try {
      const userSession = await AsyncStorage.getItem("userSession");
      const userSessionParsed = userSession ? JSON.parse(userSession) : null;

      setSessionData(userSessionParsed);
      setIsAuthenticated(!!userSessionParsed?.idToken);

      // Redirección inmediata según el estado de autenticación
      if (userSessionParsed?.idToken) {
        if (
          path === "/" ||
          path === "/login" ||
          path === "/signup" ||
          path === "/recover"
        ) {
          router.push("/home");
        }
      } else {
        if (
          path === "/home" ||
          path === "/account" ||
          path === "/newRaffle" ||
          path.startsWith("/raffleDetail/")
        ) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setSessionData(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar sesión al montar el componente y cuando cambia la ruta
  useEffect(() => {
    checkSession();
  }, [path, isAuthenticated]);

  // Función para guardar sesión y navegar directamente
  const saveSession = async (data) => {
    try {
      await AsyncStorage.setItem("userSession", JSON.stringify(data));
      setSessionData(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error saving session:", error);
      throw error;
    }
  };

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

      // Usar la nueva función para guardar y navegar
      await saveSession({
        ...data,
        displayName,
      });

      return data;
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      // Usar la nueva función para guardar y navegar
      await saveSession(data);
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userSession");
      setSessionData(null);
      setIsAuthenticated(false);
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
    sessionData,
    registerWithEmailPassword,
    signInWithEmailPassword,
    logout,
  };
};
