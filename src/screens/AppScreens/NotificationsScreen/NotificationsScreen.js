import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Vibration,
  Modal,
} from "react-native";

import axios from "axios";
import * as SecureStore from "expo-secure-store";

import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { RFPercentage } from "react-native-responsive-fontsize";

import { Ionicons } from "@expo/vector-icons";

import PageHeader from "../../../components/PageHeader";

import { BASE_URL } from "../../../config";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useScrollToTop,
} from "@react-navigation/native";

import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import ModalWithButtons from "../../../components/ModalWithButtons/ModalWithButtons";
import CustomButton from "../../../components/CustomButton/CustomButton";

import moment from "moment";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const NotificationsButton = ({
  notificationConnectionName,
  notificationMessage,
  notificationUserImage,
  notificationType,
  notificationDate,
  notificationID,
  onNotificationPressed,
  onRemovePressed,
  onLongPress,
  onPress,
}) => (
  <View
    style={{
      flexDirection: "row",
      marginBottom: "0.5%",
      paddingVertical: "0.5%",
      // backgroundColor: "green",
    }}
  >
    <TouchableOpacity
      disabled={true}
      delayLongPress={250}
      onLongPress={onLongPress}
      onPress={onPress}
      style={{
        flex: 1,
        // backgroundColor: "#DEE0E2",
        // marginHorizontal: width * 0.02,
        marginLeft: width * 0.03,
        marginVertical: height * 0.005,
        height: height * 0.095,

        paddingHorizontal: width * 0.02,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "#f003",
          flex: 1,
        }}
      >
        <Image
          source={
            notificationUserImage
              ? {
                  uri: `${BASE_URL}images/mobile/photos/${notificationUserImage}`,
                  cache: true,
                }
              : {
                  uri: `${BASE_URL}images/profile/photos/default-profile.png`,
                  cache: true,
                }
          }
          style={{
            borderWidth: 0.1,
            borderRadius: 1000,
            borderColor: "#111111",
            height: RFPercentage(6.5),
            width: RFPercentage(6.5),
            marginRight: width * 0.035,
          }}
        />
        <View
          style={{
            // backgroundColor: "#00f5",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(2.1),
              color: "#562C73",
              paddingRight: width * 0.03,
              // lineHeight: RFPercentage(2.2),
            }}
          >
            {notificationType == 1 ? (
              <>
                <Text style={{ fontWeight: "bold" }}>
                  {notificationConnectionName}
                </Text>
                <Text> yeeted you.</Text>
              </>
            ) : notificationType == 2 ? (
              <>
                <Text>You yeeted </Text>
                <Text style={{ fontWeight: "bold" }}>
                  {notificationConnectionName}
                </Text>
              </>
            ) : notificationType == 3 ? (
              <>
                <Text style={{ fontWeight: "bold" }}>
                  {notificationConnectionName}
                </Text>
                <Text> added you as a connection.</Text>
              </>
            ) : notificationType == 4 ? (
              <>
                <Text>You added </Text>
                <Text style={{ fontWeight: "bold" }}>
                  {notificationConnectionName}
                </Text>
                <Text> as a connection.</Text>
              </>
            ) : notificationType == 5 ? (
              <>
                <Text>You removed </Text>
                <Text style={{ fontWeight: "bold" }}>
                  {notificationConnectionName}
                </Text>
                <Text> from your connections.</Text>
              </>
            ) : (
              <>
                <Text style={{ fontWeight: "bold" }}>
                  {notificationConnectionName}
                </Text>
                <Text> removed you from their connections.</Text>
              </>
            )}
          </Text>
          <Text style={{ fontSize: RFPercentage(1.5) }}>
            {" "}
            {moment(notificationDate).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={onRemovePressed}
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: width * 0.02,
        marginRight: width * 0.03,
        marginVertical: height * 0.003,
      }}
    >
      <Ionicons name="trash" size={RFPercentage(2.5)} color="#d81d4c" />
    </TouchableOpacity>
  </View>
);

export default function NotificationsScreen() {
  const {
    refreshing,
    setShowSuccessModal,
    showSuccessModal,
    modalHeader,
    modalMessage,
    setUserNotificationCount,
    userNotifications,
    setUserNotifications,
  } = useContext(AuthContext);

  const [refreshFlatList, setRefreshFlatList] = useState(false);

  const [connectionConnUUID, setConnectionConnUUID] = useState();
  const [connectionUUID, setConnectionUUID] = useState();
  const [notificationID, setNotificationID] = useState();
  const [notificationUserImage, setNotificationUserImage] = useState();
  const [notificationConnectionName, setNotificationConnectionName] =
    useState();
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationType, setNotificationType] = useState();
  const [connectionNotes, setConnectionNotes] = useState();

  // const [userNotifications, setUserNotifications] = useState([]);
  const [userNotificationsLoading, setUserNotificationsLoading] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const onRefresh = () => {
    getUserNotifications();
  };

  const navigation = useNavigation();
  const onConnectionPressed = () => {
    navigation.navigate("ViewConnectionScreen");
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setModalVisible(false);
  };

  const onRemovePressed = () => {
    removeNotification(notificationID);
    setRefreshFlatList(!refreshFlatList);
    setModalVisible(false);
  };

  useEffect(() => {
    console.log(userNotifications.length);
    if (userNotifications.length === 0) {
      getUserNotifications();
    }
    readNotifications();
    setUserNotificationCount(0);
  }, []);

  const getUserNotifications = async () => {
    setUserNotificationsLoading(true);
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    console.log(userUUID);

    await axios
      .get(`${BASE_URL}api/getNotifications/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        console.log(response.data);
        let userNotifications = response.data.userNotifications;
        setUserNotifications(userNotifications);
        setUserNotificationsLoading(false);
        console.log(userNotifications);
      })
      .catch((error) => {
        console.log(error.response);
        setUserNotificationsLoading(false);
      });
  };

  const readNotifications = async () => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/readNotifications/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserNotificationCount(0);
      })
      .catch((error) => {
        console.log(error);
        // setUserNotificationsLoading(false);
      });
  };

  const removeNotification = async (notificationID) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/removeNotification/${notificationID}/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        let userNotifications = response.data.userNotifications;
        setUserNotifications(userNotifications);
        // setUserNotificationsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setUserNotificationsLoading(false);
      });
  };

  const renderItem = ({ item }) => {
    const formattedTimestamp = moment(item.ntf_date_created).fromNow();
  };

  return (
    <View style={GlobalStyles.root}>
      {userNotificationsLoading == true ? <LoadingScreen /> : null}
      {/* SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showSuccessModal}
        onRequestClose={closeModal}
      >
        <ModalMessage
          modalHeader={modalHeader}
          modalMessage={modalMessage}
          onOKPressed={closeModal}
        />
      </Modal>

      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ModalWithButtons
          onCancelPressed={closeModal}
          modalHeaderText="Are you sure you want to remove this notification?"
          onRemovePressed={onRemovePressed}
          cancelText="Cancel"
          saveText="Remove"
        />
      </Modal>

      <View>
        <PageHeader
          headerText="Notifications"
          iconColor="#562C73"
          textColor="#562C73"
          display="none"
        />
      </View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        ref={ref}
        // overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        extraData={refreshFlatList}
        keyExtractor={(item) => item.ntf_id}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.5}
        // ListFooterComponent={
        //   !userNotificationsLoading ? (
        //     <View
        //       style={{
        //         width: "100%",
        //         // height: "50%",
        //         alignItems: "center",
        //       }}
        //     >
        //       <View style={{ width: "40%", paddingVertical: "5%" }}>
        //         <TouchableOpacity style={styles.loadMoreButton}>
        //           <Text style={styles.loadMoreText}>LOAD MORE</Text>
        //           <MaterialCommunityIcons
        //             name="reload"
        //             size={24}
        //             color={Colors.yeetPurple}
        //           />
        //         </TouchableOpacity>
        //       </View>
        //     </View>
        //   ) : null
        // }
        data={userNotificationsLoading == false ? userNotifications : null}
        renderItem={({ item }) => {
          return (
            <NotificationsButton
              notificationUserImage={item.usr_profile_photo_storage}
              notificationConnectionName={item.usr_name}
              notificationType={item.ntf_type}
              notificationDate={item.ntf_date_created}
              // notificationMessage={item.usr_bio}

              onRemovePressed={() => {
                setNotificationID(item.ntf_id);
                setModalVisible(true);
              }}
              onLongPress={() => {
                Vibration.vibrate(100);
                setNotificationID(item.ntf_id);
                setModalVisible(true);
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#000",
    // backgroundColor: "#DEE0E2",
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "#562C73",
  },

  icon: {
    paddingLeft: width * 0.03,
  },

  mainDrawerContainer: {
    width: "100%",
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.01,
    alignItems: "center",
    justifyContent: "center",
  },

  drawerImageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  drawerImage: {
    borderWidth: 0.1,
    borderRadius: 1000,
    borderColor: "#111111",
    height: RFPercentage(12),
    width: RFPercentage(12),
    marginBottom: height * 0.005,
  },

  drawerTextContainer: {
    width: "100%",
    // backgroundColor: "#F004",
    alignItems: "center",
  },

  drawerNameContainer: {
    width: "80%",
    // backgroundColor: "#0F04",
    alignItems: "center",
  },

  drawerNameText: {
    textAlign: "center",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    color: "#562C73",
  },

  drawerBioContainer: {
    width: "50%",
    // backgroundColor: "#00F4",
    alignItems: "center",
    justifyContent: "center",
  },

  drawerNotesContainer: {
    marginTop: "5%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  drawerBioText: {
    textAlign: "center",
    fontSize: RFPercentage(1.3),
    color: "#562C73",
  },

  drawerNotesText: {
    textAlign: "center",
    fontSize: RFPercentage(1.3),
    color: "#562C73",
    fontWeight: "bold",
  },

  drawerSeparator: {
    width: "90%",
    backgroundColor: "#948E8E",
    height: "0.5%",
    marginVertical: height * 0.015,
  },

  drawerButtonsContainer: {
    width: "100%",
    // backgroundColor: "#00F5",
    flexDirection: "row",
    height: "35%",
  },

  drawerButtonColumn: {
    height: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    marginHorizontal: "2%",
  },

  drawerButtonStyle: {
    backgroundColor: "Transparent",
    borderColor: "#562C73",
    borderWidth: 2,
    borderRadius: 1000,
    paddingVertical: height * 0.0075,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  drawerButtonText: {
    marginLeft: width * 0.04,
    fontSize: RFPercentage(1.5),
    fontWeight: "bold",
    color: "#D81D4C",
  },

  loadMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 1000,
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.013,
    borderWidth: 2,
    borderColor: Colors.yeetPurple,
  },
  loadMoreText: {
    color: Colors.yeetPurple,
    fontSize: RFPercentage(1.6),
    textAlign: "center",
    fontWeight: "bold",
    paddingRight: "5%",
  },
  separator: {
    height: 0.5,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
