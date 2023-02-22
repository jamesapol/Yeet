import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RFPercentage } from "react-native-responsive-fontsize";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { AuthContext } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../config";

import { Avatar } from "react-native-paper";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";

import PageHeader from "../../../../components/PageHeader";

import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";
import ModalPhotoOptions from "../../../../components/ModalPhotoOptions/ModalPhotoOptions";

import DefaultCoverPhoto from "../../../../../assets/UXMaterials/defaults/default.jpg";
import DefaultProfilePhoto from "../../../../../assets/UXMaterials/defaults/default.png";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

var statusBarHeight = StatusBar.currentHeight;

function hasSpacesOnly(str) {
  return /^\s*$/.test(str);
}

export default function HomeScreen() {
  const {
    userInfo,
    updateProfile,
    userInfoLoading,
    setModalHeader,
    setModalMessage,
    modalHeader,
    modalMessage,

    updateSuccessModalVisible,
    setUpdateSuccessModalVisible,
    updateErrorModalVisible,
    setUpdateErrorModalVisible,

    setUserProfilePhoto,
    setUserCoverPhoto,
    userProfilePhoto,
    userCoverPhoto,
    userName,
    userBio,
    setUserName,
    setUserBio,
    setTempUserName,
    setTempUserBio,
    setTempCoverPhoto,
    setTempProfilePhoto,
  } = useContext(AuthContext);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  // const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [previewBio, setPreviewBio] = useState();
  const [previewName, setPreviewName] = useState();

  // const [userName, setUserName] = useState(userInfo.usr_name);
  // const [userBio, setUserBio] = useState(userInfo.usr_bio);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const [profilePhotoModalVisible, setProfilePhotoModalVisible] =
    useState(false);
  const [coverPhotoModalVisible, setCoverPhotoModalVisible] = useState(false);

  const [profilePhotoURI, setProfilePhotoURI] = useState(null);
  const [profilePhotoName, setProfilePhotoName] = useState(null);
  const [profilePhotoType, setProfilePhotoType] = useState(null);

  const [coverPhotoURI, setCoverPhotoURI] = useState(null);
  const [coverPhotoName, setCoverPhotoName] = useState(null);
  const [coverPhotoType, setCoverPhotoType] = useState(null);

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
    // console.log(coverPhoto)
  }, []);

  const navigation = useNavigation();

  const onPreviewProfilePressed = () => {
    console.log(userName);
    navigation.navigate("PreviewProfileScreen", {
      previewCoverPhotoURI: coverPhoto,
      previewProfilePhotoURI: profilePhoto,
      previewName: previewName,
      previewBio: previewBio,
    });
  };

  const onSelectProfilePhotoPressed = () => {
    setProfilePhotoModalVisible(true);
  };

  const uploadProfilePhoto = async () => {
    let profilePhotoResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(profilePhotoResult);
    if (!profilePhotoResult.cancelled) {
      closeUploadModal();

      const fileInfo = await FileSystem.getInfoAsync(profilePhotoResult.uri);
      if (fileInfo.size >= 5000000) {
        setUpdateErrorModalVisible(true);
        setModalHeader("Error");
        setModalMessage("File size exceeds 5MB!");
      } else {
        // setProfilePhoto(profilePhotoResult.assets[0].uri);
        setProfilePhoto(profilePhotoResult.uri);
        // const profilePhotoFileUri = profilePhotoResult.assets[0].uri;
        const profilePhotoFileUri = profilePhotoResult.uri;
        let profilePhotoFileName = profilePhotoFileUri.split("/").pop();
        const profilePhotoExtArr = /\.(\w+)$/.exec(profilePhotoFileName);
        const profilePhotoFileType = getMimeType(profilePhotoExtArr[1]);
        setProfilePhotoURI(profilePhotoFileUri);
        setProfilePhotoName(profilePhotoFileName);
        setProfilePhotoType(profilePhotoFileType);
      }
    }
  };

  const takeProfilePhoto = async () => {
    let profilePhotoResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(profilePhotoResult);
    if (!profilePhotoResult.cancelled) {
      closeUploadModal();

      const fileInfo = await FileSystem.getInfoAsync(profilePhotoResult.uri);
      if (fileInfo.size >= 5000000) {
        setUpdateErrorModalVisible(true);
        setModalHeader("Error");
        setModalMessage("File size exceeds 5MB!");
      } else {
        // setProfilePhoto(profilePhotoResult.assets[0].uri);
        setProfilePhoto(profilePhotoResult.uri);
        // const profilePhotoFileUri = profilePhotoResult.assets[0].uri;
        const profilePhotoFileUri = profilePhotoResult.uri;
        let profilePhotoFileName = profilePhotoFileUri.split("/").pop();
        const profilePhotoExtArr = /\.(\w+)$/.exec(profilePhotoFileName);
        const profilePhotoFileType = getMimeType(profilePhotoExtArr[1]);
        setProfilePhotoURI(profilePhotoFileUri);
        setProfilePhotoName(profilePhotoFileName);
        setProfilePhotoType(profilePhotoFileType);
      }
    }
  };

  const onSelectCoverPhotoPressed = () => {
    setCoverPhotoModalVisible(true);
  };

  const uploadCoverPhoto = async () => {
    let coverPhotoResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    console.log(coverPhotoResult);
    if (!coverPhotoResult.cancelled) {
      closeUploadModal();

      const fileInfo = await FileSystem.getInfoAsync(coverPhotoResult.uri);
      if (fileInfo.size >= 5000000) {
        setUpdateErrorModalVisible(true);
        setModalHeader("Error");
        setModalMessage("File size exceeds 5MB!");
      } else {
        // setCoverPhoto(coverPhotoResult.assets[0].uri);
        setCoverPhoto(coverPhotoResult.uri);

        // const coverPhotoFileUri = coverPhotoResult.assets[0].uri;
        const coverPhotoFileUri = coverPhotoResult.uri;

        let coverPhotoFileName = coverPhotoFileUri.split("/").pop();
        const coverPhotoExtArr = /\.(\w+)$/.exec(coverPhotoFileName);
        const coverPhotoFileType = getMimeType(coverPhotoExtArr[1]);

        setCoverPhotoURI(coverPhotoFileUri);
        setCoverPhotoName(coverPhotoFileName);
        setCoverPhotoType(coverPhotoFileType);
      }
    }
  };

  const takeCoverPhoto = async () => {
    let coverPhotoResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    console.log(coverPhotoResult);
    if (!coverPhotoResult.cancelled) {
      closeUploadModal();
      const fileInfo = await FileSystem.getInfoAsync(coverPhotoResult.uri);
      if (fileInfo.size >= 5000000) {
        setUpdateErrorModalVisible(true);
        setModalHeader("Error");
        setModalMessage("File size exceeds 5MB!");
      } else {
        // setCoverPhoto(coverPhotoResult.assets[0].uri);
        setCoverPhoto(coverPhotoResult.uri);

        // const coverPhotoFileUri = coverPhotoResult.assets[0].uri;
        const coverPhotoFileUri = coverPhotoResult.uri;

        let coverPhotoFileName = coverPhotoFileUri.split("/").pop();
        const coverPhotoExtArr = /\.(\w+)$/.exec(coverPhotoFileName);
        const coverPhotoFileType = getMimeType(coverPhotoExtArr[1]);

        setCoverPhotoURI(coverPhotoFileUri);
        setCoverPhotoName(coverPhotoFileName);
        setCoverPhotoType(coverPhotoFileType);
      }
    }
  };

  const onCancelPressed = () => {
    navigation.goBack();
  };

  const closeUploadModal = () => {
    // setUpdateSuccessModalVisible(false);
    setProfilePhotoModalVisible(false);
    setCoverPhotoModalVisible(false);
  };

  const closeErrorModal = () => {
    setUpdateErrorModalVisible(false);
  };

  const closeModal = () => {
    setUpdateSuccessModalVisible(false);
    navigation.goBack();
  };

  const removeWhiteSpace = (text) => {
    return text.trim().split(/ +/).join(" ");
  };

  const onSavePressed = () => {
    let filteredUserName = removeWhiteSpace(userName);
    // console.log(filteredUserName)
    updateProfile(
      profilePhotoURI,
      profilePhotoName,
      profilePhotoType,
      coverPhotoURI,
      coverPhotoName,
      coverPhotoType,
      filteredUserName,
      userBio
    );
    if (coverPhoto) {
      setTempCoverPhoto(coverPhoto);
    }
    if (profilePhoto) {
      setTempProfilePhoto(profilePhoto);
    }
    setTempUserName(filteredUserName);
    setTempUserBio(userBio);
    setUpdateSuccessModalVisible(true);
  };

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

  return (
    <ScrollView
      overScrollMode="never"
      style={GlobalStyles.root}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* {userInfoLoading == true ? <LoadingScreen /> : null} */}
      <View>
        {/* SUCCESS MESSAGE MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={updateSuccessModalVisible}
          onRequestClose={closeModal}
        >
          <ModalMessage
            modalHeader="Success"
            modalMessage="Profile successfully updated!"
            onOKPressed={closeModal}
          />
        </Modal>

        {/* ERROR MESSAGE MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={updateErrorModalVisible}
          onRequestClose={closeErrorModal}
        >
          <ModalMessage
            modalHeader={modalHeader}
            modalMessage={modalMessage}
            onOKPressed={closeErrorModal}
          />
        </Modal>

        {/* SELECT PROFILE PHOTO MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={profilePhotoModalVisible}
          onRequestClose={closeUploadModal}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeUploadModal}
          >
            <ModalPhotoOptions
              onCancelPressed={closeUploadModal}
              onUploadImagePressed={uploadProfilePhoto}
              onTakePhotoPressed={takeProfilePhoto}
              modalHeader={
                userInfo.usr_profile_photo_storage
                  ? "Change Profile Photo"
                  : "Select Profile Photo"
              }
            />
          </TouchableOpacity>
        </Modal>

        {/* SELECT COVER PHOTO MODAL */}
        <Modal
          transparent
          animationType="fade"
          hardwareAccelerated
          visible={coverPhotoModalVisible}
          onRequestClose={closeUploadModal}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={closeUploadModal}
          >
            <ModalPhotoOptions
              onCancelPressed={closeUploadModal}
              onUploadImagePressed={uploadCoverPhoto}
              onTakePhotoPressed={takeCoverPhoto}
              modalHeader={
                userInfo.usr_cover_photo_storage
                  ? "Change Cover Photo"
                  : "Select Cover Photo"
              }
            />
          </TouchableOpacity>
        </Modal>

        <PageHeader
          headerText="Edit Profile"
          onPress={onCancelPressed}
          iconType="MaterialCommunityIcons"
          pageActionVisible="flex"
          pageActionDisabled={error ? true : false}
          pageActionColor={error ? Colors.yeetGray : Colors.yeetPurple}
          pageActionIcon="eye"
          pageAction={onPreviewProfilePressed}
        />
        <View style={styles.mainContainer}>
          {/* COVER PHOTO */}
          <View style={GlobalStyles.coverPhotoContainer}>
            {coverPhoto ? (
              coverPhoto && (
                <Image
                  source={{ uri: coverPhoto }}
                  resizeMode="stretch"
                  style={GlobalStyles.coverPhoto}
                />
              )
            ) : (
              <Image
                source={
                  userCoverPhoto
                    ? {
                        uri: `${BASE_URL}images/mobile/cover/${userCoverPhoto}`,
                      }
                    : userInfo.usr_cover_photo_storage
                    ? {
                        uri: `${BASE_URL}images/mobile/cover/${userInfo.usr_cover_photo_storage}`,
                      }
                    : DefaultCoverPhoto
                }
                resizeMode="stretch"
                style={GlobalStyles.coverPhoto}
              />
            )}
            <TouchableOpacity
              onPress={onSelectCoverPhotoPressed}
              style={{
                zIndex: 5,
                width: RFPercentage(4),
                height: RFPercentage(4),
                borderRadius: width + height / 2,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",

                bottom: "5%",
                right: "3%",
                backgroundColor: "#AAAD",
              }}
            >
              <MaterialCommunityIcons
                name="camera-plus"
                size={RFPercentage(2.5)}
                color="white"
                // style={{ top: "10%" }}
              />
              {/* <FontAwesome5 name="camera-retro" size={24} color="white" /> */}
            </TouchableOpacity>
          </View>

          {/* PROFILE PHOTO */}
          <View style={GlobalStyles.profilePhotoContainer}>
            <View style={GlobalStyles.profilePhoto}>
              {profilePhoto ? (
                profilePhoto && (
                  <Avatar.Image
                    size={RFPercentage(15)}
                    source={{ uri: profilePhoto }}
                    resizeMode="cover"
                  />
                )
              ) : (
                <Avatar.Image
                  backgroundColor="#DEDEDE"
                  size={RFPercentage(15)}
                  source={
                    userProfilePhoto
                      ? {
                          uri: `${BASE_URL}images/mobile/photos/${userProfilePhoto}`,
                        }
                      : userInfo.usr_profile_photo_storage
                      ? {
                          uri: `${BASE_URL}images/mobile/photos/${userInfo.usr_profile_photo_storage}`,
                        }
                      : DefaultProfilePhoto
                  }
                />
              )}
              <TouchableOpacity
                onPress={onSelectProfilePhotoPressed}
                style={[
                  {
                    zIndex: 5,
                    // borderWidth: 3,
                    borderColor: "#aaa",
                    width: RFPercentage(4),
                    height: RFPercentage(4),
                    borderRadius: 1000,
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",

                    bottom: "2%",
                    right: "2%",
                    backgroundColor: "#AAAD",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={RFPercentage(2.5)}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mainContentContainer}>
            <View style={styles.userInfoContainer}>
              <Text
                style={{
                  marginLeft: "5%",
                  marginBottom: "1%",
                  fontSize: RFPercentage(1.5),
                }}
              >
                Full Name
              </Text>
              <TextInput
                autoCapitalize="words"
                value={userName}
                onChangeText={(text) => {
                  console.log(hasSpacesOnly(text));
                  if (!text || hasSpacesOnly(text) == true) {
                    setError(true);
                    setUserName();
                  } else {
                    setError(false);
                    setUserName(text);
                    setPreviewName(text);
                  }
                }}
                style={[
                  styles.editInput,
                  { marginBottom: !error ? "5%" : "1%" },
                ]}
              />
              <Text
                style={[
                  styles.warningText,
                  { display: error ? "flex" : "none" },
                ]}
              >
                This field is required.
              </Text>

              <Text
                style={{
                  marginLeft: "5%",
                  marginBottom: "1%",
                  fontSize: RFPercentage(1.5),
                }}
              >
                Bio
              </Text>
              <TextInput
                multiline
                blurOnSubmit={true}
                numberOfLines={4}
                maxLength={90}
                value={userBio}
                onChangeText={(text) => {
                  // console.log(text)
                  if (!text) {
                    setUserBio("");
                  } else {
                    setUserBio(text);
                    setPreviewBio(text);
                  }
                }}
                style={[
                  styles.editInput,
                  {
                    textAlignVertical: "top",
                  },
                ]}
              />
              {/* <Text style={{ marginLeft: "5%", fontSize: RFPercentage(1.3) }}>
                  Themes
                </Text>
                <View style={styles.themesContainer}></View> */}
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton
              bgColor={error ? Colors.yeetGray : Colors.yeetPurple}
              fgColor="#FFF"
              btnText="Save"
              borderColor={error ? Colors.yeetBorderGray : Colors.yeetPurple}
              borderWidth="2"
              style={styles.button}
              onPress={onSavePressed}
              loading={userInfoLoading}
              disabled={userInfoLoading || error ? true : false}
            />
            {/* <CustomButton
                bgColor="transparent"
                fgColor="#562C73"
                btnText="Cancel"
                borderColor="#562C73"
                borderWidth="2"
                onPress={onCancelPressed}
                disabled={userInfoLoading}
              /> */}
          </View>
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
    width: "100%",
    // marginBottom: hp("7%"),
  },

  mainContentContainer: {
    width: "75%",
    marginTop: "5%",
    // paddingHorizontal: width * 0.1,
    // backgroundColor: "#00f3",
  },

  userInfoContainer: {
    marginBottom: height * 0.05,
    // height: height * 0.5,
    // backgroundColor: "#00f3",
  },

  editInput: {
    width: "100%",
    borderColor: "#562C73",
    borderWidth: 2,
    borderRadius: 15,
    fontSize: RFPercentage(1.75),
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    // marginBottom: height * 0.015,
    backgroundColor: "#EFF1F0",
  },

  warningText: {
    marginLeft: "5%",
    marginTop: "1%",
    marginBottom: "5%",
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
    color: Colors.yeetPink,
  },

  themesContainer: {
    // backgroundColor: '#33F',
    borderRadius: 25,
    borderColor: "#562C73",
    borderWidth: 2,
    height: "8%",
  },

  buttonsContainer: {
    width: "75%",
    // backgroundColor: "#00f3",
  },

  previewButton: {
    marginBottom: "7%",
  },

  button: {
    marginBottom: height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    // paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.013,
  },
});
