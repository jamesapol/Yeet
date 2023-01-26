import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";

import { RFPercentage } from "react-native-responsive-fontsize";
import CustomButton from "../../../../components/CustomButton/CustomButton";

import { GlobalStyles } from "../../../../styles/GlobalStyles";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";

import ModalPassword from "../../../../components/ModalPassword/ModalPassword";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";

import ModalConfirmation from "../../../../components/ModalConfirmation/ModalConfirmation";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function PrivacySettingsScreen() {
  const {
    userInfo,
    isLoading,
    logout,
    showBlockedConnections,
    toggleNotifications,
    toggleAccountPrivacy,
    deactivateAccount,
    setShowModal,
    showModal,
    modalHeader,
    modalMessage,
    setModalHeader,
    setModalMessage,
    userBlockedConnections,
  } = useContext(AuthContext);
  const [confirmDeactivateVisible, setConfirmDeactivateVisible] =
    useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState();

  const [passwordHidden, setPasswordHidden] = useState(true);
  const toggle = () => {
    setPasswordHidden((passwordHidden) => !passwordHidden);
  };

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(
    userInfo.usr_notification_active == 0 ? false : true
  );
  const [isPrivateAccountEnabled, setIsPrivateAccountEnabled] = useState(
    userInfo.usr_is_private_account == 0 ? false : true
  );

  const toggleNotificationsSwitch = async () => {
    setIsNotificationsEnabled((previousState) => !previousState);
    let toggleValue;
    isNotificationsEnabled == false ? (toggleValue = 1) : (toggleValue = 0);
    toggleNotifications(toggleValue);
    console.log(toggleValue);
  };
  const togglePrivateAccountSwitch = () => {
    setIsPrivateAccountEnabled((previousState) => !previousState);
    let toggleValue;
    isPrivateAccountEnabled == false ? (toggleValue = 1) : (toggleValue = 0);
    toggleAccountPrivacy(toggleValue);
  };
  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const onBlockedContactsPressed = () => {
    if (Object.keys(userBlockedConnections).length == 0) {
      showBlockedConnections(userInfo.usr_uuid);
    }
    navigation.navigate("BlockedContactsScreen");
  };

  const closeModal = () => {
    setShowModal(false);
    setConfirmDeactivateVisible(false);
  };
  return (
    <ScrollView
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >

      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showModal}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>
      {isLoading == true ? <LoadingScreen /> : null}
      <PageHeader
        headerText="Privacy Settings"
        iconColor="#562C73"
        textColor="#562C73"
        onPress={onBackPressed}
      />

    
      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={[
            styles.buttons,
            {
              paddingVertical: height * 0.0028,
            },
          ]}
          onPress={toggleNotificationsSwitch}
          activeOpacity={9}
        >
          <Text style={styles.buttonText}>Notifications</Text>

          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#D81D4C55" }}
            thumbColor={isNotificationsEnabled ? "#D81D4C" : "#F4F3F4"}
            onValueChange={toggleNotificationsSwitch}
            value={isNotificationsEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttons,
            {
              paddingVertical: height * 0.0028,
            },
          ]}
          onPress={togglePrivateAccountSwitch}
          activeOpacity={9}
        >
          <Text style={styles.buttonText}>Private Account</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#D81D4C55" }}
            thumbColor={isPrivateAccountEnabled ? "#D81D4C" : "#F4F3F4"}
            onValueChange={togglePrivateAccountSwitch}
            value={isPrivateAccountEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttons,
            {
              paddingVertical: height * 0.014,
            },
          ]}
          onPress={onBlockedContactsPressed}
        >
          <Text style={styles.buttonText}>Blocked Contacts</Text>
        </TouchableOpacity>

        {/* <View style={styles.footerButtons}>
          <CustomButton
            bgColor="#DEE0E2"
            fgColor="#D81D4C"
            justifyContent="center"
            btnText="Deactivate Account"
            style={styles.buttons}
            onPress={() => setConfirmDeactivateVisible(true)}
          />
        </View> */}
      </View>
      {/* <UnderConstructionScreen /> */}
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
    paddingVertical: height * 0.013,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: height * 0.006,
    backgroundColor: "#DEE0E2",
    width: "100%",
    borderRadius: 1000,
    paddingHorizontal: width * 0.025,
    alignItems: "center",
    height: RFPercentage(4.7),
  },

  buttonText: {
    color: "#562C73",

    fontSize: RFPercentage(1.5),
    textAlign: "center",
    fontWeight: "bold",
  },

  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },

  footerButtons: {
    marginTop: height * 0.05,
  },
});
