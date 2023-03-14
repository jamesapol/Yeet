import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function CustomButton({
  onPress,
  bgColor,
  fgColor,
  borderColor,
  borderWidth,
  style,
  imgStyle,
  iconType,
  icon,
  btnText,
  source = null,
  buttonRef,
  disabled = false,
  justifyContent = "center",
  paddingHorizontal,
  paddingVertical,
  loading = false,
  loadingColor = "#FFF",
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      ref={buttonRef}
      onPress={onPress}
      style={[
        style,
        styles.buttonSize,
        bgColor ? { backgroundColor: bgColor } : {},
        borderWidth ? { borderWidth: 2 } : {},
        borderColor ? { borderColor: borderColor } : {},
        // justifyContent: justifyContent,
      ]}
    >
      <Image
      
        source={{ source, cache: true }}
        style={imgStyle}
        resizeMode="contain"
      />
      {loading == true ? (
        <ActivityIndicator color={loadingColor} size={RFPercentage(2.7)} />
      ) : (
        <Text style={[styles.text, fgColor ? { color: fgColor } : {}]}>
          {btnText}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSize: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 15,
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.01,
  },
  text: {
    fontSize: RFPercentage(2),
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: -0.5
  },
});
