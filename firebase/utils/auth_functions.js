import { app } from "../firebase_config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Obtén la instancia de Firebase Authentication
const auth = getAuth(app);

// Función para registrar un usuario con email y contraseña
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Usuario registrado:", user.email);
    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
}

// Función para iniciar sesión con email y contraseña
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Usuario ha iniciado sesión:", user.email);
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

// Función para cerrar sesión
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("Usuario ha cerrado sesión");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
}
