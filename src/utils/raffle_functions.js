import uuid from "react-native-uuid";
import { getSessionLocalId } from "./storage_functions";

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

export async function getRaffleDetail(raffleId) {
  const userSession = await getSessionLocalId();
  const userId = userSession?.localId;
  console.log("🚀 ~ getRaffleDetail ~ userId:", userId);
  console.log("🚀 ~ getRaffleDetail ~ raffleId:", raffleId);

  try {
    const response = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${userId}/raffles.json?orderBy="id"&equalTo="${raffleId}"`
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response?.status}`);
    }

    const raffles = await response.json();

    return Object.values(raffles)[0] || null;
  } catch (error) {
    console.error("Error al obtener el sorteo:", error);
    throw error;
  }
}

export async function updateRaffleNumber(
  raffleId,
  numberToUpdate,
  proprietor,
  note
) {
  const userSession = await getSessionLocalId();
  const userId = userSession?.localId;

  try {
    // Fetch the current raffle data
    const getRaffleResponse = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${userId}/raffles.json`
    );

    if (!getRaffleResponse.ok) {
      throw new Error(`Error HTTP: ${getRaffleResponse?.status}`);
    }

    const raffles = await getRaffleResponse.json();

    // Find the specific raffle
    const raffleIndex = Object.keys(raffles).find(
      (key) => raffles[key].id === raffleId
    );

    if (!raffleIndex) {
      throw new Error("Raffle not found");
    }

    const raffleData = raffles[raffleIndex];

    // Find and update the specific number
    const updatedNumbers = raffleData.numbers.map((num) =>
      num.number === numberToUpdate
        ? {
            number: numberToUpdate,
            isAsigned: true,
            propietary: proprietor,
            note: note,
          }
        : num
    );

    // Prepare the updated raffle data
    const updatedRaffleData = {
      ...raffleData,
      numbers: updatedNumbers,
      currentCapacity: raffleData.currentCapacity + 1,
    };

    // Update the raffle in the database
    const updateResponse = await fetch(
      `https://rifapp-63ea8-default-rtdb.firebaseio.com/users/${userId}/raffles/${raffleIndex}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRaffleData),
      }
    );

    if (!updateResponse.ok) {
      throw new Error(`Error HTTP: ${updateResponse?.status}`);
    }

    return await updateResponse.json();
  } catch (error) {
    console.error("Error al actualizar el número del sorteo:", error);
    throw error;
  }
}
