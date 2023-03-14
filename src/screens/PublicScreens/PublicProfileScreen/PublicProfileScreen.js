import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Switch,
  ComponentProvider,
  Modal,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";

import * as SecureStore from "expo-secure-store";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { Avatar } from "react-native-paper";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { Link, useNavigation, useScrollToTop } from "@react-navigation/native";
import PageHeader from "../../../components/PageHeader";
import {
  ButtonStyles,
  Colors,
  GlobalStyles,
} from "../../../styles/GlobalStyles";
import LoadingResource from "../../../components/LoadingResource/LoadingResource";
import { useEffect } from "react";
import axios from "axios";
import ModalViewPaymentImage from "../../../components/ModalViewPaymentImage/ModalViewPaymentImage";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

function getFirstName(name) {
  const lastIndexOfSpace = name.lastIndexOf(" ");

  if (lastIndexOfSpace === -1) {
    return name;
  }

  return name.substring(0, lastIndexOfSpace);
}

function getLastName(name) {
  return name.split(" ").pop();
}

export default function PublicProfileScreen({ route }) {
  const {
    userInfo,
    showPublicProfile,
    publicProfileLoading,
    setShowModal,
    modalHeader,
    modalMessage,
    userBlockStatus,
    userPrivateStatus,
    setModalHeader,
    setModalMessage,

    addConnection,
    publicProfileInfo,
    publicProfileLinks,
    publicConnectionStatus,
    publicLoading,
    setPublicProfileLoading,
    addLinkTap,
    addProfileTap,

    addConnectionModalVisible,
    setAddConnectionModalVisible,

    userNotFound,
    setUserNotFound,
  } = useContext(AuthContext);

  const {
    params: { id },
  } = route;

  const [userUUID, setUserUUID] = useState();
  const [directLinkActive, setDirectLinkActive] = useState();
  const [errorURLModalVisible, setErrorURLModalVisible] = useState(false);

  useEffect(() => {
    setUserNotFound(false);
    setPublicProfileLoading(true);
    // let userUUID = SecureStore.getItemAsync("userUUID");
    getUserUUID();

    showPublicProfile(id);
  }, [id]);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const [linkID, setLinkID] = useState();
  const [linkImage, setLinkImage] = useState();

  const [paymentImageVisible, setPaymentImageVisible] = useState(false);
  const [paymentImage, setPaymentImage] = useState();

  const navigation = useNavigation();
  async function getUserUUID() {
    setUserUUID(await SecureStore.getItemAsync("userUUID"));
  }

  const onHomePressed = () => {
    navigation.navigate("AuthStack", { screen: "WelcomeScreen" });
  };

  const onBackPressed = () => {
    navigation.navigate("AuthStack", { screen: "HomeScreen" });
  };

  const onAddContactPressed = () => {
    addConnection(publicProfileInfo.usr_uuid);
  };

  const closeModal = () => {
    setPaymentImageVisible(false);
    setShowModal(false);
    setErrorURLModalVisible(false);
    setAddConnectionModalVisible(false);
  };

  const onRefresh = () => {};

  const handleOpenLink = async (link) => {
    try {
      await WebBrowser.openBrowserAsync(link);
    } catch (error) {
      setErrorURLModalVisible(true);
      setModalHeader("Error");
      setModalMessage("This link cannot be opened and may be broken.");
    }
  };
  return (
    // <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
    //   <Text>{id}</Text>
    // </View>
    <View style={GlobalStyles.root}>
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.icon}
          disabled={publicProfileLoading ? true : false}
          // onPress={onPress}
        >
          {!userUUID ? (
            <FontAwesome5
              name="home"
              size={RFPercentage(2.5)}
              color={Colors.yeetPurple}
              onPress={onHomePressed}
            />
          ) : (
            <FontAwesome5
              name="arrow-left"
              size={RFPercentage(2.5)}
              color={Colors.yeetPurple}
              onPress={onBackPressed}
            />
          )}
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: Colors.yeetPurple }]}>
          View Profile
        </Text>

        <TouchableOpacity
          disabled={publicProfileLoading ? true : false}
          style={{
            ...styles.pageActionIcon,
            display:
              userNotFound ||
              userPrivateStatus == 1 ||
              userBlockStatus == 1 ||
              !publicProfileInfo
                ? "none"
                : "flex",
          }}
          // onPress={pageAction}
          onPress={() => {
            handleOpenLink(
              `${BASE_URL}api/saveContact/${publicProfileInfo.usr_uuid}`
            );
            // Linking.openURL(
            //   `${BASE_URL}api/saveContact/${publicProfileInfo.usr_uuid}`
            // );
          }}
        >
          <FontAwesome5
            name="address-card"
            size={RFPercentage(2)}
            color={Colors.yeetPurple}
          />
        </TouchableOpacity>
      </View>
      {userNotFound || userPrivateStatus == 1 || userBlockStatus == 1 ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <FontAwesome
              name="user-times"
              size={RFPercentage(4)}
              color={Colors.yeetPurple}
              style={{ margin: 10 }}
            />
            <Text style={{ fontSize: RFPercentage(2), fontWeight: "bold" }}>
              User not found.
            </Text>
          </View>
        </View>
      ) : (
        <>
          {/* VIEW PAYMENT QR MODAL */}
          <Modal
            transparent
            animationType="fade"
            hardwareAccelerated
            visible={paymentImageVisible}
            onRequestClose={closeModal}
          >
            <ModalViewPaymentImage
              onClosePressed={closeModal}
              linkImage={{
                uri: `${BASE_URL}images/social-logo/${linkImage}`,
              }}
              paymentImage={
                linkID == 23
                  ? `${BASE_URL}images/payments/gcash/${paymentImage}`
                  : linkID == 24
                  ? `${BASE_URL}images/payments/paymaya/${paymentImage}`
                  : linkID == 26
                  ? `${BASE_URL}images/payments/paymongo/${paymentImage}`
                  : null
              }
            />
          </Modal>

          {/* URL ERROR MODAL */}
          <Modal
            transparent
            animationType="fade"
            hardwareAccelerated
            visible={errorURLModalVisible}
            onRequestClose={closeModal}
          >
            <ModalMessage
              modalHeader={modalHeader}
              modalMessage={modalMessage}
              onOKPressed={closeModal}
            />
          </Modal>

          {/* SUCCESS MODAL */}
          <Modal
            transparent
            animationType="fade"
            hardwareAccelerated
            visible={addConnectionModalVisible}
            onRequestClose={closeModal}
          >
            <ModalMessage
              modalHeader={modalHeader}
              modalMessage={modalMessage}
              onOKPressed={closeModal}
            />
          </Modal>

          <FlatList
            ref={ref}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            numColumns={3}
            style={{ backgroundColor: "#fff" }}
            ListHeaderComponent={() => (
              <>
                <View style={styles.mainContainer}>
                  {/* COVER PHOTO */}
                  <View style={GlobalStyles.coverPhotoContainer}>
                    {publicProfileLoading == true ? (
                      <LoadingResource />
                    ) : (
                      <Image
                        // key={userInfo.usr_cover_photo_storage}
                        source={
                          publicProfileLoading == false
                            ? publicProfileInfo.usr_cover_photo_storage
                              ? {
                                  // uri: `${BASE_URL}images/profile/cover/${coverPhoto}`,
                                  uri: `${BASE_URL}images/mobile/cover/${publicProfileInfo.usr_cover_photo_storage}`,
                                }
                              : null
                            : null
                        }
                        resizeMode="stretch"
                        style={GlobalStyles.coverPhoto}
                      />
                    )}
                  </View>

                  {/* PROFILE PHOTO */}
                  <View style={GlobalStyles.profilePhotoContainer}>
                    <View style={GlobalStyles.profilePhoto}>
                      {publicProfileLoading == true ? (
                        <LoadingResource visible={true} />
                      ) : (
                        <Avatar.Image
                          // key={userInfo.usr_profile_photo_storage}
                          backgroundColor="#DEDEDE"
                          // size={width * 0.35}
                          size={RFPercentage(15)}
                          source={
                            publicProfileLoading == false
                              ? publicProfileInfo.usr_profile_photo_storage
                                ? {
                                    uri: `${BASE_URL}images/mobile/photos/${publicProfileInfo.usr_profile_photo_storage}`,
                                  }
                                : {
                                    uri: `${BASE_URL}images/profile/photos/default-profile.png`,
                                  }
                              : null
                          }
                        />
                      )}
                    </View>
                  </View>

                  <View style={GlobalStyles.userNameAndBioContainer}>
                    <View style={GlobalStyles.userNameContainer}>
                      <Text style={GlobalStyles.userNameText}>
                        {publicProfileLoading == false
                          ? publicProfileInfo.usr_name
                          : null}
                        {/* // {publicProfileInfo.usr_uuid != userUUID ? "true" : "False"} */}
                      </Text>
                    </View>
                    <View style={GlobalStyles.userBioContainer}>
                      <Text style={GlobalStyles.userBioText}>
                        {publicProfileLoading == false
                          ? publicProfileInfo.usr_bio
                          : null}
                        {/* {userUUID} */}
                        {/* {publicConnectionStatus} */}
                      </Text>
                    </View>
                  </View>

                  {publicProfileLoading == false ? (
                    userUUID ? (
                      publicConnectionStatus == 0 &&
                      publicProfileInfo.usr_uuid != userUUID ? (
                        <View style={styles.addContactContainer}>
                          <CustomButton
                            bgColor="transparent"
                            fgColor="#562C73"
                            btnText="Add Contact"
                            borderColor={Colors.yeetPurple}
                            borderWidth="2"
                            onPress={onAddContactPressed}
                            loading={publicLoading}
                            loadingColor={Colors.yeetPurple}
                            disabled={publicLoading}
                          />
                        </View>
                      ) : null
                    ) : null
                  ) : null}
                </View>
              </>
            )}
            keyExtractor={(item) => item.lnk_id}
            // keyExtractor={(item, index) => index.toString()}
            data={publicProfileLoading == true ? null : publicProfileLinks}
            renderItem={({ item, index }) => {
              if (publicProfileLinks) {
                return (
                  <TouchableOpacity
                    style={[
                      {
                        marginLeft: index % 3 == 0 ? width * 0.05 : 0,
                        marginRight: index % 3 == 2 ? width * 0.05 : 0,
                      },
                      ButtonStyles.socialMediaButtons,
                    ]}
                    // onPress={() => {

                    //   // onLinkPressed
                    // }}
                    onPress={() => {
                      addLinkTap(item.uln_id);
                      console.log(item.uln_url);
                      if (
                        item.lnk_id == 23 ||
                        item.lnk_id == 24 ||
                        item.lnk_id == 26
                      ) {
                        setLinkID(item.lnk_id);
                        setLinkImage(item.lnk_image);
                        setPaymentImage(item.uln_url);
                        setPaymentImageVisible(true);
                      } else if (item.lnk_id == 31) {
                        Linking.openURL(
                          `${BASE_URL}api/downloadFile/` + item.uln_url
                        );
                        // console.log(item.uln_file);
                        // console.log(item.uln_original_file_name);
                      } else {
                        handleOpenLink(item.uln_url);
                        // Linking.canOpenURL(item.uln_url).then((supported) => {
                        //   if (supported) {
                        //     Linking.openURL(item.uln_url);
                        //   } else {
                        //     setErrorURLModalVisible(true);
                        //     setModalHeader("Error");
                        //     setModalMessage(
                        //       "This link cannot be opened and may be broken."
                        //     );
                        //   }
                        // });
                      }
                    }}
                  >
                    <Image
                      source={
                        item.lnk_id == 30
                          ? { uri: item.uln_youtube_thumbnail }
                          : {
                              uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                            }
                      }
                      style={{
                        borderWidth:
                          item.lnk_id == 8 ||
                          item.lnk_id == 16 ||
                          item.lnk_id == 24 ||
                          item.lnk_id == 25 ||
                          item.lnk_id == 31 ||
                          item.lnk_id == 32
                            ? 2
                            : 0,
                        borderColor: Colors.yeetGray,
                        borderRadius:
                          item.lnk_id == 30
                            ? 20
                            : item.lnk_id == 8 ||
                              item.lnk_id == 16 ||
                              item.lnk_id == 24 ||
                              item.lnk_id == 25 ||
                              item.lnk_id == 31 ||
                              item.lnk_id == 32
                            ? 5000
                            : null,
                        width: width * 0.13,
                        height: width * 0.13,
                      }}
                      resizeMode="stretch"
                    />
                    {/* <Text>{item.uln_id}</Text>
              <Text>{item.lnk_id}</Text> */}
                    <Text
                      style={{
                        marginTop: "3%",
                        textAlign: "center",
                        fontSize: RFPercentage(2),
                      }}
                    >
                      {item.lnk_id == 30
                        ? item.uln_custom_link_name
                        : item.lnk_id == 31
                        ? item.uln_file_title
                        : item.lnk_id == 32
                        ? item.uln_custom_link_name
                        : item.lnk_name}
                    </Text>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: width,
  },

  addContactContainer: {
    width: "50%",
    flex: 1,
    marginBottom: "5%",
  },

  textInputHeaderText: {
    fontSize: RFPercentage(1.5),
    color: Colors.yeetPurple,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: "2%",
  },

  textInput: {
    width: "100%",
    borderColor: "#948E8E",
    borderWidth: 2,
    borderRadius: 5,
    fontSize: RFPercentage(1.5),
    color: "#666666",

    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    marginBottom: height * 0.01,
    // backgroundColor: "#DEE0E2",
  },
  root: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.013,
  },

  icon: {
    position: "absolute",
    left: width * 0.03,
    // left: '3%',
  },

  headerText: {
    fontWeight: "700",
    fontSize: RFPercentage(2),
  },

  pageActionIcon: {
    position: "absolute",
    right: width * 0.03,
  },
});

// // "vcards-js": "git+https://git@github.com/idxbroker/vCards-js#react-native"

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function PublicProfileScreen({route}) {
//   const {
//         params: { id },
//       } = route;

//   return (
//     <View style={{backgroundColor:'#f0f3', flex: 1, justifyContent:'center'}}>
//       <Text>yawa</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})
