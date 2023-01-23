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
  
  export default function ModalViewPaymentImage({
    linkImage,
    modalHeaderText,
    modalMessage,
    cancelText,
    saveText,
    onCancelPressed,
    onSavePressed,
    defaultImage,
    paymentImage,
    onClosePressed,
    onChangePhotoPressed,
    disabled = true,
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
                style={styles.modalLinkImage}
              />
  
              {/* <Text style={styles.modalHeaderText}>GCASH</Text> */}
            </View>
            <View style={styles.modalImageContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: paymentImage }}
                  resizeMode="contain"
                  style={styles.modalImage}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onClosePressed}
                style={{
                  width: "50%",
                  paddingVertical:'2.5%',
                  // height: "50%",
                  borderWidth: 2,
                  borderColor: Colors.yeetPurple,
                  borderRadius: 1000,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                activeOpacity={0.4}
              >
                <Text style={[styles.buttonText, { color: "#562C73" }]}>
                  Close
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
      width: "85%",
      height: height * 0.52,
      borderRadius: 25,
      backgroundColor: "#ECECEC",
    },
  
    modalContent: {
      height: "100%",
      alignItems: "center",
    },
  
    modalHeaderContainer: {
      width: "100%",
      height: "10%",
      alignItems: "center",
      justifyContent: "flex-end",
      // backgroundColor: "#f2f2",
    },
  
    modalLinkImage: {
      width: height * 0.1,
      height: height * 0.1,
      borderRadius: 1000,
      borderWidth: 0.1,
      borderColor: "#111111",
    },
  
    modalImageContainer: {
      width: "100%",
      height: "75%",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: "#00f3",
    },
  
    imageContainer: {
      width: height * 0.36,
      height: height * 0.36,
      borderWidth: 2,
      borderColor: Colors.yeetPurple,
      borderRadius: 1,
      // backgroundColor: "#00f3",
    },
  
    modalImage: {
      width: "100%",
      height: "100%",
      borderRadius: 1,
    },
  
    modalHeaderText: {
      marginTop: "3%",
      // backgroundColor: "#f2f2",
      color: "#562C73",
      fontWeight: "bold",
      fontSize: RFPercentage(3),
    },
  
    modalMessage: {
      color: "#D81D4C",
      fontWeight: "300",
      fontSize: RFPercentage(1.3),
    },
  
    modalHeader: {
      fontWeight: "bold",
      fontSize: RFPercentage(2),
    },
  
    inputContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#02f2",
      width: "100%",
      height: "25%",
    },
  
    buttonContainer: {
      width: "100%",
      height: "15%",
      // backgroundColor: "#f002",
      justifyContent: "center",
      alignItems: "center",
    },
  
    buttonText: {
      fontSize: RFPercentage(1.5),
      fontWeight: "bold",
    },
  });
  