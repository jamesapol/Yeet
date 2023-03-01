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
  
  var { width } = Dimensions.get("window");
  var { height } = Dimensions.get("window");
  
  export default function ModalNote({
    userImage,
    userName,
    connectionNotes,
    textInputHeader,
    placeholder,
    onCancelPressed,
    onSavePressed,
    value,
    onChangeText,
    cancelText,
    saveText,
  }) {

    return (
      <View style={styles.centeredModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderContainer}>
              <Image
                source={userImage}
                resizeMode="stretch"
                style={[styles.userImage]}
              />
              <Text style={styles.userName}>{userName}</Text>
              <View style={styles.separator} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textInputHeaderText}>{textInputHeader}</Text>
              <TextInput
                placeholder={placeholder}
                autoFocus
                multiline
                blurOnSubmit={true}
                numberOfLines={5}
                maxLength={255}
                value={value}
                onChangeText={onChangeText}
                style={[
                  styles.editInput,
                  {
                    textAlignVertical: "top",
                  },
                ]}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={onSavePressed}
                style={styles.saveButtonContainer}
                activeOpacity={0.4}
              >
                <Text style={[styles.buttonText, { color: "#562C73" }]}>
                  {saveText}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onCancelPressed}
                style={styles.cancelButtonContainer}
                activeOpacity={0.4}
              >
                <Text style={[styles.buttonText, { color: "#D81D4C" }]}>
  
                  {cancelText}
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
      height: height * 0.3,
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
      justifyContent: "flex-end",
      // backgroundColor: "#f2f2",
    },
  
    userImage: {
      width: RFPercentage(11),
      height: RFPercentage(11),
      backgroundColor: "#AAA",
      borderRadius: 1000,
      borderColor: "#DEDEDE",
      borderWidth: 2,
    },
  
    userName: {
      color: "#562C73",
      fontWeight: "bold",
      fontSize: RFPercentage(2),
    },
  
    separator: {
      width: "90%",
      backgroundColor: "#948E8E",
      height: "0.5%",
      marginVertical: height * 0.015,
    },
  
    inputContainer: {
      alignItems: "center",
      justifyContent: "flex-start",
      // backgroundColor: "#02f2",
      width: "90%",
      height: "50%",
    },
  
    textInputHeaderText: {
      fontSize: RFPercentage(1.5),
      color: "#D81D4C",
      fontWeight: "bold",
      alignSelf: "flex-start",
      marginBottom: "2%",
    },
  
    editInput: {
      width: "100%",
      borderColor: "#948E8E",
      borderWidth: 2,
      borderRadius: 5,
      fontSize: RFPercentage(1.5),
  
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.01,
      marginHorizontal: width * 0.03,
      marginBottom: height * 0.01,
      // backgroundColor: "#DEE0E2",
    },
  
    buttonContainer: {
      flexDirection: "row",
      width: "100%",
      height: "15%",
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
      // backgroundColor: "#00f2",
      height: "100%",
      width: "50%",
      borderRightColor: "#948E8E",
      borderRightWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  