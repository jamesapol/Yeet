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
export default function ModalPhotoOptions({
  modalHeader, //SUCCESS OR ERROR
  modalMessage,
  onUploadImagePressed,
  onTakePhotoPressed,
  onCancelPressed,
}) {
  return (
    <View style={styles.centeredModal}>
      <View style={styles.modal}>
        <View style={styles.modalHeaderContainer}>
          <Text style={styles.modalHeader}>{modalHeader}</Text>
        </View>

        <View style={styles.modalContentContainer}>
          <TouchableOpacity
            onPress={onUploadImagePressed}
            style={{
              ...styles.buttons,
              backgroundColor: Colors.yeetPurple,
              borderColor: Colors.yeetPurple,
              marginVertical: "2.5%",
            }}
          >
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onTakePhotoPressed}
            style={{
              ...styles.buttons,
              backgroundColor: Colors.yeetPurple,
              borderColor: Colors.yeetPurple,
              marginVertical: "2.5%",
            }}
          >
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cancelButtonContainer}>
          <TouchableOpacity
            onPress={onCancelPressed}
            style={{
              ...styles.buttons,
              backgroundColor: Colors.yeetPink,
              borderColor: Colors.yeetPink,
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={onOKPressed}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View> */}
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
    width: RFPercentage(35),
    height: RFPercentage(35),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    // justifyContent: "space-around",
  },

  modalHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    // paddingBottom: "1%",
    height: "20%",
    width: "100%",
    // backgroundColor: "#0222",
  },

  modalHeader: {
    fontWeight: "900",
    fontSize: RFPercentage(2.5),
  },

  modalContentContainer: {
    height: "60%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#5FFF",
  },

  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
  },

  buttons: {
    // backgroundColor:'green',
    height: RFPercentage(5),
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 2,
  },

  buttonText: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: "#FFF",
  },
});
