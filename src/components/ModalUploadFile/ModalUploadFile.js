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

import pdfIcon from "../../../assets/UXMaterials/icons/pdf-file.png";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";

import { useState } from "react";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalUploadFile({
  modalImage,
  modalMessage,
  cancelText,
  saveText,
  onCancelPressed,
  onSavePressed,
  file,
  fileName,
  fileSize,
  fileType,
  fileUri,
  fileTitle,
  onChangeText,
  onUploadFilePressed,
  disabled = true,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <View style={styles.fileContainer}>
              <View
                style={{
                  height: "100%",
                  width: "25%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={pdfIcon}
                  resizeMode="cover"
                  style={{ height: RFPercentage(6), width: RFPercentage(6) }}
                />
              </View>
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  // backgroundColor: "red",
                }}
              >
                <Text style={styles.fileName}>{fileName}</Text>
              </View>
            </View>

            <View
              style={{
                // backgroundColor: "blue",
                width: "75%",
                marginBottom: "5%",
              }}
            >
              <TextInput
                style={styles.link}
                value={fileTitle}
                onChangeText={onChangeText}
                numberOfLines={1}
                maxLength={20}
                multiline={false}
                autoFocus
                placeholder={
                  fileType == "application/pdf" ? "PDF Title" : "Image Title"
                }
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onSavePressed}
                style={{
                  ...styles.confirmationButtons,
                  borderColor: Colors.yeetPurple,
                  backgroundColor: Colors.yeetPurple,
                  borderWidth: 2,
                }}
                activeOpacity={0.4}
                disabled={!file || fileSize > 10000000 ? true : false}
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
    width: RFPercentage(38),
    height: RFPercentage(30),
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
    justifyContent: "space-around",
    // backgroundColor: "#02f2",
  },

  modalLinkImage: {
    width: height * 0.1,
    height: height * 0.1,
    borderRadius: 1000,
    borderWidth: 0.1,
    borderColor: "#111111",
  },

  fileContainer: {
    flexDirection: "row",
    height: "40%",
    width: "80%",
    paddingHorizontal: 25,
    borderColor: Colors.yeetPurple,
    // borderWidth: 2,
    // borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f2f2",
  },

  modalImage: {
    marginVertical: "3%",
    width: height * 0.25,
    height: height * 0.25,
    borderWidth: 2,
    borderColor: Colors.yeetPurple,
    borderRadius: 5,
  },

  fileName: {
    fontSize: RFPercentage(2),
    padding: 25,
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    // backgroundColor: "#f002",
  },

  cancelButtonContainer: {
    // backgroundColor: "#f002",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    height: "100%",
    width: "50%",
    borderRightColor: "#948E8E",
    borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonContainer: {
    // backgroundColor: "#00f2",
    height: "100%",
    width: "50%",
    borderLeftColor: "#948E8E",
    borderLeftWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
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

  inputContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#02f2",
    width: "100%",
    height: "25%",
  },

  link: {
    color: Colors.yeetPurple,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
});
