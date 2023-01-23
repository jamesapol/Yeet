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
  import * as ImagePicker from "expo-image-picker";
  
  import { useState } from "react";
  import { Colors } from "../../styles/GlobalStyles";
  
  var { width } = Dimensions.get("window");
  var { height } = Dimensions.get("window");
  
  export default function ModalUploadImage({
    modalImage,
    modalHeaderText,
    modalMessage,
    cancelText,
    saveText,
    onCancelPressed,
    onSavePressed,
    image,
    onUploadPhotoPressed,
    disabled = true,
  }) {
    const [link, setLink] = useState(false);
  
    return (
      <View style={styles.centeredModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderContainer}>
              <View style={{ height: "12%", justifyContent: "flex-end" }}>
                <Image
                  source={modalImage}
                  resizeMode="stretch"
                  style={styles.modalLinkImage}
                />
              </View>
              {/* <Text style={styles.modalHeaderText}>GCASH</Text> */}
              {image ? (
                image && (
                  <Image
                    source={{ uri: image }}
                    resizeMode="contain"
                    style={styles.modalImage}
                  />
                )
              ) : (
                <Image
                  // source={}
                  resizeMode="contain"
                  style={styles.modalImage}
                />
              )}
              <View
                style={{
                  // backgroundColor: "#00f3",
                  width: "100%",
                  height: "15%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    //   backgroundColor: "#f004",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={onUploadPhotoPressed}
                    style={{
                      width: "100%",
                      height: "75%",
                      borderWidth: 2,
                      borderColor: Colors.yeetPurple,
                      borderRadius: 1000,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    activeOpacity={0.4}
                  >
                    <Text style={[styles.buttonText, { color: "#562C73" }]}>
                      {!image ? "Upload Image" : "Change Photo"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onCancelPressed}
                style={styles.cancelButtonContainer}
                activeOpacity={0.4}
              >
                <Text style={[styles.buttonText, { color: "#562C73" }]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSavePressed}
                style={styles.removeButtonContainer}
                activeOpacity={0.4}
                disabled={disabled}
              >
                <Text style={[styles.buttonText, { color: "#D81D4C" }]}>
                  {saveText}
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
      height: height * 0.44,
      borderRadius: 25,
      backgroundColor: "#ECECEC",
    },
  
    modalContent: {
      height: "100%",
      alignItems: "center",
    },
  
    modalHeaderContainer: {
      width: "100%",
      height: "90%",
      alignItems: "center",
      justifyContent: "flex-start",
      // backgroundColor: "#f2f2",
    },
  
    modalLinkImage: {
      width: height * 0.1,
      height: height * 0.1,
      borderRadius: 1000,
      borderWidth: 0.1,
      borderColor: "#111111",
    },
  
    modalImage: {
      marginVertical: "3%",
      width: height * 0.25,
      height: height * 0.25,
      borderWidth: 2,
      borderColor: Colors.yeetPurple,
      borderRadius: 5,
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
  
    link: {
      width: "70%",
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#948E8E",
      fontSize: RFPercentage(1.5),
      textAlign: "center",
      alignItems: "center",
    },
  
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
      height: "10%",
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
  
    removeButtonContainer: {
      // backgroundColor: "#00f2",
      height: "100%",
      width: "50%",
      borderLeftColor: "#948E8E",
      borderLeftWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  