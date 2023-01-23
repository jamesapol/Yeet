import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  // Switch,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

// import { Switch } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import aboutIcon from "../../../../assets/UXMaterials/icons/flatIcons/purpleIcons/about.png";
import plusIcon from "../../../../assets/UXMaterials/icons/flatIcons/purpleIcons/plus.png";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config";

import { Avatar, Switch } from "react-native-paper";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import ModalTextInput from "../../../components/ModalTextInput/ModalTextInput";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

import noLinks from "../../../../assets/UXMaterials/placeholders/no-links.png";

import LoadingResource from "../../../components/LoadingResource/LoadingResource";

import UserTheme, {
  ButtonStyles,
  Colors,
  GlobalStyles,
  TestStyle,
  updateTheme,
} from "../../../styles/GlobalStyles";
import ModalPaymentImage from "../../../components/ModalPaymentImage/ModalPaymentImage";
import { useEffect } from "react";
import ModalViewFile from "../../../components/ModalViewFile/ModalViewFile";
import ModalCustomLink from "../../../components/ModalCustomLink/ModalCustomLink";

import { themes } from "../../../../themes/themes";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

var bgTest;

export default function HomeScreen() {
  const {
    registered,
    setRegistered,

    userInfo,
    userToken,
    userLinks,
    allLinks,
    getAllLinks,
    getUserData,
    getUserLinks,
    editLink,
    editCustomLink,
    removeDirectLink,
    userTheme,

    userLinksLoading,

    refreshing,
    userInfoLoading,
    setShowModal,
    setShowInputModal,
    showInputModal,
    modalHeader,
    modalMessage,
    showSuccessModal,
    setShowSuccessModal,
    userDirectLink,
    userDirectLinkID,
    setUserDirectLink,
    setUserDirectLinkID,
    setModalMessage,
    setModalHeader,

    setPreviewName,
    setPreviewBio,
    setPreviewProfilePhotoURI,
    setPreviewCoverPhotoURI,
    editPaymentPhoto,
    editFile,

    editLinkMessageModalVisible,
    setEditLinkMessageModalVisible,
  } = useContext(AuthContext);

  // const [socialMediaIcons, setSocialMediaIcons] = useState([
  //   require('../../../../assets/UXMaterials/socialMediaIcons/anchor.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/apple-podcast.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/calendly.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/carousel.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/customLink.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/dribble.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/email.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/facebook.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/file.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/gcash.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/github.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/gitlab.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/instagram.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/lazada.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/linked.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/messenger.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/paymaya.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/paymongo.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/paypal.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/pinterest.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/reddit.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/shopee.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/snapchat.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/spotify.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/tiktok.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/twitch.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/twitter.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/venmo.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/video.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/vimeo.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/whatsapp.png'),
  //   require('../../../../assets/UXMaterials/socialMediaIcons/youtube.png'),
  // ])

  // const [isDirectLinkEnabled, setIsDirectLinkEnabled] = useState(
  //   userInfo.usr_direct_link_active == 1 ? true : false
  // );
  // useEffect(() => {
  //   if(userTheme){
  //     if(userTheme == 2){
  //       styles.flatListContainer.backgroundColor = "#562c73"

  //       updateTheme('#562c73');
  //     }
  //   }
  // }, [userTheme])

  const [isDirectLinkEnabled, setIsDirectLinkEnabled] = useState(
    userDirectLink == 0 ? false : true
  );
  const toggleSwitch = () => {
    setIsDirectLinkEnabled((previousState) => !previousState);
    setUserDirectLink(0);
    setUserDirectLinkID(null);
    removeDirectLink();
  };

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const onRefresh = () => {
    getUserData(userInfo.usr_uuid, userToken);
    // getUserLinks(userInfo.usr_uuid, userToken);
    // setRefreshing(true);
  };

  const closeRegistrationModal = () => {
    setRegistered(false);
  };

  const [error, setError] = useState("none");

  const [linkID, setLinkID] = useState();
  const [linkIndex, setLinkIndex] = useState();
  const [linkName, setLinkName] = useState();
  const [linkURL, setLinkURL] = useState();
  const [linkImage, setLinkImage] = useState();

  const [linkURLHeader, setLinkURLHeader] = useState();
  const [linkURLContent, setLinkURLContent] = useState();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [customLinkModalVisible, setCustomLinkModalVisible] = useState(false);
  const [customLinkNameErrorVisible, setCustomLinkNameErrorVisible] =
    useState("none");
  const [customLinkURLErrorVisible, setCustomLinkURLErrorVisible] =
    useState("none");

  const [file, setFile] = useState();

  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState();
  const [fileTitle, setFileTitle] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileURI, setFileURI] = useState();
  const [customLinkName, setCustomLinkName] = useState();
  const [customLinkURL, setCustomLinkURL] = useState();

  const [errorMessageModalVisible, setErrorMessageModalVisible] =
    useState(false);

  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "jpg":
        return "image/jpeg";
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      // setImage(result.assets[0].uri);
      setImage(result.uri);
    }
  };

  const pickPDF = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      // type: ["image/jpeg", "image/png", "application/pdf"],
      type: "application/pdf",
    });
    console.log(result);
    if (result.uri) {
      setFileURI(result.uri);
      setFileSize(result.size);
      setFileName(result.name);
      setFileType(result.mimeType);

      // setShowEmbedModal(true);
    }
  };

  const navigation = useNavigation();
  const onAddLinksPressed = () => {
    if (Object.keys(allLinks).length == 0) {
      getAllLinks();
    }
    navigation.navigate("AddLinksScreen");
  };
  const onEditProfilePressed = () => {
    navigation.navigate("EditProfileScreen");
    setPreviewName();
    setPreviewBio();
    setPreviewProfilePhotoURI();
    setPreviewCoverPhotoURI();
  };
  const onManageLinksPressed = () => {
    navigation.navigate("ManageLinksScreen");
  };

  const onDirectLinkPressed = () => {
    navigation.navigate("DirectLinkScreen");
  };

  const onPaymentLinksPressed = () => {};

  const onCancelPressed = () => {
    setShowModal(false);
    setShowInputModal(false);
    setShowSuccessModal(false);
    setPaymentModalVisible(false);
    setFileModalVisible(false);
    setCustomLinkModalVisible(false);
    setEditLinkMessageModalVisible(false);
    setErrorMessageModalVisible(false);
    setCustomLinkNameErrorVisible("none");
    setCustomLinkURLErrorVisible("none");
    setImage();
    setFileURI();
    setFileName();
    setFileTitle();
    setFileType();
    setError("none");
  };

  const onCloseErrorPressed = () => {
    setErrorMessageModalVisible(false);
  };

  const onSavePressed = () => {
    if (!linkURLContent) {
      setError("flex");
    } else {
      let newLinkURL = linkURLHeader + linkURLContent;

      if (linkURL == newLinkURL) {
        setErrorMessageModalVisible(true);
        setModalHeader("Error");
        setModalMessage("You have entered a duplicate link!");
      } else {
        console.log(linkIndex);
        console.log(newLinkURL);
        // let linkURL = linkURLHeader + linkURLContent;
        // console.log(linkURL);
        editLink(linkIndex, newLinkURL);
        setShowModal(false);
        setShowInputModal(false);
        setEditLinkMessageModalVisible(false);
        setError("none");
      }
    }
  };

  const onCustomLinkSavePressed = () => {
    // console.log(linkIndex);
    if (!customLinkName) {
      setCustomLinkNameErrorVisible("flex");
    }
    if (!customLinkURL) {
      setCustomLinkURLErrorVisible("flex");
    }
    if (customLinkName && customLinkURL) {
      editCustomLink(linkIndex, customLinkName, customLinkURL);

      setCustomLinkModalVisible(false);
      setCustomLinkNameErrorVisible("none");
      setCustomLinkURLErrorVisible("none");
      setCustomLinkName();
      setCustomLinkURL();
    }
  };

  const onUploadFilePressed = () => {
    // uploadFile(fileURI, fileName);
    // setShowEmbedModal(false);
    let _fileTitle;
    if (!fileTitle) {
      if (fileType == "application/pdf") {
        _fileTitle = "PDF File";
      } else {
        _fileTitle = "Image";
      }
      editFile(fileURI, fileName, fileType, _fileTitle, linkIndex);
    } else {
      editFile(fileURI, fileName, fileType, fileTitle, linkIndex);
    }
    setFileModalVisible(false);
    setFileURI();
    setFileName();
    setFileTitle();
    setFileType();
    // console.log(fileTitle);
  };

  const onUploadPhotoPressed = () => {
    if (image) {
      const fileUri = image;

      let fileName = fileUri.split("/").pop();

      const extArr = /\.(\w+)$/.exec(fileName);
      const fileType = getMimeType(extArr[1]);
      editPaymentPhoto(linkID, linkIndex, fileUri, fileName, fileType);
      setPaymentModalVisible(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* {userInfoLoading == true ? <LoadingScreen /> : null} */}
      {userLinksLoading == true ? <LoadingScreen /> : null}
      <View>
        {/* FOR FIRST TIME REGISTRATION */}
        {registered ? (
          <Modal
            transparent
            animationType="fade"
            hardwareAccelerated
            visible={registered}
            onRequestClose={closeRegistrationModal}
          >
              <ModalMessage
                modalHeader="Welcome to Yeet!"
                modalMessage="You have successfully registered to Yeet. Enjoy!"
                onOKPressed={closeRegistrationModal}
              />
          </Modal>
        ) : (
          ""
        )}

        {/* SUCCESS MESSAGE MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={editLinkMessageModalVisible}
          onRequestClose={onCancelPressed}
        >
            <ModalMessage
              modalHeader={modalHeader}
              modalMessage={modalMessage}
              onOKPressed={onCancelPressed}
            />
        </Modal>

        {/* ERROR MESSAGE MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={errorMessageModalVisible}
          onRequestClose={onCloseErrorPressed}
        >
          <ModalMessage
            modalHeader={modalHeader}
            modalMessage={modalMessage}
            onOKPressed={onCloseErrorPressed}
          />
        </Modal>

        {/* EDIT LINK MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={showInputModal}
          onRequestClose={onCancelPressed}
        >
          <ModalTextInput
            value={linkURLContent}
            // onChangeText={setLinkURLContent}
            onChangeText={(text) => {
              if (!text) {
                setError("flex");
                setLinkURLContent();
              } else {
                if (text.includes(" ")) {
                  setLinkURLContent(text.trim());
                } else {
                  // if (){}
                  console.log(text);
                  setLinkURLContent(text);
                }
              }
            }}
            warningVisible={error}
            defaultValue={linkURLHeader}
            linkName={linkName}
            linkImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
            onCancelPressed={onCancelPressed}
            onSavePressed={onSavePressed}
          />
        </Modal>

        {/* EDIT CUSTOM LINK MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={customLinkModalVisible}
          onRequestClose={onCancelPressed}
        >
          <ModalCustomLink
            // placeholder={linkURL}
            customLinkNameValue={customLinkName}
            customLinkURLValue={customLinkURL}
            // linkName={linkName}
            linkImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
            onLinkNameChangeText={(text) => {
              if (!text) {
                setCustomLinkNameErrorVisible("flex");
                setCustomLinkName();
              } else {
                setCustomLinkNameErrorVisible("none");
                setCustomLinkName(text);
              }
            }}
            onLinkURLChangeText={(text) => {
              if (!text) {
                setCustomLinkURLErrorVisible("flex");
                setCustomLinkURL();
              } else {
                setCustomLinkURLErrorVisible("none");
                if (text.includes(" ")) {
                  setCustomLinkURL(text.trim());
                } else {
                  setCustomLinkURL(text);
                }
              }
            }}
            linkNameWarningVisible={customLinkNameErrorVisible}
            linkURLWarningVisible={customLinkURLErrorVisible}
            onCancelPressed={onCancelPressed}
            onSavePressed={onCustomLinkSavePressed}
            warningVisible={error}
          />
        </Modal>

        {/* SHOW PAYMENT MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={paymentModalVisible}
          onRequestClose={onCancelPressed}
        >
          <ModalPaymentImage
            onChangePhotoPressed={pickImage}
            image={image}
            cancelText="Cancel"
            onCancelPressed={onCancelPressed}
            saveText="Save"
            onSavePressed={onUploadPhotoPressed}
            disabled={image ? false : true}
            modalImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
            defaultImage={
              linkID == 23
                ? `${BASE_URL}images/payments/gcash/${linkURL}`
                : linkID == 24
                ? `${BASE_URL}images/payments/paymaya/${linkURL}`
                : `${BASE_URL}images/payments/paymongo/${linkURL}`
            }
          />
        </Modal>

        {/* SHOW PDF MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={fileModalVisible}
          onRequestClose={onCancelPressed}
        >
          <ModalViewFile
            cancelText="Cancel"
            onCancelPressed={onCancelPressed}
            saveText="Save"
            onSavePressed={onUploadFilePressed}
            fileTitle={fileTitle}
            fileName={fileName}
            onChangeText={(text) => setFileTitle(text)}
            onUploadFilePressed={pickPDF}
          />
        </Modal>

        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          ref={ref}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          numColumns={3}
          style={styles.flatListContainer}
          ListHeaderComponent={() => (
            <View style={styles.mainContainer}>
              {/* COVER PHOTO */}
              <View style={GlobalStyles.coverPhotoContainer}>
                {userInfoLoading == true ? (
                  <LoadingResource />
                ) : (
                  <Image
                    source={
                      userInfoLoading == false
                        ? userInfo.usr_cover_photo
                          ? {
                              uri: `${BASE_URL}images/mobile/cover/${userInfo.usr_cover_photo_storage}`,
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
                  {userInfoLoading == true ? (
                    <LoadingResource visible={true} />
                  ) : (
                    <Avatar.Image
                      backgroundColor="#DEDEDE"
                      size={RFPercentage(15)}
                      source={
                        userInfoLoading == false
                          ? userInfo.usr_profile_photo_storage
                            ? {
                                uri: `${BASE_URL}images/mobile/photos/${userInfo.usr_profile_photo_storage}`,
                                // cache: "reload",
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
                  {/* <Text style={GlobalStyles.userNameText}> */}
                  <Text style={GlobalStyles.userNameText}>
                    {userInfoLoading == false ? userInfo.usr_name : ""}
                    {/* {Object.keys(userLinks).length} */}
                  </Text>
                </View>

                <View style={GlobalStyles.userBioContainer}>
                  <Text style={GlobalStyles.userBioText}>
                    {userInfoLoading == false ? userInfo.usr_bio : ""}
                  </Text>
                </View>
              </View>

              {userInfoLoading == false ? (
                <View style={styles.mainContentContainer}>
                  <CustomButton
                    bgColor="transparent"
                    fgColor="#562C73"
                    btnText="Edit Profile"
                    borderColor={Colors.yeetPurple}
                    borderWidth="2"
                    onPress={onEditProfilePressed}
                  />

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <TouchableOpacity
                      style={styles.buttons}
                      activeOpacity={0.5}
                      onPress={onManageLinksPressed}
                    >
                      <Image
                        source={aboutIcon}
                        style={styles.buttonImage}
                        resizeMode="stretch"
                      />
                      <Text style={styles.buttonText}>Manage Links</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttons}
                      activeOpacity={0.8}
                      onPress={onDirectLinkPressed}
                    >
                      <Image
                        source={aboutIcon}
                        style={styles.buttonImage}
                        resizeMode="stretch"
                      />
                      <Text style={styles.buttonText}>Direct Link</Text>
                      <Switch
                        style={{ height: RFPercentage(2.5) }}
                        // style={{transform: [{ scaleX: RFPercentage(0.1) }, { scaleY: RFPercentage(0.1) }]}}
                        disabled={userDirectLink == 0 ? true : false}
                        trackColor={{ false: "#767577", true: "#D81D4C55" }}
                        thumbColor={userDirectLink == 1 ? "#D81D4C" : "#F4F3F4"}
                        onValueChange={toggleSwitch}
                        value={userDirectLink == 1 ? true : false}
                        // value={isDirectLinkEnabled}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          )}
          keyExtractor={(item) => item.lnk_id}
          // keyExtractor={(item, index) => index.toString()}
          data={
            userInfoLoading == false ? [...userLinks, { addLinks: true }] : null
          }
          renderItem={({ item, index }) => {
            if (userInfoLoading == false) {
              // if (Object.keys(userLinks).length > 0) {
              if (item.addLinks) {
                return (
                  <TouchableOpacity
                    style={[
                      {
                        marginLeft:
                          index % 3 == 0 ? width * 0.15 : width * 0.025,
                        marginRight:
                          index % 3 == 2 ? width * 0.15 : width * 0.025,
                      },
                      ButtonStyles.socialMediaButtons,
                    ]}
                    onPress={onAddLinksPressed}
                  >
                    <Image
                      source={plusIcon}
                      style={{
                        width: width * 0.13,
                        height: width * 0.13,
                        opacity: 1,
                      }}
                      resizeMode="stretch"
                    />
                    <Text
                      style={{
                        fontSize: RFPercentage(1.3),
                      }}
                    >
                      Add Link
                    </Text>
                  </TouchableOpacity>
                );
                // }
              }

              {
                Object.keys(userLinks).length == 0 ? "" : "";
              }
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
                  onPress={() => {
                    if (
                      item.lnk_id == 23 ||
                      item.lnk_id == 24 ||
                      item.lnk_id == 26
                    ) {
                      setPaymentModalVisible(true);
                      setLinkID(item.lnk_id);
                      setLinkName(item.lnk_name);
                      setLinkURL(item.uln_url);
                      setLinkImage(item.lnk_image);
                      setLinkIndex(item.uln_id);

                      console.log(item.uln_id);
                    } else if (item.lnk_id == 31) {
                      setFileTitle(item.uln_file_title);
                      setFileName(item.uln_original_file_name);
                      setFile(item.uln_file);
                      setLinkIndex(item.uln_id);
                      setFileModalVisible(true);
                    } else if (item.lnk_id == 32) {
                      setCustomLinkModalVisible(true);
                      setCustomLinkName(item.uln_custom_link_name);
                      setCustomLinkURL(item.uln_url);
                      setLinkImage(item.lnk_image);
                      setLinkIndex(item.uln_id);
                      console.log(item.uln_id);
                    } else {
                      setShowInputModal(true);
                      setLinkName(item.lnk_name);
                      setLinkURL(item.uln_url);
                      setLinkImage(item.lnk_image);
                      setLinkIndex(item.uln_id);
                      setLinkURLHeader(item.lnk_url);

                      let linkContent = item.uln_url.replace(item.lnk_url, "");

                      console.log(linkURL);
                      setLinkURLContent(linkContent);
                    }
                    // onLinkPressed
                  }}
                  // onPress={() => {
                  //   Linking.openURL(`https://${item.uln_url}`);
                  // }}
                >
                  <Image
                    prefetch
                    source={{
                      uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                    }}
                    style={{
                      width: width * 0.13,
                      height: width * 0.13,
                      opacity:
                        userDirectLink == 1
                          ? userDirectLinkID == item.uln_id
                            ? 1
                            : 0.3
                          : 1,
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
                    {/* {item.lnk_name} */}
                  </Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  flatListContainer: {
    backgroundColor: "#fff",
    paddingBottom: height * 0.5,
  },

  fontColor: {
    color: bgTest,
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
  },

  mainContentContainer: {
    // backgroundColor: "#00f4",
    marginBottom: "2.5%",
    width: "70%",
    flex: 1,
  },

  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderRadius: 50,
    paddingVertical: "2.5%",
    // height: RFPercentage(5),
    // backgroundColor:'blue'
  },

  buttonImage: {
    borderRadius: 1000,
    height: RFPercentage(3),
    width: RFPercentage(3),
    marginRight: "2%",
  },

  buttonText: {
    fontSize: RFPercentage(1.5),
  },
});
