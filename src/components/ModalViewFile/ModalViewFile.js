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
  disabled = true,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            {/* {fileType == "application/pdf" ? ( */}
            <View
              style={{
                ...styles.fileContainer,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "25%",
                  justifyContent: "center",
                  alignItems: "center",
                  // display: file ? "flex" : "none",
                    // backgroundColor: "blue",
                }}
              >
                <Image
                  source={pdfIcon}
                  resizeMode="cover"
                  style={{ height: RFPercentage(5), width: RFPercentage(5) }}
                />
              </View>
              <View
                style={{
                  //   backgroundColor: "blue",
                  maxWidth: "50%",
                  minWidth: "20%",
                  //   width:'30%',
                  //   marginBottom: "5%",
                }}
              >
                <TextInput
                  style={styles.link}
                  value={fileTitle}
                  onChangeText={onChangeText}
                  numberOfLines={1}
                  multiline={true}
                  maxLength={64}
                  autoFocus
                  placeholder="PDF"
                  //   placeholder={
                  //     fileType == "application/pdf" ? "PDF Title" : "Image Title"
                  //   }
                />
              </View>
              
            </View>
            <Text
              style={{
                ...styles.buttonText,
                // display: fileSize > 10000000 ? "flex" : "none",
                // display: fileSize > 1000000 ? "flex" : "none",
                color: Colors.yeetPurple,
              }}
            >
                {fileName}
            </Text>
            {/* ) : (
              <Image
                source={{ uri: fileUri }}
                resizeMode="cover"
                style={{
                  ...styles.modalImage,
                  display: !file ? "none" : "flex",
                }}
              />
            )} */}

            {/* {file ? ( */}

            {/* ) : null} */}
            <Text
              style={{
                ...styles.buttonText,
                display: fileSize > 10000000 ? "flex" : "none",
                // display: fileSize > 1000000 ? "flex" : "none",
                color: Colors.yeetPink,
              }}
            >
              File size exceeds 10 MB.
            </Text>
            <View
              style={{
                // backgroundColor: "#00f3",
                width: "50%",
                height: "20%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={onUploadFilePressed}
                style={{
                  width: "100%",
                  height: RFPercentage(4.5),
                  borderWidth: 2,
                  borderColor: Colors.yeetPurple,
                  borderRadius: 1000,
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
          </View>
          <View style={styles.buttonContainer}>
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
              disabled={fileSize > 10000000 ? true : false}
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
    height: height * 0.275,
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "83%",
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
    flexDirection: "row",
    justifyContent: "center",
    height: "50%",
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

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "17%",
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
    flexWrap: "wrap",
    // borderBottomWidth: 1,
    // borderBottomColor: "#948E8E",
    fontSize: RFPercentage(1.75),
    fontWeight: "bold",
    // textAlign: "center",
    // alignItems: "center",
  },
});
