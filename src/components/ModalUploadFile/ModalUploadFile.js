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
        <View
          style={{
            ...styles.modalContent,
            height: file
              ? fileType == "image/jpeg" || fileType == "image/png"
                ? height * 0.5
                : height * 0.35
              : height * 0.2,
          }}
        >
          <View
            style={{
              ...styles.modalHeaderContainer,
              height: file
                ? fileType == "image/jpeg" || fileType == "image/png"
                  ? "90%"
                  : "85%"
                : "75%",
            }}
          >
            {fileType == "application/pdf" ? (
              <View
                style={{
                  ...styles.fileContainer,
                  display: !file ? "none" : "flex",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "25%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: file ? "flex" : "none",
                    // backgroundColor: "blue",
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
            ) : (
              <Image
                source={{ uri: fileUri }}
                resizeMode="cover"
                style={{
                  ...styles.modalImage,
                  display: !file ? "none" : "flex",
                }}
              />
            )}

            {file ? (
              <View
                style={{
                  //   backgroundColor: "blue",
                  width: "50%",
                  marginBottom: "5%",
                }}
              >
                <TextInput
                  style={styles.link}
                  value={fileTitle}
                  onChangeText={onChangeText}
                  numberOfLines={1}
                  multiline={false}
                  autoFocus
                  placeholder={
                    fileType == "application/pdf" ? "PDF Title" : "Image Title"
                  }
                />
              </View>
            ) : null}
            
          </View>
          <View
            style={{
              ...styles.buttonContainer,
              height: file
                ? fileType == "image/jpeg" || fileType == "image/png"
                  ? "10%"
                  : "15%"
                : "25%",
            }}
          >
            <TouchableOpacity
              onPress={onCancelPressed}
              style={styles.cancelButtonContainer}
              activeOpacity={0.4}
            >
              <Text style={[styles.buttonText, { color: Colors.yeetPurple }]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSavePressed}
              style={styles.saveButtonContainer}
              activeOpacity={0.4}
              disabled={!file || fileSize > 10000000 ? true : false}
            >
              <Text style={[styles.buttonText, { color: Colors.yeetPink }]}>
                {saveText}
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
    width: "75%",
    // height: height * 0.3,
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    // height: "85%",
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
    fontSize: RFPercentage(1.75),
    padding: 25,
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
    // height: "15%",
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
    borderRightColor: "#948E8E",
    borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
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

  inputContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#02f2",
    width: "100%",
    height: "25%",
  },

  link: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(1.75),
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
  },
});
