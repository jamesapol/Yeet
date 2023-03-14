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

export default function ModalNote({
  userImage,
  userName,
  connectionNotes,
  textInputHeader,
  placeholder,
  onCancelPressed,
  onSavePressed,
  value,
  onChangeText,
  cancelText,
  saveText,
}) {
  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={userImage}
                resizeMode="stretch"
                style={[styles.userImage]}
              />
            </View>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/* <View style={styles.separator} /> */}
            <Text style={styles.textInputHeaderText}>{textInputHeader}</Text>
            <TextInput
              placeholder={placeholder}
              autoFocus
              multiline
              blurOnSubmit={true}
              numberOfLines={5}
              maxLength={255}
              value={value}
              onChangeText={onChangeText}
              style={[
                styles.editInput,
                {
                  textAlignVertical: "top",
                },
              ]}
            />
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
    width: "75%",
    height: height * 0.35,
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "95%",
    height: "30%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "#f2f2",
  },
  imageContainer: {
    marginHorizontal: "2.5%",
  },

  userImage: {
    width: RFPercentage(9),
    height: RFPercentage(9),
    backgroundColor: "#AAA",
    borderRadius: 1000,
    borderColor: "#DEDEDE",
    borderWidth: 2,
  },

  userNameContainer: {
    flex: 1,
  },

  userName: {
    color: "#562C73",
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
  },

  inputContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#02f2",
    width: "95%",
    height: "50%",
  },

  textInputHeaderText: {
    fontSize: RFPercentage(2),
    color: "#D81D4C",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: "2%",
  },

  editInput: {
    width: "100%",
    borderColor: "#948E8E",
    borderWidth: 2,
    borderRadius: 5,
    fontSize: RFPercentage(2),

    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    marginHorizontal: width * 0.03,
    marginBottom: height * 0.01,
    // backgroundColor: "#DEE0E2",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    // backgroundColor: "#f002",
  },

  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: "#FFF",
  },

  confirmationButtonsContainer: {
    // backgroundColor: "#00f2",
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
});
