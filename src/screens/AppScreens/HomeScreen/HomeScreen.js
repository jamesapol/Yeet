import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

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
import DefaultCoverPhoto from "../../../../assets/UXMaterials/defaults/default-cover.jpg";
import DefaultProfilePhoto from "../../../../assets/UXMaterials/defaults/default-profile.png";

import noLinks from "../../../../assets/UXMaterials/placeholders/no-links.png";

import LoadingResource from "../../../components/LoadingResource/LoadingResource";

import UserTheme, {
  ButtonStyles,
  Colors,
  GlobalStyles,
  socialMediaButtonImages,
  TestStyle,
  updateTheme,
} from "../../../styles/GlobalStyles";
import ModalPaymentImage from "../../../components/ModalPaymentImage/ModalPaymentImage";
import ModalViewPaymentImage from "../../../components/ModalViewPaymentImage/ModalViewPaymentImage";
import { useEffect } from "react";
import ModalViewFile from "../../../components/ModalViewFile/ModalViewFile";
import ModalCustomLink from "../../../components/ModalCustomLink/ModalCustomLink";

import { themes } from "../../../../themes/themes";
import ModalEmbedVideo from "../../../components/ModalEmbedVideo/ModalEmbedVideo";
import LinksLoadingScreen from "../../../components/LinksLoadingScreen/LinksLoadingScreen";
import UserProfileComponents from "../../../components/UserProfileComponents/UserProfileComponents";

import { imageRadius } from "../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

var bgTest;

export default function HomeScreen() {
  const {
    registered,
    setRegistered,

    userLinks,
    getUserData,
    editLink,
    editCustomLink,
    removeDirectLink,
    userTheme,
    userName,
    userBio,
    userCoverPhoto,
    userProfilePhoto,

    userLinksLoading,

    refreshing,
    userInfoLoading,
    setShowModal,
    setShowInputModal,
    showInputModal,
    modalHeader,
    modalMessage,
    setShowSuccessModal,
    userDirectLink,
    userDirectLinkID,
    setUserDirectLink,
    setUserDirectLinkID,
    setModalMessage,
    setModalHeader,
    editYouTubeLink,
    reactivateModalVisible,
    setReactivateModalVisible,

    editPaymentPhoto,
    editFile,

    editLinkMessageModalVisible,
    setEditLinkMessageModalVisible,

    tempCoverPhoto,
    tempProfilePhoto,
    tempUserName,
    tempUserBio,
  } = useContext(AuthContext);

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

  const [oldLink, setOldLink] = useState();
  const [oldFile, setOldFile] = useState();
  const [oldFileTitle, setOldFileTitle] = useState();
  const [linkID, setLinkID] = useState();
  const [linkIndex, setLinkIndex] = useState();
  const [linkName, setLinkName] = useState();
  const [linkURL, setLinkURL] = useState();
  const [linkImage, setLinkImage] = useState();

  const [linkError, setLinkError] = useState(false);

  // NEW LINK AND LINK NAME THAT USER IS ABOUT TO PLACE
  const [newLinkName, setNewLinkName] = useState();
  const [newLink, setNewLink] = useState();

  const [oldLinkName, setOldLinkName] = useState();
  // const [oldLink, setOldLink] = useState();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [customLinkModalVisible, setCustomLinkModalVisible] = useState(false);
  const [customLinkNameErrorVisible, setCustomLinkNameErrorVisible] =
    useState(false);
  const [customLinkURLErrorVisible, setCustomLinkURLErrorVisible] =
    useState(false);
  const [customLinkNameError, setCustomLinkNameError] = useState();
  const [customLinkError, setCustomLinkError] = useState();

  const [embedVideoModalVisible, setEmbedVideoModalVisible] = useState(false);
  const [embedVideoURL, setEmbedVideoURL] = useState();
  const [embedVideoTitle, setEmbedVideoTitle] = useState();
  const [embedVideoThumbnail, setEmbedVideoThumbnail] = useState();
  const [embedVideoTitleErrorVisible, setEmbedVideoTitleErrorVisible] =
    useState("none");
  const [embedVideoURLErrorVisible, setEmbedVideoURLErrorVisible] =
    useState("none");
  const [embedVideoURLErrorMessage, setEmbedVideoURLErrorMessage] = useState();

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
    getUserData();
  };

  const closeRegistrationModal = () => {
    setRegistered(false);
  };

  const [image, setImage] = useState(null);
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
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size >= 5000000) {
        setErrorMessageModalVisible(true);
        setModalHeader("Error");
        setModalMessage("File Size exceeds 5MB!");
      } else {
        setFileURI(result.uri);
        setFileSize(result.size);
        setFileName(result.name);
        setFileType(result.mimeType);
      }
      // setShowEmbedModal(true);
    }
  };

  const navigation = useNavigation();
  const onAddLinksPressed = () => {
    // if (Object.keys(allLinks).length == 0) {
    //   getAllLinks();
    // }
    navigation.navigate("AddLinksScreen");
  };

  const onEditProfilePressed = () => {
    navigation.navigate("EditProfileScreen");
  };

  const onManageLinksPressed = () => {
    // console.log(userBio == null);
    // console.log(!tempCoverPhoto);
    navigation.navigate("ManageLinksScreen");
  };

  const onDirectLinkPressed = () => {
    navigation.navigate("DirectLinkScreen");
  };

  const onCancelPressed = () => {
    setShowModal(false);
    setShowInputModal(false);
    setShowSuccessModal(false);
    setPaymentModalVisible(false);
    setFileModalVisible(false);
    setCustomLinkModalVisible(false);
    setEditLinkMessageModalVisible(false);
    setErrorMessageModalVisible(false);
    setCustomLinkNameErrorVisible(false);
    setCustomLinkURLErrorVisible(false);
    setImage();
    setFileURI();
    setFileName();
    setFileTitle();
    setFileType();

    setLinkError(false);
    setEmbedVideoModalVisible(false);
    setEmbedVideoTitleErrorVisible("none");
    setEmbedVideoURLErrorVisible("none");
    setEmbedVideoURLErrorMessage();
    setEmbedVideoThumbnail();
    setOldLink();
    setReactivateModalVisible(false);
  };

  const onCloseErrorPressed = () => {
    setErrorMessageModalVisible(false);
  };

  const onSavePressed = () => {
    if (!linkURL) {
      setLinkError(true);
    } else {
      {
        console.log(linkIndex);
        editLink(linkIndex, linkURL);
        setShowModal(false);
        setShowInputModal(false);
        setEditLinkMessageModalVisible(false);

        setLinkError(false);
      }
    }
  };

  const onCustomLinkSavePressed = () => {
    if (!customLinkName) {
      setCustomLinkNameErrorVisible(true);
      setCustomLinkNameError("PLEASE ENTER A LINK NAME!");
    }
    if (!customLinkURL) {
      setCustomLinkURLErrorVisible(true);
      setCustomLinkError("PLEASE ENTER A LINK!");
    } else {
      editCustomLink(linkIndex, customLinkName, customLinkURL);

      setCustomLinkModalVisible(false);
      setCustomLinkNameErrorVisible(false);
      setCustomLinkURLErrorVisible(false);
      setCustomLinkName();
      setCustomLinkURL();
    }
  };

  const validateYouTubeURL = (url) => {
    let reg = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (reg.test(url) === false) {
      return false;
    }
  };

  const onEmbedVideoSaved = () => {
    console.log(oldLink);
    if (oldLink == embedVideoURL) {
      setEmbedVideoURLErrorVisible("flex");
      setEmbedVideoURLErrorMessage("THIS IS ALREADY AN EXISTING LINK!");
    }
    if (!embedVideoTitle) {
      setEmbedVideoTitleErrorVisible("flex");
    }
    if (validateYouTubeURL(embedVideoURL) === false) {
      setEmbedVideoURLErrorVisible("flex");
      setEmbedVideoURLErrorMessage("PLEASE ENTER A VALID YOUTUBE LINK!");
    }
    if (!embedVideoURL) {
      setEmbedVideoURLErrorVisible("flex");
      setEmbedVideoURLErrorMessage("PLEASE ENTER A LINK!");
    }
    if (embedVideoURL && embedVideoTitle) {
      let videoID;

      if (embedVideoURL.includes("youtu.be")) {
        videoID = embedVideoURL.split(".be/")[1];
      } else {
        videoID = embedVideoURL.split("v=")[1].split("&")[0];
      }

      let thumbnailURI = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;

      console.log(linkIndex + embedVideoURL, embedVideoTitle, thumbnailURI);
      editYouTubeLink(linkIndex, embedVideoTitle, embedVideoURL, thumbnailURI);

      setEmbedVideoModalVisible(false);
      setEmbedVideoTitleErrorVisible("none");
      setEmbedVideoURLErrorVisible("none");
      setEmbedVideoURLErrorMessage();
      setEmbedVideoThumbnail();
    }
  };

  const onUploadFilePressed = () => {
    console.log(linkIndex);
    console.log(fileURI);
    console.log(fileName);
    console.log(fileType);
    console.log(fileTitle);

    editFile(fileURI, fileName, fileType, fileTitle, linkIndex);
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
      <View>
        {/* FOR CHECKING ICONS IF CENTERED OR NOT */}
        {/* <View style={styles.line} /> */}

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
        ) : null}

        {/* UPON REACTIVATION OF ACCOUNT */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={reactivateModalVisible}
          onRequestClose={onCancelPressed}
        >
          <ModalMessage
            modalHeader={modalHeader}
            modalMessage={modalMessage}
            onOKPressed={onCancelPressed}
          />
        </Modal>

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
            value={linkURL}
            onChangeText={(text) => {
              if (!text) {
                setLinkError(true);
                setLinkURL();
              } else {
                if (text.includes(" ")) {
                  setLinkURL(text.trim());
                } else {
                  setLinkError(false);
                  // if (){}
                  console.log(text);
                  setLinkURL(text);
                }
              }
            }}
            saveDisabled={!linkURL || linkURL === oldLink ? true : false}
            warningVisible={linkError}
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
            linkNameErrorMessage={customLinkNameError}
            // linkName={linkName}
            linkImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
            onLinkNameChangeText={(text) => {
              if (!text) {
                setCustomLinkNameErrorVisible(true);
                setCustomLinkNameError("PLEASE ENTER A LINK NAME!");
                // setNewLinkName();
                setCustomLinkName();
              } else {
                setCustomLinkNameErrorVisible(false);
                setCustomLinkName(text);
                // setNewLinkName(text);
              }
            }}
            linkURLErrorMessage={customLinkError}
            onLinkURLChangeText={(text) => {
              if (!text) {
                setCustomLinkURLErrorVisible(true);
                setCustomLinkError("PLEASE ENTER A LINK!");
                setCustomLinkURL();
                // setNewLink();
              } else {
                if (text.includes(" ")) {
                  setCustomLinkURL(text.trim());
                  // setNewLink(text.trim());
                } else {
                  setCustomLinkURLErrorVisible(false);
                  setCustomLinkURL(text);
                  setCustomLinkError();

                  // setNewLink(text)
                }
              }
            }}
            linkNameWarningVisible={customLinkNameErrorVisible}
            linkURLWarningVisible={customLinkURLErrorVisible}
            saveDisabled={
              (customLinkName === oldLinkName && customLinkURL === oldLink) ||
              !customLinkName | !customLinkURL
                ? true
                : false
            }
            onCancelPressed={onCancelPressed}
            onSavePressed={onCustomLinkSavePressed}
          />
        </Modal>

        {/* EDIT EMBED VIDEO MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={embedVideoModalVisible}
          onRequestClose={onCancelPressed}
        >
          <ModalEmbedVideo
            placeholder={"Enter YouTube link here"}
            linkImage={linkImage ? linkImage : null}
            onLinkURLChangeText={(text) => {
              if (!text) {
                setEmbedVideoURLErrorVisible("flex");
                setEmbedVideoURLErrorMessage("PLEASE ENTER A LINK!");
                setEmbedVideoURL(null);
              } else {
                setEmbedVideoURLErrorVisible("none");
                if (text.includes(" ")) {
                  setEmbedVideoURL(text.trim());
                } else {
                  setEmbedVideoURL(text);
                }
              }
            }}
            onLinkNameChangeText={(text) => {
              if (!text) {
                setEmbedVideoTitleErrorVisible("flex");
                setEmbedVideoTitle(null);
              } else {
                setEmbedVideoTitleErrorVisible("none");
                setEmbedVideoTitle(text);
              }
            }}
            embedVideoTitle={embedVideoTitle}
            embedVideoURL={embedVideoURL}
            embedVideoTitleErrorVisible={embedVideoTitleErrorVisible}
            embedVideoURLErrorVisible={embedVideoURLErrorVisible}
            embedVideoURLErrorMessage={embedVideoURLErrorMessage}
            onCancelPressed={onCancelPressed}
            onSavePressed={onEmbedVideoSaved}
            saveDisabled={
              !embedVideoURL ||
              !embedVideoTitle ||
              (oldLink === embedVideoURL && oldLinkName === embedVideoTitle)
                ? true
                : false
            }
          />
        </Modal>

        {/* SHOW PAYMENT MODAL */}
        <Modal
          transparent
          animationType="none"
          hardwareAccelerated
          visible={paymentModalVisible}
          onRequestClose={onCancelPressed}
        >
          <ModalViewPaymentImage
            onChangePhotoPressed={pickImage}
            image={
              linkID == 23
                ? `${BASE_URL}images/payments/gcash/${linkURL}`
                : linkID == 24
                ? `${BASE_URL}images/payments/paymaya/${linkURL}`
                : `${BASE_URL}images/payments/paymongo/${linkURL}`
            }
            cancelText="Close"
            onCancelPressed={onCancelPressed}
            modalImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
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
            saveDisabled={
              (oldFileTitle === fileTitle && !fileURI) || !fileTitle
                ? true
                : false
            }
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
              <UserProfileComponents
                tempCoverPhoto={tempCoverPhoto}
                tempProfilePhoto={tempProfilePhoto}
                tempUserName={tempUserName}
                tempUserBio={tempUserBio}
                userCoverPhoto={userCoverPhoto}
                userProfilePhoto={userProfilePhoto}
                userBio={userBio}
                userName={userName}
                userInfoLoading={userInfoLoading}
              />
              {userInfoLoading == false ? (
                <View style={styles.mainContentContainer}>
                  <View style={styles.editProfileContainer}>
                    <CustomButton
                      bgColor="transparent"
                      fgColor="#562C73"
                      btnText="Edit Profile"
                      borderColor={Colors.yeetPurple}
                      borderWidth="2"
                      onPress={onEditProfilePressed}
                    />
                  </View>
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
                        style={{ height: RFPercentage(2) }}
                        disabled={userDirectLink == 0 ? true : false}
                        trackColor={{ false: "#767577", true: "#D81D4C55" }}
                        thumbColor={userDirectLink == 1 ? "#D81D4C" : "#F4F3F4"}
                        onValueChange={toggleSwitch}
                        value={userDirectLink == 1 ? true : false}
                      />
                    </TouchableOpacity>
                  </View>

                  {userLinks.length === 0 ? (
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "10%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFPercentage(3),
                          marginVertical: "5%",
                        }}
                      >
                        You have no links yet.
                      </Text>
                      <Image
                        source={noLinks}
                        resizeMode="center"
                        style={{
                          // backgroundColor:'red',
                          marginVertical: "2.5%",
                          height: height * 0.32,
                          width: width * 0.65,
                        }}
                      />
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "50%",
                        }}
                      >
                        <CustomButton
                          bgColor="transparent"
                          fgColor="#562C73"
                          btnText="Add Link"
                          borderColor={Colors.yeetPurple}
                          borderWidth="2"
                          onPress={onAddLinksPressed}
                        />
                      </View>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          )}
          ListFooterComponent={() =>
            userLinksLoading || userInfoLoading ? (
              <View>
                <LoadingResource />
              </View>
            ) : (
              <View style={{ marginBottom: "5%" }}></View>
            )
          }
          keyExtractor={(item) => item.uln_id}
          data={
            userInfoLoading == false
              ? userLinks.length !== 0
                ? [...userLinks, { addLinks: true }]
                : null
              : null
          }
          renderItem={({ item, index }) => {
            if (userInfoLoading == false) {
              if (item.addLinks) {
                return (
                  <TouchableOpacity
                    style={[
                      {
                        marginLeft: index % 3 == 0 ? width * 0.05 : 0,
                        marginRight: index % 3 == 2 ? width * 0.05 : 0,
                        display: userLinks.length == 0 ? "none" : "flex",
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
                      resizeMode="contain"
                    />
                    {/* <Text
                      style={{
                        marginTop: "3%",
                        textAlign: "center",
                        fontSize: RFPercentage(1.75),
                      }}
                    >
                      Add Link
                    </Text> */}
                  </TouchableOpacity>
                );
                // }
              }

              return (
                <TouchableOpacity
                  style={[
                    {
                      marginLeft: index % 3 == 0 ? width * 0.05 : 0,
                      marginRight: index % 3 == 2 ? width * 0.05 : 0,
                    },
                    ButtonStyles.socialMediaButtons,
                  ]}
                  onPress={() => {
                    // FOR PAYMENT
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
                    }
                    // FOR YOUTUBE LINK
                    else if (item.lnk_id == 30) {
                      setEmbedVideoModalVisible(true);
                      setLinkImage(item.uln_youtube_thumbnail);
                      setEmbedVideoTitle(item.uln_custom_link_name);
                      setEmbedVideoURL(item.uln_url);
                      setLinkIndex(item.uln_id);
                      setOldLinkName(item.uln_custom_link_name);
                      setOldLink(item.uln_url);
                    }
                    // FOR FILES/PDF
                    else if (item.lnk_id == 31) {
                      setFileTitle(item.uln_file_title);
                      setOldFileTitle(item.uln_file_title);
                      setFileName(item.uln_original_file_name);
                      setFile(item.uln_url);
                      setOldFile(item.uln_url);
                      setLinkIndex(item.uln_id);
                      setFileModalVisible(true);
                    }
                    // FOR CUSTOM LINK
                    else if (item.lnk_id == 32) {
                      setCustomLinkModalVisible(true);
                      setCustomLinkName(item.uln_custom_link_name);
                      setCustomLinkURL(item.uln_url);
                      setOldLink(item.uln_url);
                      setOldLinkName(item.uln_custom_link_name);
                      setLinkImage(item.lnk_image);
                      setLinkIndex(item.uln_id);
                    }
                    // FOR THE FUCKING REST
                    else {
                      setShowInputModal(true);
                      setLinkName(item.lnk_name);
                      setLinkURL(item.uln_url);
                      setLinkImage(item.lnk_image);
                      setLinkIndex(item.uln_id);
                      setOldLink(item.uln_url);
                    }
                    // console.log(item.lnk_id);
                    // onLinkPressed
                  }}
                  // onPress={() => {
                  //   Linking.openURL(`https://${item.uln_url}`);
                  // }}
                >
                  <Image
                    source={
                      item.lnk_id == 30
                        ? { uri: item.uln_youtube_thumbnail, cache: true }
                        : {
                            uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                            cache: true,
                          }
                    }
                    style={{
                      ...socialMediaButtonImages(item.lnk_id),

                      opacity:
                        userDirectLink == 1
                          ? userDirectLinkID == item.uln_id
                            ? 1
                            : 0.3
                          : 1,
                    }}
                    resizeMode="contain"
                  />
                  {/* <Text>{item.uln_id}</Text>
                        <Text>{item.lnk_id}</Text> */}
                  <Text style={ButtonStyles.socialMediaButtonText}>
                    {item.lnk_id == 30
                      ? item.uln_custom_link_name
                      : item.lnk_id == 31
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

  editProfileContainer: {
    width: "80%",
  },

  fontColor: {
    color: bgTest,
  },

  mainContainer: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
  },

  mainContentContainer: {
    // backgroundColor: "#00f4",
    alignItems: "center",
    marginBottom: "2.5%",
    width: "100%",
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
    fontSize: RFPercentage(1.75),
    letterSpacing: -0.5,
  },

  line: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "100%",
    width: 1,
    backgroundColor: "black",
    zIndex: 1,
  },
});
