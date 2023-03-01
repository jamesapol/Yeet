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
                  ? {uri: linkImage }
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
                fontSize: RFPercentage(1),
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
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                color: "#D81D4C",
                display: embedVideoURLError ? "flex" : "none",
              }}
            >
              {embedVideoURLErrorMessage}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onCancelPressed}
              style={styles.cancelButtonContainer}
              activeOpacity={0.4}
            >
              <Text style={[styles.buttonText, { color: "#D81D4C" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSavePressed}
              style={styles.saveButtonContainer}
              activeOpacity={0.4}
              disabled={saveDisabled}
            >
              <Text style={[styles.buttonText, { color: "#562C73" }]}>
                Save
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
    height: RFPercentage(27),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "#f2f2",
  },

  linkImage: {},

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
    height: "23%",
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
    // marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(1.5),
    textAlign: "center",
    alignItems: "center",
    flex: 1,
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
});
