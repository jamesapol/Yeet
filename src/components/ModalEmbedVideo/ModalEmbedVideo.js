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
import { FontAwesome5 } from "@expo/vector-icons";
import { BASE_URL } from "../../config";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalEmbedVideo({
  linkImage,

  onCancelPressed,
  onSavePressed,
  placeholder,
  onLinkNameChangeText,
  onLinkURLChangeText,

  embedVideoTitleError = false,
  linkNameErrorMessage,
  embedVideoURLError = false,
  embedVideoURLErrorMessage,

  embedVideoTitle,
  embedVideoURL,

  saveDisabled,
  videoID,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <Image
              source={
                linkImage
                  ? { uri: linkImage }
                  : { uri: `${BASE_URL}images/social-logo/video.png` }
              }
              resizeMode="stretch"
              style={{
                width: linkImage ? RFPercentage(14) : RFPercentage(8),
                height: linkImage ? RFPercentage(10) : RFPercentage(8),
                borderRadius: 25,
              }}
            />

            <TextInput
              style={{
                ...styles.linkName,
                // borderBottomWidth: 1,
                // borderBottomColor: "#948E8E",
              }}
              placeholder="YouTube Link Name"
              onChangeText={onLinkNameChangeText}
              value={embedVideoTitle}
              multiline={false}
              numberOfLines={1}
              maxLength={20}
              autoFocus
            />
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                fontWeight:'bold',
                color: "#D81D4C",
                display: embedVideoTitleError ? "flex" : "none",
              }}
            >
              PLEASE ENTER A LINK NAME!
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <View
              style={{
                width: "95%",
              }}
            >
              <TextInput
                placeholder="Paste your youtube link here..."
                value={embedVideoURL}
                onChangeText={onLinkURLChangeText}
                style={styles.linkInput}
                multiline={false}
                numberOfLines={1}
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                fontWeight:'bold',
                color: "#D81D4C",
                display: embedVideoURLError ? "flex" : "none",
              }}
            >
              {embedVideoURLErrorMessage}
            </Text>
          </View>
          {/* <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                // backgroundColor: "red",
              }}
            >
              <TextInput
                placeholder={placeholder}
                value={embedVideoURL}
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
          </View> */}

          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onSavePressed}
                style={{
                  ...styles.confirmationButtons,
                  borderColor: saveDisabled ? Colors.yeetBorderGray: Colors.yeetPurple,
                  backgroundColor: saveDisabled ? Colors.yeetGray : Colors.yeetPurple,
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
                  borderColor: Colors.yeetPink,
                  backgroundColor: Colors.yeetPink,
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
    width: RFPercentage(38),
    height: RFPercentage(32),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "#f2f2",
  },
  linkName: {
    color: "#562C73",
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
    textAlign: "center",
    maxWidth: "75%",
    width: "100%",
    // elevation: 50,
    // backgroundColor:'black',
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
    height: "30%",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
    // backgroundColor: "#f002",
  },

  linkInput: {
    borderWidth: 2,
    borderColor: "#562C73",
    paddingVertical: "3%",
    paddingHorizontal: "3%",
    marginBottom: '1.5%',
    borderRadius: 15,
    fontSize: RFPercentage(1.75),
    alignItems: "center",
    // backgroundColor: '#f566'
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
    // backgroundColor:'green',
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
