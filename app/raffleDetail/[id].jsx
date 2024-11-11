import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function raffleDetail() {
  const { id } = useLocalSearchParams();

  // simulacion de data traida desde la db
  const data = {
    title: "Titulo de Sorteo",
    numbers: Array.from({ length: 1000 }, (_, index) => ({
      number: index + 1,
      isAsigned: false,
      propietary: "Nahuel Benitez",
      note: "nota de numero",
    })),
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.gridItem}>
      <Text>{item.number}</Text>
    </Pressable>
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
