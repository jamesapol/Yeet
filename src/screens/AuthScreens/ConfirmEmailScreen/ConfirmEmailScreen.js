import {
  BackHandler,
  Modal,
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import axios from "axios";
import React from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import PageHeader from "../../../components/PageHeader";
import SectionHeader from "../../../components/SectionHeader";
import { useRef } from "react";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { BASE_URL } from "../../../config";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ConfirmEmailScreen({ route }) {
  const { email, password } = route.params;

  const [valid, setValid] = useState(false);
  const [confirmEmailModalVisible, setConfirmEmailModalVisible] =
    useState(false);
  const [modalHeader, setModalHeader] = useState();
  const [modalMessage, setModalMessage] = useState();
  const [confirmEmailLoading, setConfirmEmailLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setValid(false);
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  });

  const navigation = useNavigation();
  useEffect(() => {
    if (valid) {
      setPin1();
      setPin2();
      setPin3();
      setPin4();
      setPin5();
      setPin6();
      pin1Ref.current.clear();
      pin2Ref.current.clear();
      pin3Ref.current.clear();
      pin4Ref.current.clear();
      pin5Ref.current.clear();
      pin6Ref.current.clear();
      navigation.navigate("InputNameScreen", {
        email: email,
        password: password,
      });
    }
  });

  const onBackPressed = () => {
    navigation.goBack();
    setValid(false);
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
      setConfirmEmailModalVisible(true);
      setModalHeader("Invalid Code");
      setModalMessage("Please enter the 6 digit code sent to your email.");
    } else {
      let code = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
      checkConfirmationCode(code, email);
      Keyboard.dismiss();
    }
  };

  const checkConfirmationCode = async (code, email) => {
    setConfirmEmailLoading(true);
    axios
      .post(`${BASE_URL}api/checkConfirmationCode`, {
        code: code,
        email: email,
      })
      .then((response) => {
        let responseData = response.data.data;

        if (responseData.invalidCode) {
          setValid(false);
          setConfirmEmailModalVisible(true)
          setModalHeader("Invalid Code");
          setModalMessage(responseData.invalidCode)
        } else if (responseData.expiredCode) {
          setValid(false);
          setConfirmEmailModalVisible(true);
          setModalHeader("Expired Code");
          setModalMessage(responseData.expiredCode);
        } else if (responseData.emailSuccess){
          setValid(true);
        }
        console.log(response.data);
        setConfirmEmailLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data);
        setConfirmEmailModalVisible(true);
        setModalHeader("Error");
        setModalMessage(e.response.data.errors);
        setConfirmEmailLoading(false);
      });
    // console.log(code)
  };

  const closeModal = () => {
    setConfirmEmailModalVisible(false);
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
  return (
    <View style={GlobalStyles.root}>
      {/* ERROR MODAL ONLY */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={confirmEmailModalVisible}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>

      <PageHeader
        headerText="Confirm Email"
        onPress={onBackPressed}
        iconColor="#FFF"
        textColor="#FFF"
      />
      <SectionHeader sectionHeaderText="A verification code has been sent to your email address. Please check your inbox and enter the code below to confirm your email." />

      <View style={styles.sectionContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            selectTextOnFocus={true}
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
            selectTextOnFocus={true}
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
            selectTextOnFocus={true}
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
            selectTextOnFocus={true}
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
            selectTextOnFocus={true}
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
            selectTextOnFocus={true}
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

              if(pin1 && pin2 && pin3 && pin4 && pin5 && pin6){
                checkConfirmationCode(code, email);
                Keyboard.dismiss();
              }
            }}
          />
        </View>
        <View style={styles.footerContainer}>
          <CustomButton
            fgColor="#FFF"
            bgColor="#562C73"
            style={styles.continueButton}
            btnText="Confirm"
            onPress={onConfirmPressed}
            loading={confirmEmailLoading}
            disabled={confirmEmailLoading}
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
    paddingHorizontal: "4%",
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
