import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

// Función para agregar un nuevo sorteo
export async function addNewRaffle(title, maxCapacity, quantityWinners) {
  if (!title || !maxCapacity || !quantityWinners) {
    throw new Error("Faltan argumentos requeridos para crear el sorteo");
  }

  try {
    // Obtener los sorteos existentes
    const storedRaffles = await AsyncStorage.getItem("raffles");
    const existingRaffles = storedRaffles ? JSON.parse(storedRaffles) : [];

    // Crear el nuevo sorteo
    const newRaffle = {
      id: uuid.v4(),
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
      quantityWinners,
    };

    // Guardar el sorteo actualizado
    const updatedRaffles = [...existingRaffles, newRaffle];
    await AsyncStorage.setItem("raffles", JSON.stringify(updatedRaffles));

    console.log("Sorteo agregado exitosamente");
    return updatedRaffles;
  } catch (error) {
    console.error("Error al agregar el sorteo:", error);
    return null;
  }
}

// Función para obtener todos los sorteos
export async function getRaffles() {
  try {
    const storedRaffles = await AsyncStorage.getItem("raffles");
    return storedRaffles ? JSON.parse(storedRaffles) : [];
  } catch (error) {
    console.error("Error al obtener los sorteos:", error);
    throw error;
  }
}

// Función para obtener el detalle de un sorteo por ID
export async function getRaffleDetail(raffleId) {
  try {
    const raffles = await getRaffles();
    return raffles.find((raffle) => raffle.id === raffleId) || null;
  } catch (error) {
    console.error("Error al obtener el detalle del sorteo:", error);
    throw error;
  }
}

// Función para actualizar el número de un sorteo
export async function updateRaffleNumber(
  raffleId,
  numberToUpdate,
  proprietor,
  note
) {
  try {
    const raffles = await getRaffles();

    const updatedRaffles = raffles.map((raffle) =>
      raffle.id === raffleId
        ? {
            ...raffle,
            numbers: raffle.numbers.map((num) =>
              num.number === numberToUpdate
                ? { ...num, isAsigned: true, propietary: proprietor, note }
                : num
            ),
            currentCapacity: raffle.currentCapacity + 1,
          }
        : raffle
    );

    await AsyncStorage.setItem("raffles", JSON.stringify(updatedRaffles));
    return updatedRaffles;
  } catch (error) {
    console.error("Error al actualizar el número del sorteo:", error);
    throw error;
  }
}

// Función para editar un número de un sorteo
export async function editRaffleNumber(
  raffleId,
  numberToUpdate,
  proprietor,
  note
) {
  try {
    const raffles = await getRaffles();

    const updatedRaffles = raffles.map((raffle) =>
      raffle.id === raffleId
        ? {
            ...raffle,
            numbers: raffle.numbers.map((num) =>
              num.number === numberToUpdate
                ? { ...num, isAsigned: true, propietary: proprietor, note }
                : num
            ),
            currentCapacity: raffle.currentCapacity,
          }
        : raffle
    );

    await AsyncStorage.setItem("raffles", JSON.stringify(updatedRaffles));
    return updatedRaffles;
  } catch (error) {
    console.error("Error al actualizar el número del sorteo:", error);
    throw error;
  }
}

// Función para eliminar un ticket
export async function removeTicket(raffleId, numberToUpdate) {
  try {
    const raffles = await getRaffles();

    const updatedRaffles = raffles.map((raffle) =>
      raffle.id === raffleId
        ? {
            ...raffle,
            numbers: raffle.numbers.map((num) =>
              num.number === numberToUpdate
                ? { ...num, isAsigned: false, propietary: "", note: "" }
                : num
            ),
            currentCapacity: raffle.currentCapacity - 1,
          }
        : raffle
    );

    await AsyncStorage.setItem("raffles", JSON.stringify(updatedRaffles));
    return updatedRaffles;
  } catch (error) {
    console.error("Error al eliminar el ticket:", error);
    throw error;
  }
}

// Función para obtener números asignados y ganadores
export async function getAssignedNumbers(raffleId) {
  try {
    const raffles = await getRaffles();
    const raffle = raffles.find((r) => r.id === raffleId);

    if (!raffle) {
      throw new Error("Sorteo no encontrado");
    }

    const soldNumbers = raffle.numbers
      .filter((n) => n.isAsigned)
      .map((n) => n.number);
    const winnerNumbers = runRaffle(soldNumbers, raffle.quantityWinners);

    const winners = winnerNumbers.map((winnerNumber, index) => {
      const winnerDetails = raffle.numbers.find(
        (n) => n.number === winnerNumber
      );
      return {
        position: index + 1,
        number: winnerNumber,
        owner: winnerDetails?.propietary || "Unknown",
      };
    });

    return winners;
  } catch (error) {
    console.error("Error al obtener números asignados:", error);
    throw error;
  }
}

// Función para realizar el sorteo
export function runRaffle(soldNumbers, winnersCount) {
  if (!Array.isArray(soldNumbers) || soldNumbers.length === 0) {
    throw new Error("El array de números vendidos no puede estar vacío.");
  }

  if (winnersCount <= 0 || winnersCount > soldNumbers.length) {
    throw new Error(
      "La cantidad de ganadores debe ser mayor que 0 y menor o igual al total de números vendidos."
    );
  }

  const winners = [];
  const soldNumbersCopy = [...soldNumbers];

  while (winners.length < winnersCount) {
    const randomIndex = Math.floor(Math.random() * soldNumbersCopy.length);
    winners.push(soldNumbersCopy.splice(randomIndex, 1)[0]);
  }

  return winners;
}

// Función para cambiar estado del sorteo a pasado
export async function updateRaffleRealized(raffleId, winners) {
  try {
    // Obtener los sorteos guardados localmente
    const rafflesJson = await AsyncStorage.getItem("raffles");
    const raffles = rafflesJson ? JSON.parse(rafflesJson) : {};

    // Encontrar el sorteo específico por su ID
    const raffleIndex = Object.keys(raffles).find(
      (key) => raffles[key].id === raffleId
    );

    if (!raffleIndex) {
      throw new Error("Raffle not found");
    }

    const raffleData = raffles[raffleIndex];

    // Preparar los datos actualizados del sorteo
    const updatedRaffleData = {
      ...raffleData,
      winners,
      isActive: false,
    };

    // Actualizar el sorteo en los datos locales
    raffles[raffleIndex] = updatedRaffleData;

    // Guardar los datos actualizados en AsyncStorage
    await AsyncStorage.setItem("raffles", JSON.stringify(raffles));

    return updatedRaffleData;
  } catch (error) {
    console.error("Error al actualizar el número del sorteo:", error);
    throw error;
  }
}

// Función para obtener los ganadores de un sorteo
export async function getRaffleWinners(raffleId) {
  try {
    // Obtener los sorteos guardados localmente
    const rafflesJson = await AsyncStorage.getItem("raffles");
    const raffles = rafflesJson ? JSON.parse(rafflesJson) : {};

    // Encontrar el sorteo específico por su ID
    const raffleKey = Object.keys(raffles).find(
      (key) => raffles[key].id === raffleId
    );

    if (!raffleKey || !raffles[raffleKey]?.winners) {
      throw new Error("No se encontraron ganadores en el sorteo.");
    }

    // Obtener los ganadores del sorteo
    const winners = raffles[raffleKey].winners;

    return winners;
  } catch (error) {
    console.error("Error al obtener los ganadores del sorteo:", error);
    throw error;
  }
}
