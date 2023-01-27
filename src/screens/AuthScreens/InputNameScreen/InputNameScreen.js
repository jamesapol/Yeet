import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Modal,
  TouchableOpacity,
  Text,
  BackHandler,
} from "react-native";
import React, { useContext, useState, useEffect, useFocusEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../context/AuthContext";

import PageHeader from "../../../components/PageHeader";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import CustomButton from "../../../components/CustomButton/CustomButton";

import CustomInput from "../../../components/CustomInput/CustomInput";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";

import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { GlobalStyles } from "../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function InputNameScreen({ route }) {
  const [fullName, setFullName] = useState(null);
  const {
    inputNameModalVisible,
    setInputNameModalVisible,
    setValid,

    modalHeader,
    modalMessage,
    setModalHeader,
    setModalMessage,
  } = useContext(AuthContext);

  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.navigate("RegisterScreen")
  //     setValid(false)
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => {
  //     backHandler.remove();
  //   };
  // });

  const { email, password } = route.params;

  const navigation = useNavigation();
  const onBackPressed = () => {
    setValid(false)
    // navigation.navigate("RegisterScreen");
    navigation.goBack();
  };

  const onSaveName = () => {
    if (!fullName) {
      setInputNameModalVisible(true);
      setModalHeader("Error");
      setModalMessage("Please enter your name.");
    } else {
      // BackHandler.removeEventListener();
      navigation.navigate("MobileNumberScreen", {
        email: email,
        password: password,
        fullName: fullName,
      });
    }
  };

  const closeModal = () => {
    setInputNameModalVisible(false);
  };

  return (
    <View style={GlobalStyles.root}>
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={inputNameModalVisible}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>
      <PageHeader headerText="Enter your name" onPress={onBackPressed} />
      <SectionHeader sectionHeaderText="This will be displayed on your YEET profile" />

      <View style={styles.sectionContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <CustomInput
            placeholder="Enter your name here"
            style={styles.input}
            autoCapitalize="words"
            autoFocus
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <CustomButton
          fgColor="#FFF"
          bgColor="#562C73"
          style={styles.continueButton}
          btnText="Continue"
          onPress={onSaveName}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
    paddingHorizontal: width * 0.05,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    backgroundColor: "#DEE0E2",
    borderRadius: 30,

    paddingLeft: width * 0.04,
    marginVertical: height * 0.01,
  },

  inputLabel: {
    color: "#562C73",
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
  },

  input: {
    textAlign: "right",
    paddingHorizontal: width * 0.03,
  },

  footerContainer: {
    marginTop: height * 0.05,
    width: "100%",
    paddingHorizontal: width * 0.15,
    alignSelf: "center",
  },

  //MODAL
  centeredModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E1E1E99",
  },
});
