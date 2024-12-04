import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  StyleSheet,
} from "react-native";
import background from "../../assets/app/background_modal.png";
import { NormalText } from "../ui/Texts";
import { BasicInput, TextAreaInput } from "../ui/Inputs";
import { SmallRedButton, SmallYellowButtonWithDesabled } from "../ui/Buttons";

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
  const [propietary, setPropietary] = useState(ticketPropietary || "");
  const [note, setNote] = useState(ticketNote || "");
  const propriateryInputRef = useRef(null);

  useEffect(() => {
    if (visibleState) {
      setPropietary(ticketPropietary || "");
      setNote(ticketNote || "");

      // Opcional: pequeño delay para asegurar que el input esté listo
      setTimeout(() => {
        propriateryInputRef.current?.focus();
      }, 100);
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ImageBackground style={styles.backgroundImage} source={background}>
              <NormalText
                color={"white"}
                content={`Ticket ${!isAsigned ? "Libre" : "Asignado"}`}
              />
              <NormalText
                color={"white"}
                content={`Asignar Ticket N° ${TicketNumber}`}
              />

              {isAsigned && (
                <TouchableOpacity onPress={handleRemove}>
                  <Text style={styles.removeText}>Eliminar Ticket</Text>
                </TouchableOpacity>
              )}

              <View style={styles.inputContainer}>
                <BasicInput
                  ref={propriateryInputRef} // Ref ahora funciona correctamente
                  setState={setPropietary}
                  state={propietary}
                  placeholder={"Nombre"}
                />

                <TextAreaInput
                  placeholder={"Nota"}
                  setState={setNote}
                  state={note}
                />
              </View>
              <View style={styles.buttonContainer}>
                <SmallRedButton
                  content={"Cancelar"}
                  onPressFunction={() => setVisibleState(false)}
                />

                <SmallYellowButtonWithDesabled
                  onPressFunction={() => {
                    if (isAsigned) {
                      handleSave();
                    } else {
                      handleAssign();
                    }
                  }}
                  content={isAsigned ? "Guardar" : "Asignar"}
                />
              </View>
            </ImageBackground>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.modalContainer}>
        <View style={styles.inactiveModalContent}>
          <Text style={styles.ticketNumber}>Ticket N°{TicketNumber}</Text>

          {isAsigned ? (
            <View>
              <Text style={styles.propietaryText}>
                Propietario: {ticketPropietary}
              </Text>

              {ticketNote && (
                <View>
                  <Text style={styles.noteLabel}>Nota:</Text>
                  <ScrollView>
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
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleState}
      onRequestClose={() => setVisibleState(false)}
    >
      <View style={styles.overlay}>{renderModalContent()}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay semi-transparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalContent: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 10,
    overflow: "hidden",
  },
  inactiveModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
  },
  backgroundImage: {
    width: "100%",
    paddingVertical: 40,
    alignItems: "center",
  },
  inputContainer: {
    gap: 15,
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  removeText: {
    color: "red",
    marginTop: 10,
  },
  ticketNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  propietaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
  },
  freeTicketText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
  },
});
