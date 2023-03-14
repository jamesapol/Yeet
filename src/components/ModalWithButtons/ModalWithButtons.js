import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

import { useState } from "react";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalWithButtons({
  modalImage,
  modalHeaderText,
  modalMessage,
  cancelText,
  saveText,
  onCancelPressed,
  onRemovePressed,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            {modalImage && (
              <Image
                // source={{uri : modalImage}}
                source={modalImage}
                resizeMode="stretch"
                style={styles.modalImage}
              />
            )}
            <View style={styles.modalHeaderTextContainer}>
              {modalHeaderText && (
                <Text style={styles.modalHeaderText}>{modalHeaderText}</Text>
              )}
            </View>
            <View style={styles.modalMessageContainer}>
              {modalMessage && (
                <Text style={styles.modalMessage}>{modalMessage}</Text>
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onRemovePressed}
                style={{
                  ...styles.confirmationButtons,
                  borderColor: Colors.yeetPink,
                  backgroundColor: Colors.yeetPink,
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
                  borderColor: Colors.yeetPurple,
                  backgroundColor: Colors.yeetPurple,
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
    width: "70%",
    height: height * 0.3,
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "#f2f2",
  },

  modalImage: {
    marginTop: "3%",
    width: RFPercentage(11),
    height: RFPercentage(11),
    borderRadius: 1000,
    //   borderRadius: 1000,
    //   borderWidth: 0.1,
    borderColor: "#111111",
  },

  modalHeaderTextContainer: {
    marginVertical: "1%",
    width: "75%",
  },

  modalHeaderText: {
    color: "#562C73",
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
    textAlign: "center",
  },
  modalMessageContainer: {
    width: "80%",
  },

  modalMessage: {
    color: "#D81D4C",
    fontWeight: "300",
    fontSize: RFPercentage(1.5),
    textAlign: "center",
  },

  modalHeader: {
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },

  inputContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#02f2",
    width: "100%",
    height: "25%",
  },

  link: {
    width: "70%",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(1.5),
    textAlign: "center",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    // backgroundColor: "#f002",
  },

  confirmationButtonsContainer: {
    // backgroundColor: "#f002",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    height: "100%",
    width: "50%",
    // borderLeftColor: "#948E8E",
    // borderLeftWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmationButtons: {
    height: RFPercentage(5),
    width: "90%",
    borderWidth: 1,
    borderColor: Colors.yeetBorderGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },

  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: "#FFF",
  },

  removeButtonContainer: {
    // backgroundColor: "#00f2",
    height: "100%",
    width: "50%",
    borderRightColor: "#948E8E",
    borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
