import {
  BackHandler,
  Dimensions,
  ImageBackground,
  Keyboard,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React, { useState, useContext, useRef } from "react";

import PageHeader from "../../../components/PageHeader";
import SectionHeader from "../../../components/SectionHeader";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { AuthContext } from "../../../context/AuthContext";

import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import { useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import ModalLockedAccount from "../../../components/ModalLockedAccount/ModalLockedAccount";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

var statusBarHeight = StatusBar.currentHeight;
export default function LoginScreen() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {
    loginModalVisible,
    setLoginModalVisible,
    lockedAccountModalVisible,
    setLockedAccountModalVisible,
    userInfoLoading,
    setUserInfoLoading,
    modalMessage,
    setModalMessage,
    modalHeader,
    setModalHeader,
    setValidPassword,
    validPassword,
    login,
  } = useContext(AuthContext);

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [validFields, setValidFields] = useState(false);

  const togglePasswordHidden = () =>
    setPasswordHidden((previousState) => !previousState);

  const isFocused = useIsFocused();

  useEffect(() => {
    setUserInfoLoading(false);
    if (isFocused) {
      setEmail(null);
      setPassword(null);
      setValidFields(false);
    }
  }, []);

  // useEffect(() => {
  //   setUserInfoLoading(false);

  //   const unsubscribe = navigation.addListener("beforeRemove", (e) => {
  //     e.preventDefault();
  //     unsubscribe();
  //     navigation.navigate("WelcomeScreen");
  //   });

  //   // const backAction = () => {
  //   //   navigation.navigate("WelcomeScreen");
  //   // };

  //   // const backHandler = BackHandler.addEventListener(
  //   //   "hardwareBackPress",
  //   //   backAction
  //   // );

  //   // return () => {
  //   //   backHandler.remove();
  //   // };
  // }, []);

  const validateEmail = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
  };
  // || validateEmail(email) == false
  const validateFields = (email, password) => {
    if (!email || !password || password.length < 8) {
      setValidFields(false);
    } else {
      setValidFields(true);
    }
  };

  const navigation = useNavigation();
  const onLogIn = () => {
    Keyboard.dismiss();
    if (validateEmail(email) === false) {
      setLoginModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Please enter a valid email!");
      setEmail(null);
    } else if (!email || !password) {
      setLoginModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Please fill out all of the required fields!");
    } else {
      login(email, password);
      console.log(email + password);
    }
  };

  const onBackPressed = () => {
    navigation.navigate("WelcomeScreen");
  };

  const onForgotPasswordPressed = () => {
    setPassword(null);
    setEmail(null);
    navigation.navigate("ForgotPasswordScreen");
    setLockedAccountModalVisible(false);
  };

  const closeModal = () => {
    setLoginModalVisible(false);
    setLockedAccountModalVisible(false);
    setPassword(null);
    setEmail(null);
  };

  const onResetPasswordPressed = () => {
    setPassword(null);
    navigation.navigate("ResetPasswordCodeScreen", { email: email });
  };

  return (
    <View style={GlobalStyles.root}>
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={loginModalVisible}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>

      {/* RESET PASSWORD */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={lockedAccountModalVisible}
        onRequestClose={closeModal}
      >
        <ModalLockedAccount
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
          onResetPasswordPressed={onForgotPasswordPressed}
        />
      </Modal>

      <PageHeader
        headerText="Login to your Account"
        onPress={onBackPressed}
        // style={{ marginTop: statusBarHeight }}
      />
      <SectionHeader sectionHeaderText="Enter your email and password below." />
      <View style={styles.sectionContainer}>
        <View style={styles.emailInputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <CustomInput
            placeholder="sample@email.com"
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateFields(text, password);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <CustomInput
            selectTextOnFocus={true}
            placeholder="••••••••"
            style={styles.input}
            secureTextEntry={passwordHidden}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validateFields(email, text);
              // console.log(text.length)
            }}
            autoCapitalize="none"
          />
          <View>
            <MaterialCommunityIcons
              onPress={togglePasswordHidden}
              name={passwordHidden == true ? "eye-off" : "eye"}
              size={RFPercentage(2)}
              color="#562C73"
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <CustomButton
            fgColor="#FFF"
            bgColor={validFields ? Colors.yeetPurple : Colors.yeetGray}
            btnText="Continue"
            onPress={onLogIn}
            loading={userInfoLoading}
            disabled={userInfoLoading || (validFields ? false : true)}
          />
          <Text
            style={styles.footerText}
            onPress={onForgotPasswordPressed}
            disabled={userInfoLoading}
          >
            <Text style={{ fontWeight: "bold" }}>Forgot Password?</Text>
          </Text>
        </View>
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
    paddingHorizontal: "5%",
  },

  emailInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#000",
    backgroundColor: "#DEE0E2",
    borderRadius: 30,

    // paddingLeft: width * 0.04,
    paddingVertical: height * 0.002,
    marginVertical: height * 0.008,
    paddingLeft: width * 0.03,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 1000,
    backgroundColor: "#DEE0E2",

    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.002,
    marginVertical: height * 0.008,
  },

  inputLabel: {
    color: "#562C73",
    fontSize: RFPercentage(1.7),
    fontWeight: "bold",
  },

  input: {
    textAlign: "right",
    paddingHorizontal: "3%",
  },

  footerContainer: {
    marginTop: height * 0.05,
    width: "100%",
    paddingHorizontal: width * 0.1,
    alignSelf: "center",
  },

  footerText: {
    marginTop: height * 0.015,
    color: Colors.yeetPurple,
    fontSize: RFPercentage(1.5),
    textAlign: "center",
  },
});
