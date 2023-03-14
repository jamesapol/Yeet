import {
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import DefaultImage from "../../../../assets/UXMaterials/icons/user.png";
import CustomButton from "../../../components/CustomButton/CustomButton";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  NavigationHelpersContext,
  useNavigation,
} from "@react-navigation/native";

import PageHeader from "../../../components/PageHeader";
import SectionHeader from "../../../components/SectionHeader";
import { RFPercentage } from "react-native-responsive-fontsize";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { AuthStyles, Colors, GlobalStyles } from "../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

// const email = 'test@test1.com';
// const password = 'Test1234'
// const fullName = 'Amabatakam Ambasing Omaygot Shet'
// const fileURI = 'file:///data/user/0/host.exp.exponent/cache/ImagePicker/27368578-15ac-42c6-8e29-b771f2c1068e.jpeg'
// const fileName = 'tangina';
// const fileType = 'image'
// const mobileNumber = '666'

export default function ConfirmationScreen({ route }) {
  const {
    register,
    registered,
    login,
    isLoading,
    userInfoLoading,
    userLinksLoading,
  } = useContext(AuthContext);

  // let email = 'test1@test.com';

  const {
    email,
    password,
    fullName,
    fileURI,
    fileName,
    fileType,
    mobileNumber,
  } = route.params;

  // useEffect(() => {
  //   if (registered) {
  //     navigation.navigate()
  //   }
  // });

  const navigation = useNavigation();

  const onBackPressed = () => {
    navigation.goBack();
  };

  const onConfirmPressed = () => {
    register(
      fileURI,
      fileName,
      fileType,
      email,
      fullName,
      password,
      mobileNumber
    );
    // login(fullName, password);
  };
  return (
    <View style={GlobalStyles.root}>
      {userInfoLoading == true ? <LoadingScreen /> : null}
      <PageHeader
        headerText="Account Confirmation"
        onPress={onBackPressed}
        iconColor="#FFF"
        textColor="#FFF"
      />
      <SectionHeader sectionHeaderText="Confirm your account. This can be changed later in your account settings." />

      <View style={AuthStyles.sectionContainer}>
        <View style={AuthStyles.imageContainer}>
          <Image
            source={fileURI ? { uri: fileURI } : DefaultImage}
            style={AuthStyles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{fullName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
          <Text style={styles.userEmail}>{mobileNumber}</Text>
        </View>
        <CustomButton
          fgColor="#FFF"
          bgColor={Colors.yeetPurple}
          btnText="Confirm"
          style={styles.confirmButton}
          onPress={onConfirmPressed}
          borderWidth="2"
          borderColor={Colors.yeetPurple}
        />
        <CustomButton
          bgColor={Colors.yeetPink}
          fgColor="#FFF"
          borderColor={Colors.yeetPink}
          borderWidth="2"
          btnText="Cancel"
          // style={styles.cancelButton}
          onPress={onBackPressed}
        />
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
  },

  sectionContainer: {
    width: "100%",
    paddingHorizontal: width * 0.05,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: height * 0.005,
  },

  textContainer: {
    alignItems: "center",
    marginVertical: height * 0.015,
    // backgroundColor: "#FF02",
  },

  userName: {
    fontSize: RFPercentage(3),
    fontWeight: "bold",
    color: Colors.yeetPurple,
    textAlign: "center",
  },

  userEmail: {
    fontSize: RFPercentage(1.5),
    color: Colors.yeetPurple,
    textAlign: "center",
  },

  image: {
    width: RFPercentage(30),
    height: RFPercentage(30),
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: Colors.yeetPurple,
    backgroundColor: "#d9d9d9",
  },

  confirmButton: {
    marginTop: height * 0.015,
    marginBottom: height * 0.01,
    textAlign: "center",
    alignItems: "center",
  },

  cancelButton: {
    borderWidth: 2,
    borderColor: "#FFF",
  },
});
