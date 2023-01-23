import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
  } from "react-native";
  import React, { useContext } from "react";
  import PageHeader from "../../../../../components/PageHeader";
  import { useNavigation } from "@react-navigation/native";
  import { AuthContext } from "../../../../../context/AuthContext";
  
  import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
  import CustomButton from "../../../../../components/CustomButton/CustomButton";
import { GlobalStyles } from "../../../../../styles/GlobalStyles";
  
  var { width } = Dimensions.get("window");
  var { height } = Dimensions.get("window");
  
  export default function FAQScreen() {
    const { userInfo, isLoading, logout, userLinks } = useContext(AuthContext);
  
    const navigation = useNavigation();
    const onBackPressed = () => {
      navigation.goBack();
    };
  
    return (
      <ScrollView style={GlobalStyles.root}>
        <PageHeader
          headerText="Frequently Asked Questions"
          iconColor="#562C73"
          textColor="#562C73"
          onPress={onBackPressed}
        />
        <View style={styles.sectionContainer}>

          
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: '#FFF'
    },
  
    sectionContainer: {
      width: "100%",
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.013,
    },
  
    buttons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: height * 0.006,
      backgroundColor: "#DEE0E2",
      width: "100%",
      borderRadius: 1000,
      paddingHorizontal: width * 0.025,
      paddingVertical: height * 0.013,
    },
  
    buttonText: {
      color: "#562C73",
  
      fontSize: RFPercentage(1.5),
      textAlign: "center",
      fontWeight: "bold",
    },
  });
  