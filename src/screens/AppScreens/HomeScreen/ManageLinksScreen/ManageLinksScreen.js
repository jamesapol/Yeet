import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
  Animated,
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
    removeLinkFromUser,

    userLinksLoading,
    showModal,
    setShowModal,
    userDirectLinkID,
  } = useContext(AuthContext);

  // useEffect(() => {
  //   shake();
  // }, []);
  const anim = useRef(new Animated.Value(0));
  const animX = useRef(new Animated.Value(0));

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 15,
          useNativeDriver: true,
        }),
        Animated.timing(animX.current, {
          toValue: -2,
          duration: 15,
          useNativeDriver: true,
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 15,
          useNativeDriver: true,
        }),
        Animated.timing(animX.current, {
          toValue: 2,
          duration: 15,
          useNativeDriver: true,
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 60,
          useNativeDriver: true,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 }
    ).start();
  }, []);

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
    // shake();
    removeLinkFromUser(linkID);
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
              <Image
                source={
                  userInfo.usr_cover_photo_storage
                    ? {
                        uri: `${BASE_URL}images/mobile/cover/${userInfo.usr_cover_photo_storage}`,
                      }
                    : null
                }
                resizeMode="stretch"
                style={GlobalStyles.coverPhoto}
              />
            </View>
            {/* PROFILE PHOTO */}
            <View style={GlobalStyles.profilePhotoContainer}>
              <View style={GlobalStyles.profilePhoto}>
                <Avatar.Image
                  backgroundColor="#DEDEDE"
                  size={RFPercentage(15)}
                  source={
                    userInfo.usr_profile_photo_storage
                      ? {
                          uri: `${BASE_URL}images/mobile/photos/${userInfo.usr_profile_photo_storage}`,
                        }
                      : {
                          uri: `${BASE_URL}images/profile/photos/default.png`,
                        }
                  }
                />
              </View>
            </View>

            <View style={GlobalStyles.userNameAndBioContainer}>
              <View style={GlobalStyles.userNameContainer}>
                <Text style={GlobalStyles.userNameText}>
                  {userInfo.usr_name}
                </Text>
              </View>

              <View style={GlobalStyles.userBioContainer}>
                <Text style={GlobalStyles.userBioText}>{userInfo.usr_bio}</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              alignItems: "center",
              marginHorizontal: width * 0.15,
              marginVertical: height * 0.05,
            }}
          >
            {userLinks.length != 0 ? null : (
              <Text
                style={{
                  fontSize: RFPercentage(2.5),
                  color: Colors.yeetPurple,
                  marginVertical: height * 0.025,
                }}
              >
                You have no links yet.
              </Text>
            )}
            <CustomButton
              bgColor="transparent"
              fgColor="#562C73"
              btnText="Back"
              borderColor="#562C73"
              borderWidth="2"
              onPress={onBackPressed}
            />
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
                <Animated.View
                  style={{
                    transform: [
                      { translateY: anim.current },
                      { translateX: animX.current },
                    ],
                  }}
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
                      source={{
                        uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                      }}
                      style={{
                        width: width * 0.13,
                        height: width * 0.13,
                        //   backgroundColor: "#22F3",
                      }}
                      resizeMode="stretch"
                    />
                  </View>
                </Animated.View>
                {/* <Text>{item.uln_id}</Text>
                  <Text>{index}</Text> */}
                <Text
                  style={{
                    fontSize: RFPercentage(1.3),
                  }}
                >
                  {item.lnk_id == 31 ? item.uln_file_title : item.lnk_id == 32 ? item.uln_custom_link_name : item.lnk_name}
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
