import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
} from "react-native";
import axios from "axios";
import * as Device from "expo-device";

import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import PageHeader from "../../../components/PageHeader";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BASE_URL } from "../../../config";

import ModalMessage from "../../../components/ModalMessage/ModalMessage";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function RegisterScreen() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [errorTextVisible, setErrorTextVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [valid, setValid] = useState(false);
  const [checkEmailLoading, setCheckEmailLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [modalHeader, setModalHeader] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const togglePasswordHidden = () =>
    setPasswordHidden((previousState) => !previousState);
  const toggleConfirmPasswordHidden = () =>
    setConfirmPasswordHidden((previousState) => !previousState);

  /**
   * ----------------------------------
   * MAIN FUNCTIONS
   * ----------------------------------
   */

  const onCheckEmail = () => {
    Keyboard.dismiss();
    checkEmailAvailability(email, password, confirmPassword);
  };

  const checkEmailAvailability = (email, password, confirmPassword) => {
    setValid(false);
    setCheckEmailLoading(true);
    axios
      .post(
        `${BASE_URL}api/checkEmailAvailability`,
        {
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          deviceName: Device.modelName,
        },
        {}
      )
      .then((response) => {
        let responseData = response.data.data;
        console.log(response.data);
        if (responseData.coolDown) {
          setSuccessModalVisible(true);
          setModalHeader("Confirmation Code");
          setModalMessage(responseData.coolDown);
        } else if (responseData.success) {
          setSuccessModalVisible(true);
          setModalHeader("Code Sent");
          setModalMessage(responseData.success);
        }
        setCheckEmailLoading(false);
      })
      .catch((e) => {
        console.log("Error: " + e.response.data.errors.email);
        setErrorModalVisible(true);
        setModalHeader("Email Taken");
        setModalMessage(e.response.data.errors.email);
        setValid(false);
        setCheckEmailLoading(false);
      });
  };

  const clearAll = () => {
    setValid(false);
    setEmail();
    setPassword();
    setConfirmPassword();
    setPasswordHidden(true);
    setConfirmPasswordHidden(true);
    setValidEmail(false);
    setValidPassword(false);
    setErrorTextVisible();
    setErrorText("");
    setSuccessModalVisible(false);
    setErrorModalVisible(false);
  };

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate("ConfirmEmailScreen", {
      email: email,
      password: password,
    });
    clearAll();
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
    clearAll();
  };

  const containsNumber = (text) => {
    return /\d/.test(text);
  };

  const containsUppercase = (text) => {
    return /[A-Z]/.test(text);
  };

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setValidEmail(false);
      setErrorTextVisible(true);
      setErrorText("Invalid email.");
    } else {
      setValidEmail(true);
      setErrorTextVisible(false);
    }
  };

  const validatePassword = (password, confirmPassword) => {
    let hasNumber = containsNumber(password);
    let hasUppercase = containsUppercase(password);
    if (!validEmail) {
      setValidEmail(false);
      setErrorTextVisible(true);
      setErrorText("Invalid email.");
    } else if (password.length < 8 || password.length === undefined) {
      setValidPassword(false);
      setErrorText("Password must be at least 8 characters");
      setErrorTextVisible(true);
    } else if (!hasNumber) {
      setValidPassword(false);
      setErrorText("Password must contain at least 1 number");
      setErrorTextVisible(true);
    } else if (!hasUppercase) {
      setValidPassword(false);
      setErrorText(
        "Password must contain a combination of uppercase and lowercase characters."
      );
      setErrorTextVisible(true);
    } else if (password !== confirmPassword) {
      setValidPassword(false);
      setErrorText("Passwords do not match!");
      setErrorTextVisible(true);
    } else {
      setValidPassword(true);
      setErrorTextVisible(false);
    }
  };

  return (
    <View style={GlobalStyles.root}>
      {/* SUCCESS MODAL */}
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

      {/* ERROR MODAL */}
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
      <PageHeader headerText="Create an account" onPress={onBackPressed} />
      <SectionHeader sectionHeaderText="Create your Yeet account" />
      <View style={styles.sectionContainer}>
        <View style={styles.emailInputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <CustomInput
            placeholder="sample@email.com"
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text.toLowerCase());
              let _email = text;
              validateEmail(_email);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <CustomInput
            onFocus={(text) => {
              validatePassword(text, confirmPassword);
            }}
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry={passwordHidden}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text, confirmPassword);
            }}
            autoCapitalize="none"
          />
          <View>
            <MaterialCommunityIcons
              onPress={togglePasswordHidden}
              name={passwordHidden == true ? "eye-off" : "eye"}
              size={RFPercentage(2)}
              color="#562C73"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <CustomInput
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry={confirmPasswordHidden}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validatePassword(password, text);
            }}
            autoCapitalize="none"
          />
          <View>
            <MaterialCommunityIcons
              style={styles.icon}
              onPress={toggleConfirmPasswordHidden}
              name={confirmPasswordHidden == true ? "eye-off" : "eye"}
              size={RFPercentage(2)}
              color="#562C73"
            />
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Text
            style={{
              ...styles.errorText,
              display: errorTextVisible ? "flex" : "none",
            }}
          >
            {errorText}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <CustomButton
            fgColor="#FFF"
            bgColor={
              validEmail && validPassword ? Colors.yeetPurple : Colors.yeetGray
            }
            btnText="Continue"
            onPress={onCheckEmail}
            loading={checkEmailLoading}
            disabled={
              checkEmailLoading || (validEmail && validPassword ? false : true)
            }
            // disabled={continueButtonDisabled}
          />
          <Text style={styles.footerText}>
            By tapping Continue, you agree to our{" "}
            <Text style={{ fontWeight: "bold" }}>Terms{" & "}Privacy</Text>
          </Text>
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
    justifyContent: "flex-start",
  },

  sectionContainer: {
    width: "100%",
    paddingHorizontal: width * 0.05,
  },

  emailInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DEE0E2",
    borderRadius: 30,

    paddingLeft: width * 0.03,
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
    fontSize: RFPercentage(1.7),
    fontWeight: "900",
  },

  input: {
    textAlign: "right",
    paddingHorizontal: width * 0.03,
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

  errorContainer: {
    paddingHorizontal: width * 0.03,
    alignItems: "flex-end",
  },

  errorText: {
    fontSize: RFPercentage(1.3),
    fontWeight: "bold",
    color: Colors.yeetPink,
  },
});
