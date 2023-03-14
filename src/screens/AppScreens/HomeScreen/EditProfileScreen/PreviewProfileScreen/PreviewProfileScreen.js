import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";


import DefaultCoverPhoto from "../../../../../../assets/UXMaterials/defaults/default-cover.jpg";
import DefaultProfilePhoto from "../../../../../../assets/UXMaterials/defaults/default-profile.png";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { BASE_URL } from "../../../../../config";

import { Avatar } from "react-native-paper";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import PageHeader from "../../../../../components/PageHeader";
import {
  ButtonStyles,
  Colors,
  GlobalStyles,
  socialMediaButtonImages,
} from "../../../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function HomeScreen({ route }) {
  const {
    userInfo,
    isLoading,
    userLinks,
    // previewName,
    // previewBio,
    // previewProfilePhotoURI,
    // previewCoverPhotoURI,
  } = useContext(AuthContext);

  const {
    previewCoverPhotoURI,
    previewProfilePhotoURI,
    previewName,
    previewBio,
  } = route.params;

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={GlobalStyles.root}>
      <PageHeader headerText="Profile Preview" onPress={onBackPressed} />
      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        numColumns={3}
        style={{ backgroundColor: "#fff" }}
        ListHeaderComponent={() => (
          <View style={styles.mainContainer}>
            {/* <PageHeader headerText="Profile Preview" onPress={onBackPressed} /> */}
            <View style={GlobalStyles.coverPhotoContainer}>
              <Image
                source={
                  previewCoverPhotoURI
                    ? {
                        uri: previewCoverPhotoURI,
                        cache: "force-cache"
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
            </View>
            {/* PROFILE PHOTO */}
            <View style={GlobalStyles.profilePhotoContainer}>
              <View style={GlobalStyles.profilePhoto}>
                <Avatar.Image
                  backgroundColor="#DEDEDE"
                  size={RFPercentage(15)}
                  source={
                    previewProfilePhotoURI
                      ? {
                          uri: previewProfilePhotoURI,
                        }
                      : userInfo.usr_profile_photo_storage
                      ? {
                          uri: `${BASE_URL}images/mobile/photos/${userInfo.usr_profile_photo_storage}`,
                          cache: true,
                        }
                      : DefaultProfilePhoto
                  }
                />
              </View>
            </View>

            <View style={GlobalStyles.userNameAndBioContainer}>
              <View style={GlobalStyles.userNameContainer}>
                <Text style={GlobalStyles.userNameText}>
                  {previewName ? previewName : userInfo.usr_name}
                </Text>
              </View>

              <View style={GlobalStyles.userBioContainer}>
                <Text style={GlobalStyles.userBioText}>
                  {previewBio ? previewBio : userInfo.usr_bio}
                </Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.uln_id}
        data={[...userLinks, { addLinks: true }]}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={[
                {
                  marginLeft: index % 3 == 0 ? width * 0.05 : 0,
                  marginRight: index % 3 == 2 ? width * 0.05 : 0,
                },
                ButtonStyles.socialMediaButtons,
              ]}
              disabled={true}
            >
              <Image
                source={
                  item.lnk_id == 30
                    ? { uri: item.uln_youtube_thumbnail }
                    : {
                        uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                      }
                }
                style={socialMediaButtonImages(item.lnk_id)}
                resizeMode="stretch"
              />
              <Text
                style={ButtonStyles.socialMediaButtonText}
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
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: width,
  },
});
