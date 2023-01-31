import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";

import { RFPercentage } from "react-native-responsive-fontsize";

import { ButtonStyles, GlobalStyles } from "../../../../styles/GlobalStyles";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import ModalPassword from "../../../../components/ModalPassword/ModalPassword";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import ModalWithButtons from "../../../../components/ModalWithButtons/ModalWithButtons";
import ModalConfirmation from "../../../../components/ModalConfirmation/ModalConfirmation";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ManageAccountScreen() {
  const {
    userInfo,
    isLoading,
    logout,
    userLinks,
    checkPassword,
    deactivateModalVisible,
    setDeactivateModalVisible,
    invalidPasswordModalVisible,
    setInvalidPasswordModalVisible,
    modalHeader,
    modalMessage,
    passwordMatched,
    setPasswordMatched,
    clearAll,
    deactivateAccount,
    deleteAccount,
    manageAccountLoading,
    setManageAccountLoading,

    deleteAccountModalVisible,
    setDeleteAccountModalVisible,
  } = useContext(AuthContext);

  const [actionType, setActionType] = useState();

  const [confirmDeactivateModalVisible, setConfirmDeactivateModalVisible] =
    useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [deactivatePasswordModalVisible, setDeactivatePasswordModalVisible] =
    useState(false);
  const [deletePasswordModalVisible, setDeletePasswordModalVisible] =
    useState(false);

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [password, setPassword] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const toggle = () => {
    setPasswordHidden((passwordHidden) => !passwordHidden);
  };

  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);
  const [finalConfirmationModalVisible, setFinalConfirmationModalVisible] =
    useState(false);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (passwordMatched) {
      setFinalConfirmationModalVisible(true);
    }
  }, [passwordMatched]);

  const onChangePasswordPressed = () => {
    navigation.navigate("ChangePasswordScreen");
  };
  const onChangePhoneNumberPressed = () => {
    navigation.navigate("ChangeMobileNumberScreen");
  };

  //PRESS DEACTIVATE ACCOUNT BUTTON
  const confirmDeactivate = () => {
    setConfirmDeactivateModalVisible(true);
  };

  //PRESS DEACTIVATE BUTTON ON THE MODAL
  const onDeactivatePressed = () => {
    setActionType("Deactivate");
    setPasswordModalVisible(true);
    setConfirmDeactivateModalVisible(false);
  };

  //PRESS DELETE ACCOUNT BUTTON
  const confirmDelete = () => {
    setConfirmDeleteModalVisible(true);
  };

  //PRESS DELETE BUTTON ON THE MODAL
  const onDeletePressed = () => {
    setActionType("Delete");
    setPasswordModalVisible(true);
    setConfirmDeleteModalVisible(false);
  };

  //FINAL CONFIRMATION DELETE
  const onFinalDeletePressed = () => {
    deleteAccount();
    setFinalConfirmationModalVisible(false);
  };

  //WHEN SUBMITTING PASSWORD
  const onSubmitPassword = () => {
    // console.log(actionType);
    if (actionType == "Deactivate") {
      deactivateAccount(password);
    } else if (actionType == "Delete") {
      checkPassword(password);
    }

    // checkPassword(password);

    setPassword(null);
    setPasswordHidden(true);
    setPasswordModalVisible(false);
  };

  const closeConfirmationModal = () => {
    setConfirmDeactivateModalVisible(false);
    setConfirmDeleteModalVisible(false);
    setFinalConfirmationModalVisible(false);
    setPasswordMatched(false);
    setActionType();
  };

  const closePasswordModal = () => {
    // console.log(actionType);
    setPasswordModalVisible(false);

    setActionType();
    setPassword(null);
    setPasswordHidden(true);
  };

  //SUCCESS AND ERROR MODALS
  const closeSuccessModal = () => {
    setDeactivateModalVisible(false);
    setDeleteAccountModalVisible(false);
    clearAll();
  };

  const closeErrorModal = () => {
    setInvalidPasswordModalVisible(false);
    setPasswordModalVisible(true);
  };

  return (
    <ScrollView
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {manageAccountLoading == true ? <LoadingScreen /> : null}

      {/* CONFIRM DEACTIVATION */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={confirmDeactivateModalVisible}
        onRequestClose={closeConfirmationModal}
      >
        <ModalConfirmation
          cancelText="Cancel"
          saveText="Deactivate"
          modalHeaderText="Confirm Deactivation"
          modalMessage="Are you sure you want to deactivate your account?"
          onCancelPressed={closeConfirmationModal}
          onRemovePressed={onDeactivatePressed}
        />
      </Modal>

      {/* ENTER PASSWORD MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={passwordModalVisible}
        onRequestClose={closePasswordModal}
      >
        <ModalPassword
          secureTextEntry={passwordHidden}
          visible={passwordHidden}
          onShowPasswordPressed={toggle}
          value={password}
          onCancelPressed={closePasswordModal}
          onChangeText={(text) => {
            console.log(text);
            setPassword(text);
          }}
          onSavePressed={onSubmitPassword}
        />
      </Modal>

      {/* CONFIRM DELETE */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={confirmDeleteModalVisible}
        onRequestClose={closeConfirmationModal}
      >
        <ModalConfirmation
          cancelText="Cancel"
          saveText="Delete"
          modalHeaderText="Confirm Account Deletion"
          modalMessage="Are you sure you want to delete your account?"
          onCancelPressed={closeConfirmationModal}
          onRemovePressed={onDeletePressed}
        />
      </Modal>

      {/* FINAL CONFIRMATION FOR DELETION */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={finalConfirmationModalVisible}
        onRequestClose={closeConfirmationModal}
      >
        <ModalConfirmation
          cancelText="Cancel"
          saveText="DELETE"
          modalHeaderText="Final Confirmation"
          modalMessage="Are you sure you want to delete your account? Your account and all of its information will be deleted."
          onCancelPressed={closeConfirmationModal}
          onRemovePressed={onFinalDeletePressed}
        />
      </Modal>

      {/* INVALID PASSWORD MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={invalidPasswordModalVisible}
        onRequestClose={closeErrorModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeErrorModal}
        />
      </Modal>

      {/* DEACTIVATE SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={deactivateModalVisible}
        onRequestClose={closeSuccessModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeSuccessModal}
        />
      </Modal>

      {/* DELETE SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={deleteAccountModalVisible}
        onRequestClose={closeSuccessModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeSuccessModal}
        />
      </Modal>

      <PageHeader headerText="Manage Account" onPress={onBackPressed} />
      <View style={GlobalStyles.mainContainer}>
        {/* <TouchableOpacity style={styles.buttons} onPress={onChangeEmailPressed}>
            <Text style={styles.buttonText}>Change Email</Text>
            <Text style={styles.buttonText}>{userInfo.usr_email}</Text>
          </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.buttons}
          onPress={onChangePasswordPressed}
        >
          <Text style={styles.buttonText}>Change Password</Text>
          <Text style={styles.buttonText}>••••••••</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={onChangePhoneNumberPressed}
        >
          <Text style={styles.buttonText}>Change Mobile Number</Text>
          <Text style={styles.buttonText}>{userInfo.usr_mobile}</Text>
        </TouchableOpacity>

        <View style={styles.footerButtons}>
          <CustomButton
            bgColor="#DEE0E2"
            fgColor="#D81D4C"
            justifyContent="center"
            btnText="Deactivate Account"
            style={styles.buttons}
            onPress={confirmDeactivate}
          />
          <CustomButton
            bgColor="#DEE0E2"
            fgColor="#D81D4C"
            justifyContent="center"
            btnText="Delete Account"
            style={ButtonStyles.buttons}
            onPress={confirmDelete}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: height * 0.006,
    backgroundColor: "#DEE0E2",
    width: "100%",
    borderRadius: 1000,
    paddingHorizontal: width * 0.025,
    paddingVertical: height * 0.013,
  },

  buttonText: {
    color: "#562C73",

    fontSize: RFPercentage(1.5),
    textAlign: "center",
    fontWeight: "bold",
  },

  footerButtons: {
    marginTop: height * 0.05,
  },
});
