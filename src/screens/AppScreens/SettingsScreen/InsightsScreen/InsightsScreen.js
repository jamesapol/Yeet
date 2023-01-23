import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Switch,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../../../../components/CustomButton/CustomButton";

import upIcon from "../../../../../assets/UXMaterials/icons/flatIcons/redIcons/up.png";
import downIcon from "../../../../../assets/UXMaterials/icons/flatIcons/redIcons/down.png";
import facebookIcon from "../../../../../assets/UXMaterials/socialMediaIcons/facebook.png";
import instagramIcon from "../../../../../assets/UXMaterials/socialMediaIcons/instagram.png";
import twitterIcon from "../../../../../assets/UXMaterials/socialMediaIcons/twitter.png";
import embedVideoIcon from "../../../../../assets/UXMaterials/icons/video.png";
import embedFileIcon from "../../../../../assets/UXMaterials/icons/file.png";
import UnderConstructionScreen from "../../../../components/UnderConstructionScreen/UnderConstructionScreen";
import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import { BASE_URL } from "../../../../config";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function InsightsScreen() {
  const {
    refreshing,
    userProfileTaps,
    userLinksInsights,
    totalUserLinkTaps,
    totalUserConnections,
    setTotalUserConnections,
    insightsLoading,
    setInsightsLoading,
    getInsights,
    totalProfileViews,
    setTotalProfileViews
  } = useContext(AuthContext);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const onRefresh = () => {
    getInsights();
  }
  
  return (
    <View style={GlobalStyles.root}>
      <PageHeader
        headerText="Insights"
        iconColor={Colors.yeetPurple}
        textColor={Colors.yeetPurple}
        onPress={onBackPressed}
      />
      {insightsLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          
          // ref={ref}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "#fff",
            paddingBottom: "15%",
            paddingHorizontal: width * 0.05,
          }}
          ListHeaderComponent={() => (
            <View style={styles.mainContainer}>
              <View style={styles.headerButtons}>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.squareButtons}>
                    <Text style={styles.buttonText}>Profile Taps</Text>
                    <Text style={styles.squareButtonText}>
                      {userProfileTaps}
                    </Text>
                    {/* <Image style={styles.squareButtonImage} source={upIcon} /> */}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.squareButtons}>
                    <Text style={styles.buttonText}>Link Taps</Text>
                    <Text style={styles.squareButtonText}>
                      {totalUserLinkTaps}
                    </Text>
                    {/* <Image style={styles.squareButtonImage} source={downIcon} /> */}
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <TouchableOpacity style={styles.squareButtons}>
                    <Text style={styles.buttonText}>Profile Views</Text>
                    <Text style={styles.squareButtonText}>
                      {totalProfileViews}
                    </Text>
                    {/* <Image style={styles.squareButtonImage} source={upIcon} /> */}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.squareButtons}>
                    <Text style={styles.buttonText}>Connections</Text>
                    <Text style={styles.squareButtonText}>
                      {totalUserConnections}
                    </Text>
                    {/* <Image style={styles.squareButtonImage} source={downIcon} /> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          // keyExtractor={(item) => item.lnk_id}
          // keyExtractor={(item, index) => index.toString()}
          data={insightsLoading == false ? userLinksInsights : null}
          renderItem={({ item, index }) => {
            if (insightsLoading == false) {
              return (
                <TouchableOpacity style={styles.buttons}>
                  <View style={styles.socialMediaContainer}>
                    <Image
                      style={styles.socialMediaImage}
                      source={
                        item.lnk_image
                          ? {
                              uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                            }
                          : null
                      }
                    />
                    <View style={styles.socialMediaTextContainer}>
                      <Text style={styles.socialMediaText}>
                        {item.lnk_id == 31
                          ? item.uln_file_title
                          : item.lnk_id == 32
                          ? item.uln_custom_link_name
                          : item.lnk_name}
                      </Text>
                      <Text style={styles.socialMediaLinkText}>
                        {item.lnk_id == 31
                          ? item.uln_original_file_name
                          : item.uln_url}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: "10%", alignItems: "center" }}>
                    <Text style={styles.socialMediaTapsText}>{!item.ltp_count ? 0 : item.ltp_count}</Text>
                    <Text style={styles.buttonText}>{item.ltp_count > 1 || !item.ltp_count ? 'Taps' : 'Tap'}</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  sectionContainer: {
    width: "100%",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.013,
  },

  headerButtons: {
    marginBottom: height * 0.005,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'red'
  },

  squareButtons: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#DEE0E2",
    width: width * 0.44,
    height: width * 0.44,
    borderRadius: 25,

    // paddingHorizontal: width * 0.025,
    paddingTop: height * 0.015,
    marginVertical: height * 0.006,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: height * 0.006,
    // paddingVertical: height * 0.04,
    backgroundColor: "#DEE0E2",
    height: height * 0.075,
    width: "100%",
    borderRadius: 25,
    paddingHorizontal: width * 0.05,
    alignItems: "center",
  },

  buttonText: {
    color: "#562C73",

    fontSize: RFPercentage(2),
    textAlign: "center",
    fontWeight: "bold",
    height: "30%",
  },

  squareButtonText: {
    color: "#D81D4C",

    height: "70%",
    fontSize: RFPercentage(6),
    textAlign: "center",
    fontWeight: "bold",
  },

  squareButtonImage: {
    // backgroundColor: "#ff04",
    height: RFPercentage(15),
    width: RFPercentage(15),
  },

  footerButtons: {
    marginTop: height * 0.05,
  },

  socialMediaContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    // justifyContent:'space-',
    // backgroundColor: 'red'
  },

  socialMediaImage: {
    // backgroundColor: "#ff04",
    // borderRadius: 1000,
    height: RFPercentage(5),
    width: RFPercentage(5),
    marginRight: '4%',
    fleX: 1,
  },
   
  socialMediaTextContainer: {
    flex: 1,
    marginRight: '4%'
  },

  socialMediaText: {
    color: "#562C73",
    fontWeight: "900",
    fontSize: RFPercentage(2),
  },

  socialMediaLinkText: {
    color: "#D81D4C",
    // maxWidth: '100%',
    fontWeight: "400",
    fontSize: RFPercentage(1.3),
    // backgroundColor: 'green'
  },

  socialMediaTapsText: {
    color: "#D81D4C",
    fontWeight: "900",
    fontSize: RFPercentage(3),
  },
});


    // <ScrollView
    //   style={GlobalStyles.root}
    //   contentContainerStyle={{ flexGrow: 1 }}
    //   showsVerticalScrollIndicator={false}
    // >
    //   <PageHeader
    //     headerText="Insights"
    //     iconColor="#562C73"
    //     textColor="#562C73"
    //     onPress={onBackPressed}
    //   />
    //   {/* <UnderConstructionScreen /> */}
    //   <View style={styles.sectionContainer}>
    //     <View style={styles.headerButtons}>
    //       <View style={styles.row}>
    //         <TouchableOpacity style={styles.squareButtons}>
    //           <Text style={styles.buttonText}>Taps</Text>
    //           <Text style={styles.squareButtonText}>8</Text>
    //           <Image style={styles.squareButtonImage} source={upIcon} />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.squareButtons}>
    //           <Text style={styles.buttonText}>Link Taps</Text>
    //           <Text style={styles.squareButtonText}>2</Text>
    //           <Image style={styles.squareButtonImage} source={downIcon} />
    //         </TouchableOpacity>
    //       </View>

    //       <View style={styles.row}>
    //         <TouchableOpacity style={styles.squareButtons}>
    //           <Text style={styles.buttonText}>Profile Views</Text>
    //           <Text style={styles.squareButtonText}>8</Text>
    //           <Image style={styles.squareButtonImage} source={upIcon} />
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.squareButtons}>
    //           <Text style={styles.buttonText}>Connections</Text>
    //           <Text style={styles.squareButtonText}>5</Text>
    //           <Image style={styles.squareButtonImage} source={downIcon} />
    //         </TouchableOpacity>
    //       </View>
    //     </View>

    //     <View style={styles.footerButtons}>
    //       <TouchableOpacity style={styles.buttons}>
    //         <View style={styles.socialMediaContainer}>
    //           <Image style={styles.socialMediaImage} source={facebookIcon} />
    //           <View>
    //             <Text style={styles.socialMediaText}>Facebook</Text>
    //             <Text style={styles.socialMediaLinkText}>
    //               www.facebook.com/apol.james.79
    //             </Text>
    //           </View>
    //         </View>
    //         <View style={{ alignItems: "center" }}>
    //           <Text style={styles.socialMediaTapsText}>8</Text>
    //           <Text style={styles.buttonText}>Taps</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.buttons}>
    //         <View style={styles.socialMediaContainer}>
    //           <Image style={styles.socialMediaImage} source={instagramIcon} />
    //           <View>
    //             <Text style={styles.socialMediaText}>Instagram</Text>
    //             <Text style={styles.socialMediaLinkText}>@jamesapolz</Text>
    //           </View>
    //         </View>
    //         <View style={{ alignItems: "center" }}>
    //           <Text style={styles.socialMediaTapsText}>1</Text>
    //           <Text style={styles.buttonText}>Taps</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.buttons}>
    //         <View style={styles.socialMediaContainer}>
    //           <Image style={styles.socialMediaImage} source={twitterIcon} />
    //           <View>
    //             <Text style={styles.socialMediaText}>Twitter</Text>
    //             <Text style={styles.socialMediaLinkText}>@apolz</Text>
    //           </View>
    //         </View>
    //         <View style={{ alignItems: "center" }}>
    //           <Text style={styles.socialMediaTapsText}>2</Text>
    //           <Text style={styles.buttonText}>Taps</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.buttons}>
    //         <View style={styles.socialMediaContainer}>
    //           <Image style={styles.socialMediaImage} source={embedVideoIcon} />
    //           <View>
    //             <Text style={styles.socialMediaText}>Embedded Video</Text>
    //             <Text style={styles.socialMediaLinkText}>
    //               https://www.youtube.com/watch?v=WNcsUNKlAKw&ab
    //             </Text>
    //           </View>
    //         </View>
    //         <View style={{ alignItems: "center" }}>
    //           <Text style={styles.socialMediaTapsText}>3</Text>
    //           <Text style={styles.buttonText}>Taps</Text>
    //         </View>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.buttons}>
    //         <View style={styles.socialMediaContainer}>
    //           <Image style={styles.socialMediaImage} source={embedFileIcon} />
    //           <View>
    //             <Text style={styles.socialMediaText}>Embedded File</Text>
    //             <Text style={styles.socialMediaLinkText}>Laravel Files</Text>
    //           </View>
    //         </View>
    //         <View style={{ alignItems: "center" }}>
    //           <Text style={styles.socialMediaTapsText}>4</Text>
    //           <Text style={styles.buttonText}>Taps</Text>
    //         </View>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </ScrollView>
