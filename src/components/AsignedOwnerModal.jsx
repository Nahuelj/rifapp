import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export function AsignedOwnerModal({
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
  isActive,
  onSaveFunction,
}) {
  // Initialize state with existing ticket values when modal opens
  const [propietary, setPropietary] = useState(ticketPropietary || "");
  const [note, setNote] = useState(ticketNote || "");

  // Reset form when modal opens or closes
  useEffect(() => {
    if (visibleState) {
      setPropietary(ticketPropietary || "");
      setNote(ticketNote || "");
    }
  }, [visibleState, ticketPropietary, ticketNote]);

  const handleAssign = async () => {
    if (!propietary) {
      Alert.alert(
        "Error al asignar su ticket",
        "Debe completar el campo de Nombre como minimo para asignar su ticket."
      );
      return;
    }

    try {
      await onPressFunction(raffleId, TicketNumber, propietary, note);
      onUpdateComplete();
      setVisibleState(false);
    } catch (error) {
      console.error("Error al asignar:", error);
    }
  };

  const handleSave = async () => {
    if (!propietary) {
      Alert.alert(
        "Error al asignar su ticket",
        "Debe completar el campo de Nombre como minimo para asignar su ticket."
      );
      return;
    }

    try {
      await onSaveFunction(raffleId, TicketNumber, propietary, note);
      onUpdateComplete();
      setVisibleState(false);
    } catch (error) {
      console.error("Error al asignar:", error);
    }
  };

  const handleRemove = async () => {
    try {
      await onRemoveFuntion(raffleId, TicketNumber);
      onUpdateComplete();
      setVisibleState(false);
    } catch (error) {
      console.error("Error al remover:", error);
    }
  };

  const renderModalContent = () => {
    if (isActive) {
      return (
        <>
          <Text style={styles.modalText}>
            Ticket {!isAsigned ? "Libre" : "Asignado"}
          </Text>
          <Text style={styles.modalText}>Asignar Ticket N°{TicketNumber}</Text>

          {isAsigned && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemove}
            >
              <Text style={styles.buttonText}>Eliminar Ticket</Text>
            </TouchableOpacity>
          )}

          <TextInput
            placeholder="Nombre"
            style={styles.input}
            onChangeText={(text) => {
              setPropietary(text);
            }}
            value={propietary}
          />

          <TextInput
            placeholder="Nota"
            onChangeText={(text) => {
              setNote(text);
            }}
            style={styles.noteInput}
            multiline={true}
            numberOfLines={4}
            value={note}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setVisibleState(false);
              }}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                if (isAsigned) {
                  handleSave();
                } else {
                  handleAssign();
                }
              }}
            >
              <Text>{isAsigned ? "Guardar" : "Asignar"}</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    // Inactive raffle state
    return (
      <>
        <Text style={styles.modalText}>Ticket N°{TicketNumber}</Text>

        {isAsigned ? (
          <View style={styles.inactiveTicketContainer}>
            <Text style={styles.ownerText}>
              Propietario: {ticketPropietary}
            </Text>

            {/* Expanded note section with ScrollView for long notes */}
            {ticketNote && (
              <View style={styles.noteSection}>
                <Text style={styles.noteTitleText}>Nota:</Text>
                <ScrollView
                  style={styles.noteScrollView}
                  contentContainerStyle={styles.noteScrollViewContent}
                >
                  <Text style={styles.noteText}>{ticketNote}</Text>
                </ScrollView>
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.freeTicketText}>Este ticket quedó libre</Text>
        )}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setVisibleState(false)}
        >
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleState}
      onRequestClose={() => setVisibleState(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>{renderModalContent()}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  modalContainer: {
    width: 300,
    maxHeight: "80%", // Limit height for better responsiveness
    padding: 20,
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-evenly",
    gap: 30,
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  noteInput: {
    borderWidth: 1,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
  },
  submitButton: {
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    marginBottom: 10,
  },
  inactiveTicketContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
  },
  ownerText: {
    fontSize: 16,
    marginBottom: 10,
  },
  noteSection: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  noteTitleText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteScrollView: {
    maxHeight: 150, // Limit note height
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  noteScrollViewContent: {
    flexGrow: 1,
  },
  noteText: {
    color: "#333",
    fontSize: 14,
  },
  freeTicketText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    alignSelf: "center",
  },
});
