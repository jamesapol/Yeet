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

export default function MobileNumberScreen({ route }) {
  const [mobileNumber, setMobileNumber] = useState();
  const { modalHeader, modalMessage, setModalHeader, setModalMessage } =
    useContext(AuthContext);

  const [inputMobileVisible, setInputMobileVisible] = useState(false);
  const { email, password, fullName } = route.params;

  // useEffect(() => {
  //   const backAction = () => {
  //     // navigation.navigate("InputNameScreen")
  //     navigation.navigate("InputNameScreen", {
  //       email: email,
  //       password: password,
  //     });
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => {
  //     backHandler.remove();
  //   };
  // });

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
    // navigation.navigate("InputNameScreen", { email: email, password: password });
  };

  const onSaveName = () => {
    if (!mobileNumber) {
      setInputMobileVisible(true);
      setModalHeader("Error");
      setModalMessage("Please enter your mobile number.");
    } else {
      navigation.navigate("SelectPhotoScreen", {
        email: email,
        password: password,
        fullName: fullName,
        mobileNumber: mobileNumber,
      });
    }
  };

  const closeModal = () => {
    setInputMobileVisible(false);
  };

  return (
    <View style={GlobalStyles.root}>
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={inputMobileVisible}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>
      <PageHeader
        headerText="Enter your mobile number"
        onPress={onBackPressed}
      />
      <SectionHeader sectionHeaderText="This will be displayed on your YEET profile" />

      <View style={styles.sectionContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <CustomInput
            placeholder=""
            style={styles.input}
            keyboardType="number-pad"
            autoFocus
            value={mobileNumber}
            onChangeText={(text) => setMobileNumber(text)}
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
    borderRadius: 15,

    paddingLeft: width * 0.04,
    marginVertical: height * 0.01,
  },

  inputLabel: {
    color: "#562C73",
    fontSize: RFPercentage(2),
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
