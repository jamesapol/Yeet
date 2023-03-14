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

export default function ModalTextInput({
  linkImage,
  linkName,
  linkURLHeader,
  onCancelPressed,
  onSavePressed,
  placeholder,
  value,
  onChangeText,
  warningVisible = false,
  saveDisabled,
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
                // flexDirection: "row",
                // justifyContent: "center",
                width: "95%",
                // backgroundColor: '#9c33',

                // borderBottomWidth: 1,
                // borderBottomColor: "#948E8E",
              }}
            >
              {/* <TextInput
                style={{
                  ...styles.linkHeader,
                  display: defaultValue ? "flex" : "none",
                }}
                defaultValue={defaultValue}
                value={linkURLHeader}
                editable={false}
              /> */}
              <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={{
                  ...styles.linkInput,
                  // display: textInputVisible,
                  // textAlign: !defaultValue ? "center" : "left",
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
                fontSize: RFPercentage(1.5),
                color: "#D81D4C",
                display: warningVisible ? "flex" : "none",
              }}
            >
              PLEASE ENTER A LINK
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                disabled={saveDisabled}
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
    width: RFPercentage(37),
    height: RFPercentage(27),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
    width: "100%",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f2f2",
  },

  linkImage: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    marginHorizontal: "2.5%",
  },

  linkName: {
    color: "#562C73",
    fontWeight: "300",
    fontSize: RFPercentage(4.5),
    marginHorizontal: "2.5%",
  },

  inputContainer: {
    alignItems: "center",
    maxWidth: "100%",
    width: "100%",
    height: "25%",
  },

  linkHeader: {
    // width: "30%",
    marginBottom: 5,
    paddingLeft: 3,
    fontSize: RFPercentage(1.7),
    color: "#000",
    // textAlign: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#948E8E",
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

  link: {
    // maxWidth: "50%",
    // marginBottom: 2,
    // borderBottomWidth: 1,
    // borderBottomColor: "#948E8E",
    // paddingRight: 2,
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "25%",

    // borderTopWidth: 1,
    // backgroundColor: "#f002",
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
});
