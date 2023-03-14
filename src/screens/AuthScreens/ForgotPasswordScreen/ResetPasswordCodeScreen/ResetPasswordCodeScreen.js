import {
  BackHandler,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
} from "react-native";

import axios from "axios";
import React from "react";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import PageHeader from "../../../../components/PageHeader";
import SectionHeader from "../../../../components/SectionHeader";
import { useRef } from "react";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import { GlobalStyles } from "../../../../styles/GlobalStyles";
import { BASE_URL } from "../../../../config";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ResetPasswordCodeScreen({ route }) {
  const {
    isLoading,

    validCode,
    setValidCode,

    modalHeader,
    modalMessage,
    setModalHeader,
    setModalMessage,

    resetCodeModalVisible,
    setResetCodeModalVisible,
    setIsLoading,
    // checkPasswordResetCode,
  } = useContext(AuthContext);

  const { email } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    console.log(validCode)
    if (validCode) {
      navigation.push("ResetPasswordScreen", { email: email });
      setValidCode(false);
    }

    const backAction = () => {
      setValidCode(false);
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  });

  const onBackPressed = () => {
    // setValidEmail(false);
    navigation.goBack();
  };

  const closeModal = () => {
    setResetCodeModalVisible(false);
    setPin1();
    setPin2();
    setPin3();
    setPin4();
    setPin5();
    setPin6();
    pin1Ref.current.focus();
    pin1Ref.current.clear();
    pin2Ref.current.clear();
    pin3Ref.current.clear();
    pin4Ref.current.clear();
    pin5Ref.current.clear();
    pin6Ref.current.clear();
  };

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);

  const [pin1, setPin1] = useState(null);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);
  const [pin5, setPin5] = useState(null);
  const [pin6, setPin6] = useState(null);

  // const [code, setCode] = useState(null);

  const onConfirmPressed = () => {
    if (!pin1 || !pin2 || !pin3 || !pin4 || !pin5 || !pin6) {
      setResetCodeModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Please enter the 6 digit code sent to your email.");
    } else {
      let code = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
      Keyboard.dismiss();
      checkPasswordResetCode(code, email);
    }
  };

  const checkPasswordResetCode = async (code, email) => {
    console.log("object")
    setIsLoading(true);

    await axios
      .post(`${BASE_URL}api/checkPasswordResetCode`, {
        email: email,
        code: code,
      })
      .then((response) => {
        console.log(response.data)
        let resetResponse = response.data.data;

        if(resetResponse.invalidCode){
          setValidCode(false)
          setResetCodeModalVisible(true);
          setModalHeader("Error");
          setModalMessage("You have entered an invalid reset code!");
        } else if (resetResponse.expiredCode) {
          setValidCode(false)
          setResetCodeModalVisible(true);
          setModalHeader("Error");
          setModalMessage("This confirmation code is already expired!");
        } else if (resetResponse.success){
          setValidCode(true);
          // setResetCodeModalVisible(true);
          // setModalHeader("Error");
          // setModalMessage("This confirmation code is already expired!");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        // setResetCodeModalVisible(true);
        // setModalHeader("Error");
        // setModalMessage(error.response.data);
        console.log(error.response.data);
        // setResetCodeModalVisible(true);
        // setModalHeader("Error")
        // setModalMessage("You have entered an");
        setValidCode(false);
        setIsLoading(false);
      });
  };
  return (
    <View style={GlobalStyles.root}>
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={resetCodeModalVisible}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>
      <PageHeader headerText="Reset Password" onPress={onBackPressed} />
      <SectionHeader sectionHeaderText="A reset code has been sent to your email address. Please check your inbox and enter the code below to rest your password." />

      <View style={styles.sectionContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoFocus
            keyboardType="number-pad"
            style={styles.inputStyle}
            maxLength={1}
            ref={pin1Ref}
            onChangeText={(pin1) => {
              let _pin1 = pin1;
              if (_pin1) {
                pin2Ref.current.focus();
                setPin1(pin1);
              }
            }}
          />
          <TextInput
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                pin1Ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            style={styles.inputStyle}
            maxLength={1}
            ref={pin2Ref}
            onChangeText={(pin2) => {
              let _pin2 = pin2;
              if (_pin2) {
                pin3Ref.current.focus();
                setPin2(pin2);
              }
            }}
          />
          <TextInput
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                pin2Ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            style={styles.inputStyle}
            maxLength={1}
            ref={pin3Ref}
            onChangeText={(pin3) => {
              let _pin3 = pin3;
              if (_pin3) {
                pin4Ref.current.focus();
                setPin3(pin3);
              }
            }}
          />
          <TextInput
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                pin3Ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            style={styles.inputStyle}
            maxLength={1}
            ref={pin4Ref}
            onChangeText={(pin4) => {
              let _pin4 = pin4;
              if (_pin4) {
                pin5Ref.current.focus();
                setPin4(pin4);
              }
            }}
          />
          <TextInput
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                pin4Ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            style={styles.inputStyle}
            maxLength={1}
            ref={pin5Ref}
            onChangeText={(pin5) => {
              let _pin5 = pin5;
              if (_pin5) {
                pin6Ref.current.focus();
                setPin5(pin5);
              }
            }}
          />
          <TextInput
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                pin5Ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            style={styles.inputStyle}
            maxLength={1}
            ref={pin6Ref}
            onChangeText={(pin6) => {
              setPin6(pin6);

              let code = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;

              if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6) {
                Keyboard.dismiss();
                checkPasswordResetCode(code, email);
              }
            }}
          />
        </View>
        <View style={styles.footerContainer}>
          {/* <Text>{email}</Text> */}
          <CustomButton
            fgColor="#FFF"
            bgColor="#562C73"
            style={styles.continueButton}
            btnText="Confirm"
            onPress={onConfirmPressed}
            loading={isLoading}
            disabled={isLoading}
          />
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
    paddingHorizontal: width * 0.05,
    // marginTop: '10%',
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "#000",
    // backgroundColor: "#DEE0E2",
    borderRadius: 30,
  },

  inputStyle: {
    backgroundColor: "#DEE0E2",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    borderRadius: 10,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    textAlign: "right",
    marginHorizontal: width * 0.1,
    paddingHorizontal: width * 0.03,
  },

  footerContainer: {
    marginTop: height * 0.08,
    width: "100%",
    paddingHorizontal: width * 0.1,
    alignSelf: "center",
  },
});
