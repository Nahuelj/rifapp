import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AsignedOwnerModal } from "../../../src/components/AsignedOwnerModal";
import { RunRaffleModal } from "../../../src/components/RunRaffleModal";
import {
  getRaffleDetail,
  removeTicket,
  saveRaffleNumber,
} from "../../../src/utils/raffle_functions";
import { updateRaffleNumber } from "../../../src/utils/raffle_functions";
import { getAssignedNumbers } from "../../../src/utils/raffle_functions";
import { BackHeaderRaffle } from "../../../src/ui/BackHeader";
import background from "../../../assets/app/background.png";
import { StatusBar } from "expo-status-bar";
import { LargeYellowButton } from "../../../src/ui/Buttons";

export default function raffleDetail() {
  const { id } = useLocalSearchParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [ticketSelected, setTicketSelected] = useState({});
  const [data, setData] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(0); // Nuevo estado
  const [visibleRunRaffle, setVisibleRunRaffle] = useState(false);
  const [raffleResult, setRaffleResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getRaffleDetail(id);
      setData(response);
    }
    fetchData();
  }, [updateTrigger]); // Dependencia cambiada a updateTrigger

  const handleUpdateComplete = async () => {
    setUpdateTrigger((prev) => prev + 1); // Incrementa el contador
    setVisibleModal(false);
  };

  const handleRaffleComplete = async () => {
    setUpdateTrigger((prev) => prev + 1); // Incrementa el contador
    setVisibleRunRaffle(false);
  };

  const handleRunRaffle = async () => {
    setVisibleRunRaffle(true);
    const result = await getAssignedNumbers(id);
    setRaffleResult(result);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setVisibleModal(true);
        setTicketSelected(item);
      }}
      style={[styles.gridItem, item?.isAsigned && styles.asigned]}
    >
      <Text style={[item.isAsigned && styles.asignedText, { fontSize: 20 }]}>
        {item.number}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground style={{ flex: 1 }} source={background}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
        <BackHeaderRaffle raffleTitle={data.title} />

        <View style={{ height: 715 }}>
          <FlatList
            data={data.numbers}
            renderItem={renderItem}
            keyExtractor={(item) => item.number.toString()}
            numColumns={5}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            initialNumToRender={20}
            windowSize={5} // Ajusta este valor según tu necesidad
          />
        </View>

        {data.isActive ? (
          <LargeYellowButton
            onPressFunction={() => {
              if (data.currentCapacity < parseInt(data.quantityWinners)) {
                Alert.alert(
                  "No se puede realizar el sorteo",
                  `No es posible realizar el sorteo si no están asignados los números suficientes para la cantidad de ganadores establecidos.\n\nJugadores asignados: ${data.currentCapacity}\nJugadores requeridos como mínimo: ${data.quantityWinners}`,
                  [{ text: "OK", onPress: () => "" }]
                );
              } else {
                handleRunRaffle();
              }
            }}
            content={"Sortear"}
          />
        ) : (
          <LargeYellowButton
            onPressFunction={() => {
              router.push(
                `/results/${id}?name=${data?.title}&&countWinner=${data?.quantityWinners}`
              );
            }}
            content={"Ver resultados"}
          />
        )}

        <AsignedOwnerModal
          visibleState={visibleModal}
          setVisibleState={setVisibleModal}
          TicketNumber={ticketSelected?.number}
          TicketStatus={ticketSelected?.isAsigned}
          raffleId={id}
          isAsigned={ticketSelected?.isAsigned}
          onPressFunction={updateRaffleNumber}
          onSaveFunction={saveRaffleNumber}
          onRemoveFuntion={removeTicket}
          onUpdateComplete={handleUpdateComplete} // Para volver a renderizar el componente
          ticketPropietary={ticketSelected?.propietary}
          ticketNote={ticketSelected?.note}
          isActive={data?.isActive}
        />

        <RunRaffleModal
          visibleState={visibleRunRaffle}
          setVisibleState={setVisibleRunRaffle}
          raffleId={id}
          raffleResult={raffleResult}
          onUpdateComplete={handleRaffleComplete} // Para volver a renderizar el componente
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
  listContainer: {
    paddingVertical: 10,
  },
  row: {
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  gridItem: {
    height: 65,
    width: 65,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: "white",
  },
  asigned: {
    backgroundColor: "purple",
    color: "white",
    opacity: 0.25,
  },
  asignedText: {
    color: "white",
  },
});
