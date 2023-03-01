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
import React, { useEffect, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../config";

import { Avatar } from "react-native-paper";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

import noLinks from "../../../../../assets/UXMaterials/placeholders/no-links.png";

import ModalWithButtons from "../../../../components/ModalWithButtons/ModalWithButtons";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import { useCallback } from "react";
import { useRef } from "react";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import {
  ButtonStyles,
  Colors,
  GlobalStyles,
} from "../../../../styles/GlobalStyles";
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function ManageLinksScreen() {
  const {
    userInfo,
    userLinks,
    setUserLinks,
    removeLink,

    userLinksLoading,
    showModal,
    setShowModal,
    userDirectLinkID,

    userName,
    userBio,
    userCoverPhoto,
    userProfilePhoto,
    tempCoverPhoto,
    tempProfilePhoto,
  } = useContext(AuthContext);

  const [_userLinks, _setUserLinks] = useState(userLinks);
  const [refreshFlatList, setRefreshFlatList] = useState(false);

  const [linkID, setLinkID] = useState();
  const [linkIndex, setLinkIndex] = useState();
  const [linkName, setLinkName] = useState();
  const [linkImage, setLinkImage] = useState();

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.navigate("HomeScreen");
  };

  const onCancelPressed = () => {
    setShowModal(false);
  };

  const onDeletePressed = () => {
    removeLink(linkID);
    let linkArray = userLinks;
    linkArray.splice(linkIndex, 1);
    setUserLinks(linkArray);
    setRefreshFlatList(!refreshFlatList);

    setShowModal(false);
    setDeleteSuccess(true);
  };

  const closeDeleteSuccessModal = () => {
    setDeleteSuccess(false);
  };

  return (
    <View style={styles.root}>
      {userLinksLoading == true ? <LoadingScreen /> : null}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showModal}
        onRequestClose={onCancelPressed}
      >
        <ModalWithButtons
          onCancelPressed={onCancelPressed}
          modalHeaderText={linkName}
          modalMessage="Are you sure you want to remove this link?"
          modalImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
          onRemovePressed={onDeletePressed}
          cancelText="Cancel"
          saveText="Delete"
        />
      </Modal>

      {/* SUCCESS MESSAGE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={deleteSuccess}
        onRequestClose={closeDeleteSuccessModal}
      >
        <ModalMessage
          modalHeader="Success"
          modalMessage="Link successfully removed!"
          onOKPressed={closeDeleteSuccessModal}
        />
      </Modal>
      <FlatList
        numColumns={3}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        ListHeaderComponent={() => (
          <View style={styles.mainContainer}>
            <View style={GlobalStyles.coverPhotoContainer}>
              {tempCoverPhoto ? (
                <Image
                  source={{
                    uri: tempCoverPhoto,
                  }}
                  resizeMode="stretch"
                  style={GlobalStyles.coverPhoto}
                />
              ) : userCoverPhoto ? (
                <Image
                  source={
                    userCoverPhoto
                      ? {
                          uri: `${BASE_URL}images/mobile/cover/${userCoverPhoto}`,
                        }
                      : null
                  }
                  resizeMode="stretch"
                  style={GlobalStyles.coverPhoto}
                />
              ) : null}
            </View>
            {/* PROFILE PHOTO */}
            <View style={GlobalStyles.profilePhotoContainer}>
              <View style={GlobalStyles.profilePhoto}>
                {tempProfilePhoto ? (
                  <Avatar.Image
                    backgroundColor="#DEDEDE"
                    size={RFPercentage(15)}
                    source={{
                      uri: tempProfilePhoto,
                    }}
                  />
                ) : userProfilePhoto ? (
                  <Avatar.Image
                    backgroundColor="#DEDEDE"
                    size={RFPercentage(15)}
                    source={
                      userProfilePhoto
                        ? {
                            uri: `${BASE_URL}images/mobile/photos/${userProfilePhoto}`,
                          }
                        : {
                            uri: `${BASE_URL}images/profile/photos/default-profile.png`,
                          }
                    }
                  />
                ) : null}
              </View>
            </View>

            <View style={GlobalStyles.userNameAndBioContainer}>
              <View style={GlobalStyles.userNameContainer}>
                <Text style={GlobalStyles.userNameText}>{userName}</Text>
              </View>

              <View style={GlobalStyles.userBioContainer}>
                <Text style={GlobalStyles.userBioText}>{userBio}</Text>
              </View>
            </View>

            {userLinks.length == 0 ? (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text
                      style={{
                        fontSize: RFPercentage(3),
                        marginVertical: "5%",
                      }}
                    >
                      You have no links yet.
                    </Text> */}
                <Image
                  source={noLinks}
                  resizeMode="center"
                  style={{
                    marginVertical: "5%",
                    height: RFPercentage(20),
                    width: RFPercentage(30),
                    // backgroundColor: "red",
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
                    btnText="Back"
                    borderColor="#562C73"
                    borderWidth="2"
                    onPress={onBackPressed}
                  />
                </View>
              </View>
            ) : null}
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // width: "50%",
            }}
          >
            <View style={{ width: "50%", marginTop: '5%' }}>
              <CustomButton
                bgColor="transparent"
                fgColor="#562C73"
                btnText="Back"
                borderColor="#562C73"
                borderWidth="2"
                onPress={onBackPressed}
              />
            </View>
          </View>
        )}
        // keyExtractor={(item, index) => index.toString()}
        extraData={refreshFlatList}
        keyExtractor={(item, index) => index.toString()}
        data={userLinks}
        renderItem={({ item, index }) => {
          return (
            <>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  {
                    marginLeft: index % 3 == 0 ? width * 0.15 : width * 0.025,
                    marginRight: index % 3 == 2 ? width * 0.15 : width * 0.025,
                    // backgroundColor: "#f2f3",
                  },
                  ButtonStyles.socialMediaButtons,
                ]}
              >
                <View
                  style={{
                    paddingHorizontal: width * 0.005,
                    paddingVertical: height * 0.005,
                    // backgroundColor: "#33f3",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      // backgroundColor: 'blue',
                      borderWidth: 0,
                      position: "absolute",
                      zIndex: 1,
                      right: 1,
                      top: 1,
                      display:
                        userDirectLinkID == item.uln_id ? "none" : "flex",
                    }}
                    onPress={() => {
                      setLinkID(item.uln_id);
                      setLinkIndex(index);
                      setLinkImage(item.lnk_image);
                      setLinkName(item.lnk_name);
                      setShowModal(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{
                        backgroundColor: Colors.yeetGray,
                        padding: "5%",
                        borderRadius: 5000,
                      }}
                      name="close"
                      size={width * 0.03}
                      color="#000"
                      //   size={RFPercentage(2.3)}
                    />
                  </TouchableOpacity>

                  <Image
                    source={
                      item.lnk_id == 30
                        ? { uri: item.uln_youtube_thumbnail }
                        : {
                            uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                          }
                    }
                    style={{
                      borderRadius: item.lnk_id == 30 ? 20 : null,
                      width: width * 0.13,
                      height: width * 0.13,
                      //   backgroundColor: "#22F3",
                    }}
                    resizeMode="stretch"
                  />
                </View>
                {/* <Text>{item.uln_id}</Text>
                  <Text>{index}</Text> */}
                <Text
                  style={{
                    fontSize: RFPercentage(1.3),
                  }}
                >
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
            </>
          );
        }}
      />
    </View>
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
  },
});
