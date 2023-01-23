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

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalTextInput({
  modalHeader, //SUCCESS OR ERROR
  linkImage,
  linkName,
  linkURLHeader,
  linkPlaceholder,
  onCancelPressed,
  onSavePressed,
  placeholder,
  onButtonPress,
  value,
  onChangeText,
  textInputVisible = "flex",
  warningVisible = "none",
  defaultValue,
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
            <Text style={styles.linkName}>{linkName}</Text>
          </View>
          <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: "row",
                width: "80%",
              }}
            >
              <TextInput
                style={{
                  ...styles.linkHeader,
                  display: defaultValue ? "flex" : "none",
                }}
                defaultValue={defaultValue}
                value={linkURLHeader}
                editable={false}
              />
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={{
                  ...styles.link,
                  display: textInputVisible,
                  textAlign: !defaultValue ? 'center' : 'left',
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
                fontSize: RFPercentage(1),
                color: "#D81D4C",
                display: warningVisible,
              }}
            >
              PLEASE ENTER A LINK
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
    width: "75%",
    height: RFPercentage(25),
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
    flexDirection:'row',
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
    fontSize: RFPercentage(4.5),
  },

  modalHeader: {
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },

  inputContainer: {
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#02f2",
    width: "100%",
    height: "25%",
  },

  linkHeader: {
    // width: "30%",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(1.7),
    color: "#000",
    // textAlign: "center",
    alignItems: "center",
  },
  link: {
    // width: "70%",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
    fontSize: RFPercentage(1.7),
    // textAlign: "center",
    alignItems: "center",
    flex: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "20%",
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
