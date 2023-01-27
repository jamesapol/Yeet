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

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
export default function ModalMessage({
  modalHeader, //SUCCESS OR ERROR
  modalMessage,
  onOKPressed,
  onButtonPress,
}) {
  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalHeaderContainer}>
          <Text style={styles.modalHeader}>{modalHeader}</Text>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
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
    height: RFPercentage(17),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "space-around",
  },

  modalHeaderContainer: {
    marginTop: '3%',
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "1%",
    height: "20%",
    // backgroundColor: "#F222",
  },

  modalHeader: {
    fontWeight: "900",
    fontSize: RFPercentage(2.3),
  },

  modalContent: {
    height: "55%",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
  },

  modalMessage: {
    fontSize: RFPercentage(1.5),
    textAlign: "center",
  },

  modalButtonContainer: {
    height: "25%",
    width: "100%",
    // backgroundColor:'#00f5',
    borderTopColor: Colors.yeetBorderGray,
    borderTopWidth: 1,
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
