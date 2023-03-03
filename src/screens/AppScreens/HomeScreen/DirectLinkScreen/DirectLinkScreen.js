import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Switch,
  ComponentProvider,
  Modal,
} from "react-native";
import React, { useState } from "react";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { BASE_URL } from "../../../../config";

import CustomButton from "../../../../components/CustomButton/CustomButton";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import ModalMessage from "../../../../components/ModalMessage/ModalMessage";
import PageHeader from "../../../../components/PageHeader";
import LoadingScreen from "../../../../components/LoadingScreen/LoadingScreen";
import { Colors, GlobalStyles } from "../../../../styles/GlobalStyles";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function DirectLinkScreen() {
  const {
    userInfo,
    isLoading,
    editLink,
    userLinks,
    setDirectLink,
    setShowModal,
    showModal,

    userInfoLoading,
    userLinksLoading,

    userDirectLink,
    setUserDirectLink,
    userDirectLinkID,
    setUserDirectLinkID,
  } = useContext(AuthContext);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const [success, setSuccess] = useState(false);

  const [directLinkID, setDirectLinkID] = useState(userDirectLinkID);

  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const onLinkPressed = () => {
    setShowModal(true);
  };

  const onCancelPressed = () => {
    setShowModal(false);
    navigation.goBack();
  };

  const onSavePressed = () => {
    setDirectLink(directLinkID);
    setUserDirectLink(1);
    setUserDirectLinkID(directLinkID);
    setShowModal(true);
    // setSuccess(true);
  };

  const onDirectLinkPressed = () => {};

  return (
    <View style={GlobalStyles.root}>
      {/* SUCCESS MESSAGE MODAL */}

      {userInfoLoading == true ? <LoadingScreen /> : null}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showModal}
        // onRequestClose={onCancelPressed}
      >
        <ModalMessage
          modalHeader="Success"
          modalMessage="Direct Link saved successfully!"
          onOKPressed={onCancelPressed}
        />
      </Modal>

      {/* NEW LINK MODAL */}

      <FlatList
        ref={ref}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        numColumns={3}
        style={{ backgroundColor: "#fff" }}
        ListHeaderComponent={() => (
          <View style={styles.mainContainer}>
            <PageHeader
              headerText="Direct Link"
              onPress={onBackPressed}
              iconColor="#562C73"
              textColor="#562C73"
            />
            <View style={styles.textContainer}>
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsHeader}>What is Direct Link?</Text>
                <Text style={styles.tipsContent}>
                  Turning on Direct Link lets anyone who Yeets you be directed
                  to your selected link. Turning it off lets people view your
                  Yeet Profile.
                </Text>
                <Text style={styles.tipsFooter}>
                  Tap on any link below to set it as your Direct Link
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          userLinks.length != 0 ? (
            <View
              style={{
                width: "100%",
                paddingHorizontal: width * 0.25,
                paddingVertical: height * 0.05,
                // backgroundColor:'#FF3'
              }}
            >
              <CustomButton
                disabled={saveDisabled}
                bgColor="transparent"
                fgColor={saveDisabled == false ? Colors.yeetPurple : "#aaa"}
                btnText="Save"
                borderColor={saveDisabled == false ? Colors.yeetPurple : "#aaa"}
                borderWidth="2"
                onPress={onSavePressed}
              />
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                paddingVertical: height * 0.05,
                alignItems: "center",
                // backgroundColor: "#FF3",
              }}
            >
              <Text
                style={{
                  fontSize: RFPercentage(2.5),
                  color: Colors.yeetPurple,
                  marginVertical: height * 0.025,
                }}
              >
                You have no links yet.
              </Text>
            </View>
          )
        }
        extraData={refreshFlatList}
        keyExtractor={(item) => item.uln_id}
        data={userLinks}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              disabled={
                item.lnk_id === 23 || item.lnk_id === 24 || item.lnk_id === 26
                  ? true
                  : false
              }
              activeOpacity={0.3}
              style={[
                {
                  marginLeft: index % 3 == 0 ? width * 0.15 : width * 0.025,
                  marginRight: index % 3 == 2 ? width * 0.15 : width * 0.025,
                },
                styles.socialMediaButtons,
              ]}
              onPress={() => {
                if(item.lnk_id === 23) {
                  console.log("nope")
                }
                setDirectLinkID(item.uln_id);
                // setUserDirectLinkID(item.uln_id);
                setSaveDisabled(false);
                setRefreshFlatList(!refreshFlatList);
                console.log(item.lnk_id);

                // setRefreshFlatList(!refreshFlatList);
              }}
            >
              <Image
                source={
                  item.lnk_id == 30
                    ? { uri: item.uln_youtube_thumbnail }
                    : {
                        uri: `${BASE_URL}images/social-logo/${item.lnk_image}`,
                      }
                }
                style={{
                  borderRadius: item.lnk_id == 30 ? 20 : null,
                  width: width * 0.13,
                  height: width * 0.13,
                  opacity:
                    userDirectLink == 1
                      ? directLinkID == item.uln_id
                        ? 1
                        : 0.3
                      : userDirectLink == 0
                      ? directLinkID == item.uln_id
                        ? 1
                        : 0.3
                      : 1,
                }}
                resizeMode="stretch"
              />
              {/* <Text>{item.uln_id}</Text>
                        <Text>{item.lnk_id}</Text> */}
              <Text
                style={{
                  fontSize: RFPercentage(1.3),
                }}
              >
                {/* {item.lnk_id} */}
                {item.lnk_id == 30
                  ? item.uln_custom_link_name
                  : item.lnk_id == 31
                  ? item.uln_file_title
                  : item.lnk_id == 32
                  ? item.uln_custom_link_name
                  : item.lnk_name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: width * 1,
  },

  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    height: height * 0.2,
    // backgroundColor: "#0004",
  },

  tipsContainer: {
    alignItems: "center",
    width: "70%",
  },

  tipsHeader: {
    fontWeight: "900",
    fontSize: RFPercentage(3),
    marginBottom: "5%",
    textAlign: "center",
  },

  tipsContent: {
    textAlign: "center",
    fontSize: RFPercentage(1.5),
  },

  tipsFooter: {
    marginTop: height * 0.02,
    textAlign: "center",
    fontSize: RFPercentage(1.5),
  },

  socialMediaButtons: {
    marginVertical: height * 0.01,
    width: width * 0.2,
    height: width * 0.2,

    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
