import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Linking,
  Modal,
} from "react-native";
import { BASE_URL } from "../../../config";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";

import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import Yeet from "../../../../assets/UXMaterials/yeet-purple.png";
import LoadingResource from "../../../components/LoadingResource/LoadingResource";
import noDevicesImage from "../../../../assets/UXMaterials/placeholders/no-device.png";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function YeetScreen() {
  const {
    userInfo,
    isLoading,
    userNfcDevice,
    nfcDeviceLoading,
    userActiveYeetDevice,
    getActiveYeetDevice,

    userName,
    tempUserName,
    tempUserProfilePhoto,
    userProfilePhoto,
  } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const onManageAccountPressed = () => {
    navigation.navigate("ManageAccountScreen");
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `https://yeetapp.io/profile/${userActiveYeetDevice}`
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!userActiveYeetDevice) {
      getActiveYeetDevice();
    }
  }, []);

  return (
    <ScrollView
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showModal}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader="Success"
          modalMessage="Link copied successfully!"
          onOKPressed={closeModal}
        />
      </Modal>

      <View
        style={{
          width: "100%",
          paddingHorizontal: width * 0.2,
          marginTop: height * 0.05,
          alignItems: "center",
          // backgroundColor: "#F005",
        }}
      >
        <View style={styles.root}>
          <View style={styles.firstRow}>
            <Text style={styles.welcomeText}>Share your</Text>
            <Image source={Yeet} style={styles.yeetLogo} resizeMode="contain" />
            <Text style={styles.welcomeText}> profile</Text>
          </View>
        </View>
        {!nfcDeviceLoading ? (
          userActiveYeetDevice ? (
            <>
              <QRCode
                value={
                  userActiveYeetDevice
                    ? `https://yeetapp.io/profile/${userActiveYeetDevice}`
                    : "z"
                }
                enableLinearGradient
                linearGradient={[Colors.yeetPurple, Colors.yeetPink]}
                color={Colors.yeetPurple}
                size={width * 0.6}
                logoSize={width * 0.15}
                logoBorderRadius={1000}
                logoBackgroundColor="#FFF"
                logoMargin={2}
                logo={
                  tempUserProfilePhoto
                    ? {
                        uri: tempUserProfilePhoto,
                      }
                    : userProfilePhoto
                    ? {
                        uri: `${BASE_URL}images/mobile/photos/${userProfilePhoto}`,
                      }
                    : null
                }
              />
              <View
                style={{
                  marginTop: "5%",
                  width: "100%",
                  // backgroundColor:'green',
                }}
              >
                <Text
                  style={{
                    fontSize: RFPercentage(4),
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {tempUserName ? tempUserName : userName ? userName : null}
                </Text>
              </View>

              <Text
                style={{ fontSize: RFPercentage(1.7), marginTop: "3%" }}
                onPress={() => {
                  {
                    nfcDeviceLoading
                      ? userActiveYeetDevice
                        ? Linking.openURL(
                            `https://yeetapp.io/profile/${userActiveYeetDevice}`
                          )
                        : null
                      : null;
                  }
                }}
              >
                {userActiveYeetDevice
                  ? `yeetapp.io/profile/${userActiveYeetDevice}`
                  : null}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: "7.5%",
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      ...styles.buttonStyle,
                    }}
                    onPress={copyToClipboard}
                  >
                    <FontAwesome5
                      name="copy"
                      size={RFPercentage(3)}
                      color={Colors.yeetPurple}
                    />
                    <Text style={styles.buttonText}>Copy Link</Text>
                  </TouchableOpacity>
                </View>
                {/* <View
                  style={{
                    // backgroundColor: "#00F5",
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      ...styles.buttonStyle,
                      borderLeftWidth: 1,
                    }}
                  >
                    <Feather
                      name="download"
                      size={RFPercentage(3)}
                      color=Colors.yeetPurple
                    />
                    <Text style={styles.buttonText}>Save to Gallery</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </>
          ) : (
            <View
              style={{
                backgroundColor: "white",
                height: "75%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                source={noDevicesImage}
                style={{ height: "75%", width: "100%" }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: RFPercentage(3), textAlign: "center" }}>
                Your profile is not yet connected to any Yeet Device.
              </Text>
            </View>
          )
        ) : (
          <LoadingResource />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: height * 0.04,
    marginBottom: height * 0.045,
  },

  buttonStyle: {
    marginTop: "10%",
    backgroundColor: "Transparent",
    borderColor: "#EFEFEF",
    // borderWidth: 2,
    paddingVertical: height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    // backgroundColor: Colors.yeetPurple,
    borderRadius: 500,
    borderWidth: 2,
    borderColor: Colors.yeetPurple,
  },

  buttons: {
    marginVertical: height * 0.006,
    backgroundColor: "#DEE0E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 50,
    paddingHorizontal: width * 0.01,
    // paddingVertical: height * 0.013,
  },

  buttonText: {
    marginLeft: "5%",
    color: Colors.yeetPurple,

    fontSize: RFPercentage(1.5),
    textAlign: "center",
    fontWeight: "bold",
  },

  firstRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  welcomeText: {
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    color: Colors.yeetPurple,
  },

  secondRow: {
    alignItems: "center",
  },

  yeetLogo: {
    // width: '50%'
    maxWidth: width * 0.18,
    height: height * 0.045,
  },

  sectionText: {
    fontSize: RFPercentage(1.4),
    color: Colors.yeetPurple,
    textAlign: "center",
  },
});
