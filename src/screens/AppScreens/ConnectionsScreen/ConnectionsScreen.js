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
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { BASE_URL } from "../../../config";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";
import { useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from "@react-navigation/native";

import RBSheet from "react-native-raw-bottom-sheet";
import ModalMultilineInput from "../../../components/ModalMultilineInput/ModalMultilineInput";
import ModalWithButtons from "../../../components/ModalWithButtons/ModalWithButtons";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import ModalMessage from "../../../components/ModalMessage/ModalMessage";
import CustomInput from "../../../components/CustomInput/CustomInput";
import LoadingResource from "../../../components/LoadingResource/LoadingResource";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const ConnectionsButton = ({
  connectionName,
  connectionBio,
  connectionNotes,
  connectionImage,
  connectionID,
  onOptionsPressed,
  onLongPress,
  onPress,
}) => (
  <View style={{ flexDirection: "row" }}>
    <TouchableOpacity
      delayLongPress={250}
      onLongPress={onLongPress}
      onPress={onPress}
      style={{
        flex: 1,
        // backgroundColor: "#DEE0E2",
        // marginHorizontal: width * 0.02,
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
          // backgroundColor: "#f003",
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
            // backgroundColor: "#00f5",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(2.5),
              fontWeight: "bold",
              color: Colors.yeetPurple,
            }}
          >
            {connectionName}
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(1.3),
              color: Colors.yeetPurple,
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
        // backgroundColor: "#562c7340",
        paddingHorizontal: width * 0.02,
        marginRight: width * 0.03,
        marginVertical: height * 0.003,
      }}
    >
      <Ionicons
        name="ellipsis-horizontal"
        size={RFPercentage(3)}
        color={Colors.yeetPink}
      />
    </TouchableOpacity>
  </View>
);

export default function ConnectionsScreen() {
  const {
    refreshing,
    leaveNote,
    reportConnection,
    deleteConnection,
    userConnections,
    blockConnection,
    showUserConnection,
    getUserConnections,
    userConnectionsLoading,
    setUserBlockStatus,
    userBlockStatus,
    isLoading,
    showInputModal,
    setShowInputModal,
    showSuccessModal,
    setShowSuccessModal,
    modalHeader,
    modalMessage,
    addProfileView,
    searchUserConnections,

    setUserNotFound,
  } = useContext(AuthContext);

  const [refreshFlatList, setRefreshFlatList] = useState(false);

  const [showLeaveNoteModal, setShowLeaveNoteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteContactModal, setShowDeleteContactModal] = useState(false);
  const [showBlockContactModal, setShowBlockContactModal] = useState(false);

  const [connectionConnUUID, setConnectionConnUUID] = useState();
  const [connectionUUID, setConnectionUUID] = useState();
  const [connectionImage, setConnectionImage] = useState();
  const [connectionName, setConnectionName] = useState();
  const [connectionBio, setConnectionBio] = useState();
  const [connectionNotes, setConnectionNotes] = useState();

  const [note, setNote] = useState();
  const [report, setReport] = useState();

  const [searchKey, setSearchKey] = useState("");
  useFocusEffect(
    React.useCallback(() => {
      return () => refRBSheet.current?.close();
    }, [])
  );

  const refRBSheet = useRef();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const onRefresh = () => {
    getUserConnections();
    // setRefreshing(true);
  };

  const navigation = useNavigation();
  const onConnectionPressed = () => {
    navigation.navigate("ViewConnectionScreen");
  };

  const onCancelPressed = () => {
    setShowLeaveNoteModal(false);
    setShowReportModal(false);
    setShowDeleteContactModal(false);
    setShowBlockContactModal(false);
  };

  const onSavePressed = () => {
    setShowInputModal(false);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const onLeaveNotePressed = () => {
    setNote(null);
    setShowLeaveNoteModal(false);
    leaveNote(note, connectionConnUUID);
    refRBSheet.current.close();
  };

  const onReportPressed = () => {
    setReport(null);
    setShowReportModal(false);
    reportConnection(report, connectionUUID);
    refRBSheet.current.close();
  };

  const onDeletePressed = () => {
    setShowDeleteContactModal(false);
    deleteConnection(connectionUUID);
    setRefreshFlatList(!refreshFlatList);
    refRBSheet.current.close();
  };

  const onBlockPressed = () => {
    setShowBlockContactModal(false);
    blockConnection(connectionConnUUID, connectionUUID);
    setRefreshFlatList(!refreshFlatList);
    refRBSheet.current.close();
  };

  const onAddConnectionPressed = () => {
    setUserNotFound(false);
    navigation.navigate("AddConnectionQRScreen");
  };

  // useEffect(() => {
  //   if (searchKey == "") {
  //     getUserConnections();
  //   }
  //   if (!searchKey.trim().length) {
  //     return;
  //   }
  //   searchUserConnections(searchKey);
  // }, [searchKey]);

  const onSearchPressed = () => {
    if (searchKey.trim().length > 0) {
      searchUserConnections(searchKey);
    } else {
      getUserConnections();
    }
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

      {/* LEAVE NOTE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showLeaveNoteModal}
        onRequestClose={onCancelPressed}
      >
        <ModalMultilineInput
          userImage={
            connectionImage
              ? { uri: `${BASE_URL}images/mobile/photos/${connectionImage}` }
              : {
                  uri: `${BASE_URL}images/profile/photos/default.png`,
                }
          }
          placeholder={connectionNotes}
          value={note}
          onChangeText={(text) => setNote(text)}
          userName={connectionName}
          onCancelPressed={onCancelPressed}
          onSavePressed={onLeaveNotePressed}
          textInputHeader="Notes"
          cancelText="Cancel"
          saveText="Save Note"
        />
      </Modal>

      {/* REPORT MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showReportModal}
        onRequestClose={onCancelPressed}
      >
        <ModalMultilineInput
          userImage={
            connectionImage
              ? { uri: `${BASE_URL}images/mobile/photos/${connectionImage}` }
              : {
                  uri: `${BASE_URL}images/profile/photos/default.png`,
                }
          }
          value={report}
          onChangeText={(text) => setReport(text)}
          userName={connectionName}
          onCancelPressed={onCancelPressed}
          onSavePressed={onReportPressed}
          textInputHeader="Report Details"
          placeholder="Indicate violation(s) here"
          cancelText="Cancel"
          saveText="Report"
        />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showDeleteContactModal}
        onRequestClose={onCancelPressed}
      >
        <ModalWithButtons
          onCancelPressed={onCancelPressed}
          modalHeaderText={connectionName}
          modalMessage="Are you sure you want to remove this contact?"
          modalImage={
            connectionImage
              ? { uri: `${BASE_URL}images/mobile/photos/${connectionImage}` }
              : {
                  uri: `${BASE_URL}images/profile/photos/default.png`,
                }
          }
          onRemovePressed={onDeletePressed}
          cancelText="Cancel"
          saveText="Delete"
        />
      </Modal>

      {/* BLOCK MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={showBlockContactModal}
        onRequestClose={onCancelPressed}
      >
        <ModalWithButtons
          onCancelPressed={onCancelPressed}
          modalHeaderText={connectionName}
          modalMessage="Are you sure you want to block this contact?"
          modalImage={
            connectionImage
              ? { uri: `${BASE_URL}images/mobile/photos/${connectionImage}` }
              : {
                  uri: `${BASE_URL}images/profile/photos/default.png`,
                }
          }
          onRemovePressed={onBlockPressed}
          cancelText="Cancel"
          saveText="Block"
        />
      </Modal>

      <PageHeader
        headerText="Connections"
        iconColor={Colors.yeetPurple}
        textColor={Colors.yeetPurple}
        display="none"
        iconType="MaterialCommunityIcons"
        pageActionIcon="qrcode-plus"
        pageActionColor={Colors.yeetPurple}
        pageActionVisible="flex"
        pageAction={onAddConnectionPressed}
      />

      <View style={styles.searchBarContainer}>
        <CustomInput
          placeholder="Search. . ."
          style={styles.searchBar}
          onChangeText={(text) => setSearchKey(text)}
          autoCapitalize
          autoFocus
        />
        <TouchableOpacity
          disabled={isLoading ? true : false}
          onPress={onSearchPressed}
          style={{
            width: "15%",
            height: "100%",
            backgroundColor: Colors.yeetPurple,
            // backgroundColor: "red",
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            // borderBottomEndRadius: 25,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // flex: 1
          }}
        >
          {/* <Text>Search </Text> */}
          <MaterialCommunityIcons
            // onPress={togglePasswordHidden}
            name="account-search"
            size={RFPercentage(3.4)}
            color={Colors.yeetGray}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={{ backgroundColor: "gray" }}></View> */}
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        ref={ref}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={isLoading ? <LoadingScreen /> : null}
        style={{ backgroundColor: "#fff" }}
        extraData={refreshFlatList}
        keyExtractor={(item) => item.con_id}
        // keyExtractor={(item, index) => index.toString()}
        data={userConnectionsLoading == false ? userConnections : null}
        renderItem={({ item }) => {
          return (
            <ConnectionsButton
              connectionImage={item.usr_profile_photo_storage}
              connectionName={item.usr_name}
              // connectionBio={item.usr_bio}
              connectionBio={item.usr_bio}
              onPress={() => {
                showUserConnection(item.usr_uuid);
                onConnectionPressed();
                console.log(item.con_id);
              }}
              onOptionsPressed={() => {
                setConnectionConnUUID(item.con_uuid);
                setConnectionUUID(item.usr_uuid);
                setConnectionImage(item.usr_profile_photo_storage);
                setConnectionName(item.usr_name);
                setConnectionBio(item.usr_bio);
                setConnectionNotes(item.con_notes);
                refRBSheet.current.open();
              }}
              onLongPress={() => {
                Vibration.vibrate(100);
                // console.log(item.con_uuid);
                setConnectionConnUUID(item.con_uuid);
                setConnectionUUID(item.usr_uuid);
                setConnectionImage(item.usr_profile_photo_storage);
                setConnectionName(item.usr_name);
                setConnectionBio(item.usr_bio);
                setConnectionNotes(item.con_notes);
                refRBSheet.current.open();
                console.log(item.con_id);
              }}
            />
          );
        }}
      />
      <RBSheet
        animationType="fade"
        height={height * 0.5}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: "#000",
            width: "25%",
          },
          container: {
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          },
        }}
      >
        <View style={styles.mainDrawerContainer}>
          <Image
            source={
              connectionImage
                ? {
                    uri: `${BASE_URL}images/mobile/photos/${connectionImage}`,
                  }
                : {
                    uri: `${BASE_URL}images/profile/photos/default.png`,
                  }
            }
            style={styles.drawerImage}
          />
          <View style={styles.drawerTextContainer}>
            <View style={styles.drawerNameContainer}>
              <Text style={styles.drawerNameText}>{connectionName}</Text>
            </View>
            <View style={styles.drawerBioContainer}>
              <Text style={styles.drawerBioText}>{connectionBio}</Text>
            </View>
            <View style={styles.drawerNotesContainer}>
              <Text style={styles.drawerNotesText}>{connectionNotes}</Text>
            </View>
          </View>
          <View style={styles.drawerSeparator} />
          <View style={styles.drawerButtonsContainer}>
            <View style={styles.drawerButtonColumn}>
              <TouchableOpacity
                style={styles.drawerButtonStyle}
                onPress={() => setShowLeaveNoteModal(true)}
              >
                <FontAwesome
                  name="pencil-square"
                  size={RFPercentage(3)}
                  color={Colors.yeetPurple}
                />
                <Text style={styles.drawerButtonText}>Leave a note</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerButtonStyle}
                onPress={() => setShowReportModal(true)}
              >
                <FontAwesome
                  name="flag"
                  size={RFPercentage(3)}
                  color={Colors.yeetPurple}
                />
                <Text style={styles.drawerButtonText}>Report Name</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerButtonColumn}>
              <TouchableOpacity
                style={styles.drawerButtonStyle}
                onPress={() => setShowDeleteContactModal(true)}
              >
                <FontAwesome
                  name="trash"
                  size={RFPercentage(3)}
                  color={Colors.yeetPurple}
                />
                <Text style={styles.drawerButtonText}>Delete Contact</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerButtonStyle}
                onPress={() => setShowBlockContactModal(true)}
              >
                <FontAwesome
                  name="user-times"
                  size={RFPercentage(3)}
                  color={Colors.yeetPurple}
                />
                <Text style={styles.drawerButtonText}>Block Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
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
    borderColor: Colors.yeetPurple,
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
    color: Colors.yeetPurple,
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
    color: Colors.yeetPurple,
  },

  drawerNotesText: {
    textAlign: "center",
    fontSize: RFPercentage(1.3),
    color: Colors.yeetPurple,
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
    borderColor: Colors.yeetPurple,
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
    color: Colors.yeetPink,
  },

  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#000",
    backgroundColor: "#DEE0E2",
    borderRadius: 30,

    paddingLeft: width * 0.03,
    // paddingVertical: height * 0.001,
    marginVertical: height * 0.008,
    marginHorizontal: width * 0.05,
    borderColor: Colors.yeetPurple,
    borderWidth: 2,
  },

  searchBar: {
    fontSize: RFPercentage(3),
    paddingHorizontal: width * 0.03,
    // backgroundColor: 'green',
  },
});
