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

import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Clipboard from "expo-clipboard";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { Ionicons } from "@expo/vector-icons";
import PageHeader from "../../../../components/PageHeader";

import { BASE_URL } from "../../../../config";

import ModalTextInput from "../../../../components/ModalTextInput/ModalTextInput";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";
import ModalUploadImage from "../../../../components/ModalUploadImage/ModalUploadImage";
import ModalUploadFile from "../../../../components/ModalUploadFile/ModalUploadFile";
import ModalCustomLink from "../../../../components/ModalCustomLink/ModalCustomLink";
import ModalEmbedVideo from "../../../../components/ModalEmbedVideo/ModalEmbedVideo";

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
        source={
          linkImage
            ? { uri: `${BASE_URL}images/social-logo/${linkImage}` }
            : linkImage
        }
        style={{
          height: RFPercentage(3),
          width: RFPercentage(3),
          borderRadius: 1000,
          marginRight: width * 0.02,
        }}
      />
      <Text
        style={{
          fontSize: RFPercentage(1.5),
          fontWeight: "bold",
          color: "#562C73",
        }}
      >
        {linkName}
        {linkIndex}
      </Text>
      <Text
        style={{
          fontSize: RFPercentage(1.5),
          fontWeight: "bold",
          color: "#562C73",
        }}
      ></Text>
    </View>
    <View style={{ backgroundColor: "#0f00" }}>
      <Ionicons name="ios-add" size={RFPercentage(3)} color={Colors.yeetPink} />
    </View>
  </TouchableOpacity>
);

function checkURL(str) {
  return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
    str
  );
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
    addLink,
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

    showAddLinkMessage,
    setShowAddLinkMessage,
  } = useContext(AuthContext);
  const [link, setLink] = useState();
  const [linkName, setLinkName] = useState();
  const [linkImage, setLinkImage] = useState();

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

  const [fileTitle, setFileTitle] = useState();
  const [fileImage, setFileImage] = useState();

  const [showNewLinkModal, setShowNewLinkModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const [embedVideoModalVisible, setEmbedVideoModalVisible] = useState(false);

  const [embedVideoImage, setEmbedVideoImage] = useState();
  const [embedVideoTitle, setEmbedVideoTitle] = useState();
  const [embedVideoURL, setEmbedVideoURL] = useState();
  const [embedVideoThumbnail, setEmbedVideoThumbnail] = useState();
  // cosnt [embedVi]

  const [embedVideoTitleErrorVisible, setEmbedVideoTitleErrorVisible] =
    useState("none");
  const [embedVideoURLErrorVisible, setEmbedVideoURLErrorVisible] =
    useState("none");
  const [embedVideoURLErrorMessage, setEmbedVideoURLErrorMessage] = useState();

  const [error, setError] = useState("none");

  const [linkID, setLinkID] = useState();
  const [linkURL, setLinkURL] = useState();
  const [linkURLHeader, setLinkURLHeader] = useState();

  const [searchKey, setSearchKey] = useState("");

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

      setShowEmbedModal(true);
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
      setImage(result.uri);
    }
  };

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const onTestPressed = () => {
    console.log(userLinks);
  };

  const onCancelPressed = () => {
    setError("none");
    setShowNewLinkModal(false);
    setAddLinksModalVisible(false);
    setShowUploadModal(false);
    setShowAddLinkMessage(false);
    setShowEmbedModal(false);
    setShowCustomLinkModal(false);
    setEmbedVideoModalVisible(false);
    setLinkURL();
    setFile();
    setFileName();
    setFileType();
    setFileSize();
    setFileURI();
    setFileTitle();
    setImage();
    setLink();
    setCustomLinkName();
    setCustomLinkURL();
    setCustomLinkNameErrorVisible("none");
    setCustomLinkURLErrorVisible("none");
    setCustomLinkNameErrorMessage();
    setCustomLinkURLErrorMessage();
    setEmbedVideoURL();
    setEmbedVideoTitle();
    setEmbedVideoTitleErrorVisible("none");
    setEmbedVideoURLErrorVisible("none");
    setEmbedVideoURLErrorMessage();
    setEmbedVideoThumbnail();
  };

  const onSavePressed = () => {
    if (!linkURL) {
      setError("flex");
    } else {
      addLink(linkID, linkURLHeader, linkURL);
      console.log(linkURLHeader + linkURL);

      setShowNewLinkModal(false);
      setError("none");
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
      addCustomLink(linkID, customLinkName, customLinkURL);

      setShowNewLinkModal(false);
      setCustomLinkNameErrorVisible("none");
      setCustomLinkURLErrorVisible("none");
      setEmbedVideoURL();
      setEmbedVideoTitle();
      setCustomLinkName();
      setCustomLinkURL();
    }
  };

  const onUploadPhotoPressed = () => {
    const fileUri = image;

    let fileName = fileUri.split("/").pop();

    const extArr = /\.(\w+)$/.exec(fileName);
    const fileType = getMimeType(extArr[1]);

    uploadPaymentPhoto(linkID, fileUri, fileName, fileType);
    setShowUploadModal(false);
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
      uploadFile(fileURI, fileName, fileType, _fileTitle);
    } else {
      uploadFile(fileURI, fileName, fileType, fileTitle);
    }
    setShowEmbedModal(false);
    // console.log(fileTitle);
  };

  const validateYouTubeURL = (url) => {
    let reg = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    if (reg.test(url) === false) {
      return false;
    }
  };

  const onEmbedVideoSaved = () => {
    if (validateYouTubeURL(embedVideoURL) === false) {
      setEmbedVideoURLErrorVisible("flex");
      setEmbedVideoURLErrorMessage("PLEASE ENTER A VALID YOUTUBE LINK!");
    }
    if (!embedVideoURL) {
      setEmbedVideoURLErrorVisible("flex");
      setEmbedVideoURLErrorMessage("PLEASE ENTER A LINK!");
    }
    if (!embedVideoTitle) {
      setEmbedVideoTitleErrorVisible("flex");
    }
    if (embedVideoURL && embedVideoTitle) {
      let videoID;

      if (embedVideoURL.includes("youtu.be")) {
        videoID = embedVideoURL.split(".be/")[1];
      } else {
        videoID = embedVideoURL.split("v=")[1].split("&")[0];
      }

      let thumbnailURI = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;
      addYouTubeLink(linkID, embedVideoTitle, embedVideoURL, thumbnailURI);

      setEmbedVideoModalVisible(false);
      setEmbedVideoTitleErrorVisible("none");
      setEmbedVideoURLErrorVisible("none");
      setEmbedVideoURLErrorMessage();
      setEmbedVideoThumbnail();
    }
  };

  return (
    <View style={GlobalStyles.root}>
      {/* <Spinner visible={isLoading} animation="fade" overlayColor="transparent" /> */}
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

      {/* NEW LINK MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showNewLinkModal}
        onRequestClose={onCancelPressed}
      >
        <ModalTextInput
          // placeholder={"Enter " + linkName + " link"}
          placeholder={"Enter link here"}
          value={linkURL}
          onChangeText={(text) => {
            if (text.includes(" ")) {
              setLinkURL(text.trim());
            } else {
              setLinkURL(text);
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
          linkImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
          onCancelPressed={onCancelPressed}
          onSavePressed={onCustomLinkSavePressed}
        />
      </Modal>

      {/* UPLOAD IMAGE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showUploadModal}
        onRequestClose={onCancelPressed}
      >
        <ModalUploadImage
          cancelText="Cancel"
          onCancelPressed={onCancelPressed}
          saveText="Save"
          onSavePressed={onUploadPhotoPressed}
          onUploadPhotoPressed={pickImage}
          disabled={image ? false : true}
          image={image}
          modalImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
        />
      </Modal>

      {/* EMBED VIDEO MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={embedVideoModalVisible}
        onRequestClose={onCancelPressed}
      >
        <ModalEmbedVideo
          placeholder={"Enter YouTube link here"}
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
          linkImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
          onCancelPressed={onCancelPressed}
          onSavePressed={onEmbedVideoSaved}
        />
      </Modal>

      {/* UPLOAD FILE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showEmbedModal}
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
          onUploadFilePressed={pickPDF}
          cancelText="Cancel"
          saveText="Save"
          onCancelPressed={onCancelPressed}
          onSavePressed={onUploadFilePressed}
          disabled={file ? false : true}
        />
      </Modal>

      <SectionList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <PageHeader
              headerText="Add Links"
              iconColor="#562C73"
              textColor="#562C73"
              onPress={onBackPressed}
            />
          </>
        )}
        sections={isLoading == false ? allLinks : ""}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <LinkButton
            linkName={item.lnk_name}
            linkImage={item.lnk_image}
            linkID={item.lnk_id}
            // linkIndex={item.lnk_id}
            // linkIndex={item.lnk_id}
            onPress={() => {
              if (item.lnk_id == 23 || item.lnk_id == 24 || item.lnk_id == 26) {
                console.log(item.lnk_name);
                setShowUploadModal(true);
                setLinkName(item.lnk_name);
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
                setLinkURLHeader(item.lnk_url);
              } else if (item.lnk_id == 30) {
                setEmbedVideoModalVisible(true);
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
              } else if (item.lnk_id == 31) {
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
                pickPDF();
              } else if (item.lnk_id == 32) {
                setLinkID(item.lnk_id);
                setLinkImage(item.lnk_image);
                setShowCustomLinkModal(true);
              } else {
                setLinkURLHeader(item.lnk_url);
                setLinkName(item.lnk_name);
                setLinkImage(item.lnk_image);
                setLinkID(item.lnk_id);
                // console.log(item.lnk_image);

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
                fontSize: RFPercentage(2.5),
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
