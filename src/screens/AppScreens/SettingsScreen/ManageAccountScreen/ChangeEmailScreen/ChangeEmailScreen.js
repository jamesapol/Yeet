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

import ModalPassword from "../../../../../components/ModalPassword/ModalPassword";
import ModalMessage from "../../../../../components/ModalMessage/ModalMessage";
import { ButtonStyles, GlobalStyles } from "../../../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ChangeEmailScreen() {
  const {
    userInfo,
    updateEmail,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    showModal,
    setShowModal,
    isLoading,
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newEmail, setNewEmail] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [password, setPassword] = useState(null);
  const [_errorMessage, _setErrorMessage] = useState();
  const toggle = () => {
    setPasswordHidden((passwordHidden) => !passwordHidden);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword(null);
  };

  const onSaveEmailPressed = () => {
    if (!newEmail) {
      setErrorMessage("Please enter an email address!");
      setShowModal(true);
    } else {
      setShowPasswordModal(true);
    }
  };

  const onSubmitPassword = () => {
    if (!password) {
      setShowModal(true);
      _setErrorMessage("Please enter your password!");
    } else {
      setShowPasswordModal(false);
      setPassword(null);
      updateEmail(newEmail, password);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <ScrollView style={GlobalStyles.root}>
      <PageHeader
        headerText="Change Email"
        iconColor="#562C73"
        textColor="#562C73"
        onPress={onBackPressed}
      />
      {/* ENTER PASSWORD MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showPasswordModal}
        onRequestClose={closePasswordModal}
      >
        <ModalPassword
          onCancelPressed={closePasswordModal}
          secureTextEntry={passwordHidden}
          onShowPasswordPressed={toggle}
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSavePressed={onSubmitPassword}
        />
      </Modal>

      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showModal}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={closeModal}
        >
          <ModalMessage
            modalHeader={
              successMessage ? "Success" : errorMessage ? "Error" : "Error"
            }
            modalMessage={
              successMessage
                ? successMessage
                : errorMessage
                ? errorMessage
                : _errorMessage
            }
          />
        </TouchableOpacity>
      </Modal>
      <View style={GlobalStyles.mainContainer}>
        <View style={[styles.inputContainer]}>
          <Text style={styles.inputLabel}>Current Email</Text>
          <CustomInput
            value={userInfo.usr_email}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Email</Text>
          <CustomInput
            placeholder="sample@email.com"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus={true}
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
          />
        </View>
        <View style={styles.footerButtons}>
          <CustomButton
            loading={isLoading}
            disabled={isLoading}
            fgColor="#DEE0E2"
            bgColor="#562C73"
            btnText="Save"
            justifyContent="center"
            style={ButtonStyles.buttons}
            onPress={onSaveEmailPressed}
            borderColor="#562C73"
            borderWidth="2"
          />
          <CustomButton
            disabled={isLoading}
            onPress={onBackPressed}
            bgColor="#DEE0E2"
            fgColor="#D81D4C"
            justifyContent="center"
            btnText="Cancel"
            borderColor="#DEE0E2"
            borderWidth="2"
            style={ButtonStyles.buttons}
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

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#562C73",
    borderRadius: 1000,
    paddingHorizontal: width * 0.025,
    marginBottom: "2%",
  },

  inputLabel: {
    color: "#562C73",
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
    fontWeight: "bold",
    color: "#562C73",
  },
});
