import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";

export default function raffleDetail() {
  const { id } = useLocalSearchParams();
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 40) / 5; // 40 es el padding total (8 * 5)

  const data = {
    title: "Titulo de Sorteo",
    numbers: Array.from({ length: 100 }, (_, index) => ({
      number: index + 1,
      isAsigned: false,
      propietary: "Nahuel Benitez",
      note: "nota de numero",
    })),
  };

  const renderItem = ({ item }) => (
    <Pressable style={[styles.gridItem, { width: itemWidth }]}>
      <Text>{item.number}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
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
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Esto es importante para que ocupe toda la pantalla
    padding: 8,
  },
  header: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  listContainer: {
    width: "100%",
    backgroundColor: "blue",
    justifyContent: "space-evenly",
    alignContent: "space-between",
  },
  gridItem: {
    aspectRatio: 1, // Esto mantiene el elemento cuadrado
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "red",
    width: "100%",
  },
});
