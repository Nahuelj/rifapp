import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export function AsignedOwnerModal({
  isAsigned = false,
  TicketNumber = 4,
  visibleState = false,
  setVisibleState,
  raffleId,
  onPressFunction,
}) {
  const [propietary, setPropietary] = useState("asdf");
  console.log("🚀 ~ propietary:", propietary);
  const [note, setNote] = useState("kaljsdf");
  console.log("🚀 ~ note:", note);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleState}
      onRequestClose={() => setVisibleState(false)} // En Android, para cerrar con el botón de atrás
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Ticket {!isAsigned ? "Libre" : "Asignado"}
          </Text>
          <Text style={styles.modalText}>Asignar Ticket N°{TicketNumber}</Text>
          <TextInput
            placeholder="Nombre"
            style={{ borderWidth: 1, padding: 10 }}
            onChangeText={(text) => {
              setPropietary(text);
            }}
          />
          <TextInput
            placeholder="Nota"
            onChangeText={(text) => {
              setNote(text);
            }}
            style={{
              borderWidth: 1,
              padding: 10,
              height: 100,
              textAlignVertical: "top",
            }}
            multiline={true} // Habilita múltiples líneas
            numberOfLines={4} // Define el número de líneas visibles por defecto
          />
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginHorizontal: "auto",
            }}
          >
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: "red", padding: 10 }}
              onPress={() => {
                setVisibleState(false);
              }}
            >
              <Text>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: "red", padding: 10 }}
              onPress={() => {
                onPressFunction(raffleId, TicketNumber, propietary, note);
              }}
            >
              <Text>Asignar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.15)", // Fondo semitransparente
  },
  modalContainer: {
    width: 300,
    padding: 20,
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-evenly",
    gap: 30,
  },
  modalText: {
    marginHorizontal: "auto",
  },
});
