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
                  size={RFPercentage(2)}
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
            <TouchableOpacity
              onPress={onSavePressed}
              style={styles.saveButtonContainer}
              activeOpacity={0.4}
            >
              <Text style={[styles.buttonText, { color: "#562C73" }]}>
                Continue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancelPressed}
              style={styles.cancelButtonContainer}
              activeOpacity={0.4}
            >
              <Text style={[styles.buttonText, { color: "#D81D4C" }]}>
                Cancel
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
    // backgroundColor: 'red',
    backgroundColor: Colors.yeetBackgroundGray,
  },

  modal: {
    width: "70%",
    height: height * 0.18,
    borderRadius: 25,
    backgroundColor: "#ECECEC",
  },

  modalContent: {
    height: "100%",
    alignItems: "center",
  },

  modalHeaderContainer: {
    width: "100%",
    height: "35%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  headerText: {
    color: "#562C73",
    fontWeight: "bold",
    fontSize: RFPercentage(1.5),
  },

  modalHeader: {
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },

  inputContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "40%",
  },

  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: Colors.yeetPurple,
    paddingHorizontal: width * 0.03,
  },

  input: {
    width: "70%",
    paddingVertical: height * 0.006,
    fontSize: RFPercentage(1.7),
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    height: "25%",
    borderTopWidth: 1,
    borderTopColor: "#948E8E",
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
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
  },

  saveButtonContainer: {
    height: "100%",
    width: "50%",
    borderRightColor: "#948E8E",
    borderRightWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
