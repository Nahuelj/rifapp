import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { updateRaffleRealized } from "../utils/raffle_local_functions";
import { NormalText } from "../ui/Texts";
import { SmallRedButton, SmallYellowButtonWithDesabled } from "../ui/Buttons";
import background from "../../assets/app/background_modal.png";

export function RunRaffleModal({
  visibleState,
  setVisibleState,
  raffleResult,
  raffleId,
  onUpdateComplete,
}) {
  const [check, setCheck] = useState(false);

  const handleRaffleRealized = async () => {
    await updateRaffleRealized(raffleId, raffleResult);
    onUpdateComplete();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleState}
      onRequestClose={() => setVisibleState(false)} // En Android, para cerrar con el botón de atrás
    >
      <View style={[styles.overlay]}>
        <ImageBackground
          source={background}
          style={{
            backgroundColor: "red",
            width: "100%",
            height: 600,
            paddingVertical: 30,
          }}
        >
          <View style={{ gap: 45 }}>
            <NormalText content={"REALIZAR SORTEO"} />
            <NormalText
              content={`¿ESTAS SEGURO QUE QUIERES REALIZAR EL SORTEO ${"NOMBRE SORTEO"}?`}
            />
            <NormalText
              content={`Esta acción no puede revertirse y el sorteo se dara por cerrado una vez generado los resultados.`}
            />

            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckBox
                center
                checked={check}
                onPress={() => setCheck((prev) => !prev)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="purple"
              />
              <NormalText content={"Confirmar"} />
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 20,
                marginHorizontal: "auto",
              }}
            >
              <SmallRedButton
                content={"Cancelar"}
                onPressFunction={() => {
                  setVisibleState(false);
                }}
              />

              <SmallYellowButtonWithDesabled
                content={"Sortear"}
                onPressFunction={handleRaffleRealized}
                disabled={!check}
              />
            </View>
          </View>
        </ImageBackground>
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
