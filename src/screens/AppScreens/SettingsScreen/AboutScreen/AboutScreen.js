import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import PageHeader from "../../../../components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import UnderConstructionScreen from "../../../../components/UnderConstructionScreen/UnderConstructionScreen";
import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function AboutScreen() {
  const { userInfo, isLoading, logout, userLinks } = useContext(AuthContext);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const onFAQPressed = () => {
    Linking.openURL("https://www.yeet.store/faqs");
    // navigation.navigate("FAQScreen");
  };
  const onAboutUsPressed = () => {
    navigation.navigate("AboutUsScreen");
  };
  const onPrivacyPolicyPressed = () => {
    Linking.openURL("https://www.yeet.store/privacypolicy");
    // navigation.navigate("PrivacyPolicyScreen");
  };
  const onTermsOfServicePressed = () => {
    Linking.openURL("https://www.yeet.store/termsofservice");
    // navigation.navigate("TermsOfServiceScreen");
  };
  return (
    <ScrollView
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <PageHeader
        headerText="About"
        iconColor="#562C73"
        textColor="#562C73"
        onPress={onBackPressed}
      />
      {/* <UnderConstructionScreen /> */}
      <View style={styles.sectionContainer}>
        <CustomButton
          onPress={onFAQPressed}
          fgColor={Colors.yeetPurple}
          bgColor={Colors.yeetGray}
          justifyContent="center"
          btnText="FAQ"
          style={styles.buttons}
          borderWidth={2}
          borderColor={Colors.yeetGray}
        />
        <CustomButton
          onPress={onPrivacyPolicyPressed}
          fgColor={Colors.yeetPurple}
          bgColor={Colors.yeetGray}
          justifyContent="center"
          btnText="Privacy Policy"
          style={styles.buttons}
          borderWidth={2}
          borderColor={Colors.yeetGray}
        />
        <CustomButton
          onPress={onTermsOfServicePressed}
          fgColor={Colors.yeetPurple}
          bgColor={Colors.yeetGray}
          justifyContent="center"
          btnText="Terms of Service"
          style={styles.buttons}
          borderWidth={2}
          borderColor={Colors.yeetGray}
        />

        {/* <TouchableOpacity style={styles.buttons} onPress={onFAQPressed}>
          <Text style={styles.buttonText}>FAQ</Text>
        </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttons} onPress={onAboutUsPressed}>
          <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={onPrivacyPolicyPressed}
        >
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={onTermsOfServicePressed}
        >
          <Text style={styles.buttonText}>Terms of Service</Text>
        </TouchableOpacity> */}
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
    paddingVertical: height * 0.013,
  },

  buttonText: {
    color: "#562C73",

    fontSize: RFPercentage(1.5),
    textAlign: "center",
    fontWeight: "bold",
  },
});
