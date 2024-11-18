import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export function RunRaffleModal({
  isAsigned = false,
  TicketNumber = 4,
  visibleState = false,
  setVisibleState,
  raffleId,
  onPressFunction,
  onRemoveFuntion,
  onUpdateComplete,
  ticketPropietary,
  ticketNote,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => setVisibleState(false)} // En Android, para cerrar con el botón de atrás
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>REALIZAR SORTEO</Text>
          <Text style={styles.modalText}>
            ¿ESTAS SEGURO QUE QUIERES REALIZAR EL SORTEO CON EL NOMBRE{" "}
            {"NOMBRE SORTEO"}?
          </Text>

          <Text>
            Esta accion no se puede deshacer, los resultados no podran
            modificarse una vez realizados los cambios
          </Text>

          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>
              Confirmo que quiero realizar el sorteo
            </Text>
          </View>

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
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: "red", padding: 10 }}
            >
              <Text>Sortear</Text>
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
