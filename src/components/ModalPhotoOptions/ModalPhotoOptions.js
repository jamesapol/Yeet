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
        <View style={styles.modalContent}>
          <View style={styles.modalButton}>
            <TouchableOpacity onPress={onUploadImagePressed}>
              <Text style={styles.modalMessage}>Upload Image</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalButton}>
            <TouchableOpacity onPress={onTakePhotoPressed}>
              <Text style={styles.modalMessage}>Take a Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalCancelContainer}>
          <TouchableOpacity
            onPress={onCancelPressed}
            style={styles.cancelButtonContainer}
          >
            <Text style={styles.cancelButton}>Cancel</Text>
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
    width: width * 0.7,
    height: RFPercentage(25),
    borderRadius: 25,
    backgroundColor: "#ECECEC",
    alignItems: "center",
    justifyContent: "space-around",
  },

  modalHeaderContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "1%",
    height: "20%",
    //   backgroundColor: "#F222",
  },

  modalHeader: {
    fontWeight: "900",
    fontSize: RFPercentage(2.5),
  },

  modalContent: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F222",
  },

  modalMessage: {
    // backgroundColor: "#F222",
    fontSize: RFPercentage(2),
    textAlign: "center",
    marginVertical: "5%",
  },

  modalButton: {
    width: "100%",
    // borderTopWidth: 0.28,
    // borderTopColor: Colors.yeetBorderGray,
    // borderBottomWidth: 0.28,
    // borderBottomColor: Colors.yeetBorderGray,
  },

  modalCancelContainer: {
    width: "100%",
    height: "20%",
    borderTopColor: Colors.yeetBorderGray,
    borderTopWidth: 1,
    // justifyContent: "center",
    // backgroundColor: "#F222",
  },

  cancelButtonContainer: {
    height: "100%",
    // backgroundColor: "#F222",
    justifyContent: "center",
    alignItems: "center",
},

cancelButton: {
    fontSize: RFPercentage(1.5),
    textAlign: "center",
    fontWeight: "bold",
  },
});
