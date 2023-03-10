import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { ButtonStyles, Colors, GlobalStyles } from "../../../styles/GlobalStyles";

import PageHeader from "../../../components/PageHeader";
import CustomButton from "../../../components/CustomButton/CustomButton";

import aboutIcon from "../../../../assets/UXMaterials/icons/flatIcons/purpleIcons/about.png";
import insightsIcon from "../../../../assets/UXMaterials/icons/flatIcons/purpleIcons/insights.png";
import manageAccountIcon from "../../../../assets/UXMaterials/icons/flatIcons/purpleIcons/manageAccount.png";
import privacySettingsIcon from "../../../../assets/UXMaterials/icons/flatIcons/purpleIcons/privacySettings.png";
import yeetLogo from "../../../../assets/UXMaterials/purpleButton.png";
import activateDeviceIcon from "../../../../assets/UXMaterials/icons/flatIcons/purpleIcons/activateDevice.png";

import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

import * as Linking from "expo-linking";
import * as SQLite from "expo-sqlite";
import { RFPercentage } from "react-native-responsive-fontsize";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function SettingsScreen() {
  const {
    isLoading,
    logout,
    showPublicProfile,
    getInsights,
    userLinksInsights,
  } = useContext(AuthContext);

  const navigation = useNavigation();
  const onManageAccountPressed = () => {
    navigation.navigate("ManageAccountScreen");
  };

  const onAboutPressed = () => {
    navigation.navigate("AboutScreen");
  };

  const onInsightsPressed = () => {
    if (Object.keys(userLinksInsights).length == 0) {
      getInsights();
    }
    navigation.navigate("InsightsScreen");
  };

  const onActivateYeetDevicePressed = () => {
    navigation.navigate("ActivateYeetDeviceScreen");
  };

  const onPrivacySettingsPressed = () => {
    navigation.navigate("PrivacySettingsScreen");
  };

  const onVisitYeetWebsitePressed = () => {
    // Linking.openURL(`https:/www.facebook.com/apol.james.79`);
    Linking.openURL("https://www.yeet.store/");
  };

  return (
    <ScrollView
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {isLoading == true ? <LoadingScreen /> : null}
      <PageHeader
        headerText="Settings"
        iconColor="#562C73"
        textColor="#562C73"
        display="none"
      />
      <View style={GlobalStyles.mainContainer}>
        {/* Manage Account Button */}
        <TouchableOpacity
          style={ButtonStyles.buttons}
          onPress={onManageAccountPressed}
        >
          <Image style={ButtonStyles.buttonImage} source={manageAccountIcon} />
          <Text style={ButtonStyles.buttonText}>Manage Account</Text>
        </TouchableOpacity>

        {/* Insights Button */}
        <TouchableOpacity
          style={ButtonStyles.buttons}
          onPress={onInsightsPressed}
        >
          <Image style={ButtonStyles.buttonImage} source={insightsIcon} />
          <Text style={ButtonStyles.buttonText}>Insights</Text>
        </TouchableOpacity>

        {/* Privacy Settings Button */}
        <TouchableOpacity
          style={ButtonStyles.buttons}
          onPress={onPrivacySettingsPressed}
        >
          <Image
            style={ButtonStyles.buttonImage}
            source={privacySettingsIcon}
          />
          <Text style={ButtonStyles.buttonText}>Privacy Settings</Text>
        </TouchableOpacity>

        {/* Activate Yeet Device Button */}
        <TouchableOpacity
          style={ButtonStyles.buttons}
          onPress={onActivateYeetDevicePressed}
        >
          <Image style={ButtonStyles.buttonImage} source={activateDeviceIcon} />
          <Text style={ButtonStyles.buttonText}>Activate Yeet Device</Text>
        </TouchableOpacity>

        {/* Visit Yeet Website Button */}
        <TouchableOpacity
          style={ButtonStyles.buttons}
          onPress={onVisitYeetWebsitePressed}
        >
          <Image style={ButtonStyles.buttonImage} source={yeetLogo} />
          <Text style={ButtonStyles.buttonText}>Visit Yeet Website</Text>
        </TouchableOpacity>

        {/* About Button */}
        <TouchableOpacity style={ButtonStyles.buttons} onPress={onAboutPressed}>
          <Image style={ButtonStyles.buttonImage} source={aboutIcon} />
          <Text style={ButtonStyles.buttonText}>About</Text>
        </TouchableOpacity>
        <View style={styles.footerButtons}>
          {/* <CustomButton
            bgColor="#562C73"
            fgColor="#FFF"
            btnText="SIGN OUT"
            justifyContent="center"
            style={ButtonStyles.buttons}
            onPress={logout}
          /> */}

          <TouchableOpacity
            style={styles.button}
            onPress={logout}
          >
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  footerButtons: {
    marginTop: height * 0.1,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 15,
    paddingHorizontal: width * 0.1,
    paddingVertical: RFPercentage(1.7),
    backgroundColor: Colors.yeetPink
    
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: RFPercentage(2),
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF"
  },
});
