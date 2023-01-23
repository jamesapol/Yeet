import { useState } from "react";
import { useContext } from "react";
import { Dimensions, StyleSheet, StatusBar } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AuthContext } from "../context/AuthContext";
import { themes } from "../../themes/themes";

var statusBarHeight = StatusBar.currentHeight;
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

var themePrimaryColor;
var themeSecondaryColor;
var themeTertiaryColor;
var themeQuaternaryColor;
var themePrimaryBG;
var themeSecondaryBG;
var themeBodyColor;

// global.testColor = 'green';

export const updateTheme = (themeBGColor) => {
  GlobalStyles.root.backgroundColor = themeBGColor;
}

export default function UserTheme() {
  const { getUserTheme, setUserTheme, userTheme } = useContext(AuthContext);

  const [primaryBG, setPrimaryBG] = useState("black");
  themePrimaryBG = primaryBG;
}

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

export let GlobalStyles = StyleSheet.create({
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
    width: "90%",
    alignItems: "center",
    marginBottom: height * 0.02,
  },

  userNameContainer: {
    marginTop: height * 0.025,
    // backgroundColor: "#00f3",
    // flex: 1,
  },

  userNameText: {
    fontSize: RFPercentage(3.7),
    marginBottom: "2.5%",
    fontWeight: "bold",
    textAlign: "center",
  },

  userBioContainer: {
    // backgroundColor: "#f2f3",
    width: "70%",
    flex: 1,
  },

  userBioText: {
    textAlign: "center",
    fontSize: RFPercentage(1.7),
  },
});

export const ButtonStyles = StyleSheet.create({
  buttons: {
    marginVertical: height * 0.006,
    backgroundColor: "#DEE0E2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderRadius: 50,
    paddingHorizontal: width * 0.01,
    // paddingVertical: height * 0.013,
  },

  buttonText: {
    color: "#562C73",

    fontSize: RFPercentage(1.5),
    textAlign: "center",
    fontWeight: "bold",
  },

  buttonImage: {
    // backgroundColor: "#ff04",
    borderRadius: 1000,
    height: RFPercentage(4.8),
    width: RFPercentage(4.8),
    marginRight: "1%",
  },

  socialMediaButtons: {
    // backgroundColor: '#00F4',
    marginVertical: height * 0.01,
    width: width * 0.2,
    height: width * 0.2,

    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export const Colors = StyleSheet.create({
  yeetPurple: "#562C73",
  yeetPink: "#D81D4C",
  yeetGray: "#DEE0E2",
  yeetBorderGray: "#948E8E",
  yeetBackgroundGray: "rgba(30,30,30,0.6)",
});

export const GlobalUserStyles = StyleSheet.create({});
