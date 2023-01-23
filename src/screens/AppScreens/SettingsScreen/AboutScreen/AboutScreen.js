import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React, { useContext } from "react";
  import PageHeader from "../../../../components/PageHeader";
  import { useNavigation } from "@react-navigation/native";
  import { AuthContext } from "../../../../context/AuthContext";
  
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  import CustomButton from "../../../../components/CustomButton/CustomButton";
  import UnderConstructionScreen from "../../../../components/UnderConstructionScreen/UnderConstructionScreen";
  import { GlobalStyles } from "../../../../styles/GlobalStyles";
  
  var { width } = Dimensions.get("window");
  var { height } = Dimensions.get("window");
  
  export default function AboutScreen() {
    const { userInfo, isLoading, logout, userLinks } = useContext(AuthContext);
  
    const navigation = useNavigation();
    const onBackPressed = () => {
      navigation.goBack();
    };
  
    const onFAQPressed = () => {
      navigation.navigate("FAQScreen");
    };
    const onAboutUsPressed = () => {
      navigation.navigate("AboutUsScreen");
    };
    const onPrivacyPolicyPressed = () => {
      navigation.navigate("PrivacyPolicyScreen");
    };
    const onTermsOfServicePressed = () => {
      navigation.navigate("TermsOfServiceScreen");
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
          <TouchableOpacity style={styles.buttons} onPress={onFAQPressed}>
            <Text style={styles.buttonText}>FAQ</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.buttons} onPress={onAboutUsPressed}>
            <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.buttons} onPress={onPrivacyPolicyPressed}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.buttons} onPress={onTermsOfServicePressed}>
            <Text style={styles.buttonText}>Terms of Service</Text>
          </TouchableOpacity>
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
  