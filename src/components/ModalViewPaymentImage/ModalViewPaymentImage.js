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
import ExpoFastImage from "expo-fast-image";
import * as ImagePicker from "expo-image-picker";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalViewPaymentImage({
  modalImage,
  cancelText,
  saveText,
  onCancelPressed,
  onSavePressed,
  defaultImage,
  image,
  onChangePhotoPressed,
  disabled = true,
  key,
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
              {/* <Text>
                {image}
              </Text> */}
          </View>
          <View style={styles.modalHeaderContainer}>
            <View style={styles.modalImage}>
              {/* <ExpoFastImage
                key={Date.now()}
                uri={image}
                style={{ height: "100%", width: "100%" }}
              /> */}
              <Image
                source={{ uri: image, cache: "force-cache" }}
                resizeMode="cover"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </View>

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
    width: RFPercentage(45),
    height: RFPercentage(60),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "79%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f2f2",
  },

  modalLinkImage: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#111111",
  },

  modalImageContainer: {
    marginVertical: "3%",
    width: width * 0.75,
    height: width * 0.75,
    borderWidth: 2,
    borderColor: Colors.yeetPurple,
    borderRadius: 1,
  },

  modalImage: {
    // width: "100%",
    // height: "100%",
    // width: RFPercentage(43),
    // height: RFPercentage(43),
    width: "95%",
    height: "95%",
    borderWidth: 3,
    borderColor: Colors.yeetPurple,
    borderRadius: 15,
    overflow: "hidden",
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
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    // backgroundColor: "#f002",
  },

  closeButton: {
    width: "90%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "red",
  },

  cancelButtonContainer: {
    // backgroundColor: "#f002",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    height: "100%",
    width: "100%",
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
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmationButtons: {
    height: RFPercentage(5),
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
