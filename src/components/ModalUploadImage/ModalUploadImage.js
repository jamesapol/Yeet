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
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalUploadImage({
  modalImage,
  modalHeaderText,
  modalMessage,
  cancelText,
  saveText,
  onCancelPressed,
  onSavePressed,
  image,
  onUploadPhotoPressed,
  disabled = true,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View
            style={{
              height: "10%",
              justifyContent: "flex-end",
              // backgroundColor: "red",
            }}
          >
            <Image
              source={modalImage}
              resizeMode="stretch"
              style={styles.modalLinkImage}
            />
          </View>
          <View style={styles.modalHeaderContainer}>
            {image ? (
              image && (
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={styles.modalImage}
                />
              )
            ) : (
              <Image
                // source={}
                resizeMode="contain"
                style={styles.modalImage}
              />
            )}
            {/* <View
                style={{
                  // backgroundColor: "#00f3",
                  width: "100%",
                  height: "15%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    //   backgroundColor: "#f004",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={onUploadPhotoPressed}
                    style={{
                      width: "100%",
                      height: "70%",
                      borderWidth: 2,
                      borderColor: Colors.yeetPurple,
                      borderRadius: 7,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    activeOpacity={0.4}
                  >
                    <Text style={[styles.buttonText, { color: "#562C73" }]}>
                      {!image ? "Upload Image" : "Change Photo"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View> */}
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
                disabled={disabled}
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
    width: RFPercentage(45),
    height: RFPercentage(60),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalLinkImage: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#111111",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "79%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f2f2",
  },

  modalImage: {
    // marginVertical: "3%",
    width: RFPercentage(43),
    height: RFPercentage(43),
    borderWidth: 2,
    borderColor: Colors.yeetPurple,
    borderRadius: 15,
  },

  modalHeaderText: {
    marginTop: "3%",
    // backgroundColor: "#f2f2",
    color: "#562C73",
    fontWeight: "bold",
    fontSize: RFPercentage(3),
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
    backgroundColor: "#02f2",
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
    height: "11%",
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

  buttonText: {
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
    color: "#FFF",
  },

  removeButtonContainer: {
    // backgroundColor: "#00f2",
    height: "100%",
    width: "50%",
    borderLeftColor: "#948E8E",
    borderLeftWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  confirmationButtonsContainer: {
    width: "50%",
    height: "100%",
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
});
