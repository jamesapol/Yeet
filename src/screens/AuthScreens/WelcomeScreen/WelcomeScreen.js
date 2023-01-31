import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import BG from "../../../../assets/UXMaterials/gradientBG.jpg";
import purpleBG from "../../../../assets/UXMaterials/backgrounds/purple-with-text.png";
import whiteBG from "../../../../assets/UXMaterials/backgrounds/white-with-text.png";

// import googleIcon from "../../../../assets/UXMaterials/icons/google.png";
import googleIcon from "../../../../assets/UXMaterials/icons/google.png";
import appleIcon from "../../../../assets/UXMaterials/icons/apple.png";
import emailIcon from "../../../../assets/UXMaterials/icons/email.png";
// import YeetLogo from "../../../../assets/images/YeetLogo-white.png";
import YeetLogo from "../../../../assets/UXMaterials/yeetLogo-white.png";

import CustomButton from "../../../components/CustomButton/CustomButton";

import RBSheet from "react-native-raw-bottom-sheet";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import { Colors } from "../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const {
    welcomeModalVisible,
    setWelcomeModalVisible,
    errorMessage,

    modalHeader,
    modalMessage,
  } = useContext(AuthContext);

  //hide bottom drawer
  useFocusEffect(
    React.useCallback(() => {
      return () => refRBSheet.current?.close();
    }, [])
  );

  const window = useWindowDimensions();
  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const navbarHeight = screenHeight - windowHeight;

  const navbar = screenHeight - windowHeight;

  const refRBSheet = useRef();

  const navigation = useNavigation();
  const closeModal = () => {
    setWelcomeModalVisible(false);
  };

  const onCreateAccountPressed = () => {
    navigation.navigate("RegisterScreen");
  };

  const onSignInPressed = () => {
    refRBSheet.current.open();
  };

  const onEmailPressed = () => {
    refRBSheet.current?.close();
    navigation.navigate("LoginScreen");
  };

  const onGooglePressed = () => {
    // console.log(userInfo);
    console.log(screenHeight);
    console.log(windowHeight);
    console.log(navbarHeight);
  };

  const onApplePressed = () => {};

  return (
    <View style={styles.root}>
      <ImageBackground
        source={whiteBG}
        resizeMode="cover"
        style={styles.mainContainer}
      >
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={welcomeModalVisible}
          onRequestClose={closeModal}
        >
          <ModalMessage
            modalHeader={modalHeader}
            modalMessage={modalMessage}
            onOKPressed={closeModal}
          />
        </Modal>
        {/* <View style={styles.imageContainer}>
          <Image source={YeetLogo} style={styles.logo} resizeMode="stretch" />
        </View> */}
        <View style={styles.footerContainer}>
          <CustomButton
            onPress={onCreateAccountPressed}
            style={styles.createAccountButton}
            bgColor={Colors.yeetPurple}
            btnText="Create an Account"
            fgColor="#fff"
          />
          <Text style={styles.footerText}>Already have an account?</Text>
          <Text
            style={[
              styles.footerText,
              { textDecorationLine: "underline", fontWeight: "bold" },
            ]}
            onPress={onSignInPressed}
          >
            Sign In
          </Text>
        </View>

        <RBSheet
          animationType="fade"
          height={RFPercentage(30)}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          closeOnPressBack={true}
          customStyles={{
            draggableIcon: {
              backgroundColor: Colors.yeetPurple,
              width: "25%",
            },
            wrapper: {
              backgroundColor: Colors.yeetBackgroundGray,
            },
            container: {
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            },
          }}
        >
          {/* <ImageBackground source={purpleBG} style={styles.bottomDrawer}> */}
          <View style={styles.mainDrawerContainer}>
            <CustomButton
              source={emailIcon}
              style={styles.buttonStyle}
              imgStyle={styles.buttonImage}
              bgColor="#562C73"
              fgColor="#FFF"
              btnText="Sign in with Email"
              onPress={onEmailPressed}
            />
            <Text style={styles.or}>OR</Text>
            <View style={{ width: "100%" }}>
              <CustomButton
                source={googleIcon}
                style={styles.buttonStyle}
                imgStyle={styles.buttonImage}
                bgColor="#FFF"
                fgColor="#314455"
                btnText="Sign in with Google"
                onPress={onGooglePressed}
                borderColor={Colors.yeetPurple}
                borderWidth="1"
              />
              <CustomButton
                source={appleIcon}
                style={styles.buttonStyle}
                imgStyle={styles.buttonImage}
                bgColor="#FFF"
                fgColor="#314455"
                btnText="Sign in with Apple"
                borderColor={Colors.yeetPurple}
                borderWidth="1"
              />
            </View>
          </View>
          {/* </ImageBackground> */}
        </RBSheet>
      </ImageBackground>
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
    justifyContent: "center",
    paddingHorizontal: width * 0.15,
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",

    marginBottom: height * 0.2,
    position: "absolute",
  },

  logo: {
    maxWidth: width * 0.45,
    maxHeight: width * 0.45,
  },

  footerContainer: {
    bottom: height * 0.1,
    position: "absolute",

    width: "100%",
  },

  footerText: {
    color: Colors.yeetPurple,
    textAlign: "center",
    fontSize: RFPercentage(1.5),

    textTransform: "uppercase",
  },

  bottomDrawer: {
    flex: 1,
  },

  or: {
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
    color: Colors.yeetPurple,
    marginVertical: height * 0.015,
  },

  mainDrawerContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: width * 0.1,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(5),
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "blue",
  },

  buttonImage: {
    height: width * 0.045,
    width: width * 0.045,
    marginRight: "3%",
  },

  buttonStyle: {
    marginVertical: 5,
  },

  createAccountButton: {
    marginBottom: height * 0.01,
  },

  // mainDrawerContainer: {
  //   width: "100%",
  //   paddingHorizontal: width * 0.1,
  //   paddingVertical: height * 0.02,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

  buttonImage: {
    height: width * 0.045,
    width: width * 0.045,
    marginRight: "3%",
  },
});
