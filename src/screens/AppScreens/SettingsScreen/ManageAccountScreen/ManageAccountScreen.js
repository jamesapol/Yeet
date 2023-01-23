import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";

import { RFPercentage } from "react-native-responsive-fontsize";

import { ButtonStyles, GlobalStyles } from "../../../../styles/GlobalStyles";
import CustomButton from "../../../../components/CustomButton/CustomButton";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ManageAccountScreen() {
  const { userInfo, isLoading, logout, userLinks } = useContext(AuthContext);

  const [confirmDeactivateVisible, setConfirmDeactivateVisible] =
    useState(false);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const onChangeEmailPressed = () => {
    navigation.navigate("ChangeEmailScreen");
  };
  const onChangePasswordPressed = () => {
    navigation.navigate("ChangePasswordScreen");
  };
  const onChangePhoneNumberPressed = () => {
    navigation.navigate("ChangeMobileNumberScreen");
  };

  const confirmDeactivateModal = () => {
    setConfirmDeactivateVisible(true);
  };

  const test = () => {
    showPublicProfile("JAMES");
  };
  return (
    <ScrollView
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
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
            onPress={() => setConfirmDeactivateVisible(true)}
          />
          <CustomButton
            bgColor="#DEE0E2"
            fgColor="#D81D4C"
            justifyContent="center"
            btnText="Delete Account"
            style={ButtonStyles.buttons}
            onPress={test}
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
