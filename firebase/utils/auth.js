import { firebase_key, google_client_web } from "../firebase_key";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// // Configura Google Sign-In al inicio de tu aplicación
// GoogleSignin.configure({
//   webClientId: google_client_web, // El cliente de ID web de tu consola de Firebase
// });

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
    console.log("🚀 ~ registerWithEmailPassword ~ updatedData:", updatedData);
    return updatedData;
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
    return data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

// export async function loginOrRegisterWithFirebase(idToken) {
//   try {
//     const response = await fetch(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${firebase_key}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           postBody: `id_token=${idToken}&providerId=google.com`,
//           requestUri: "https://localhost", // cualquier URI válido
//           returnSecureToken: true,
//           returnIdpCredential: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error.message);
//     }

//     const data = await response.json();
//     console.log("Inicio de sesión o registro exitoso:", data);
//     return data;
//   } catch (error) {
//     console.error("Error al iniciar sesión o registrarse con Firebase:", error);
//   }
// }

// export async function signInWithGoogle() {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     const idToken = userInfo.idToken;

//     // Ahora puedes usar el idToken para iniciar sesión en Firebase
//     loginOrRegisterWithFirebase(idToken);
//   } catch (error) {
//     console.error("Error al iniciar sesión con Google:", error);
//   }
// }
