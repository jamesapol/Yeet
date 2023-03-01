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

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { BASE_URL } from "../../../../../config";

import { Avatar } from "react-native-paper";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import PageHeader from "../../../../../components/PageHeader";
import { ButtonStyles, GlobalStyles } from "../../../../../styles/GlobalStyles";

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
                      }
                    : userInfo.usr_cover_photo_storage
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
                    previewProfilePhotoURI
                      ? {
                          uri: previewProfilePhotoURI,
                        }
                      : userInfo.usr_profile_photo_storage
                      ? {
                          uri: `${BASE_URL}images/mobile/photos/${userInfo.usr_profile_photo_storage}`,
                          cache: "reload",
                        }
                      : {
                          uri: `${BASE_URL}images/profile/photos/default-profile.png`,
                        }
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
                  marginLeft: index % 3 == 0 ? width * 0.15 : width * 0.025,
                  marginRight: index % 3 == 2 ? width * 0.15 : width * 0.025,
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
                style={{
                  borderRadius: item.lnk_id == 30 ? 20 : null,
                  width: width * 0.13,
                  height: width * 0.13,
                  // opacity:
                  //   userInfo.usr_direct_link_active == 1
                  //     ? userInfo.uln_id == item.uln_id
                  //       ? 1
                  //       : 0.3
                  //     : 1,
                }}
                resizeMode="stretch"
              />
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
