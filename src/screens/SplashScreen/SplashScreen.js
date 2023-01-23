import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import React from "react";

import { RFPercentage } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";

import BG from '../../../assets/UXMaterials/gradientBG.jpg'

import hourGlass from "../../../assets/UXMaterials/hour-glass-loading.json";
import bar from "../../../assets/UXMaterials/bar-loading.json";
import circleDots from "../../../assets/UXMaterials/circle-dots-loading.json";
import dotsPurple from "../../../assets/UXMaterials/dots-purple-loading.json";

import yeetLogo from "../../../assets/UXMaterials/yeetLogo-white.png";
import yeetText from "../../../assets/UXMaterials/yeet-white.png";
import splashScreen from '../../../assets/UXMaterials/splashScreen.png'
import splashScreenWithText from '../../../assets/UXMaterials/splashScreenWithText-2.png'

import whiteBG from '../../../assets/UXMaterials/backgrounds/white-with-text.png'
import purpleBG from '../../../assets/UXMaterials/backgrounds/purple-with-text.png'

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");
export default function SplashScreen() {
  return (
    // <View style={styles.root}>
    //   <ActivityIndicator size="large" color="#562C73" />
    // </View>
    <View style={styles.root}>
      <ImageBackground source={whiteBG} style={[StyleSheet.absoluteFillObject, styles.container]}>

        {/* <Image
          source={yeetText}
          resizeMode="contain"
          style={styles.loadingImage}
        /> */}
        {/* <Text>Loading...</Text> */}
        {/* <LottieView
          source={hourGlass}
          // source={require("../../../assets/UXMaterials/bar-loading.json")}
          autoPlay
          loop
          speed={4.5}
          style={styles.loadingAnimation}
        /> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "rgba(0,0,0,0.3)",
    // zIndex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.3)",
    // backgroundColor:'transparent',
    zIndex: 1,
  },

  loadingImage: {
    width: width * 0.5
  },

  loadingAnimation: {
    height: height * 0.15,
  },
});
