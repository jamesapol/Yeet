import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Yeet from "../../../assets/UXMaterials/yeet-purple.png";

import { TouchableOpacity, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function SectionHeader({ sectionHeaderText, style }) {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.firstRow}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image source={Yeet} style={styles.yeetLogo} resizeMode="contain" />
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.sectionText}>{sectionHeaderText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    paddingVertical: height * 0.03,
    alignItems:'center'
    // backgroundColor: '#000',
  },

  firstRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  welcomeText: {
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    color: Colors.yeetPurple,
  },

  secondRow: {
    alignItems: "center",
    width: '50%',
  },

  yeetLogo: {
    // width: '50%'
    maxWidth: width * 0.18,
    height: height * 0.045,
  },

  sectionText: {
    fontSize: RFPercentage(1.6),
    color: Colors.yeetPurple,
    textAlign: "center",
  },
});
