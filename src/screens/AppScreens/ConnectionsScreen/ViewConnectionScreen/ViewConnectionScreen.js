import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Modal,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";

import { RFPercentage } from "react-native-responsive-fontsize";
// import * as Location from "expo-location";

import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../config";

import { FontAwesome } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import PageHeader from "../../../../components/PageHeader";
import {
  ButtonStyles,
  Colors,
  GlobalStyles,
} from "../../../../styles/GlobalStyles";
import LoadingResource from "../../../../components/LoadingResource/LoadingResource";
import ModalViewPaymentImage from "../../../../components/ModalViewPaymentImage/ModalViewPaymentImage";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ViewConnectionScreen() {
  const {
    userInfo,
    userToken,
    refreshing,
    setRefreshing,
    isLoading,
    getUserData,
    userLinks,
    getUserLinks,
    userConnectionData,
    userConnectionLinks,
    userConnectionStatus,
    publicConnectionStatus,
    downloadVCF,
    addConnection,
    publicLoading,
    setUserBlockStatus,
    userBlockStatus,

    viewConnectionModalVisible,
    setViewConnectionModalVisible,

    setModalHeader,
    setModalMessage,
    modalHeader,
    modalMessage,

    addLinkTap
  } = useContext(AuthContext);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const onRefresh = () => {};

  const [linkIndex, setLinkIndex] = useState();
  const [linkName, setLinkName] = useState();
  const [linkURL, setLinkURL] = useState();

  const [linkID, setLinkID] = useState();
  const [linkImage, setLinkImage] = useState();

  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [paymentImageVisible, setPaymentImageVisible] = useState(false);
  const [paymentImage, setPaymentImage] = useState();
  const [errorURLModalVisible, setErrorURLModalVisible] = useState(false);

  const [fileName, setFileName] = useState();

  const navigation = useNavigation();

  const [location, setLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const backAction = () => {
      navigation.pop(2);
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
    };
  });
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log(location);
  //   })();
  // }, []);

  const onBackPressed = () => {
    setUserBlockStatus();
    navigation.navigate("ConnectionsScreen");
  };

  const closeModal = () => {
    setPaymentImageVisible(false);
    setViewConnectionModalVisible(false);
    setErrorURLModalVisible(false);
  };

  const onAddContactPressed = () => {
    addConnection(userConnectionData.usr_uuid);
  };
  return (
    <View style={GlobalStyles.root}>
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={paymentImageVisible}
        onRequestClose={closeModal}
      >
        <ModalViewPaymentImage
          onClosePressed={closeModal}
          linkImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
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

      {/* SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={viewConnectionModalVisible}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
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

      {userBlockStatus == 0 || !userBlockStatus ? (
        <FlatList
          ref={ref}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          numColumns={3}
          style={{ backgroundColor: "#fff" }}
          ListHeaderComponent={() => (
            <>
              <PageHeader
                headerText="View Profile"
                onPress={onBackPressed}
                pageActionVisible={isLoading == true ? "none" : "flex"}
                iconType="FontAwesome5"
                pageActionIcon="address-card"
                pageAction={() => {
                  Linking.openURL(
                    `${BASE_URL}api/saveContact/${userConnectionData.usr_uuid}`
                  );
                  // setOptionsModalVisible(true);
                  // onDownloadVCFPressed();
                }}
              />
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
                          ? userConnectionData.usr_cover_photo_storage
                            ? {
                                // uri: `${BASE_URL}images/profile/cover/${coverPhoto}`,
                                uri: `${BASE_URL}images/mobile/cover/${userConnectionData.usr_cover_photo_storage}`,
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
                            ? userConnectionData.usr_profile_photo_storage
                              ? {
                                  uri: `${BASE_URL}images/mobile/photos/${userConnectionData.usr_profile_photo_storage}`,
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
                      {isLoading == false ? userConnectionData.usr_name : null}
                      {/* {JSON.stringify(location)} */}
                    </Text>
                  </View>
                  <View style={GlobalStyles.userBioContainer}>
                    <Text style={GlobalStyles.userBioText}>
                      {isLoading == false ? userConnectionData.usr_bio : null}
                    </Text>
                  </View>
                </View>
                {isLoading == false ? (
                  userConnectionStatus == 0 ? (
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
                ) : null}
              </View>
            </>
          )}
          keyExtractor={(item) => item.lnk_id}
          // keyExtractor={(item, index) => index.toString()}
          data={isLoading == false ? userConnectionLinks : null}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  { 
                    marginLeft: index % 3 == 0 ? width * 0.15 : width * 0.025,
                    marginRight: index % 3 == 2 ? width * 0.15 : width * 0.025,
                  },
                  ButtonStyles.socialMediaButtons,
                ]}
                // onPress={() => {

                //   // onLinkPressed
                // }}
                onPress={() => {
                  addLinkTap(item.uln_id)
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
                      `${BASE_URL}api/downloadFile/` +
                        item.uln_file
                    );
                    console.log(item.uln_file);
                    console.log(item.uln_original_file_name);
                  } else {
                    // if(Linking.canOpenURL(item.uln_url)){
                    //   console.log("ulol")
                    // }
                    // Linking.openURL(`${item.uln_url}`);
                    Linking.canOpenURL(item.uln_url).then((supported) => {
                      if (supported) {
                        Linking.openURL(item.uln_url);
                      } else {
                        setErrorURLModalVisible(true);
                        setModalHeader("Error");
                        setModalMessage(
                          "This link cannot be opened and may be broken."
                        );
                      }
                    });
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
                    fontSize: RFPercentage(1.5),
                  }}
                >
                  {item.lnk_id == 31
                    ? item.uln_file_title
                    : item.lnk_id == 32
                    ? item.uln_custom_link_name
                    : item.lnk_name}
                  {/* {item.lnk_id} */}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <PageHeader
            onPress={onBackPressed}
            pageActionVisible="none"
            iconType="FontAwesome5"
          />
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
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
  addContactContainer: {
    width: "50%",
    flex: 1,
    marginBottom: "5%",
  },
});
