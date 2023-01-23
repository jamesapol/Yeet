import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import DefaultImage from "../../../../assets/UXMaterials/icons/user.png";
import { useNavigation } from "@react-navigation/native";
import PageHeader from "../../../components/PageHeader";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { AuthStyles, Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import ModalPhotoOptions from "../../../components/ModalPhotoOptions/ModalPhotoOptions";

var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

export default function SelectPhotoScreen({ route }) {
  const { email, password, fullName, mobileNumber } = route.params;

  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "jpg":
        return "image/jpeg";
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
    }
  };

  const onAddPhotoPressed = () => {
    setPhotoModalVisible(true);
  };
  const closeUploadModal = () => {
    setPhotoModalVisible(false);
  };
  const removePhoto =() => {
    setImage();
  }

  const uploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setPhotoModalVisible(false);
      // setImage(result.assets[0].uri);
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setPhotoModalVisible(false);
      // setImage(result.assets[0].uri);
      setImage(result.uri);
    }
  };

  const navigation = useNavigation();

  const onContinuePressed = () => {
    const fileURI = image;

    let fileName = fileURI.split("/").pop();

    const extArr = /\.(\w+)$/.exec(fileName);
    const fileType = getMimeType(extArr[1]);

    // console.warn(fileURI, fileName, fileType);
    // setProfileImage(fileURI, fileName, fileType);
    navigation.navigate("ConfirmationScreen", {
      email: email,
      password: password,
      fullName: fullName,
      fileURI: fileURI,
      fileName: fileName,
      fileType: fileType,
      mobileNumber: mobileNumber,
    });
  };

  const onBackPressed = () => {
    navigation.goBack();
  };

  const onSkipPressed = () => {
    navigation.navigate("ConfirmationScreen", {
      email: email,
      password: password,
      fullName: fullName,
    });
  };

  return (
    <View style={GlobalStyles.root}>
      {/* SELECT PROFILE PHOTO MODAL */}
      <Modal
        transparent
        animationType="fade"
        hardwareAccelerated
        visible={photoModalVisible}
        onRequestClose={closeUploadModal}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={closeUploadModal}
        >
          <ModalPhotoOptions
            onCancelPressed={closeUploadModal}
            onUploadImagePressed={uploadPhoto}
            onTakePhotoPressed={takePhoto}
            modalHeader="Select Profile Photo"
          />
        </TouchableOpacity>
      </Modal>

      <PageHeader headerText="Select a photo" onPress={onBackPressed} />
      <SectionHeader sectionHeaderText="This will be displayed on your YEET profile." />
      <View style={AuthStyles.sectionContainer}>
        <View style={AuthStyles.imageContainer}>
          {image ? (
            image && (
              <Image
                source={{ uri: image }}
                style={AuthStyles.image}
                resizeMode="contain"
              />
            )
          ) : (
            <View>
              <Image
                source={DefaultImage}
                style={AuthStyles.image}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        <CustomButton
          style={styles.selectPhotoButton}
          onPress={onAddPhotoPressed}
          // bgColor={!image ? "#FFF" : ""}
          fgColor="#fff"
          bgColor="#562C73"
          // fgColor={image ? "#FFF" : ""}
          btnText={!image ? "Add a Photo" : "Change photo"}
        />
        {image && (
          <CustomButton
            style={styles.removePhotoButton}
            onPress={removePhoto}
            fgColor="#fff"
            bgColor={Colors.yeetPink}
            btnText="Remove Photo"
          />
        )}
        {!image ? (
          <CustomButton
            onPress={onSkipPressed}
            style={styles.skipButton}
            fgColor={Colors.yeetPink}
            bgColor="#FFF"
            btnText="Skip"
          />
        ) : (
          <CustomButton
            // style={styles.skipButton}
            style={styles.skipButton}
            onPress={onContinuePressed}
            fgColor="#FFF"
            bgColor={Colors.yeetPurple}
            btnText="Continue"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectPhotoButton: {
    marginTop: height * 0.07,
    marginVertical: height * 0.01,
  },

  removePhotoButton: {
    marginBottom: height * 0.05,
  },

  skipButton: {
    borderWidth: 2,
    borderColor: "#FFF",
  },
});
