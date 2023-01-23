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
                source={modalImage}
                resizeMode="stretch"
                style={styles.modalImage}
              />
            )}
            {modalHeaderText && (
              <Text style={styles.modalHeaderText}>{modalHeaderText}</Text>
            )}
            {modalMessage && (
              <Text style={styles.modalMessage}>{modalMessage}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onRemovePressed}
              style={styles.removeButtonContainer}
              activeOpacity={0.4}
            >
              <Text style={[styles.buttonText, { color: "#D81D4C" }]}>
                {saveText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancelPressed}
              style={styles.cancelButtonContainer}
              activeOpacity={0.4}
            >
              <Text style={[styles.buttonText, { color: "#562C73" }]}>
                {cancelText}
              </Text>
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
    width: "70%",
    height: height * 0.2,
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
    width: height * 0.075,
    height: height * 0.075,
    //   borderRadius: 1000,
    //   borderWidth: 0.1,
    borderColor: "#111111",
  },

  modalHeaderText: {
    color: "#562C73",
    fontWeight: "bold",
    fontSize: RFPercentage(1.5),
  },

  modalMessage: {
    color: "#D81D4C",
    fontWeight: "300",
    fontSize: RFPercentage(1.3),
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
    borderTopWidth: 1,
    borderTopColor: "#948E8E",
    // backgroundColor: "#f002",
  },

  cancelButtonContainer: {
    // backgroundColor: "#f002",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
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
