import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import PageHeader from "../../../components/PageHeader";
import SectionHeader from "../../../components/SectionHeader";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { AuthContext } from "../../../context/AuthContext";

import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import { useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BASE_URL } from "../../../config";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const {
    modalHeader,
    modalMessage,
    setModalHeader,
    setModalMessage,

    isLoading,
    setIsLoading,
  } = useContext(AuthContext);

  const navigation = useNavigation();

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

  const validateEmail = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
  };

  const onSendEmail = () => {
    Keyboard.dismiss();
    if (!email) {
      setErrorModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Please enter your email!");
    } else if (validateEmail(email) === false) {
      setErrorModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Please enter a valid email address!");
    } else {
      console.log("nice")
      resetPassword(email);
    }
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
    setEmail(null);
  };

  const closeSuccessModal = () => {
    navigation.navigate("ResetPasswordCodeScreen", { email: email });
    setSuccessModalVisible(false);
    setEmail(null);
  };

  //REFACTORED
  const resetPassword = async (email) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}api/resetPassword`,
        {
          email: email,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        let resetResponse = response.data.data;
        if (resetResponse.emailError) {
          setErrorModalVisible(true);
          setModalHeader("Error");
          setModalMessage(resetResponse.emailError);
        } else if (resetResponse.coolDown) {
          setErrorModalVisible(true);
          setModalHeader("Password Reset Code");
          setModalMessage(resetResponse.coolDown);
        } else {
          setSuccessModalVisible(true);
          setModalHeader("Success");
          setModalMessage(resetResponse.success);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
        // setErrorModalVisible(true);
        // setModalHeader("Error");
        // setModalMessage(error.response.data);
        // setValidEmail(false);
        setIsLoading(false);
      });
  };

  return (
    <View style={GlobalStyles.root}>

      {/* ERROR MESSAGE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={errorModalVisible}
        onRequestClose={closeErrorModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeErrorModal}
        />
      </Modal>

      {/* CODE MESSAGE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={successModalVisible}
        onRequestClose={closeSuccessModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeSuccessModal}
        />
      </Modal>

      <PageHeader headerText="Forgot Password" onPress={onBackPressed} />
      <SectionHeader sectionHeaderText="Enter your email and we will send you a confirmation code to reset your password." />

      <View style={styles.sectionContainer}>
        <View style={styles.emailInputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <CustomInput
            placeholder="sample@email.com"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus
          />
        </View>

        <View style={styles.footerContainer}>
          <CustomButton
            fgColor="#FFF"
            bgColor="#562C73"
            borderColor={Colors.yeetPurple}
            borderWidth="2"
            btnText="Continue"
            onPress={onSendEmail}
            disabled={isLoading}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
  },

  sectionContainer: {
    width: "100%",
    paddingHorizontal: "5%",
  },

  emailInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#000",
    backgroundColor: "#DEE0E2",
    borderRadius: 15,

    paddingLeft: width * 0.04,
    paddingVertical: height * 0.002,
    marginVertical: height * 0.008,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 1000,
    backgroundColor: "#DEE0E2",

    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.002,
    marginVertical: height * 0.008,
  },

  inputLabel: {
    color: "#562C73",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },

  input: {
    textAlign: "right",
    paddingHorizontal: "3%",
  },

  footerContainer: {
    marginTop: height * 0.05,
    width: "100%",
    paddingHorizontal: width * 0.1,
    alignSelf: "center",
  },

  footerText: {
    marginTop: height * 0.015,
    color: Colors.yeetPurple,
    fontSize: RFPercentage(1.5),
    textAlign: "center",
  },
});
