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
import {
  ButtonStyles,
  Colors,
  GlobalStyles,
} from "../../../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ChangeMobileNumberScreen() {
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

    updateMobileNumber,
    updateAccountModalVisible,
    setUpdateAccountModalVisible,
    modalHeader,
    modalMessage,
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [password, setPassword] = useState(null);
  const [_errorMessage, _setErrorMessage] = useState();

  const [validMobileNumber, setValidMobileNumber] = useState(false);
  const [errorText, setErrorText] = useState();
  const [errorTextVisible, setErrorTextVisible] = useState(false);
  const toggle = () => {
    setPasswordHidden((passwordHidden) => !passwordHidden);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword(null);
  };

  const closeModal = () => {
    setUpdateAccountModalVisible(false);
  };

  const onSavePressed = () => {
    updateMobileNumber(mobileNumber);
  };

  return (
    <ScrollView style={GlobalStyles.root}>
      <PageHeader
        headerText="Change Mobile Number"
        iconColor={Colors.yeetPurple}
        textColor={Colors.yeetPurple}
        onPress={onBackPressed}
      />

      {/* ENTER PASSWORD MODAL */}
      {/* <Modal
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
        </Modal> */}

      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={updateAccountModalVisible}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>

      <View style={GlobalStyles.mainContainer}>
        <View style={[styles.inputContainer]}>
          <Text style={styles.inputLabel}>Current Mobile Number</Text>
          <CustomInput
            value={userInfo.usr_mobile}
            style={styles.input}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Mobile Number</Text>
          <CustomInput
            placeholder="Enter your mobile number here"
            style={styles.input}
            keyboardType="numeric"
            autoFocus={true}
            value={mobileNumber}
            onChangeText={(text) => {
              if (!text) {
                setErrorTextVisible(true);
                setErrorText("Please enter a valid mobile number");
                setMobileNumber();
              } else {
                setErrorTextVisible(false);
                setMobileNumber(text);
                setValidMobileNumber(true);
              }
            }}
          />
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
            loading={isLoading}
            disabled={isLoading || validMobileNumber ? false : true}
            fgColor="#FFF"
            bgColor={validMobileNumber ? Colors.yeetPurple : Colors.yeetGray}
            borderColor={
              validMobileNumber ? Colors.yeetPurple : Colors.yeetBorderGray
            }
            btnText="Save"
            justifyContent="center"
            style={ButtonStyles.buttons}
            onPress={onSavePressed}
            borderWidth="2"
          />
          <CustomButton
            disabled={isLoading}
            onPress={onBackPressed}
            bgColor="#DEE0E2"
            fgColor={Colors.yeetPink}
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
