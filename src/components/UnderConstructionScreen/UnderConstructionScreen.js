import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";

import { RFPercentage } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";

import hourGlass from '../../../assets/UXMaterials/hour-glass-loading.json'
import bar from '../../../assets/UXMaterials/bar-loading.json'
import circleDots from '../../../assets/UXMaterials/circle-dots-loading.json'
import dotsPurple from '../../../assets/UXMaterials/dots-purple-loading.json'

import underConstruction from '../../../assets/UXMaterials/under-construction-2.json';
import simpleLoading from '../../../assets/UXMaterials/simple-loading.json'

import yeetLogo from '../../../assets/UXMaterials/yeetLogo-white.png'
import yeetText from '../../../assets/UXMaterials/yeet-white.png'


var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const UnderConstructionScreen = ({visible}) => {
  return (
    <View style={styles.container}>
      {/* <Image source={yeetText} resizeMode="contain" style={styles.loadingImage}/> */}
      {/* <Text>Loading...</Text> */}
      <LottieView
        
        source={underConstruction}
        // source={require("../../../assets/UXMaterials/bar-loading.json")}
        autoPlay
        loop
        speed={2}
        style={styles.loadingAnimation}
      />
      <Text style={{fontSize: RFPercentage(3), textAlign:'center', fontWeight: 'bold'}}>Sorry, this page is still under construction.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems:'center',
    // backgroundColor:'rgba(0,0,0,0.3)',
    // backgroundColor: '#562C73',
    // backgroundColor:'transparent',
    zIndex: 1,
    flex: 1,
  },

  loadingAnimation: {
    justifyContent:'center',
    alignItems:'center',
    height: '65%',
    width: '100%',
    // backgroundColor:'#000'
  },

  loadingImage: {
    width: width * 0.5
  },

  loadingText: {

  }
});

export default UnderConstructionScreen;
