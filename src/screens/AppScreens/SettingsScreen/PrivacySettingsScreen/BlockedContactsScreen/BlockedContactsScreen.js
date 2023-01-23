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
import React, { useContext, useState } from "react";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { BASE_URL } from "../../../../../config";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../../../../context/AuthContext";
import { RFPercentage } from "react-native-responsive-fontsize";
import { GlobalStyles } from "../../../../../styles/GlobalStyles";

import PageHeader from "../../../../../components/PageHeader";
import LoadingScreen from "../../../../../components/LoadingScreen/LoadingScreen";
import ModalWithButtons from "../../../../../components/ModalWithButtons/ModalWithButtons";
import ModalMessage from "../../../../../components/ModalMessage/ModalMessage";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const ConnectionsButton = ({
  connectionName,
  connectionBio,
  connectionImage,
  onOptionsPressed,
  onPress,
}) => (
  <View style={{ flexDirection: "row" }}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        flex: 1,
        marginLeft: width * 0.03,
        marginVertical: height * 0.003,
        height: height * 0.075,

        paddingHorizontal: width * 0.03,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <Image
          source={
            connectionImage
              ? { uri: `${BASE_URL}images/mobile/photos/${connectionImage}` }
              : { uri: `${BASE_URL}images/profile/photos/default.png` }
          }
          style={{
            borderWidth: 0.1,
            borderRadius: 1000,
            borderColor: "#111111",
            height: RFPercentage(6),
            width: RFPercentage(6),
            marginRight: width * 0.035,
          }}
        />
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              fontWeight: "bold",
              color: "#562C73",
            }}
          >
            {connectionName}
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(1.3),
              color: "#562C73",
              paddingRight: width * 0.03,
            }}
          >
            {connectionBio}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={onOptionsPressed}
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: width * 0.02,
        marginRight: width * 0.03,
        marginVertical: height * 0.003,
      }}
    >
      <Ionicons
        name="remove-circle-sharp"
        size={RFPercentage(5)}
        color="#d81d4c"
      />
    </TouchableOpacity>
  </View>
);

export default function BlockedContactsScreen() {
  const {
    refreshing,
    unblockConnection,
    userBlockedConnections,
    showBlockedConnections,
    userConnectionsLoading,
    isLoading,
    showSuccessModal,
    setShowSuccessModal,
    modalHeader,
    modalMessage,
  } = useContext(AuthContext);

  const [refreshFlatList, setRefreshFlatList] = useState(false);

  const [blockID, setBlockID] = useState();
  const [connectionImage, setConnectionImage] = useState();
  const [connectionName, setConnectionName] = useState();
  const [unblockModalVisible, setUnblockModalVisible] = useState(false);

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const onRefresh = () => {
    showBlockedConnections();
  };

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.goBack();
  };

  const closeModal = () => {
    setUnblockModalVisible(false);
    setShowSuccessModal(false);
  };

  const onUnblockPressed = () => {
    setUnblockModalVisible(false);
    unblockConnection(blockID);
    setRefreshFlatList(!refreshFlatList);
  };

  return (
    <View style={GlobalStyles.root}>
      {userConnectionsLoading == true || isLoading == true ? (
        <LoadingScreen />
      ) : null}
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

      {/* BLOCK MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={unblockModalVisible}
        onRequestClose={closeModal}
      >
        <ModalWithButtons
          onCancelPressed={closeModal}
          modalHeaderText={connectionName}
          modalMessage="Are you sure you want to unblock this contact?"
          modalImage={
            connectionImage
              ? { uri: `${BASE_URL}images/mobile/photos/${connectionImage}` }
              : {
                  uri: `${BASE_URL}images/profile/photos/default.png`,
                }
          }
          onRemovePressed={onUnblockPressed}
          cancelText="Cancel"
          saveText="Unblock"
        />
      </Modal>
      <PageHeader
        headerText="Blocked Contacts"
        iconColor="#562C73"
        textColor="#562C73"
        onPress={onBackPressed}
      />

      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        ref={ref}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
        extraData={refreshFlatList}
        keyExtractor={(item) => item.usr_id.toString()}
        // keyExtractor={(item, index) => index.toString()}
        data={isLoading == false ? userBlockedConnections : null}
        renderItem={({ item }) => {
          return (
            <ConnectionsButton
              connectionImage={item.usr_profile_photo_storage}
              connectionName={item.usr_name}
              connectionBio={item.usr_bio}
              onOptionsPressed={() => {
                setConnectionImage(item.usr_profile_photo_storage);
                setConnectionName(item.usr_name);
                setBlockID(item.blk_id);
                setUnblockModalVisible(true);
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
  },

  drawerNameContainer: {
    width: "80%",
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
    alignItems: "center",
    justifyContent: "center",
  },

  drawerBioText: {
    textAlign: "center",
    fontSize: RFPercentage(1.3),
    color: "#562C73",
  },

  drawerSeparator: {
    width: "80%",
    backgroundColor: "#948E8E",
    height: "0.5%",
    marginVertical: height * 0.015,
  },

  drawerButtonsContainer: {
    width: "100%",
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
