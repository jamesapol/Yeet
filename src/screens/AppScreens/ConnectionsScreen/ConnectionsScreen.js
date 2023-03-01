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
  Linking,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { RFPercentage } from "react-native-responsive-fontsize";

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../../../config";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import PageHeader from "../../../components/PageHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
import noConnections from "../../../../assets/UXMaterials/placeholders/no-connections.png";

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
              : { uri: `${BASE_URL}images/profile/photos/default-profile.png` }
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
    userConnections,
    setUserConnections,
    setUserBlockStatus,
    setIsLoading,
    setShowInputModal,
    modalHeader,
    modalMessage,
    addProfileView,
    setUserConnectionData,
    setUserConnectionLinks,
    setUserConnectionStatus,
    userConnectionsLoading,
    setUserConnectionsLoading,
    setUserNotFound,
    connectionsScreenModalVisible,
    setConnectionsScreenModalVisible,
    setModalHeader,
    setModalMessage,
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

  const [searchResults, setSearchResults] = useState(null);
  const [resultsEmpty, setResultsEmpty] = useState(false);

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
    setConnectionsScreenModalVisible(false);
  };

  const onLeaveNotePressed = () => {
    console.log(note);
    leaveNote(note, connectionConnUUID);
    setNote(null);
    setShowLeaveNoteModal(false);

    setConnectionsScreenModalVisible(true);
    setModalHeader("Note Saved");
    setModalMessage("Note saved successfully.");

    refRBSheet.current.close();
  };

  const onReportPressed = () => {
    console.log(report);
    reportConnection(report, connectionUUID);
    setReport(null);
    setShowReportModal(false);

    setConnectionsScreenModalVisible(true);
    setModalHeader("Connection Reported");
    setModalMessage(`Successfully reported ${connectionName}.`);

    refRBSheet.current.close();
  };

  const onDeletePressed = () => {
    deleteConnection(connectionUUID);
    setRefreshFlatList(!refreshFlatList);
    setShowDeleteContactModal(false);

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

  const onClearPressed = () => {
    setSearchKey();
    setSearchResults(null);
    setResultsEmpty(false);
  };

  /**
   * ------------------------------
   * CONNECTION SCREEN API CALLS
   * ------------------------------
   */
  const searchUserConnections = async (searchKey) => {
    setUserConnectionsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/searchConnections/${userUUID}/${searchKey}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let userConnections = response.data.connections;
        setSearchResults(userConnections);
        if (userConnections.length === 0) {
          setResultsEmpty(true);
        } else {
          setResultsEmpty(false);
        }

        setUserConnectionsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setUserConnectionsLoading(false);
      });
  };

  const getUserConnections = async () => {
    setUserConnectionsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getConnections/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        setUserNotFound(false);
        let userConnections = response.data.connections;
        setUserConnections(userConnections);
        console.log(userConnections);
        setUserConnectionsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setUserConnectionsLoading(false);
      });
  };

  const leaveNote = async (note, connectionConnUUID) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/leaveNote/${connectionConnUUID}`,
        {
          note: note,
          userUUID: userUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let userConnections = response.data.userConnections;
        console.log(userConnections);
        setUserConnections(userConnections);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const reportConnection = async (report, connectionUUID) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/reportConnection/${connectionUUID}`,
        {
          report: report,
          userUUID: userUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const deleteConnection = async (connectionUUID) => {
    setUserConnectionsLoading(true);
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/deleteConnection/${connectionUUID}`,
        {
          userUUID: userUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let userConnections = response.data.userConnections;
        setUserConnections(userConnections);

        setConnectionsScreenModalVisible(true);
        setModalHeader("Deleted Successfully");
        setModalMessage(
          `Successfully deleted ${connectionName} in your connections.`
        );
        setUserConnectionsLoading(false);
        console.log(userConnections);
      })
      .catch((error) => {
        console.log(error.response);
        setUserConnectionsLoading(false);
      });
  };

  const blockConnection = async (connectionConnUUID, connectionUUID) => {
    setUserConnectionsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/blockConnection/${connectionUUID}`,
        {
          userUUID: userUUID,
          connectionConnUUID: connectionConnUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let userConnections = response.data.userConnections;
        setUserConnections(userConnections);
        console.log(userConnections);

        setConnectionsScreenModalVisible(true);
        setModalHeader("Blocked Successfully");
        setModalMessage(`Successfully blocked ${connectionName}.`);
        setUserConnectionsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setUserConnectionsLoading(false);
      });
  };

  const showUserConnection = async (connectionUUID) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/showConnection/${connectionUUID}/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let blockStatus = response.data.blockStatus;
        setUserBlockStatus(blockStatus);

        let userConnectionData = response.data.connectionData;
        setUserConnectionData(userConnectionData);

        let userConnectionLinks = response.data.connectionLinks;
        setUserConnectionLinks(userConnectionLinks);

        let userConnectionStatus = response.data.userConnectionStatus;
        setUserConnectionStatus(userConnectionStatus);

        addProfileView(connectionUUID);
        console.log(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  /**
   * 1 SECOND DELAY IN SEARCH
   */
  useEffect(() => {
    if (searchKey) {
      const timer = setTimeout(() => {
        searchUserConnections(searchKey);
      }, 500);
      return () => clearTimeout(timer);
    } else if (!searchKey || searchKey.length === 0) {
      setResultsEmpty(false);
      setSearchResults(null);
    }
  }, [searchKey]);

  useEffect(() => {
    if (Object.keys(userConnections).length === 0) {
      getUserConnections();
    }
  }, []);

  return (
    <View style={GlobalStyles.root}>
      {/* SUCCESS MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={connectionsScreenModalVisible}
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
              : require("../../../../assets/UXMaterials/defaults/default-profile.png")
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
              : require("../../../../assets/UXMaterials/defaults/default-profile.png")
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
              : require("../../../../assets/UXMaterials/defaults/default-profile.png")
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
              : require("../../../../assets/UXMaterials/defaults/default-profile.png")
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
          onChangeText={(text) => {
            if (text.trim() === "") {
              setSearchKey("");
            } else {
              setSearchKey(text);
            }
          }}
          autoCapitalize
          value={searchKey}
        />
        <TouchableOpacity
          disabled={userConnectionsLoading ? true : false}
          onPress={onClearPressed}
          style={{
            display: searchKey ? "flex" : "none",
            width: "15%",
            height: "100%",
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="close"
            size={RFPercentage(3.4)}
            color={Colors.yeetPurple}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        ref={ref}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          userConnectionsLoading ? <LoadingResource /> : null
        }
        ListFooterComponent={() =>
          resultsEmpty ? (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: "10%",
              }}
            >
              <Image
                source={noConnections}
                resizeMode="center"
                style={{
                  height: RFPercentage(40),
                  width: "75%",
                }}
              />
              <View style={{ textAlign: "center" }}>
                <Text style={{ fontSize: RFPercentage(3), fontWeight: "bold" }}>
                  User not found.
                </Text>
              </View>
            </View>
          ) : null
        }
        style={{ backgroundColor: "#fff" }}
        extraData={refreshFlatList}
        keyExtractor={(item) => item.con_id}
        data={
          !userConnectionsLoading
            ? searchResults
              ? searchResults
              : userConnections
            : null
        }
        renderItem={({ item }) => {
          return (
            <ConnectionsButton
              connectionImage={item.usr_profile_photo_storage}
              connectionName={item.usr_name}
              connectionBio={item.usr_bio}
              onPress={() => {
                if (item.usr_direct_link_active == 1) {
                  if (item.lnk_id == 31) {
                    Linking.openURL(
                      `${BASE_URL}api/downloadFile/` + item.uln_file
                    );
                  } else {
                    Linking.canOpenURL(item.uln_url).then((supported) => {
                      if (supported) {
                        Linking.openURL(item.uln_url);
                      } else {
                        setConnectionsScreenModalVisible(true);
                        setModalHeader("Error");
                        setModalMessage(
                          "This link cannot be opened and may be broken."
                        );
                      }
                    });
                  }
                } else {
                  showUserConnection(item.usr_uuid);
                  onConnectionPressed();
                  console.log(item.con_id);
                }
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
                setConnectionConnUUID(item.con_uuid);
                setConnectionUUID(item.usr_uuid);
                setConnectionImage(item.usr_profile_photo_storage);
                setConnectionName(item.usr_name);
                setConnectionBio(item.usr_bio);
                setConnectionNotes(item.con_notes);
                refRBSheet.current.open();
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
                    uri: `${BASE_URL}images/profile/photos/default-profile.png`,
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
    alignItems: "center",
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
    color: Colors.yeetPurple,
  },

  drawerBioContainer: {
    width: "50%",
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
    backgroundColor: "#EFF0E2",
    borderRadius: 30,

    paddingLeft: width * 0.03,
    marginVertical: height * 0.008,
    marginHorizontal: width * 0.05,
    borderColor: Colors.yeetPurple,
    borderWidth: 2,
  },

  searchBar: {
    fontSize: RFPercentage(3),
    paddingHorizontal: width * 0.03,
  },
});
