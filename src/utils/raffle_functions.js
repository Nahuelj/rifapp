import uuid from "react-native-uuid";

export async function addNewRaffle(
  userId,
  title,
  maxCapacity,
  quantityWinners
) {
  // Validamos que todos los argumentos estén presentes
  if (!userId || !title || !maxCapacity || !quantityWinners) {
    throw new Error("Faltan argumentos requeridos para crear el sorteo");
  }

  try {
    // 1. Obtenemos los sorteos existentes
    const getRafflesResponse = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${userId}/raffles.json`
    );
    const existingRaffles = await getRafflesResponse.json();

    // 2. Creamos el nuevo sorteo con el array de números estructurado
    const newRaffle = {
      title,
      numbers: Array.from({ length: maxCapacity }, (_, index) => ({
        number: index + 1,
        isAsigned: false,
        propietary: "",
        note: "",
      })),
      maxCapacity,
      currentCapacity: 0,
      isActive: true,
      id: uuid.v4(),
      // image,
    };

    // 3. Preparamos el array actualizado
    const updatedRaffles = {
      raffles: existingRaffles
        ? [...Object.values(existingRaffles), newRaffle]
        : [newRaffle],
    };

    // 4. Actualizamos en Firebase
    const updateResponse = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRaffles),
      }
    );

    if (updateResponse.ok) {
      console.log("Sorteo agregado exitosamente");
      return updatedRaffles.raffles;
    } else {
      console.error("Error al agregar el sorteo:", updateResponse.status);
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
}

export async function getRafflesByUserId(userId) {
  try {
    const response = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${userId}/raffles.json`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response?.status}`);
    }

    const raffles = await response.json();

    // Si no hay sorteos, retornamos un array vacío
    if (!raffles) {
      return [];
    }

    return raffles;
  } catch (error) {
    console.error("Error al obtener los sorteos:", error);
    throw error; // Re-lanzamos el error para manejarlo en el componente
  }
}
