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
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { RFPercentage } from "react-native-responsive-fontsize";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

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

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const NotificationsButton = ({
  notificationConnectionName,
  notificationMessage,
  notificationUserImage,
  notificationType,
  notificationRead = 0,
  notificationID,
  onNotificationPressed,
  onRemovePressed,
  onLongPress,
  onPress,
}) => (
  <View
    style={{
      flexDirection: "row",
      backgroundColor: notificationRead == 0 ? Colors.yeetGray : "white",
      marginBottom: "0.5%",
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
                }
              : { uri: `${BASE_URL}images/profile/photos/default.png` }
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
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={onRemovePressed}
      style={{
        alignItems: "center",
        justifyContent:'center',
        // justifyContent: "center",
        // backgroundColor: "#562c7340",
        // paddingTop: height * 0.02,
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
    userConnections,

    getUserNotifications,
    openNotification,
    userNotifications,
    setUserNotifications,
    userNotificationsLoading,
    setUserNotificationsLoading,
    showUserConnection,
    getUserConnections,
    userConnectionsLoading,
    isLoading,
    showInputModal,
    setShowInputModal,
    showSuccessModal,
    setShowSuccessModal,
    modalHeader,
    modalMessage,
    removeNotification,
    readNotification,
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

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    return () => {
      readNotification();
    };
  }, []);

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
          // modalMessage="Are you sure you want to remove this notification?"
          // modalImage={{ uri: `${BASE_URL}images/social-logo/${linkImage}` }}
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
          // pageActionIcon="sort"
          // pageActionVisible="flex"
        />
      </View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        ref={ref}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        extraData={refreshFlatList}
        keyExtractor={(item) => item.ntf_id}
        data={userNotificationsLoading == false ? userNotifications : null}
        renderItem={({ item }) => {
          return (
            <NotificationsButton
              notificationUserImage={item.usr_profile_photo_storage}
              notificationConnectionName={item.usr_name}
              notificationRead={item.ntf_read}
              notificationType={item.ntf_type}
              // notificationMessage={item.usr_bio}

              onPress={() => {
                openNotification(item.ntf_uuid_connection);
                readNotification(item.ntf_id);
                onConnectionPressed();
              }}
              onRemovePressed={() => {
                setNotificationID(item.ntf_id);
                setModalVisible(true);
              }}
              onOptionsPressed={() => {
                setConnectionConnUUID(item.con_uuid);
                setConnectionUUID(item.usr_uuid);
                setNotificationUserImage(item.usr_profile_photo_storage);
                setNotificationConnectionName(item.usr_name);
                setNotificationMessage(item.usr_bio);
                setConnectionNotes(item.con_notes);
              }}
              onLongPress={() => {
                Vibration.vibrate(100);
                console.log(item.con_uuid);
                setConnectionConnUUID(item.con_uuid);
                setConnectionUUID(item.usr_uuid);
                setNotificationUserImage(item.usr_profile_photo_storage);
                setNotificationConnectionName(item.usr_name);
                setNotificationMessage(item.usr_bio);
                setConnectionNotes(item.con_notes);
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
});
