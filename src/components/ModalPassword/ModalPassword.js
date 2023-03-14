import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ModalPassword({
  secureTextEntry,
  onCancelPressed,
  onSavePressed,
  visible,
  onShowPasswordPressed,
  value,
  onChangeText,
  warningVisible = "none",
  saveDisabled,
}) {
  const [link, setLink] = useState(false);

  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.headerText}>
              Please enter your password to continue
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.passwordInput}>
              <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                multiline={false}
                numberOfLines={1}
                autoFocus={true}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
              />
              <View>
                <MaterialCommunityIcons
                  style={styles.icon}
                  onPress={onShowPasswordPressed}
                  name={visible == true ? "eye-off" : "eye"}
                  size={RFPercentage(2.5)}
                  color="#562C73"
                />
              </View>
            </View>
            <Text
              style={{
                marginTop: 5,
                fontSize: RFPercentage(1.2),
                color: "#D81D4C",
                display: warningVisible,
              }}
            >
              INVALID PASSWORD
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                onPress={onSavePressed}
                style={{
                  ...styles.confirmationButtons,
                  borderColor: value ? Colors.yeetPurple : Colors.yeetBorderGray,
                  backgroundColor: value ? Colors.yeetPurple : Colors.yeetGray,
                  borderWidth: 2,
                }}
                activeOpacity={0.4}
                disabled={value ? false : true}
              >
                <Text style={styles.buttonText}>
                  Continue
                </Text>
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
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
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
    // backgroundColor: 'red',
    backgroundColor: Colors.yeetBackgroundGray,
  },

  modal: {
    width: RFPercentage(35),
    height: RFPercentage(25),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "90%",
    height: "35%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  
  headerText: {
    color: "#562C73",
    fontWeight: "bold",
    fontSize: RFPercentage(2),
    textAlign:'center'
  },

  modalHeader: {
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },

  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
    // backgroundColor:'teal'
  },

  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: Colors.yeetPurple,
    paddingHorizontal: width * 0.03,
    paddingVertical: '1%',
  },

  input: {
    width: "70%",
    paddingVertical: height * 0.006,
    fontSize: RFPercentage(2),
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "25%",
    // borderTopWidth: 1,
    // borderTopColor: "#948E8E",
  },

  cancelButtonContainer: {
    height: "100%",
    width: "50%",
    borderLeftColor: "#948E8E",
    borderLeftWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: "#FFF",
  },

  saveButtonContainer: {
    height: "100%",
    width: "50%",
    borderRightColor: "#948E8E",
    borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
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

});
