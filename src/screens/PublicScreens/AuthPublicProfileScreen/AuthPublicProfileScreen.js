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
import React, { useState } from "react";

import * as SecureStore from "expo-secure-store";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config";

import { FontAwesome5 } from "@expo/vector-icons";
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
    showPublicProfileDirectLink,
    userToken,
    refreshing,
    setRefreshing,
    isLoading,
    setIsLoading,
    getUserData,
    userLinks,
    getUserLinks,
    userConnectionData,
    userConnectionLinks,
    showModal,
    showSuccessModal,
    setShowModal,
    modalHeader,
    modalMessage,

    addConnection,
    publicProfileInfo,
    publicProfileLinks,
    publicProfileDirectLink,
    publicConnectionStatus,
    publicLoading,
    downloadVCF,
    setSplashLoading,
  } = useContext(AuthContext);

  const {
    params: { id },
  } = route;

  const [userUUID, setUserUUID] = useState();
  const [directLinkActive, setDirectLinkActive] = useState();

  useEffect(() => {
    setSplashLoading(false);
    showPublicProfile(id);
    getUserUUID();

    // showPublicProfile(id);
  }, [id]);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const [linkID, setLinkID] = useState();
  const [linkImage, setLinkImage] = useState();

  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [paymentImageVisible, setPaymentImageVisible] = useState(false);
  const [paymentImage, setPaymentImage] = useState();

  async function checkDirectLink() {
    setDirectLinkActive(publicProfileInfo.usr_is_direct_link_active);
  }

  async function getUserUUID() {
    setUserUUID(await SecureStore.getItemAsync("userUUID"));
    //   const userUUID = SecureStore.getItemAsync("userUUID");
    //   const userToken = SecureStore.getItemAsync("userToken");
  }

  // const checkDirectLink = async () => {
  //   // if (publicProfileDirectLink) {
  //   //   Linking.openURL(publicProfileDirectLink.uln_url)
  //   // }
  //   console.log(publicProfileDirectLink);
  // };

  const onHomePressed = () => {
    navigation.navigate("WelcomeScreen");
  };

  const onBackPressed = () => {
    navigation.navigate("HomeScreen");
  };

  const onAddContactPressed = () => {
    addConnection(publicProfileInfo.usr_uuid);
  };

  const onRemoveContactPressed = () => {};

  const closeModal = () => {
    setPaymentImageVisible(false);
    setShowModal(false);
  };

  const onRefresh = () => {};

  const navigation = useNavigation();

  const onDownloadVCFPressed = () => {
    downloadVCF();
  };

  return (
    <View style={GlobalStyles.root}>
      {isLoading == false ? (publicProfileDirectLink ? null : null) : null}

      {publicProfileInfo ? (
        <>
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

          <Modal
            transparent
            animationType="fade"
            hardwareAccelerated
            visible={showModal}
            onRequestClose={closeModal}
          >
            <ModalMessage
              modalHeader="Success"
              modalMessage={modalMessage}
              onOKPressed={closeModal}
            />
          </Modal>

          <View style={styles.root}>
            <TouchableOpacity
              style={styles.icon}
              // onPress={onPress}
            >
              {userUUID ? (
                <FontAwesome5
                  name="arrow-left"
                  size={RFPercentage(2)}
                  color={Colors.yeetPurple}
                  onPress={onBackPressed}
                />
              ) : (
                <FontAwesome5
                  name="home"
                  size={RFPercentage(2)}
                  color={Colors.yeetPurple}
                  onPress={onHomePressed}
                />
              )}
            </TouchableOpacity>
            <Text style={[styles.headerText, { color: Colors.yeetPurple }]}>
              View Profile
            </Text>
            <TouchableOpacity
              style={styles.pageActionIcon}
              // onPress={pageAction}
              onPress={() => {
                Linking.openURL(
                  `${BASE_URL}api/saveContact/${publicProfileInfo.usr_uuid}`
                );
              }}
            >
              <FontAwesome5
                name="address-card"
                size={RFPercentage(2)}
                color={Colors.yeetPurple}
              />
            </TouchableOpacity>
          </View>

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
                    {isLoading == true ? (
                      <LoadingResource />
                    ) : (
                      <Image
                        // key={userInfo.usr_cover_photo_storage}
                        source={
                          isLoading == false
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
                      {isLoading == true ? (
                        <LoadingResource visible={true} />
                      ) : (
                        <Avatar.Image
                          // key={userInfo.usr_profile_photo_storage}
                          backgroundColor="#DEDEDE"
                          // size={width * 0.35}
                          size={RFPercentage(15)}
                          source={
                            isLoading == false
                              ? publicProfileInfo.usr_profile_photo_storage
                                ? {
                                    uri: `${BASE_URL}images/mobile/photos/${publicProfileInfo.usr_profile_photo_storage}`,
                                  }
                                : {
                                    uri: `${BASE_URL}images/profile/photos/default.png`,
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
                        {isLoading == false ? publicProfileInfo.usr_name : null}
                      </Text>
                    </View>
                    <View style={GlobalStyles.userBioContainer}>
                      <Text style={GlobalStyles.userBioText}>
                        {isLoading == false ? publicProfileInfo.usr_bio : null}
                      </Text>
                    </View>
                  </View>

                  {isLoading == false ? (
                    userUUID ? (
                      publicConnectionStatus == 0 ? (
                        <View style={styles.mainContentContainer}>
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
            data={isLoading == false ? publicProfileLinks : null}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={[
                    {
                      marginLeft: index % 3 == 0 ? width * 0.15 : width * 0.025,
                      marginRight:
                        index % 3 == 2 ? width * 0.15 : width * 0.025,
                    },
                    ButtonStyles.socialMediaButtons,
                  ]}
                  // onPress={() => {

                  //   // onLinkPressed
                  // }}
                  onPress={() => {
                    if (
                      item.lnk_id == 23 ||
                      item.lnk_id == 24 ||
                      item.lnk_id == 26
                    ) {
                      setLinkID(item.lnk_id);
                      setLinkImage(item.lnk_image);
                      setPaymentImage(item.uln_url);
                      setPaymentImageVisible(true);
                    } else {
                      Linking.openURL(`${item.uln_url}`);
                    }
                  }}
                >
                  <Image
                    source={{
                      uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                    }}
                    style={{
                      width: width * 0.13,
                      height: width * 0.13,
                    }}
                    resizeMode="stretch"
                  />
                  {/* <Text>{item.uln_id}</Text>
                        <Text>{item.lnk_id}</Text> */}
                  <Text
                    style={{
                      fontSize: RFPercentage(1.3),
                    }}
                  >
                    {item.lnk_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: width,
  },

  mainContentContainer: {
    width: "50%",
    flex: 1,
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
