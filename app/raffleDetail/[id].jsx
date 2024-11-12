import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AsignedOwnerModal } from "../../src/components/AsignedOwnerModal";

export default function raffleDetail() {
  const { id } = useLocalSearchParams();

  const [visibleModal, setVisibleModal] = useState(false);
  const [ticketSelected, setTicketSelected] = useState({});
  // simulacion de data traida desde la db
  const data = {
    title: "Titulo de Sorteo",
    numbers: Array.from({ length: 100 }, (_, index) => ({
      number: index + 1,
      isAsigned: false,
      propietary: "Nahuel Benitez",
      note: "nota de numero",
    })),
    maxCapacity: 100,
    currentCapacity: 25,
    isActive: true,
    id: "jfa234-jasdklf-2l34j",
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setVisibleModal(true);
        setTicketSelected(item);
      }}
      style={styles.gridItem}
    >
      <Text>{item.number}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/home">
          <Text>Volver</Text>
        </Link>
        <Text>
          {data.title} {id}
        </Text>
      </View>

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

      <TouchableOpacity
        style={{
          margin: "auto",
          borderWidth: 1,
          borderColor: "red",
          padding: 10,
        }}
      >
        <Text>Sortear</Text>
      </TouchableOpacity>

      <AsignedOwnerModal
        visibleState={visibleModal}
        setVisibleState={setVisibleModal}
        TicketNumber={ticketSelected?.number}
        TicketStatus={ticketSelected?.isAsigned}
      />
    </SafeAreaView>
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
    backgroundColor: "red",
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
  },
});
