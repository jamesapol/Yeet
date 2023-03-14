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

export default function ModalCustomLink({
  modalHeader, //SUCCESS OR ERROR
  linkImage,
  linkName,
  linkURLHeader,
  linkPlaceholder,
  onCancelPressed,
  onSavePressed,
  placeholder,
  onButtonPress,
  onLinkNameChangeText,
  onLinkURLChangeText,
  textInputVisible = "flex",
  linkNameWarningVisible,
  linkNameErrorMessage,
  linkURLWarningVisible,
  linkURLErrorMessage,

  defaultNameValue,
  defaultLinkValue,

  customLinkNameValue,
  customLinkURLValue,

  saveDisabled,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <Image
              source={linkImage}
              resizeMode="stretch"
              style={styles.linkImage}
            />
            <TextInput
              style={{
                ...styles.linkName,
              }}
              placeholder="Custom Link Name"
              onChangeText={onLinkNameChangeText}
              value={customLinkNameValue}
              multiline={false}
              numberOfLines={1}
              maxLength={20}
              autoFocus
            />
            <Text
              style={{
                fontSize: RFPercentage(1.3),
                color: "#D81D4C",
                // display: "flex"
                display: linkNameWarningVisible ? "flex" : "none",
              }}
            >
              {linkNameErrorMessage}
            </Text>
          </View>
          {/* <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
              }}
            >
              <TextInput
                placeholder={placeholder}
                value={customLinkURLValue}
                onChangeText={onLinkURLChangeText}
                style={styles.link}
                multiline={false}
                numberOfLines={1}
                // autoFocus
                keyboardType="url"
                autoCapitalize="none"
                // defaultValue={defaultValue}
              />
            </View>
            <Text
              style={{
                fontSize: RFPercentage(1.3),
                color: "#D81D4C",
                display: linkURLWarningVisible ? "flex" : "none",
              }}
            >
              {linkURLErrorMessage}
            </Text>
          </View> */}

          <View style={styles.inputContainer}>
            <View
              style={{
                width: "95%",
              }}
            >
              <TextInput
                placeholder={placeholder}
                value={customLinkURLValue}
                onChangeText={onLinkURLChangeText}
                style={{
                  ...styles.linkInput,
                }}
                multiline={false}
                numberOfLines={1}
                autoFocus
                keyboardType="url"
                autoCapitalize="none"
                // defaultValue={defaultValue}
              />
            </View>
            <Text
              style={{
                fontSize: RFPercentage(1.3),
                color: "#D81D4C",
                display: linkURLWarningVisible ? "flex" : "none",
              }}
            >
              {linkURLErrorMessage}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onSavePressed}
                style={{
                  ...styles.confirmationButtons,
                  backgroundColor: saveDisabled
                    ? Colors.yeetGray
                    : Colors.yeetPurple,
                  borderColor: saveDisabled
                    ? Colors.yeetBorderGray
                    : Colors.yeetPurple,
                  borderWidth: 2,
                }}
                activeOpacity={0.4}
                disabled={saveDisabled}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onCancelPressed}
                style={{
                  ...styles.confirmationButtons,
                  backgroundColor: Colors.yeetPink,
                  borderColor: Colors.yeetPink,
                  borderWidth: 2,
                }}
                activeOpacity={0.4}
              >
                <Text style={styles.buttonText}>Cancel</Text>
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
    height: "55%",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "#f2f2",
  },

  linkImage: {
    width: RFPercentage(8),
    height: RFPercentage(8),
  },

  linkName: {
    color: "#562C73",
    fontWeight: "300",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    textAlign: "center",
  },

  modalHeader: {
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },

  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#02f2",
    width: "100%",
    height: "25%",
  },

  linkHeader: {
    // width: "30%",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(1.5),
    color: "#000",
    // textAlign: "center",
    alignItems: "center",
  },
  link: {
    // width: "70%",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(2),
    textAlign: "center",
    alignItems: "center",
    flex: 1,
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

  saveButtonContainer: {
    // backgroundColor: "#00f2",
    height: "100%",
    width: "50%",
    borderLeftColor: "#948E8E",
    borderLeftWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  linkInput: {
    borderWidth: 2,
    borderColor: "#562C73",
    paddingVertical: "3%",
    paddingHorizontal: "3%",
    borderRadius: 15,
    fontSize: RFPercentage(1.75),
    alignItems: "center",
    // backgroundColor: '#f566'
  },
});
