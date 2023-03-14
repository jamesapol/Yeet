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
          <TouchableOpacity
            style={{
              ...styles.modalButton,
              backgroundColor: Colors.yeetPurple,
              borderColor: Colors.yeetPurple,
            }}
            onPress={onResetPasswordPressed}
          >
            <Text style={styles.modalButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity
            style={{
              ...styles.modalButton,
              borderColor: Colors.yeetPink,
              backgroundColor: Colors.yeetPink,
            }}
            onPress={onOKPressed}
          >
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
    width: RFPercentage(40),
    height: RFPercentage(35),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "space-around",
  },

  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    height: "20%",
    width: "100%",
    // backgroundColor: "#F222",
  },

  modalHeader: {
    fontWeight: "900",
    fontSize: RFPercentage(2.5),
    paddingLeft: "3%",
  },

  modalContent: {
    height: "45%",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'green',
  },

  modalMessage: {
    fontSize: RFPercentage(2),
    textAlign: "center",
  },

  modalLink: {
    height: "15%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'teal',
  },

  modalLinkText: {
    fontSize: RFPercentage(2),
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: Colors.yeetPurple,
  },

  modalButtonContainer: {
    height: "20%",
    width: "100%",
    // backgroundColor:'#00f5',
    // borderTopColor: Colors.yeetBorderGray,
    // borderTopWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  modalButton: {
    height: RFPercentage(5),
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    // backgroundColor:'#00f5',
  },

  modalButtonText: {
    fontSize: RFPercentage(2),
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
  },
});
