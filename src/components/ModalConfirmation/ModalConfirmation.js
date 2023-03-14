import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

import { useState } from "react";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalConfirmation({
  modalHeaderText,
  modalMessage,
  cancelText,
  saveText,
  onCancelPressed,
  onRemovePressed,
}) {
  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.modalHeaderText}>{modalHeaderText}</Text>
          </View>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onRemovePressed}
                style={{
                  ...styles.confirmationButtons,
                  borderColor: Colors.yeetPurple,
                  backgroundColor: Colors.yeetPurple,
                  borderWidth: 2,
                }}
                activeOpacity={0.4}
              >
                <Text style={styles.buttonText}>{saveText}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onCancelPressed}
                style={{
                  ...styles.confirmationButtons,
                  borderColor: Colors.yeetPink,
                  backgroundColor: Colors.yeetPink,
                  borderWidth: 2,
                }}
                activeOpacity={0.4}
              >
                <Text style={styles.buttonText}>{cancelText}</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E99",
  },

  modal: {
    width: RFPercentage(35),
    height: RFPercentage(30),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
    alignItems:'center',
  },

  modalHeaderContainer: {
    width: "80%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: '1%',
  },

  modalContentContainer: {
    width: "80%",
    height: "50%",
    justifyContent:'center',
  },

  modalHeaderText: {
    color: "#562C73",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFPercentage(2.75),
  },

  modalMessage: {
    textAlign: "center",
    color: "#D81D4C",
    fontWeight: "300",
    fontSize: RFPercentage(2),
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "25%",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
  },

  cancelButtonContainer: {
    height: "100%",
    width: "50%",
    borderLeftColor: "#948E8E",
    borderLeftWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
  },

  confirmationButtonsContainer: {
    // backgroundColor: "#f002",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    height: "100%",
    width: "50%",
    // padding: '5%',
    // borderRightColor: "#948E8E",
    // borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmationButtons: {
    height: RFPercentage(5),
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: "#FFF",
  },
});
