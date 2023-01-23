import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../../styles/GlobalStyles";
import { FontAwesome } from "@expo/vector-icons";
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
export default function ModalLockedAccount({
  modalHeader, //SUCCESS OR ERROR
  modalMessage,
  onResetPasswordPressed,
  onOKPressed,
  modalButtonText,
}) {
  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalHeaderContainer}>
          <FontAwesome name="lock" size={RFPercentage(3.5)} color="black" />
          <Text style={styles.modalHeader}>{modalHeader}</Text>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
        </View>
        <View style={styles.modalLink}>
          <Text style={styles.modalLinkText} onPress={onResetPasswordPressed}>
            Reset Password
          </Text>
        </View>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity style={styles.modalButton} onPress={onOKPressed}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
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
    backgroundColor: Colors.yeetBackgroundGray,
  },

  modal: {
    width: width * 0.7,
    height: height * 0.23,
    borderRadius: 25,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "space-around",
  },

  modalHeaderContainer: {
    flexDirection:'row',
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "1%",
    height: "20%",
    // backgroundColor: "#F222",
  },

  modalHeader: {
    fontWeight: "900",
    fontSize: RFPercentage(2.3),
    paddingLeft: '3%'
  },

  modalContent: {
    height: "35%",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalMessage: {
    fontSize: RFPercentage(1.5),
    textAlign: "center",
  },

  modalLink: {
    height: "25%",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalLinkText: {
    fontSize: RFPercentage(1.8),
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: Colors.yeetPurple,
  },

  modalButtonContainer: {
    height: "20%",
    width: "100%",
    // backgroundColor:'#00f5',
    borderTopColor: Colors.yeetBorderGray,
    borderTopWidth: 2,
  },

  modalButton: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'#00f5',
  },

  modalButtonText: {
    fontSize: RFPercentage(2),
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.yeetPurple,
  },
});
