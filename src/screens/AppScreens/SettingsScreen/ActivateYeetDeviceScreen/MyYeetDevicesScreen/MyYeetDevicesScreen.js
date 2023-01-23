import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { BASE_URL } from "../../../../../config";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import React, { useState, useContext, useRef } from "react";

import { AuthContext } from "../../../../../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors, GlobalStyles } from "../../../../../styles/GlobalStyles";
import { List } from "react-native-paper";

import ModalMessage from "../../../../../components/ModalMessage/ModalMessage";
import QRCode from "react-native-qrcode-svg";
import LoadingScreen from "../../../../../components/LoadingScreen/LoadingScreen";
import PageHeader from "../../../../../components/PageHeader";
import ModalConfirmation from "../../../../../components/ModalConfirmation/ModalConfirmation";
import noDevicesImage from "../../../../../../assets/UXMaterials/placeholders/no-device.png";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("screen");

export default function MyYeetDevicesScreen() {
  const {
    refreshing,
    userInfo,
    userNFCDevices,
    nfcDeviceLoading,
    isLoading,
    getYeetDevices,

    showSuccessModal,
    setShowSuccessModal,
    displayYeetDevice,
    disconnectYeetDevice,
    userActiveNFCDevice,
    activateYeetDevice,
    successMessage,
    errorMessage,
    modalHeader,
    modalMessage,
  } = useContext(AuthContext);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [yeetCode, setYeetCode] = useState();

  const navigation = useNavigation();

  const onBackPressed = () => {
    navigation.goBack();
  };

  const onRefresh = () => {
    getYeetDevices();
  };
  const closeModal = () => {
    // navigation.goBack();
    setDeleteModalVisible(false);
    setShowSuccessModal(false);
  };

  const onDisconnectPressed = () => {
    disconnectYeetDevice(yeetCode);
    setDeleteModalVisible(false);
    setShowSuccessModal(false);
  };

  return (
    <View style={GlobalStyles.root}>
      {nfcDeviceLoading == true || isLoading == true ? <LoadingScreen /> : null}

      {/* DELETE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={deleteModalVisible}
        onRequestClose={closeModal}
      >
        <ModalConfirmation
          onCancelPressed={closeModal}
          modalHeaderText="Confirm Disconnect"
          modalMessage="Are you sure you want to disconnect to this device?"
          onRemovePressed={onDisconnectPressed}
          cancelText="Cancel"
          saveText="Disconnect"
        />
      </Modal>

      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showSuccessModal}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>

      <PageHeader headerText="My Yeet Devices" onPress={onBackPressed} />

      {nfcDeviceLoading == false ? (
        Object.keys(userNFCDevices).length == 0 ? (
          <View
            style={{
              backgroundColor: "#0000",
              height: "100%",
              width: "100%",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={noDevicesImage}
              style={{ width: "100%", height: "75%" }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: RFPercentage(3) }}>
              You have no yeet devices yet.
            </Text>
          </View>
        ) : null
      ) : null}
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        ref={ref}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{ backgroundColor: "#fff" }}
        // ListHeaderComponent={() => (

        // )}
        keyExtractor={(item) => item.nfc_id}
        // keyExtractor={(item, index) => index.toString()}
        data={nfcDeviceLoading == false ? userNFCDevices : null}
        renderItem={({ item }) => {
          return (
            <View style={{ width: "100%", paddingHorizontal: width * 0.03 }}>
              <List.Accordion
                // left={() => (
                //   <Image
                //     source={sample}
                //     resizeMode="stretch"
                //     style={{ height: RFPercentage(2), width: RFPercentage(2), marginHorizontal: '2.5%', }}
                //   />
                // )}
                style={{
                  justifyContent: "center",
                  fontWeight: "bold",
                  backgroundColor: "#DEE0E2",
                  marginTop: "1%",
                  alignItems: "center",
                  elevation: 2,
                  //   borderRadius: 10,
                }}
                titleStyle={{
                  color: Colors.yeetPurple,
                  fontWeight: "bold",
                }}
                descriptionStyle={{ color: "#FFF" }}
                title={`${item.nfc_code}`}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: "5%",
                    backgroundColor: "#DEE0E288",
                    marginBottom: "5%",
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                  }}
                >
                  <QRCode
                    value={
                      item ? `https://yeetapp.io/profile/${item.nfc_code}` : " "
                    }
                    enableLinearGradient
                    linearGradient={[Colors.yeetPurple, Colors.yeetPink]}
                    color={Colors.yeetPurple}
                    size={width * 0.5}
                    logoSize={width * 0.12}
                    logoBorderRadius={1000}
                    logoBackgroundColor="#FFF"
                    logoMargin={2}
                    logo={{
                      uri: `${BASE_URL}images/mobile/photos/${userInfo.usr_profile_photo_storage}`,
                    }}
                  />

                  <Text
                    style={{ fontSize: RFPercentage(1.3), marginTop: "3%" }}
                    onPress={() => {
                      {
                        item
                          ? Linking.openURL(
                              `https://yeetapp.io/profile/${item.nfc_code}`
                            )
                          : null;
                      }
                    }}
                  >
                    {item ? `yeetapp.io/profile/${item.nfc_code}` : null}
                    {"\n"}
                    {/* {item ? `${item.nfc_id}` : null} */}
                  </Text>

                  {/* <View
                      style={{
                        width: "85%",
                        height: "0.5%",
                        backgroundColor: "#DEDEDE",
                        marginVertical: "2.5%",
                      }}
                    /> */}

                  <View
                    style={{
                      marginTop: "5%",
                      flexDirection: "row",
                      width: "75%",
                      justifyContent: "center",
                      alignItems: "center",
                      // backgroundColor: 'red',
                      //   justifyContent:'center'
                    }}
                  >
                    <View
                      style={{
                        // backgroundColor: "#0F05",
                        borderRightWidth: 0.5,
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <TouchableOpacity
                        style={{ ...styles.buttonStyle }}
                        onPress={() => {
                          displayYeetDevice(item.nfc_id, item.nfc_code);
                        }}
                      >
                        <MaterialCommunityIcons
                          name="account-eye"
                          size={RFPercentage(2)}
                          color="#562C73"
                        />
                        <Text style={styles.buttonText}>
                          Display to Profile
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        // backgroundColor: "#00F5",
                        borderLeftWidth: 0.5,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          ...styles.buttonStyle,
                        }}
                        onPress={() => {
                          setYeetCode(item.nfc_code);
                          setDeleteModalVisible(true);
                        }}
                      >
                        <AntDesign
                          name="disconnect"
                          size={RFPercentage(2)}
                          color="#562C73"
                        />
                        <Text style={styles.buttonText}>Disconnect</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </List.Accordion>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "Transparent",
    borderColor: "#EFEFEF",
    // borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "2.5%",
  },

  buttons: {
    marginVertical: height * 0.001,
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
    color: "#562C73",

    fontSize: RFPercentage(1.4),
    textAlign: "center",
    fontWeight: "bold",
  },
});
