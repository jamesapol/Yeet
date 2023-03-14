import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  SectionList,
  Image,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import * as ImageManipulator from "expo-image-manipulator";

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../../../../config";

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import PageHeader from "../../../../components/PageHeader";

import ModalTextInput from "../../../../components/ModalTextInput/ModalTextInput";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";
import ModalUploadImage from "../../../../components/ModalUploadImage/ModalUploadImage";
import ModalUploadFile from "../../../../components/ModalUploadFile/ModalUploadFile";
import ModalCustomLink from "../../../../components/ModalCustomLink/ModalCustomLink";
import ModalEmbedVideo from "../../../../components/ModalEmbedVideo/ModalEmbedVideo";
import { linksData } from "./linksData";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const LinkButton = ({ linkName, linkImage, linkIndex, linkID, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: "#DEE0E2",
      marginHorizontal: width * 0.03,
      marginVertical: height * 0.005,

      paddingVertical: height * 0.008,
      paddingHorizontal: width * 0.03,
      borderRadius: 1000,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "#f003",
      }}
    >
      <Image
        source={linkImage}
        style={{
          height: RFPercentage(3.5),
          width: RFPercentage(3.5),
          borderRadius: 1000,
          marginRight: width * 0.02,
        }}
      />
      <Text
        style={{
          fontSize: RFPercentage(2.3),
          fontWeight: "bold",
          color: "#562C73",
        }}
      >
        {linkName}
        {/* {linkID} */}
      </Text>
    </View>
    <View style={{ backgroundColor: "#0f00" }}>
      {linkID == 23 || linkID == 24 || linkID == 26 ? (
        <AntDesign
          name="qrcode"
          size={RFPercentage(3)}
          color={Colors.yeetPink}
        />
      ) : linkID == 30 ? (
        <AntDesign
          name="youtube"
          size={RFPercentage(3)}
          color={Colors.yeetPink}
        />
      ) : linkID == 31 ? (
        <AntDesign
          name="pdffile1"
          size={RFPercentage(3)}
          color={Colors.yeetPink}
        />
      ) : linkID == 32 ? (
        <AntDesign name="link" size={RFPercentage(3)} color={Colors.yeetPink} />
      ) : (
        <Ionicons
          name="ios-add"
          size={RFPercentage(3)}
          color={Colors.yeetPink}
        />
      )}
    </View>
  </TouchableOpacity>
);

function checkURL(str) {
  return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
    str
  );
}

function validateYouTubeURL(url) {
  let reg = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  if (reg.test(url) === false) {
    return false;
  }
}

export default function AddLinksScreen() {
  const {
    userInfo,
    allLinks,
    linksUserDoesNotHave,
    getAllLinks,
    isLoading,
    userLinks,
    setUserLinks,
    // addLink,
    addCustomLink,
    addYouTubeLink,
    addLinkLoading,
    setAddLinkLoading,
    addLinksModalVisible,
    setAddLinksModalVisible,
    uploadPaymentPhoto,
    uploadFile,
    modalHeader,
    modalMessage,
    setModalHeader,
    setModalMessage,

    showAddLinkMessage,
    setShowAddLinkMessage,
  } = useContext(AuthContext);

  const [link, setLink] = useState();
  const [linkName, setLinkName] = useState();
  const [linkImage, setLinkImage] = useState();

  const [linkError, setLinkError] = useState(false);

  const [customLinkName, setCustomLinkName] = useState();
  const [customLinkNameErrorVisible, setCustomLinkNameErrorVisible] =
    useState("none");
  const [customLinkURL, setCustomLinkURL] = useState();
  const [customLinkURLErrorVisible, setCustomLinkURLErrorVisible] =
    useState("none");
  const [customLinkURLErrorMessage, setCustomLinkURLErrorMessage] = useState();
  const [customLinkNameErrorMessage, setCustomLinkNameErrorMessage] =
    useState();

  const [file, setFile] = useState();

  const [fileName, setFileName] = useState();
  const [fileURI, setFileURI] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileType, setFileType] = useState();

  const [fileSizeErrorModalVisible, setFileSizeErrorModalVisible] =
    useState(false);

  const [fileTitle, setFileTitle] = useState();
  const [fileImage, setFileImage] = useState();

  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [showUploadPaymentModalVisible, setShowUploadPaymentModalVisible] =
    useState(false);
  const [uploadFileModalVisible, setUploadFileModalVisible] = useState(false);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const [youtubeLinkModalVisible, setYoutubeLinkModalVisible] = useState(false);

  const [embedVideoTitle, setEmbedVideoTitle] = useState();
  const [embedVideoURL, setEmbedVideoURL] = useState();
  const [embedVideoThumbnailURI, setEmbedVideoThumbnailURI] = useState();
  const [embedVideoTitleError, setEmbedVideoTitleError] = useState(false);
  const [embedVideoURLError, setEmbedVideoURLError] = useState(false);
  const [embedVideoURLErrorMessage, setEmbedVideoURLErrorMessage] = useState();

  const [linkID, setLinkID] = useState();
  const [linkURL, setLinkURL] = useState();
  const [linkURLHeader, setLinkURLHeader] = useState();

  const [paymentPhotoURI, setPaymentPhotoURI] = useState();
  const [paymentPhotoName, setPaymentPhotoName] = useState();
  const [paymentPhotoFileType, setPaymentPhotoFileType] = useState();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        // if (status !== "granted") {
        //   alert("Sorry, we need library permissions to make this work!");
        // }
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

  /**
   * SELECT A PDF TO BE UPLOADED
   */
  const selectPDF = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      // type: ["image/jpeg", "image/png", "application/pdf"],
      type: "application/pdf",
    });
    console.log(result);
    if (result.uri) {
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size >= 5000000) {
        setFileSizeErrorModalVisible(true);
      } else {
        setFileURI(result.uri);
        setFileSize(result.size);
        setFileName(result.name);
        setFileType(result.mimeType);

        setUploadFileModalVisible(true);
      }
    }
  };

  /**
   * SELECT A PAYMENT PHOTO FOR GCASH, PAYMAYA, PAYMONGO
   */
  const selectPaymentPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size >= 5000000) {
        setFileSizeErrorModalVisible(true);
      } else {
        setShowUploadPaymentModalVisible(true);
        const manipResult = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ resize: { width: 250, height: 250 } }],
          { compress: 0, format: ImageManipulator.SaveFormat.JPEG }
        );
        // console.log(manipResult.uri);
        
        const fileInfo = await FileSystem.getInfoAsync(manipResult.uri);
        console.log(fileInfo.size);
        
        let fileUri = manipResult.uri;
        let fileName = fileUri.split("/").pop();

        const extArr = /\.(\w+)$/.exec(fileName);
        const fileType = getMimeType(extArr[1]);

        setPaymentPhotoURI(result.uri);
        setPaymentPhotoName(fileName);
        setPaymentPhotoFileType(fileType);
      }
    }
  };

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const closeErrorModal = () => {
    setFileSizeErrorModalVisible(false);
  };

  const onCancelPressed = () => {
    setLinkError(false);
    setShowNewLinkModal(false);
    setAddLinksModalVisible(false);
    setShowUploadPaymentModalVisible(false);
    setShowAddLinkMessage(false);
    setUploadFileModalVisible(false);
    setShowCustomLinkModal(false);
    setYoutubeLinkModalVisible(false);
    setLinkURL();
    setFile();
    setFileName();
    setFileType();
    setFileSize();
    setFileURI();
    setFileTitle();
    setLink();

    setCustomLinkName();
    setCustomLinkURL();
    setCustomLinkNameErrorVisible("none");
    setCustomLinkURLErrorVisible("none");
    setCustomLinkNameErrorMessage();
    setCustomLinkURLErrorMessage();

    setEmbedVideoURL();
    setEmbedVideoTitle();
    setEmbedVideoTitleError(false);
    setEmbedVideoURLError(false);
    setEmbedVideoURLErrorMessage();
    setEmbedVideoThumbnailURI();

    setPaymentPhotoURI();
    setPaymentPhotoName();
    setPaymentPhotoFileType();
  };

  const onSavePressed = () => {
    if (!linkURL) {
      setLinkError(true);
    } else {
      addLink(linkID);
      console.log(linkURLHeader + linkURL);

      setShowNewLinkModal(false);
      setLinkError(false);
      setLinkURL();
    }
  };

  const onCustomLinkSavePressed = () => {
    if (!customLinkName) {
      setCustomLinkNameErrorVisible("flex");
      setCustomLinkNameErrorMessage("PLEASE ENTER A LINK NAME!");
    }
    if (!customLinkURL) {
      setCustomLinkURLErrorVisible("flex");
      setCustomLinkURLErrorMessage("PLEASE ENTER A LINK!");
    }
    if (customLinkName && customLinkURL) {
      addLink(linkID);

      setShowCustomLinkModal(false);
      setCustomLinkNameErrorVisible("none");
      setCustomLinkURLErrorVisible("none");
      setEmbedVideoURL();
      setEmbedVideoTitle();
      setCustomLinkName();
      setCustomLinkURL();
    }
  };

  const onUploadPaymentPhotoPressed = () => {
    addLink(linkID);
    setShowUploadPaymentModalVisible(false);
  };

  const onUploadFilePressed = () => {
    addLink(linkID);
    setUploadFileModalVisible(false);
  };

  const onSaveYoutubeLinkPressed = () => {
    if (validateYouTubeURL(embedVideoURL) === false) {
      setEmbedVideoURLError(true);
      setEmbedVideoURLErrorMessage("PLEASE ENTER A VALID YOUTUBE LINK!");
    } else if (!embedVideoURL) {
      setEmbedVideoURLError(true);
      setEmbedVideoURLErrorMessage("PLEASE ENTER A LINK!");
    } else if (!embedVideoTitle) {
      setEmbedVideoTitleError(true);
    } else if (
      embedVideoURL &&
      embedVideoTitle &&
      validateYouTubeURL !== false
    ) {
      addLink(30);
      setYoutubeLinkModalVisible(false);
      setEmbedVideoTitleError(false);
      setEmbedVideoURLError(false);
      setEmbedVideoURLErrorMessage();
    }
  };

  /**
   *
   * Add Links Functions
   *
   */
  const addLink = async (userLinkID) => {
    setAddLinkLoading(true);
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    //UPLOAD PAYMENT PHOTO/QR
    //GCASH
    //PAYMAYA
    //PAYMONGO
    if (userLinkID == 23 || userLinkID == 24 || userLinkID == 26) {
      let formData = new FormData();
      formData.append("paymentPhoto", {
        uri: paymentPhotoURI,
        name: paymentPhotoName,
        type: paymentPhotoFileType,
      });

      formData.append("userUUID", userUUID);
      formData.append("userLinkID", userLinkID);
      await axios({
        method: "POST",
        url: `${BASE_URL}api/upload-payment-photo`,
        data: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          let userLinks = response.data.data.userLinks;
          setUserLinks(userLinks);
          setAddLinksModalVisible(true);
          setModalHeader("Success");
          setModalMessage("Image successfully uploaded.");
          setAddLinkLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          setAddLinkLoading(false);
        });

      setPaymentPhotoURI();
      setPaymentPhotoName();
      setPaymentPhotoFileType();
    } else if (userLinkID == 30) {
      console.log(embedVideoThumbnailURI);
      await axios
        .post(
          `${BASE_URL}api/add-youtube-link`,
          {
            userUUID: userUUID,
            youtubeLinkName: embedVideoTitle,
            youtubeURL: embedVideoURL,
            youtubeThumbnailURI: embedVideoThumbnailURI,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          let linkResponse = response.data.data;
          if (linkResponse.duplicateLink) {
            setAddLinkLoading(false);
            setAddLinksModalVisible(true);
            setModalHeader("Error");
            setModalMessage(linkResponse.duplicateLink);
          } else {
            let userLinks = linkResponse.userLinks;

            console.log(userLinks);
            setUserLinks(userLinks);
            setAddLinksModalVisible(true);
            setModalHeader("Success");
            setModalMessage("Youtube Link saved successfully!");
            setAddLinkLoading(false);
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error.response);
          setAddLinkLoading(false);
        });
      setEmbedVideoTitle();
      setEmbedVideoURL();
      setEmbedVideoThumbnailURI();
    } else if (userLinkID == 31) {
      let formData = new FormData();
      formData.append("file", {
        uri: fileURI,
        name: fileName,
        type: fileType,
      });
      formData.append("originalFileName", fileName);
      formData.append("fileTitle", fileTitle ? fileTitle : "PDF File");
      formData.append("userUUID", userUUID);

      await axios({
        method: "POST",
        url: `${BASE_URL}api/upload-pdf-file`,
        data: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          let userLinks = response.data.data.userLinks;
          setUserLinks(userLinks);
          setAddLinksModalVisible(true);
          setModalHeader("Success");
          setModalMessage("File successfully uploaded.");
          setAddLinkLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setAddLinkLoading(false);
        });

      setFileURI();
      setFileName();
      setFileType();
      setFileTitle();
    } else if (userLinkID == 32) {
      await axios
        .post(
          `${BASE_URL}api/add-custom-link`,
          {
            userUUID: userUUID,
            userLinkName: customLinkName,
            userLinkURL: customLinkURL,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          let linkResponse = response.data.data;
          if (linkResponse.duplicateLink) {
            setAddLinkLoading(false);
            setAddLinksModalVisible(true);
            setModalHeader("Error");
            setModalMessage(linkResponse.duplicateLink);
          } else {
            let userLinks = linkResponse.userLinks;

            console.log(userLinks);
            setUserLinks(userLinks);
            setAddLinksModalVisible(true);
            setModalHeader("Success");
            setModalMessage("Link saved successfully!");
            // getUserLinks(userUUID, userToken);
            // setAddLinkLoading(false);1
            setAddLinkLoading(false);
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error.response);
          setAddLinkLoading(false);
        });

      setCustomLinkName();
      setCustomLinkURL();
    } else {
      await axios
        .post(
          `${BASE_URL}api/add-link`,
          {
            userUUID: userUUID,
            userLinkID: linkID,
            userLinkURL: linkURL,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          let linkResponse = response.data.data;
          if (linkResponse.duplicateLink) {
            setAddLinkLoading(false);
            setAddLinksModalVisible(true);
            setModalHeader("Error");
            setModalMessage(linkResponse.duplicateLink);
          } else if (linkResponse.userLinks) {
            let userLinks = linkResponse.userLinks;

            console.log(userLinks);
            setUserLinks(userLinks);
            setAddLinksModalVisible(true);
            setModalHeader("Success");
            setModalMessage("Link saved successfully!");
            // getUserLinks(userUUID, userToken);
            // setAddLinkLoading(false);1
            setAddLinkLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.response);
          setAddLinkLoading(false);
        });
    }
  };

  return (
    <View style={GlobalStyles.root}>
      {isLoading == true || addLinkLoading == true ? <LoadingScreen /> : null}

      {/* SUCCESS MESSAGE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={addLinksModalVisible}
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
        visible={fileSizeErrorModalVisible}
        onRequestClose={closeErrorModal}
      >
        <ModalMessage
          modalHeader="Error"
          modalMessage="File Size exceeds 5MB!"
          onOKPressed={closeErrorModal}
        />
      </Modal>

      {/* NEW LINK MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showNewLinkModal}
        onRequestClose={onCancelPressed}
      >
        <ModalTextInput
          placeholder={"Paste your link here..."}
          value={linkURL}
          onChangeText={(text) => {
            if (!text) {
              setLinkError(true);
              setLinkURL(null);
            } else {
              setLinkError(false);
              if (text.includes(" ")) {
                setLinkURL(text.trim());
              } else {
                // setLinkError(false);
                setLinkURL(text);
              }
            }
          }}
          warningVisible={linkError}
          defaultValue={linkURLHeader}
          linkName={linkName}
          linkImage={linkImage}
          onCancelPressed={onCancelPressed}
          onSavePressed={onSavePressed}
        />
      </Modal>

      {/* CUSTOM LINK MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showCustomLinkModal}
        onRequestClose={onCancelPressed}
      >
        <ModalCustomLink
          // placeholder={"Enter " + linkName + " link"}
          placeholder={"Enter link here"}
          onLinkURLChangeText={(text) => {
            if (!text) {
              setCustomLinkURLErrorVisible("flex");
              setCustomLinkURLErrorMessage("PLEASE ENTER A LINK!");
              setCustomLinkURL(null);
            } else {
              setCustomLinkURLErrorVisible("none");
              if (text.includes(" ")) {
                setCustomLinkURL(text.trim());
              } else {
                // if (checkURL(text) == false) {
                //   setCustomLinkURLErrorVisible("flex");
                //   setCustomLinkURLErrorMessage("PLEASE ENTER A VALID URL!");
                // }
                setCustomLinkURL(text);
              }
            }
          }}
          onLinkNameChangeText={(text) => {
            if (!text) {
              setCustomLinkNameErrorVisible("flex");
              setCustomLinkNameErrorMessage("PLEASE ENTER A LINK NAME!");
              setCustomLinkName(null);
            } else {
              setCustomLinkNameErrorVisible("none");
              setCustomLinkName(text);
            }
          }}
          customLinkNameValue={customLinkName}
          customLinkURLValue={customLinkURL}
          linkNameWarningVisible={customLinkNameErrorVisible}
          linkURLWarningVisible={customLinkURLErrorVisible}
          linkNameErrorMessage={customLinkNameErrorMessage}
          linkURLErrorMessage={customLinkURLErrorMessage}
          linkImage={linkImage}
          onCancelPressed={onCancelPressed}
          onSavePressed={onCustomLinkSavePressed}
        />
      </Modal>

      {/* UPLOAD PAYMENT QR MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showUploadPaymentModalVisible}
        onRequestClose={onCancelPressed}
      >
        <ModalUploadImage
          cancelText="Cancel"
          onCancelPressed={onCancelPressed}
          saveText="Save"
          onSavePressed={onUploadPaymentPhotoPressed}
          // onUploadPaymentPhotoPressed={selectPaymentPhoto}
          disabled={paymentPhotoURI ? false : true}
          image={paymentPhotoURI}
          modalImage={linkImage}
        />
      </Modal>

      {/* YOUTUBE LINK MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={youtubeLinkModalVisible}
        onRequestClose={onCancelPressed}
      >
        <ModalEmbedVideo
          placeholder={"Enter YouTube link here"}
          onLinkURLChangeText={(text) => {
            if (!text) {
              setEmbedVideoURLError(true);
              setEmbedVideoURLErrorMessage("PLEASE ENTER A LINK!");
              setEmbedVideoThumbnailURI();
              setEmbedVideoURL(null);
            } else {
              setEmbedVideoURLError(false);
              if (text.includes(" ")) {
                setEmbedVideoURL(text.trim());
              } else {
                let videoURL = text;
                setEmbedVideoURL(text);
                let videoID;

                if (videoURL.includes("youtu.be")) {
                  videoID = videoURL.split(".be/")[1];
                } else if (videoURL.includes("youtube.com/watch?v=")) {
                  videoID = videoURL.split("v=")[1].split("&")[0];
                }

                if (videoID) {
                  setEmbedVideoThumbnailURI(
                    `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`
                  );
                  console.log(videoID);
                } else {
                  setEmbedVideoURLError(true);
                  setEmbedVideoURLErrorMessage(
                    "PLEASE ENTER A VALID YOUTUBE LINK!"
                  );
                }
              }
            }
          }}
          onLinkNameChangeText={(text) => {
            if (!text) {
              setEmbedVideoTitleError(true);
              setEmbedVideoTitle(null);
            } else {
              setEmbedVideoTitleError(false);
              setEmbedVideoTitle(text);
            }
          }}
          embedVideoTitle={embedVideoTitle}
          embedVideoURL={embedVideoURL}
          embedVideoTitleError={embedVideoTitleError}
          embedVideoURLError={embedVideoURLError}
          embedVideoURLErrorMessage={embedVideoURLErrorMessage}
          linkImage={embedVideoThumbnailURI ? embedVideoThumbnailURI : null}
          disabled={validateYouTubeURL}
          onCancelPressed={onCancelPressed}
          onSavePressed={onSaveYoutubeLinkPressed}
        />
      </Modal>

      {/* UPLOAD FILE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={uploadFileModalVisible}
        onRequestClose={onCancelPressed}
      >
        <ModalUploadFile
          file={fileURI}
          fileName={fileName}
          fileSize={fileSize}
          fileType={fileType}
          fileUri={fileURI}
          fileTitle={fileTitle}
          onChangeText={(text) => setFileTitle(text)}
          onUploadFilePressed={selectPDF}
          cancelText="Cancel"
          saveText="Save"
          onCancelPressed={onCancelPressed}
          onSavePressed={onUploadFilePressed}
          disabled={file ? false : true}
        />
      </Modal>

      <PageHeader
        headerText="Add Links"
        iconColor="#562C73"
        textColor="#562C73"
        onPress={onBackPressed}
      />
      <SectionList
        stickySectionHeadersEnabled={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        sections={linksData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <LinkButton
            linkName={item.lnk_name}
            linkImage={item.lnk_image}
            linkID={item.lnk_id}
            onPress={() => {
              if (item.lnk_id == 23 || item.lnk_id == 24 || item.lnk_id == 26) {
                console.log(item.lnk_name);
                selectPaymentPhoto();
                setLinkName(item.lnk_name);
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
              } else if (item.lnk_id == 30) {
                setYoutubeLinkModalVisible(true);
                setLinkImage();
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
              } else if (item.lnk_id == 31) {
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
                selectPDF();
              } else if (item.lnk_id == 32) {
                setLinkID(item.lnk_id);
                setLinkImage(item.lnk_image);
                setShowCustomLinkModal(true);
              } else {
                setLinkURLHeader(item.lnk_url);
                setLinkName(item.lnk_name);
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
                setShowNewLinkModal(true);
              }
            }}
          />
        )}
        renderSectionHeader={({ section: { section } }) => (
          <View
            style={{
              // backgroundColor: "#12F1",
              marginHorizontal: width * 0.03,
              // paddingHorizontal: width * 0.03,
              marginTop: height * 0.01,
              marginBottom: height * 0.005,
            }}
          >
            <Text
              style={{
                color: "#562C73",
                fontSize: RFPercentage(3),
                fontWeight: "bold",
              }}
            >
              {section}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  mainContainer: {
    width: "100%",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.013,
  },

  headerText: {
    color: "#D81D4C",
    fontSize: RFPercentage(1.5),
  },

  inputContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    backgroundColor: "#DEE0E2",
    borderRadius: 1000,
    width: "100%",
  },
  icon: {
    paddingLeft: width * 0.03,
  },
});
