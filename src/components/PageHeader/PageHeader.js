import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Dimensions } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/GlobalStyles";
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function PageHeader({
  headerText,
  onPress,
  display = "flex",
  textColor,
  pageActionColor,
  pageActionVisible = "none",
  pageActionDisabled,
  iconType,
  pageActionIcon,
  pageAction,
  style,
}) {
  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.root, { style }]}>
      <TouchableOpacity
        style={[styles.icon, { display: display }]}
        onPress={onPress}
      >
        <FontAwesome5
          name="arrow-left"
          size={RFPercentage(2.5)}
          color={Colors.yeetPurple}
        />
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: Colors.yeetPurple }]}>
        {headerText}
      </Text>
      <TouchableOpacity
        disabled={pageActionDisabled}
        style={[styles.pageActionIcon, { display: pageActionVisible }]}
        onPress={pageAction}
      >
        {iconType == "FontAwesome5" && (
          <FontAwesome5
            name={pageActionIcon}
            size={RFPercentage(2.5)}
            color={pageActionColor}
          />
        )}
        {iconType == "MaterialCommunityIcons" && (
          <MaterialCommunityIcons
            name={pageActionIcon}
            size={RFPercentage(2.5)}
            color={pageActionColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.013,
    
  },

  icon: {
    position: "absolute",
    left: width * 0.03,
    padding: RFPercentage(1),
    // backgroundColor:'blue'
    // left: '3%',
  },

  headerText: {
    fontWeight: "700",
    fontSize: RFPercentage(2),
  },

  pageActionIcon: {
    position: "absolute",
    right: width * 0.03,
    padding: RFPercentage(1),
    // backgroundColor:'blue'
  },
});
