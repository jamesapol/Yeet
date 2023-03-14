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

export default function ModalViewFile({
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
  saveDisabled,
  disabled = true,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <Image
              source={pdfIcon}
              resizeMode="cover"
              style={{ height: RFPercentage(6), width: RFPercentage(6), marginVertical: '3%' }}
            />

            <View
              style={{
                // backgroundColor: "#5623",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <TextInput
                style={styles.link}
                value={fileTitle}
                onChangeText={onChangeText}
                numberOfLines={1}
                multiline={true}
                maxLength={20}
                autoFocus
                placeholder="PDF"
              />
            </View>  
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                color: "#D81D4C",
                display: !fileTitle ? "flex" : "none",
              }}
            >
              PLEASE ENTER A FILE NAME
            </Text>
          </View>

          <View style={styles.fileContainer}>
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: RFPercentage(1.8),
                  color: Colors.yeetPurple,
                }}
              >
                {fileName}
              </Text>
            </View>
            {/* <View
              style={{
                width: "50%",
                height: "20%",
                alignItems: "center",
                justifyContent: "center",
              }}
            > */}
            <View style={{ width: "50%" }}>
              <TouchableOpacity
                onPress={onUploadFilePressed}
                style={{
                  width: "100%",
                  height: RFPercentage(5),
                  borderWidth: 2,
                  borderColor: Colors.yeetPurple,
                  // backgroundColor: Colors.yeetPurple,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                activeOpacity={0.4}
              >
                <Text
                  style={{ ...styles.buttonText, color: Colors.yeetPurple }}
                >
                  Change File
                </Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onSavePressed}
                style={{
                  ...styles.confirmationButtons,
                  borderColor: saveDisabled
                    ? Colors.yeetBorderGray
                    : Colors.yeetPurple,
                  backgroundColor: saveDisabled
                    ? Colors.yeetGray
                    : Colors.yeetPurple,
                  borderWidth: 2,
                }}
                activeOpacity={0.4}
                disabled={saveDisabled}
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
    height: RFPercentage(38),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "35%",
    alignItems: "center",
    justifyContent: "space-evenly",
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
    // flexDirection: "row",
    justifyContent: "space-evenly",
    height: "45%",
    width: "100%",
    // paddingHorizontal: 25,
    borderColor: Colors.yeetPurple,
    // borderWidth: 2,
    // borderRadius: 5,

    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ff02",
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
    fontSize: RFPercentage(1.75),
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

  link: {
    marginBottom: 5,
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: Colors.yeetPurple,
    textAlign: "center",
  },

  confirmationButtonsContainer: {
    height: "100%",
    width: "50%",
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
