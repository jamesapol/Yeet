import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

import { useState } from "react";
import { BASE_URL } from "../../config";
import CustomButton from "../CustomButton/CustomButton";

import { Avatar, Switch } from "react-native-paper";
import DefaultCoverPhoto from "../../../assets/UXMaterials/defaults/default-cover.jpg";
import DefaultProfilePhoto from "../../../assets/UXMaterials/defaults/default-profile.png";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

import GlobalFonts from "../../styles/GlobalStyles";
import { loadFonts } from "../../styles/GlobalStyles";
import GlobalStyles from "../../styles/GlobalStyles";

export default function UserProfileComponents({
  userCoverPhoto,
  userProfilePhoto,
  userName,
  userBio,
  tempCoverPhoto = null,
  tempProfilePhoto = null,
  tempUserName = null,
  tempUserBio = null,
  userInfoLoading,
}) {
  return (
    <>
      {/* COVER PHOTO */}
      <View style={GlobalStyles.coverPhotoContainer}>
        {tempCoverPhoto ? (
          <Image
            source={{
              uri: tempCoverPhoto,
              cache: "force-cache",
            }}
            resizeMode="stretch"
            style={GlobalStyles.coverPhoto}
          />
        ) : (
          <Image
            source={
              !userCoverPhoto
                ? DefaultCoverPhoto
                : {
                    uri: `${BASE_URL}images/mobile/cover/${userCoverPhoto}`,
                    cache: "force-cache",
                  }
            }
            resizeMode="stretch"
            style={GlobalStyles.coverPhoto}
          />
        )}
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
                cache: "force-cache",
              }}
            />
          ) : (
            <Avatar.Image
              backgroundColor="#DEDEDE"
              size={RFPercentage(15)}
              source={
                !userProfilePhoto
                  ? DefaultProfilePhoto
                  : {
                      uri: `${BASE_URL}images/mobile/photos/${userProfilePhoto}`,
                      cache: "force-cache",
                    }
              }
            />
          )}
        </View>
      </View>

      <View style={GlobalStyles.userNameAndBioContainer}>
        <View style={GlobalStyles.userNameContainer}>
          <Text style={GlobalStyles.userNameText}>
            {tempUserName ? tempUserName : userName ? userName : null}
          </Text>
        </View>

        <View style={GlobalStyles.userBioContainer}>
          <Text style={GlobalStyles.userBioText}>
            {tempUserBio
              ? tempUserBio
              : userBio
              ? userBio
              : "You have no bio yet."}
          </Text>
        </View>
      </View>
    </>
  );
}
