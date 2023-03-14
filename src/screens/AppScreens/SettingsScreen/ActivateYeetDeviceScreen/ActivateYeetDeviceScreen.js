import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";

import sample from "../../../../../assets/UXMaterials/sample.png";

import PageHeader from "../../../../components/PageHeader";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("screen");

export default function ActivateYeetDeviceScreen() {
  const {
    showModal,
    setShowModal,
    nfcDeviceLoading,
    activateYeetDevice,
    getYeetDevices,
    userNFCDevices,
    modalHeader,
    modalMessage,
  } = useContext(AuthContext);
  const [code, setCode] = useState();

const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const onMyYeetDevicesPressed = () => {
    if (!userNFCDevices) {
      getYeetDevices();
    }
    navigation.navigate("MyYeetDevicesScreen");
  };
  const onActivatePressed = () => {
    activateYeetDevice(code);
  };
  const onQRPressed = () => {
    navigation.navigate("ScanQRScreen");
  };

  const closeModal = () => {
    setShowModal(false);
    setCode();
    
  };

  return (
    <ScrollView
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {nfcDeviceLoading == true ? <LoadingScreen /> : null}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showModal}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>
      <PageHeader
        headerText="Activate Yeet Device"
        display="flex"
        iconColor="#562C73"
        textColor="#562C73"
        onPress={onBackPressed}
      />
      <View style={styles.sectionContainer}>
        <Image source={sample} resizeMode="contain" style={styles.image} />
        <Text style={styles.text}>Yeet Device Activation Code</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Code</Text>
          <CustomInput
            style={styles.input}
            autoFocus={true}
            value={code}
            onChangeText={(text) => setCode(text)}
          />

          <TouchableOpacity onPress={onQRPressed}>
            <MaterialCommunityIcons
              name="line-scan"
              size={RFPercentage(4)}
              color="#562C73"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <CustomButton
            onPress={onActivatePressed}
            bgColor="#562C73"
            fgColor="#fff"
            btnText="Activate"
            style={styles.buttons}
          />
          <CustomButton
            onPress={onMyYeetDevicesPressed}
            fgColor="#562C73"
            bgColor="#fff"
            btnText="My Yeet Devices"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
  },

  sectionContainer: {
    width: "100%",
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
    alignItems: "center",
  },

  image: {
    height: height * 0.3,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#DEE0E2",
    borderRadius: 30,
    paddingHorizontal: "4%",
  },

  inputLabel: {
    color: "#562C73",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
  },

  input: {
    paddingHorizontal: "3%",
    flex: 1,
  },

  footerContainer: {
    width: "100%",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
  },

  text: {
    marginTop: "10%",
    marginBottom: "3%",
    color: "#562C73",
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    alignSelf: "flex-start",
  },

  toolTipContainer: {
    backgroundColor: "#562C73",
  },

  buttons: {
    marginBottom: "2%",
  },
});
