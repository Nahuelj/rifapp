// Función para recuperar la foto de perfil de un usuario
export async function getUserProfilePhoto(uid) {
  try {
    const response = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${uid}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      // Devuelve la foto de perfil, o null si no existe
      return userData.profilePhoto || null;
    } else {
      console.error("Error al recuperar la foto de perfil:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud de foto de perfil:", error);
    return null;
  }
}

// Función para actualizar la foto de perfil de un usuario
export async function updateUserProfilePhoto(uid, newPhotoUrl) {
  try {
    const response = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${uid}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePhoto: newPhotoUrl,
        }),
      }
    );

    if (response.ok) {
      console.log("Foto de perfil actualizada exitosamente");
      return true;
    } else {
      console.error("Error al actualizar la foto de perfil:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error en la solicitud de actualización de foto:", error);
    return false;
  }
}
