import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import PageHeader from "../../../../components/PageHeader";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import { useEffect } from "react";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";

import { MaterialCommunityIcons } from "@expo/vector-icons";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ResetPasswordScreen({ route }) {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const {
    modalHeader,
    modalMessage,
    setModalMessage,
    setModalHeader,

    validPassword,
    setValidPassword,
    isLoading,
    newPassword,

    newPasswordModalVisible,
    setNewPasswordModalVisible,

    setLoginModalVisible,
    successPasswordModalVisible,
    setSuccessPasswordModalVisible,
    errorPasswordModalVisible,
    setErrorPasswordModalVisible,
  } = useContext(AuthContext);

  const { email } = route.params;

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const [errorTextVisible, setErrorTextVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  const togglePasswordHidden = () =>
    setPasswordHidden((previousState) => !previousState);
  const toggleConfirmPasswordHidden = () =>
    setConfirmPasswordHidden((previousState) => !previousState);

  const onChangePassword = () => {
    Keyboard.dismiss();
    if (!password || !confirmPassword) {
      setNewPasswordModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Please fill out all the fields!");
    } else if (password != confirmPassword) {
      setNewPasswordModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Passwords do not match!");
    } else if ((password && confirmPassword).length < 8) {
      setNewPasswordModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Password must be at least 8 characters.");
    } else {
      // setValidPassword(true);
      newPassword(password, email);
    }
  };

  // useEffect(() => {
  //   // setNewPasswordModalVisible(false);
  //   // if (validPassword) {
  //   //   console.log(validPassword);
  //   //   setLoginModalVisible(true);
  //   //   setModalHeader("Success");
  //   //   setModalMessage("Password successfully changed. Please log in again.");
  //   //   // navigation.navigate("LoginScreen");
  //   //   setValidPassword(false);
  //   // }
  // });

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const closeSuccessModal = () => {
    setSuccessPasswordModalVisible(false);
    navigation.navigate("LoginScreen");
  };

  const closeErrorModal = () => {
    setErrorPasswordModalVisible(false);
    setPassword();
    setConfirmPassword();
    // navigation.navigate("LoginScreen");
  };

  const containsNumber = (text) => {
    return /\d/.test(text);
  };

  const containsUppercase = (text) => {
    return /[A-Z]/.test(text);
  };

  const validatePassword = (password, confirmPassword) => {
    let hasNumber = containsNumber(password);
    let hasUppercase = containsUppercase(password);
    if (password.length < 8) {
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
    console.log(password + " " + confirmPassword);
  };

  return (
    <View style={GlobalStyles.root}>
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={errorPasswordModalVisible}
        onRequestClose={closeErrorModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeErrorModal}
        />
      </Modal>

      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={successPasswordModalVisible}
        onRequestClose={closeSuccessModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeSuccessModal}
        />
      </Modal>
      <PageHeader headerText="Reset Password" onPress={onBackPressed} />
      <SectionHeader sectionHeaderText="Enter your new password below" />
      <View style={styles.sectionContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <CustomInput
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry={passwordHidden}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePassword(text, confirmPassword);
            }}
            autoCapitalize="none"
            autoFocus
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
            // onPress={onContinuePressed}
            fgColor="#FFF"
            bgColor={validPassword ? Colors.yeetPurple : Colors.yeetGray}
            btnText="Continue"
            onPress={onChangePassword}
            loading={isLoading}
            disabled={validPassword ? false : true}
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
    // backgroundColor: "#000",
    backgroundColor: "#DEE0E2",
    borderRadius: 30,

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
