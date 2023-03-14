import { useState } from "react";
import { useContext } from "react";
import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AuthContext } from "../context/AuthContext";
import { themes } from "../../themes/themes";

var statusBarHeight = StatusBar.currentHeight;
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");


export const AuthStyles = StyleSheet.create({
  root: {
    flex: 1,
  },

  sectionContainer: {
    width: "100%",
    paddingHorizontal: width * 0.05,
  },

  imageContainer: {
    alignItems: "center",
    // marginBottom: height * 0.035,
    // backgroundColor: '#0f04'
  },

  image: {
    width: RFPercentage(30),
    height: RFPercentage(30),
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: "#562C73",
    backgroundColor: "#d9d9d9",
  },
});

export const GlobalStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: statusBarHeight + height * 0.01,
  },

  mainContainer: {
    width: "100%",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.013,
  },

  coverPhotoContainer: {
    height: width * 0.56503,
    backgroundColor: "#aaa",
    borderBottomColor: "#aaa",
    borderBottomWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  coverPhoto: {
    backgroundColor: "#DEDEDE",
    width: "100%",
    height: width * 0.565,
  },

  profilePhotoContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: RFPercentage(7.54),
    width: "100%",
    // backgroundColor: "#0f44",
  },

  profilePhoto: {
    borderWidth: 3,
    borderColor: "#aaa",
    borderRadius: 10000,
    width: RFPercentage(15.3),
    height: RFPercentage(15.3),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },

  userNameAndBioContainer: {
    // backgroundColor: "#F004",
    // paddingTop: "2%",
    width: "90%",
    alignItems: "center",
    marginBottom: '3%',
  },

  userNameContainer: {
    // marginTop: height * 0.025,
    // backgroundColor: "#00f3",
    width: "100%",
    // flex: 1,
  },

  userNameText: {
    // color: "#562C73",
    fontSize: RFPercentage(3.75),
    marginBottom: "2.5%",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  userBioContainer: {
    // backgroundColor: "#f2f3",
    width: "100%",
    flex: 1,
  },

  userBioText: {
    // color: "#562C73",
    textAlign: "center",
    fontSize: RFPercentage(1.75),
    fontWeight: "500",
    letterSpacing: -0.5,
  },
});

export const ButtonStyles = StyleSheet.create({
  buttons: {
    marginVertical: RFPercentage(0.7),
    paddingHorizontal: RFPercentage(1),
    paddingVertical: RFPercentage(0.5),
    backgroundColor: "#DEE0E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 15,
    // paddingVertical: height * 0.013,
  },

  buttonText: {
    color: "#562C73",

    fontSize: RFPercentage(2),
    textAlign: "center",
    fontWeight: "bold",
  },

  buttonImage: {
    // backgroundColor: "#ff04",
    borderRadius: 1000,
    height: RFPercentage(5.3),
    width: RFPercentage(5.3),
    marginRight: width * 0.01,
  },

  socialMediaButtons: {
    // backgroundColor: '#00F4',
    marginVertical: height * 0.005,
    // flex: 1,
    width: width * 0.3,
    height: width * 0.25,

    alignItems: "center",
    justifyContent: "flex-start",
  },
  socialMediaButtonImage: {},
  socialMediaButtonText: {
    marginTop: "3%",
    textAlign: "center",
    fontSize: RFPercentage(2),
    letterSpacing: -0.5,
  },
});

export const Colors = StyleSheet.create({
  yeetPurple: "#562C73",
  yeetPink: "#D81D4C",
  yeetGray: "#DEE0E2",
  yeetBorderGray: "#948E8E",
  yeetBackgroundGray: "rgba(30,30,30,0.6)",
});

export const socialMediaButtonImages = (linkID) => ({
  borderRadius:
    linkID == 8 ||
    linkID == 16 ||
    linkID == 22 ||
    linkID == 24 ||
    linkID == 25 ||
    linkID == 31 ||
    linkID == 32
      ? 5000
      : linkID == 30
      ? 20
      : null,
  borderWidth:
    linkID == 8 ||
    linkID == 16 ||
    linkID == 22 ||
    linkID == 24 ||
    linkID == 25 ||
    linkID == 31 ||
    linkID == 32
      ? 2
      : 0,
  borderColor: Colors.yeetGray,
  width: linkID == 30 ? width * 0.165 : width * 0.13,
  height: width * 0.13,
});


export default GlobalStyles;

// export const GlobalUserStyles = StyleSheet.create({});
