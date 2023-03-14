import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../../../config";
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("screen");

function getCode(code) {
  return code.split("/").pop();
}

export default function AddConnectionQRScreen() {
  const {
    setUserBlockStatus,
    setUserNotFound,
    setUserConnectionData,
    setUserConnectionLinks,
    setUserConnectionStatus,
    setIsLoading
    // showProfileFromQR,
  } = useContext(AuthContext);

  const navigation = useNavigation();
  const onBackPressed = () => {
    navigation.navigate("ActivateCodeQRScreen");
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  });

  const handleBarCodeScanned = ({ type, data }) => {
    if (type == "256") {
      if (
        data.includes(
          "https://yeetapp.io/profile" || "https://www.yeetapp.io/profile"
        )
      ) {
        let code = getCode(data);
        console.log(code);
        setScanned(true);
        showProfileFromQR(code);
        navigation.navigate("ViewConnectionScreen");
        //   navigation.goBack();
        //   activateYeetDevice(code);
      } else {
        console.log("FALSE");
      }

      // console.log(
      //   "Bar code with type",
      //   type,
      //   "and data",
      //   data,
      //   "has been scanned!"
      // );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission.</Text>;
  }
  if (hasPermission === false) {
    return (
      <Text>
        Access to camera restricted. Please enable it in your settings to scan
        your QR Code.
      </Text>
    );
  }

  const showProfileFromQR = async (code) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    console.log(userUUID);

    await axios
      .get(`${BASE_URL}api/showProfileFromQR/${code}/${userUUID}`, {})
      .then((response) => {
        console.log(response.data);
        if (response.data.userNotFound) {
          setUserNotFound(true);
        } else {
          let blockStatus = response.data.blockStatus;
          setUserBlockStatus(blockStatus);

          let userConnectionData = response.data.userProfileData;
          setUserConnectionData(userConnectionData);

          let userConnectionLinks = response.data.userProfileLinks;
          setUserConnectionLinks(userConnectionLinks);

          let userConnectionStatus = response.data.connectionStatus;
          setUserConnectionStatus(userConnectionStatus);
          // console.log(userConnectionLinks);
          // console.log(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.root}>
      <View resizeMode="stretch" style={styles.mainContainer}>
        <BarCodeScanner
          barCodeTypes={BarCodeScanner.Constants.BarCodeType.qr}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
          type="back"
        />
        <View
          style={[
            StyleSheet.absoluteFill,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          {/* <View
            style={[
              {
                backgroundColor: "#fff0",
                width: width * 0.5,
                height: width * 0.5,
                marginBottom: height * 0.3,
                borderRadius: 50,
                borderWidth: 5,
                borderColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <View
                style={{
                  backgroundColor: "#0f0",
                  height: height * 0.15,
                  width: 5,
                  position: "absolute",
                  left: -5,
                }}
              />
              <View
                style={{
                  backgroundColor: "#0f0",
                  height: height * 0.15,
                  width: 5,
                  position: "absolute",
                  right: -5,
                }}
              />
              <View
                style={{
                  backgroundColor: "#0f0",
                  height: 5,
                  width: height * 0.15,
                  position: "absolute",
                  top: -5,
                }}
              />
               <View
                style={{
                  backgroundColor: "#0f0",
                  height: 5,
                  width: height * 0.15,
                  position: "absolute",
                  bottom: -5,
                }}
              />
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  scanner: {
    height: width * 1,
    width: width * 1,
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },

  header: {
    backgroundColor: "black",
  },
});
