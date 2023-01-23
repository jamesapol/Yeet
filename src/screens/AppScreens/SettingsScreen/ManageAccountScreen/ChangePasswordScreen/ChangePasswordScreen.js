import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import PageHeader from "../../../../../components/PageHeader";

import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import CustomInput from "../../../../../components/CustomInput/CustomInput";
import CustomButton from "../../../../../components/CustomButton/CustomButton";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import ModalMessage from "../../../../../components/ModalMessage/ModalMessage";
import { Colors, GlobalStyles } from "../../../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ChangePasswordScreen() {
  const {
    errorMessage,
    setErrorMessage,
    successMessage,
    showModal,
    setShowModal,
    isLoading,
    updatePassword,
    updatePasswordSuccessModalVisible,
    setUpdatePasswordSuccessModalVisible,
    updatePasswordErrorModalVisible,
    setUpdatePasswordErrorModalVisible,
  } = useContext(AuthContext);

  const [hidden, setHidden] = useState(true);
  const [hiddenNew, setHiddenNew] = useState(true);
  const [hiddenConfirm, setHiddenConfirm] = useState(true);
  const toggleHidden = () => setHidden((previousState) => !previousState);
  const toggleHiddenNew = () => setHiddenNew((previousState) => !previousState);
  const toggleHiddenConfirm = () =>
    setHiddenConfirm((previousState) => !previousState);

  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validPassword, setValidPassword] = useState(false);
  const [errorTextVisible, setErrorTextVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [_errorMessage, _setErrorMessage] = useState(false);

  const closeModal = () => {
    setUpdatePasswordErrorModalVisible(false);
    setUpdatePasswordSuccessModalVisible(false);
  };
  
  const closeErrorModal = () => {
    setUpdatePasswordErrorModalVisible(false);
  }
  
  const closeSuccessModal = () => {
    setUpdatePasswordSuccessModalVisible(false);
    navigation.goBack();
  }

  const containsNumber = (text) => {
    return /\d/.test(text);
  };

  const containsUppercase = (text) => {
    return /[A-Z]/.test(text);
  };

  const validatePassword = (newPassword, confirmPassword) => {
    let hasUppercase = containsUppercase(newPassword);
    let hasNumber = containsNumber(newPassword);
    if (newPassword.length < 8 || !newPassword) {
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
    } else if (currentPassword == newPassword) {
      setValidPassword(false);
      setErrorText("Password must not be the same as your last password.");
      setErrorTextVisible(true);
    } else if (newPassword !== confirmPassword) {
      setValidPassword(false);
      setErrorText("Passwords do not match!");
      setErrorTextVisible(true);
    } else {
      setValidPassword(true);
      setErrorTextVisible(false);
    }
    console.log(newPassword + " " + confirmPassword);
  };

  const onUpdatePressed = () => {
    // if (!currentPassword || !newPassword || !confirmPassword) {
    //   setShowModal(true);
    //   setErrorMessage("Please enter your password!");
    // } else if (newPassword == currentPassword) {
    //   setShowModal(true);
    //   setErrorMessage("Please enter a new password!");
    // } else if (newPassword != confirmPassword) {
    //   setShowModal(true);
    //   setErrorMessage("Passwords do not match!");
    // } else if (newPassword.length < 8) {
    //   setShowModal(true);
    //   setErrorMessage("Password must contain at least 8 characters!");
    // } else if (newPassword == confirmPassword) {
    updatePassword(currentPassword, newPassword);

    setCurrentPassword();
    setNewPassword();
    setConfirmPassword();
    setHidden(true);
    setHiddenNew(true);
    setHiddenConfirm(true);
    setValidPassword(false);
    // }
  };

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={GlobalStyles.root}>
      <PageHeader
        headerText="Change Password"
        iconColor={Colors.yeetPurple}
        textColor={Colors.yeetPurple}
        onPress={onBackPressed}
      />

      {/* LOCAL ERROR MODAL */}
      {/* <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showModal}
        onRequestClose={closeModal}
      >
        <ModalMessage
          onOKPressed={closeModal}
          modalHeader="Error"
          modalMessage={errorMessage}
        />
      </Modal> */}

      {/* ERROR MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={updatePasswordErrorModalVisible}
        onRequestClose={closeErrorModal}
      >
        <ModalMessage
          onOKPressed={closeErrorModal}
          modalHeader="Error"
          modalMessage={errorMessage}
        />
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={updatePasswordSuccessModalVisible}
        onRequestClose={closeSuccessModal}
      >
        <ModalMessage
          onOKPressed={closeSuccessModal}
          modalHeader="Success"
          modalMessage={successMessage}
        />
      </Modal>

      {/* <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={noPasswordModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={closeModal}
        >
          <ModalMessage
            modalHeader="Error"
            modalMessage="Please enter a valid password!"
          />
        </TouchableOpacity>
      </Modal> */}

      <View style={GlobalStyles.mainContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <CustomInput
            selectTextOnFocus={true}
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry={hidden}
            autoFocus={true}
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
            autoCapitalize={false}
          />
          <View>
            <MaterialCommunityIcons
              style={styles.icon}
              onPress={toggleHidden}
              name={hidden == true ? "eye-off" : "eye"}
              size={RFPercentage(2)}
              color={Colors.yeetPurple}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <CustomInput
            selectTextOnFocus={true}
            onFocus={(text) => {
              if(!validPassword){
                setErrorText("Password must be at least 8 characters");
                setErrorTextVisible(true);
              }
            }}
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry={hiddenNew}
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              validatePassword(text, confirmPassword);
            }}
            autoCapitalize={false}
          />
          <View>
            <MaterialCommunityIcons
              style={styles.icon}
              onPress={toggleHiddenNew}
              name={hiddenNew == true ? "eye-off" : "eye"}
              size={RFPercentage(2)}
              color={Colors.yeetPurple}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <CustomInput
            selectTextOnFocus={true}
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry={hiddenConfirm}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validatePassword(newPassword, text);
            }}
            autoCapitalize={false}
          />
          <View>
            <MaterialCommunityIcons
              style={styles.icon}
              onPress={toggleHiddenConfirm}
              name={hiddenConfirm == true ? "eye-off" : "eye"}
              size={RFPercentage(2)}
              color={Colors.yeetPurple}
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
        <View style={styles.footerButtons}>
          <CustomButton
            fgColor="#FFF"
            bgColor={validPassword ? Colors.yeetPurple : Colors.yeetGray}
            borderColor={
              validPassword ? Colors.yeetPurple : Colors.yeetBorderGray
            }
            btnText="Update"
            justifyContent="center"
            style={styles.buttons}
            borderWidth="2"
            onPress={onUpdatePressed}
            disabled={isLoading || (validPassword ? false : true)}
            loading={isLoading}
          />
          <CustomButton
            onPress={onBackPressed}
            bgColor="#DEE0E2"
            fgColor="#D81D4C"
            justifyContent="center"
            btnText="Cancel"
            style={styles.buttons}
            borderWidth={2}
            borderColor="#DEE0E2"
            disabled={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  sectionContainer: {
    width: "100%",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.019,
  },

  inputSection: {},

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: Colors.yeetPurple,

    paddingHorizontal: width * 0.025,
    marginBottom: "2%",
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

  inputLabel: {
    color: Colors.yeetPurple,
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
  },

  footerButtons: {
    marginTop: height * 0.05,
  },

  buttons: {
    marginVertical: height * 0.006,
    backgroundColor: "#DEE0E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 50,
    paddingHorizontal: width * 0.01,
  },

  input: {
    textAlign: "right",
    borderColor: "black",
  },
});
