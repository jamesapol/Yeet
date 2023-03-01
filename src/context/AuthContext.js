import axios from "axios";
import React, { createContext } from "react";

import * as SecureStore from "expo-secure-store";

import { BASE_URL } from "../config";
import * as Device from "expo-device";
import { useState } from "react";
import { useEffect } from "react";
import * as SQLite from "expo-sqlite";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //TEMPORARY LINKS
  const [tempLinks, setTempLinks] = useState([]);

  //LOGGED IN USER ALL DATA
  const [validToken, setValidToken] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [userNFCDevices, setUserNFCDevices] = useState({});
  const [userActiveYeetDevice, setUserActiveYeetDevice] = useState({});

  //CACHED DATA
  const [userName, setUserName] = useState();
  const [tempUserName, setTempUserName] = useState();
  const [userBio, setUserBio] = useState();
  const [tempUserBio, setTempUserBio] = useState();
  const [userCoverPhoto, setUserCoverPhoto] = useState();
  const [tempCoverPhoto, setTempCoverPhoto] = useState();
  const [userProfilePhoto, setUserProfilePhoto] = useState();
  const [tempProfilePhoto, setTempProfilePhoto] = useState();

  const [nfcDeviceLoading, setNfcDeviceLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);

  //PASSWORD MATCHING
  const [passwordMatched, setPasswordMatched] = useState(false);

  //USER BLOCKED CONNECTIONS
  const [userBlockedConnections, setUserBlockedConnections] = useState({});

  //UPDATE PROFILE STATES
  const [updateSuccessModalVisible, setUpdateSuccessModalVisible] =
    useState(false);
  const [updateErrorModalVisible, setUpdateErrorModalVisible] = useState(false);

  //LOGGED IN USER LINKS
  const [userLinks, setUserLinks] = useState({});
  const [userLinksLoading, setUserLinksLoading] = useState(false);
  //AUTH TOKEN
  const [userToken, setUserToken] = useState();
  //GET ALL LINKS FROM DATABASE
  const [addLinkLoading, setAddLinkLoading] = useState(false);
  const [showAddLinkMessage, setShowAddLinkMessage] = useState(false);

  const [userDirectLink, setUserDirectLink] = useState();
  const [userDirectLinkID, setUserDirectLinkID] = useState();
  //GET ALL CONNECTIONS OF USER
  const [userConnections, setUserConnections] = useState({});
  const [userConnectionsLoading, setUserConnectionsLoading] = useState({});
  //SHOW CONNECTION OF USER
  const [userConnectionData, setUserConnectionData] = useState({});
  //SHOW CONNECTION LINKS
  const [userConnectionLinks, setUserConnectionLinks] = useState({});
  const [userConnectionStatus, setUserConnectionStatus] = useState();
  const [userBlockStatus, setUserBlockStatus] = useState();
  const [userPrivateStatus, setUserPrivateStatus] = useState();

  //REGISTRATION STATE IF NEXT STEP IS VALID
  const [valid, setValid] = useState(false);

  //FORGOT PASSWORD STATE IF VALID EMAIL
  const [validEmail, setValidEmail] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [registered, setRegistered] = useState(false);

  //SPINNER LOADING STATE
  const [isLoading, setIsLoading] = useState(false);
  //SPLASHSCREEN LOADING STATE
  const [splashLoading, setSplashLoading] = useState(true);
  //REFRESHING PAGES
  const [refreshing, setRefreshing] = useState(false);

  //SHOWING MODAL STATE
  const [showModal, setShowModal] = useState(false);
  //SHOWING MODAL WITH BUTTONs
  const [showButtonModal, setShowButtonModal] = useState(false);
  //SHOW MODAL WITH TEXTINPUT
  const [showInputModal, setShowInputModal] = useState(false);
  //SHOW SUCCESS MODAL
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  //ERROR MESSAGE DISPLAYING
  const [errorMessage, setErrorMessage] = useState("");
  //SUCCESS MESSAGE DISPLAYING
  const [successMessage, setSuccessMessage] = useState("");

  //MODAL HEADER ERROR OR SUCCESS
  const [modalHeader, setModalHeader] = useState("");
  //MODAL MESSAGE ERROR OR SUCCESS
  const [modalMessage, setModalMessage] = useState("");

  const [publicProfileInfo, setPublicProfileInfo] = useState({});
  const [publicProfileLinks, setPublicProfileLinks] = useState({});
  const [publicProfileDirectLink, setPublicProfileDirectLink] = useState();
  const [publicConnectionStatus, setPublicConnectionStatus] = useState();
  const [userNotFound, setUserNotFound] = useState(false);
  const [publicLoading, setPublicLoading] = useState(false);

  //INSIGHT
  const [userProfileTaps, setUserProfileTaps] = useState();
  const [userLinksInsights, setUserLinksInsights] = useState({});
  const [totalUserLinkTaps, setTotalUserLinkTaps] = useState();
  const [totalUserConnections, setTotalUserConnections] = useState();
  const [totalProfileViews, setTotalProfileViews] = useState();

  const [userTheme, setUserTheme] = useState({});

  //MODAL STATES
  const [welcomeModalVisible, setWelcomeModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [successPasswordModalVisible, setSuccessPasswordModalVisible] =
    useState(false);
  const [errorPasswordModalVisible, setErrorPasswordModalVisible] =
    useState(false);
  const [lockedAccountModalVisible, setLockedAccountModalVisible] =
    useState(false);
  const [forgotEmailModalVisible, setForgotEmailModalVisible] = useState(false);
  const [resetCodeModalVisible, setResetCodeModalVisible] = useState(false);
  const [newPasswordModalVisible, setNewPasswordModalVisible] = useState(false);

  const [registrationModalVisible, setRegistrationModalVisible] =
    useState(false);
  const [confirmEmailModalVisible, setConfirmEmailModalVisible] =
    useState(false);
  const [inputNameModalVisible, setInputNameModalVisible] = useState(false);
  const [mobileNumberModalVisible, setMobileNumberModalVisible] =
    useState(false);

  const [addLinksModalVisible, setAddLinksModalVisible] = useState(false);
  const [editLinkMessageModalVisible, setEditLinkMessageModalVisible] =
    useState(false);
  const [homeModalVisible, setHomeModalVisible] = useState(false);
  const [viewConnectionModalVisible, setViewConnectionModalVisible] =
    useState(false);
  const [connectionsScreenModalVisible, setConnectionsScreenModalVisible] =
    useState(false);

  const [updateAccountModalVisible, setUpdateAccountModalVisible] =
    useState(false);
  const [updatePasswordErrorModalVisible, setUpdatePasswordErrorModalVisible] =
    useState(false);
  const [
    updatePasswordSuccessModalVisible,
    setUpdatePasswordSuccessModalVisible,
  ] = useState(false);
  const [invalidPasswordModalVisible, setInvalidPasswordModalVisible] =
    useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false);
  const [reactivateModalVisible, setReactivateModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [finalConfirmationModalVisible, setFinalConfirmationModalVisible] =
    useState(false);

  const [publicProfileLoading, setPublicProfileLoading] = useState(false);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [manageAccountLoading, setManageAccountLoading] = useState(false);

  const register = async (
    fileUri,
    fileName,
    fileType,
    email,
    fullName,
    password,
    mobileNumber
  ) => {
    setUserInfoLoading(true);
    let formData = new FormData();
    // console.log(fileUri + fileName + fileType);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("deviceName", Device.modelName);
    formData.append("mobileNumber", mobileNumber);

    if (fileUri) {
      formData.append("profileImage", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
    }

    // await axios({
    //   method: "POST",
    //   url: `${BASE_URL}api/register`,
    //   data: formData,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    await axios
      .post(`${BASE_URL}api/register`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setRegistered(true);

        let userInfo = response.data.data;
        console.log(userInfo);
        console.log(userInfo.user.usr_uuid);
        console.log(userInfo.token);
        console.log(userInfo.user.usr_name);

        setUserInfo(userInfo.user);
        setUserToken(userInfo.token);
        setUserTheme(userInfo.user.thm_id);
        setUserName(userInfo.user.usr_name);
        setUserLinks([]);
        setUserProfilePhoto(userInfo.user_profile_photo);
        setUserCoverPhoto(null);

        SecureStore.setItemAsync("userUUID", userInfo.user.usr_uuid);
        SecureStore.setItemAsync("userToken", userInfo.token);
        SecureStore.setItemAsync("userName", userInfo.user.usr_name);
        if (userInfo.user_profile_photo) {
          SecureStore.setItemAsync(
            "userProfilePhoto",
            userInfo.user_profile_photo
          );
        }

        setUserInfoLoading(false);
        // console.log(userInfo);
      })
      .catch((error) => {
        console.log(error);
        setUserInfoLoading(false);
        setRegistered(false);
      });
    // }
  };

  const updateProfile = async (
    profilePhotoURI,
    profilePhotoName,
    profilePhotoType,
    coverPhotoURI,
    coverPhotoName,
    coverPhotoType,
    userName,
    userBio
  ) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    let formData = new FormData();

    if (profilePhotoURI) {
      formData.append("profilePhoto", {
        uri: profilePhotoURI,
        name: profilePhotoName,
        type: profilePhotoType,
      });
    }
    if (coverPhotoURI) {
      formData.append("coverPhoto", {
        uri: coverPhotoURI,
        name: coverPhotoName,
        type: coverPhotoType,
      });
    }

    formData.append("userName", userName);
    if (userBio) {
      formData.append("userBio", userBio);
    }
    formData.append("userUUID", userUUID);
    await axios({
      method: "POST",
      url: `${BASE_URL}api/updateProfile`,
      data: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.profilePhotoError) {
          setUpdateErrorModalVisible(true);
          setModalHeader("Profile Photo Upload Error");
          setModalMessage(response.data.profilePhotoError);
        } else if (response.data.coverPhotoError) {
          setUpdateErrorModalVisible(true);
          setModalHeader("Cover Photo Upload Error");
          setModalMessage(response.data.coverPhotoError);
        } else {
          let userInfo = response.data.user;
          setTempProfilePhoto(null);
          setTempCoverPhoto(null);
          setUserInfo(userInfo);
          console.log(userInfo.usr_name);

          setUserName(userInfo.usr_name);
          setUserCoverPhoto(userInfo.usr_cover_photo_storage);
          setUserProfilePhoto(userInfo.usr_profile_photo_storage);

          SecureStore.setItemAsync("userName", userInfo.usr_name);
          if (userInfo.usr_bio) {
            setUserBio(userInfo.usr_bio);
            SecureStore.setItemAsync("userBio", userInfo.usr_bio);
          } else {
            setUserBio(null);
            SecureStore.deleteItemAsync("userBio");
          }
          if (userInfo.usr_cover_photo_storage) {
            SecureStore.setItemAsync(
              "userCoverPhoto",
              userInfo.usr_cover_photo_storage
            );
          }
          if (userInfo.usr_profile_photo_storage) {
            SecureStore.setItemAsync(
              "userProfilePhoto",
              userInfo.usr_profile_photo_storage
            );
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
        // setUserInfoLoading(false);
      });
  };

  const updatePassword = async (oldPassword, newPassword) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    axios
      .patch(
        `${BASE_URL}api/updateUserPassword/${userUUID}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.passwordError) {
          console.log(response.data.passwordError);
          setUpdatePasswordErrorModalVisible(true);
          setErrorMessage(response.data.passwordError);
        } else {
          let userInfo = response.data.user;
          console.log(response.data);
          setUserInfo(userInfo);
          setUpdatePasswordSuccessModalVisible(true);
          setSuccessMessage(response.data.success);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const updateMobileNumber = async (mobileNumber) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    axios
      .patch(
        `${BASE_URL}api/updateMobileNumber/${userUUID}`,
        {
          mobileNumber: mobileNumber,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.errors.newEmail)
        // if (response.data.passwordError) {
        //   console.log(response.data.passwordError);
        //   setShowModal(true);
        //   setErrorMessage(response.data.passwordError);
        // } else if (response.data.emailError) {
        //   console.log(response.data.emailError);
        //   setShowModal(true);
        //   setErrorMessage(response.data.emailError);
        // } else {
        let userInfo = response.data.user;
        console.log(userInfo);
        setUserInfo(userInfo);
        setUpdateAccountModalVisible(true);
        setModalHeader("Success");
        setModalMessage(response.data.success);
        // setSuccessMessage(response.data.success);
        // }
        // console.log(response)
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error.response.data.errors.newEmail);
        // setShowModal(true);
        // setErrorMessage(error.response.data.errors.newEmail);
        setUpdateAccountModalVisible(true);
        setModalHeader("Error");
        setModalMessage(error.response.data);
        setIsLoading(false);
      });
  };

  const resetPassword = async (email) => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}api/resetPassword`,
        {
          email: email,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.emailError) {
          setValidEmail(false);
          setForgotEmailModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.emailError);
        } else if (response.data.coolDown) {
          setForgotEmailModalVisible(true);
          setModalHeader("Password Reset Code");
          setModalMessage(response.data.coolDown);
        } else {
          setValidEmail(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
        setForgotEmailModalVisible(true);
        setModalHeader("Error");
        setModalMessage(error.response.data);
        setValidEmail(false);
        setIsLoading(false);
      });
  };

  const checkPasswordResetCode = async (code, email) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}api/checkPasswordResetCode`, {
        email: email,
        code: code,
      })
      .then((response) => {
        if (response.data.code == 200) {
          setValidCode(true);
        } else if (response.data.code == 401) {
          setValidCode(false);
          setResetCodeModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.error);
        }
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setResetCodeModalVisible(true);
        setModalHeader("Error");
        setModalMessage(error.response.data);
        console.log(error.response.data);
        setValidCode(false);
        setIsLoading(false);
      });
  };

  const newPassword = async (password, email) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}api/newPassword`, {
        newPassword: password,
        email: email,
      })
      .then((response) => {
        if (response.data.emailError) {
          setErrorPasswordModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.emailError);
          setValidPassword(false);
        } else if (response.data.passwordError) {
          setErrorPasswordModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.passwordError);
          setValidPassword(false);
        } else if (response.data.success) {
          setSuccessPasswordModalVisible(true);
          setModalHeader("Success");
          setModalMessage(response.data.success);
          setValidPassword(true);
        }
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setNewPasswordModalVisible(true);
        setModalHeader("Error");
        setModalMessage(e.response.data.errors);
        setValidPassword(false);
        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  const deactivateAccount = async (password) => {
    setManageAccountLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/deactivateAccount/${userUUID}`,
        {
          password: password,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.passwordError) {
          setInvalidPasswordModalVisible(true);
          setModalHeader("Invalid Password");
          setModalMessage(response.data.passwordError);
        } else if (response.data.success) {
          setDeactivateModalVisible(true);
          setModalHeader("Account Deactivated");
          setModalMessage(response.data.success);
        }
        console.log(response.data);
        setManageAccountLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setManageAccountLoading(false);
      });
  };

  const deleteAccount = async () => {
    setManageAccountLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/deleteAccount/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        setDeleteAccountModalVisible(true);
        setModalHeader("Account Deleted");
        setModalMessage(response.data.success);

        console.log(response.data);
        setManageAccountLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setManageAccountLoading(false);
      });
  };

  const toggleNotifications = async (status) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    axios
      .patch(
        `${BASE_URL}api/toggleNotifications/${userUUID}/${status}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        let userInfo = response.data.userInfo;
        setUserInfo(userInfo);
        console.log(userInfo);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  const toggleAccountPrivacy = async (status) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    axios
      .patch(
        `${BASE_URL}api/toggleAccountPrivacy/${userUUID}/${status}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        let userInfo = response.data.userInfo;
        setUserInfo(userInfo);
        console.log(userInfo);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  const checkPassword = async (password) => {
    setManageAccountLoading(true);
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/checkPassword`,
        {
          password: password,
          userUUID: userUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.passwordError) {
          setPasswordMatched(false);
          setInvalidPasswordModalVisible(true);
          setModalHeader("Password Error");
          setModalMessage("You have entered an invalid password.");
        } else if (response.data.success) {
          console.log(response.data.success);
          setPasswordMatched(true);
        }
        console.log(passwordMatched);
        setManageAccountLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setManageAccountLoading(false);
      });
  };

  const login = async (email, password) => {
    // setUserLinksLoading(true);
    setUserInfoLoading(true);
    axios
      .post(`${BASE_URL}api/login`, {
        email: email,
        password: password,
        deviceName: Device.modelName,
      })
      .then((response) => {
        let responseData = response.data.data;
        if (responseData.emailError) {
          setLoginModalVisible(true);
          setModalHeader("Error");
          setModalMessage(responseData.emailError);
          console.log(responseData);
        } else if (responseData.passwordError) {
          setLoginModalVisible(true);
          setModalHeader("Error");
          setModalMessage(responseData.passwordError);
          // console.log(attemptCount);
          console.log(response.data);
        } else if (responseData.finalWarning) {
          setLoginModalVisible(true);
          setModalHeader("Error");
          setModalMessage(responseData.finalWarning);
          // console.log(attemptCount);
          console.log(response.data);
        } else if (responseData.blockedAccount) {
          setLockedAccountModalVisible(true);
          setModalHeader("Account Locked");
          setModalMessage(responseData.blockedAccount);
          console.log(responseData);
        } else {
          let userInfo = responseData.userData;
          if (userInfo.user.usr_is_active == -1) {
            setReactivateModalVisible(true);
            setModalHeader("Welcome Back");
            setModalMessage("Welcome back! We are happy to see you again!");
          }
          setUserInfo(userInfo.user);
          setUserNFCDevices(userInfo.nfcDevices);
          setUserToken(userInfo.token);
          setUserActiveYeetDevice(userInfo.user.nfc_device);
          setUserDirectLink(userInfo.user.usr_direct_link_active);
          setUserDirectLinkID(userInfo.user.uln_id);
          setUserTheme(userInfo.user.thm_id);
          setUserLinks(userInfo.userLinks);
          console.log(userInfo);

          setUserName(userInfo.user.usr_name);
          setUserBio(userInfo.user.usr_bio);
          setUserProfilePhoto(userInfo.user.usr_profile_photo_storage);
          setUserCoverPhoto(userInfo.user.usr_cover_photo_storage);

          SecureStore.setItemAsync("userName", userInfo.user.usr_name);
          SecureStore.setItemAsync("userUUID", userInfo.user.usr_uuid);
          SecureStore.setItemAsync("userToken", userInfo.token);
          if (userInfo.user.nfc_device) {
            SecureStore.setItemAsync(
              "userActiveYeetDevice",
              userInfo.user.nfc_device
            );
          }
          if (userInfo.nfcDevices) {
            SecureStore.setItemAsync(
              "userYeetDevices",
              JSON.stringify(userInfo.nfcDevices)
            );
          }
          if(userInfo.user.usr_bio){
            SecureStore.setItemAsync("userBio", userInfo.user.usr_bio);
          }
          if(userInfo.user.usr_cover_photo_storage){
            SecureStore.setItemAsync(
              "userCoverPhoto",
              userInfo.user.usr_cover_photo_storage
            );
          }
          if(userInfo.user.usr_profile_photo_storage){
            SecureStore.setItemAsync(
              "userProfilePhoto",
              userInfo.user.usr_profile_photo_storage
            );
          }
        }
        setUserInfoLoading(false);
      })
      .catch((error) => {
        setUserInfoLoading(false);
        setLoginModalVisible(true);
        setModalHeader("Error");
        setModalMessage(
          "There seems to be a problem with your connection. Please try logging in again."
        );
        // console.log(error.response.data.status);
        console.log(error.response.data);
        // console.log(error.response);
      });
  };

  const logout = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}api/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        clearAll();

        setIsLoading(false);
        setSplashLoading(false);
      })
      .catch((e) => {
        console.log(e.response.status);
        console.log(e.response.data);
        setIsLoading(false);
      });
  };

  const getUserLinks = async (uuid, token) => {
    setIsLoading(true);
    setUserLinksLoading(true);
    await axios
      .get(`${BASE_URL}api/getUserLinks/${uuid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        let userLinks = response.data;
        console.log(userLinks);
        setUserLinks(userLinks);
        setUserLinksLoading(false);
        setIsLoading(false);
        // setRefreshing(false);
        // setSplashLoading(false);
        console.log(userLinks);
      })
      .catch((e) => {
        console.log("Links Error:" + e);
        // setRefreshing(false);
        setIsLoading(false);
        setUserLinksLoading(false);
        setSplashLoading(false);
        setShowModal(true);
        setErrorMessage("Please check your connection!");
      });
  };

  const getUserData = async () => {
    try {
      setUserInfoLoading(true);

      let userUUID = await SecureStore.getItemAsync("userUUID");
      let userToken = await SecureStore.getItemAsync("userToken");

      let userName = await SecureStore.getItemAsync("userName");
      let userBio = await SecureStore.getItemAsync("userBio");
      let userCoverPhoto = await SecureStore.getItemAsync("userCoverPhoto");
      let userProfilePhoto = await SecureStore.getItemAsync("userProfilePhoto");
      let userActiveYeetDevice = await SecureStore.getItemAsync(
        "userActiveYeetDevice"
      );

      console.log("UserToken: " + userToken);
      console.log("UserUUID: " + userUUID);
      if (!userToken || !userUUID) {
        setSplashLoading(false);
        setUserInfoLoading(false);
        // setIsLoading(false);
        setPublicLoading(false);
        setAddLinkLoading(false);
        setUserLinksLoading(false);
        setNfcDeviceLoading(false);
        setUserConnectionsLoading(false);
        setShowModal(false);
        console.log("No userUUID and userToken");
      } else if (userUUID && userToken) {
        if (userName) {
          setUserToken(userToken);
          setSplashLoading(false);
          setUserLinksLoading(true);

          setUserName(userName);
          setUserBio(userBio);
          setUserCoverPhoto(userCoverPhoto);
          setUserProfilePhoto(userProfilePhoto);
          setUserActiveYeetDevice(userActiveYeetDevice);
        }
        await axios
          .get(`${BASE_URL}api/getUserData/${userUUID}`, {
            headers: { Authorization: `Bearer ${userToken}` },
          })
          .then((response) => {
            if (response.status === 401) {
              setWelcomeModalVisible(true);
              setModalHeader("Login Error");
              setModalMessage(
                "Oops! It seems your current login has expired. Please sign in again to continue."
              );
              clearAll();
              console.log(response);
            }
            if (response.data.userNotFound) {
              console.log(response.data.userNotFound);
              setWelcomeModalVisible(true);
              setModalHeader("Login Timeout");
              setModalMessage(
                "Oops! It seems your current login has expired. Please sign in again to continue."
              );
              clearAll();
            } else if (response.data.userData) {
              let userInfo = response.data.userData;
              console.log(response.data.userData);

              setUserInfo(userInfo.user);
              setUserActiveYeetDevice(userInfo.user.nfc_device);
              setUserNFCDevices(userInfo.nfcDevices);
              setUserToken(userInfo.token);
              setUserDirectLink(userInfo.user.usr_direct_link_active);
              setUserDirectLinkID(userInfo.user.uln_id);
              setUserLinks(userInfo.userLinks);
              setUserTheme(userInfo.userTheme);
              setUserName(userInfo.user.usr_name);
              setUserCoverPhoto(userInfo.user.usr_cover_photo_storage);
              setUserProfilePhoto(userInfo.user.usr_profile_photo_storage);

              SecureStore.setItemAsync("userName", userInfo.user.usr_name);

              if (userInfo.user.usr_bio) {
                setUserBio(userInfo.user.usr_bio);
                SecureStore.setItemAsync("userBio", userInfo.user.usr_bio);
              } else {
                setUserBio(null);
                SecureStore.deleteItemAsync("userBio");
              }
              if (userInfo.user.usr_cover_photo_storage) {
                SecureStore.setItemAsync(
                  "userCoverPhoto",
                  userInfo.user.usr_cover_photo_storage
                );
              }
              if (userInfo.user.usr_profile_photo_storage) {
                SecureStore.setItemAsync(
                  "userProfilePhoto",
                  userInfo.user.usr_profile_photo_storage
                );
              }
              if (userInfo.activeNFCDevice) {
                SecureStore.setItemAsync(
                  "userActiveYeetDevice",
                  userInfo.activeNFCDevice
                );
              }
              console.log("Logged In as: " + userInfo.user.usr_email);
              console.log("User Links: " + userInfo.userLinks.length);
            }
            setSplashLoading(false);
            setUserInfoLoading(false);
            setPublicLoading(false);
            setAddLinkLoading(false);
            setUserLinksLoading(false);
            setNfcDeviceLoading(false);
            setUserConnectionsLoading(false);
            setShowModal(false);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              console.log("Data Error: " + error.response.status);

              setWelcomeModalVisible(true);
              setModalHeader("Login Expired");
              setModalMessage(
                "Oops! It seems your current login has expired. Please sign in again to continue."
              );
              clearAll();
            }

            setSplashLoading(false);
            setUserInfoLoading(false);
            setPublicLoading(false);
            setAddLinkLoading(false);
            setUserLinksLoading(false);
            setNfcDeviceLoading(false);
            setUserConnectionsLoading(false);
            setShowModal(false);
          });
      }
    } catch (e) {
      clearAll();
      setSplashLoading(false);

      setUserInfoLoading(false);
      setPublicLoading(false);
      setAddLinkLoading(false);
      setUserLinksLoading(false);
      setNfcDeviceLoading(false);
      setUserConnectionsLoading(false);
      setShowModal(false);

      // clearAll();
      console.log("Error :" + e);
    }
  };

  const removeLink = async (userLinkID) => {
    // setUserLinksLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/remove-link/${userLinkID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data.data);

        // getUserLinks(userUUID, userToken);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setUserLinksLoading(false);
      });
  };

  const editYouTubeLink = async (
    userLinkIndex,
    youtubeLinkName,
    youtubeURL,
    youtubeThumbnailURI
  ) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    await axios
      .patch(
        `${BASE_URL}api/edit-youtube-link/${userLinkIndex}`,
        {
          userUUID: userUUID,
          youtubeLinkName: youtubeLinkName,
          youtubeURL: youtubeURL,
          youtubeThumbnailURI: youtubeThumbnailURI,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let userLinks = response.data.data.userLinks;
        console.log(userLinks);
        setUserLinks(userLinks);
        setEditLinkMessageModalVisible(true);
        setModalHeader("Success");
        setModalMessage("Youtube link successfully udpated.");
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const editFile = async (
    fileURI,
    fileName,
    fileType,
    fileTitle,
    linkIndex
  ) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    let formData = new FormData();
    formData.append("file", {
      uri: fileURI,
      name: fileName,
      type: fileType,
    });
    formData.append("originalFileName", fileName);
    formData.append("fileTitle", fileTitle ? fileTitle : "PDF File");
    formData.append("userUUID", userUUID);
    formData.append("linkIndex", linkIndex);

    await axios({
      method: "POST",
      url: `${BASE_URL}api/edit-pdf-file`,
      data: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        let userLinks = response.data.data.userLinks;
        setUserLinks(userLinks);
        setEditLinkMessageModalVisible(true);
        setModalHeader("Success");
        setModalMessage("File successfully updated.");
        setAddLinkLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAddLinkLoading(false);
      });
  };

  const editLink = async (userLinkIndex, userLinkURL) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    await axios
      .patch(
        `${BASE_URL}api/edit-link/${userLinkIndex}`,
        {
          userUUID: userUUID,
          userLinkURL: userLinkURL,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let linkResponse = response.data.data;
        if (linkResponse.duplicateLink) {
          setEditLinkMessageModalVisible(true);
          setModalHeader("Error");
          setModalMessage(linkResponse.duplicateLink);
        } else {
          let userLinks = linkResponse.userLinks;
          setUserLinks(userLinks);
          setEditLinkMessageModalVisible(true);
          setModalHeader("Success");
          setModalMessage("Link successfully updated.");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const editCustomLink = async (userLinkIndex, userLinkName, userLinkURL) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    // console.log(userLinkIndex)
    await axios
      .patch(
        `${BASE_URL}api/edit-custom-link/${userLinkIndex}`,
        {
          userUUID: userUUID,
          userLinkName: userLinkName,
          userLinkURL: userLinkURL,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        let linkResponse = response.data.data;
        if (linkResponse.duplicateLink) {
          setEditLinkMessageModalVisible(true);
          setModalHeader("Error");
          setModalMessage(linkResponse.duplicateLink);
        } else {
          let userLinks = linkResponse.userLinks;
          setUserLinks(userLinks);
          setEditLinkMessageModalVisible(true);
          setModalHeader("Success");
          setModalMessage("Link successfully updated.");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  //DISCONTINUED
  const editPaymentPhoto = async (
    userLinkID,
    userLinkIndex,
    paymentPhotoURI,
    paymentPhotoFileName,
    paymentPhotoFileType
  ) => {
    setUserLinksLoading(true);
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    let formData = new FormData();

    formData.append("paymentPhoto", {
      uri: paymentPhotoURI,
      name: paymentPhotoFileName,
      type: paymentPhotoFileType,
    });

    formData.append("userLinkID", userLinkID);
    formData.append("userLinkIndex", userLinkIndex);
    formData.append("userUUID", userUUID);
    await axios({
      method: "POST",
      url: `${BASE_URL}api/edit-payment-photo`,
      data: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        let userLinks = response.data;
        setUserLinks(userLinks);
        setEditLinkMessageModalVisible(true);
        setModalHeader("Success");
        setModalMessage("Link successfully updated");
        setUserLinksLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setUserLinksLoading(false);
      });
  };

  const setDirectLink = async (linkIndex) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    await axios
      .patch(
        `${BASE_URL}api/set-direct-link/${userUUID}`,
        {
          linkIndex: linkIndex,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserDirectLink(1);
        setUserDirectLinkID(linkIndex);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const removeDirectLink = async () => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    await axios
      .patch(
        `${BASE_URL}api/remove-direct-link/${userUUID}`,
        {},
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

  const addConnection = async (connectionUUID) => {
    setPublicLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    console.log(userUUID);
    await axios
      .post(
        `${BASE_URL}api/addConnection`,
        {
          userUUID: userUUID,
          connectionUUID: connectionUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let userConnections = response.data.userConnections;
        let connectionStatus = response.data.connectionStatus;
        setUserConnections(userConnections);
        setUserConnectionStatus(connectionStatus);

        console.log(response.data);
        setViewConnectionModalVisible(true);
        setModalHeader("Success");
        setModalMessage("Connection added successfully!");
        setPublicLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setPublicLoading(false);
      });
  };

  const unblockConnection = async (blockID) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/unblockConnection/${blockID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        setShowSuccessModal(true);
        setModalHeader("Success");
        setModalMessage(response.data.success);
        let blockedConnections = response.data.blockedConnections;
        setUserBlockedConnections(blockedConnections);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const showBlockedConnections = async () => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/showBlockedConnections/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let blockedConnections = response.data.blockedConnections;
        setUserBlockedConnections(blockedConnections);
        console.log(blockedConnections);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const showPublicProfile = async (code) => {
    setPublicProfileLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    console.log(userUUID);

    await axios
      .get(`${BASE_URL}api/publicProfile/${code}/${userUUID}`, {})
      .then((response) => {
        if (response.data.userNotFound) {
          setUserNotFound(true);
        } else {
          let privateStatus = response.data.privateStatus;
          let blockStatus = response.data.blockStatus;
          let publicProfileData = response.data.publicProfileInfo;
          let publicProfileLinks = response.data.publicProfileLinks;
          let publicProfileDirectLink = response.data.publicProfileDirectLink;
          let connectionStatus = response.data.connectionStatus;

          // if (publicProfileData) {
          addProfileTap(response.data.publicProfileInfo.usr_uuid);
          addProfileView(response.data.publicProfileInfo.usr_uuid);

          setUserPrivateStatus(privateStatus);
          setUserBlockStatus(blockStatus);
          setPublicProfileInfo(publicProfileData);
          setPublicProfileLinks(publicProfileLinks);
          setPublicProfileDirectLink(publicProfileDirectLink);
          setPublicConnectionStatus(connectionStatus);
          // console.log("DATA: " + response.data.publicProfileInfo);
        }
        // } else if (publicProfileData == undefined) {
        //   setPublicProfileInfo(null);
        // }
        console.log(response.data);
        // console.log(publicProfileLinks);
        setPublicProfileLoading(false);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        setPublicProfileLoading(false);
      });
  };

  const getUserTheme = async () => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getUserTheme/${userUUID}`, {})
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const activateYeetDevice = async (code) => {
    setNfcDeviceLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/activateYeetDevice/${code}`,
        {
          userUUID: userUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let responseData = response.data.data;
        if (responseData.invalidCode) {
          console.log(responseData.invalidCode);

          setShowModal(true);
          setModalHeader("Error");
          setModalMessage(responseData.invalidCode);
        } else if (responseData.ownedDevice) {
          console.log(responseData.ownedDevice);

          setShowModal(true);
          setModalHeader("Error");
          setModalMessage(responseData.ownedDevice);
        } else if (responseData.deviceTaken) {
          console.log(responseData.deviceTaken);

          setShowModal(true);
          setModalHeader("Device Taken");
          setModalMessage(responseData.deviceTaken);
        } else if (responseData.devicesData) {
          console.log(responseData.devicesData);

          setShowModal(true);
          setModalHeader("Success");
          setModalMessage(responseData.devicesData.success);
          setUserActiveYeetDevice(
            responseData.devicesData.yeetDevices.nfc_code
          );
          setUserNFCDevices(responseData.devicesData.yeetDevices);
        }
        setNfcDeviceLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setNfcDeviceLoading(false);
      });
  };

  const getYeetDevices = async () => {
    setNfcDeviceLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getYeetDevices/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setUserNFCDevices(response.data);
        setNfcDeviceLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setNfcDeviceLoading(false);
      });
  };

  const getActiveYeetDevice = async () => {
    // setNfcDeviceLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getActiveYeetDevice/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let nfcDevice = response.data.nfcDevice;
        console.log("NFC Active Device: " + nfcDevice);

        if (response.data.nfcDevice) {
          setUserActiveYeetDevice(nfcDevice);
          SecureStore.setItemAsync("userActiveYeetDevice", nfcDevice);
        }
        // setNfcDeviceLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        // setNfcDeviceLoading(false);
      });
  };

  const displayYeetDevice = async (yeetID, yeetCode) => {
    // setNfcDeviceLoading(true);
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/displayYeetDevice/${yeetCode}`,
        {
          userUUID: userUUID,
          yeetID: yeetID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        let activeYeetDevice = response.data.activeYeetDevice;
        setUserActiveYeetDevice(activeYeetDevice);

        setShowSuccessModal(true);
        setModalHeader("Success");
        setModalMessage(response.data.success);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const disconnectYeetDevice = async (code) => {
    setNfcDeviceLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/disconnectYeetDevice/${code}`,
        {
          userUUID: userUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        let yeetDevices = response.data.yeetDevices;
        setUserNFCDevices(yeetDevices);

        setShowSuccessModal(true);
        setModalHeader("Success");
        setModalMessage(response.data.success);
        setNfcDeviceLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setNfcDeviceLoading(false);
      });
  };

  const downloadVCF = async (
    // profilePhotoURI,
    // profilePhotoName,
    // profilePhotoType,
    firstName,
    lastName,
    mobileNumber,
    email,
    linkNames,
    linkURLSwifi
  ) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    // let formData = new FormData();

    // formData.append("profilePhoto", {
    //   uri: profilePhotoURI,
    //   name: profilePhotoName,
    //   type: profilePhotoType,
    // });
    await axios
      .post(
        `${BASE_URL}api/saveContact`,
        {
          userUUID: userUUID,
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          email: email,
          linkNames: linkNames,
          linkURLS: linkURLS,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
          "Content-Type": "multipart/form-data",
        }
      )
      .then((response) => {
        console.log(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const getInsights = async () => {
    setInsightsLoading(true);
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(
        `${BASE_URL}api/getInsights/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        let userProfileTaps = response.data.userProfileTaps;
        let userLinksInsights = response.data.userLinksInsights;
        let totalUserLinkTaps = response.data.totalUserLinkTaps;
        let totalUserConnections = response.data.totalUserConnections;
        let totalProfileViews = response.data.totalProfileViews;

        setUserProfileTaps(userProfileTaps);
        setUserLinksInsights(userLinksInsights);
        setTotalUserLinkTaps(totalUserLinkTaps);
        setTotalUserConnections(totalUserConnections);
        setTotalProfileViews(totalProfileViews);

        console.log(response.data);
        setInsightsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setInsightsLoading(false);
      });
  };

  const addProfileTap = async (userUUID) => {
    // let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/addProfileTap/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const addProfileView = async (userUUID) => {
    // let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/addProfileView/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const addLinkTap = async (userLinkID) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/addLinkTap/${userLinkID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    setSplashLoading(true);
    getUserData();
  };

  const clearAll = () => {
    SecureStore.deleteItemAsync("userUUID");
    SecureStore.deleteItemAsync("userToken");
    SecureStore.deleteItemAsync("userName");
    SecureStore.deleteItemAsync("userBio");
    SecureStore.deleteItemAsync("userProfilePhoto");
    SecureStore.deleteItemAsync("userCoverPhoto");
    SecureStore.deleteItemAsync("userActiveYeetDevice");

    setUserInfo({});
    setUserNFCDevices({});
    setUserActiveYeetDevice({});
    setUserBlockedConnections({});
    setUserToken();
    setUserLinks({});
    setUserDirectLink();
    setUserDirectLinkID();
    setUserConnections({});
    setUserConnectionData({});
    setUserConnectionLinks({});
    setUserConnectionStatus();
    setUserBlockStatus();
    setUserPrivateStatus();
    setPublicProfileInfo({});
    setPublicProfileLinks({});
    setPublicProfileDirectLink();
    setPublicConnectionStatus();
    setUserProfileTaps({});
    setUserLinksInsights({});
    setTotalUserLinkTaps();
    setTotalUserConnections();
    setTotalProfileViews();
    setUserTheme({});
    setUserName();
    setUserBio();
    setUserCoverPhoto();
    setUserProfilePhoto();
    setTempCoverPhoto();
    setTempProfilePhoto();
    setTempUserBio();
    setTempUserName();
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        //IMPORTANT STATES
        isLoading,
        setIsLoading,
        splashLoading,
        showModal,
        setShowModal,
        showButtonModal,
        setShowButtonModal,
        showInputModal,
        setShowInputModal,
        setShowSuccessModal,
        showSuccessModal,
        refreshing,
        setRefreshing,
        setModalHeader,
        setModalMessage,
        setErrorMessage,
        checkPassword,
        passwordMatched,
        setPasswordMatched,
        setSplashLoading,
        setUserInfoLoading,
        setModalHeader,
        setModalMessage,
        setPublicProfileLoading,
        publicProfileLoading,

        //FOR REGISTER
        valid,
        setValid,
        registered,
        setRegistered,

        register,

        //FOR PASSWORD RESET
        validEmail,
        setValidEmail,
        resetPassword,
        validCode,
        setValidCode,
        validPassword,
        setValidPassword,
        checkPasswordResetCode,
        newPassword,

        //FOR CHECKING IF LOGGED IN
        isLoggedIn,

        //FOR LOGIN
        userInfo,
        setErrorMessage,
        errorMessage,
        setSuccessMessage,
        successMessage,
        login,
        getUserLinks,
        setUserLinks,
        userLinks,
        userToken,
        getUserTheme,
        userTheme,
        setUserTheme,

        //NFC STUFF

        //MODAL MESSAGE
        modalHeader,
        modalMessage,

        //ACTIVATE/REMOVE YEET DEVICE
        nfcDeviceLoading,
        setNfcDeviceLoading,
        getActiveYeetDevice,
        userActiveYeetDevice,
        setUserActiveYeetDevice,
        userNFCDevices,
        setUserNFCDevices,
        activateYeetDevice,
        getYeetDevices,
        displayYeetDevice,
        disconnectYeetDevice,

        //TOGGLE NOTIFICATIONS/ACCOUNT PRIVACY
        toggleNotifications,
        toggleAccountPrivacy,

        //SECOND OPTION

        //ADD LINKS
        addLinkLoading,
        setAddLinkLoading,
        showAddLinkMessage,
        setShowAddLinkMessage,

        //EDIT LINKS
        editLink,
        editCustomLink,
        editPaymentPhoto,
        editFile,
        editYouTubeLink,

        //REMOVE LINKS
        removeLink,

        //SET DIRECT LINK
        setDirectLink,
        userDirectLink,
        setUserDirectLink,
        userDirectLinkID,
        setUserDirectLinkID,

        //REMOVE DIRECT LINK
        removeDirectLink,

        // getUserData,
        getUserData,

        //UPDATE USER
        updateProfile,
        updateSuccessModalVisible,
        setUpdateSuccessModalVisible,
        updateErrorModalVisible,
        setUpdateErrorModalVisible,

        updatePassword,
        updateMobileNumber,

        //FOR GETTING USER CONNECTIONS
        userConnections,
        setUserConnections,
        userConnectionStatus,
        setUserConnectionStatus,
        userConnectionData,
        setUserConnectionData,
        userConnectionLinks,
        setUserConnectionLinks,
        userBlockStatus,
        setUserBlockStatus,
        unblockConnection,
        showBlockedConnections,
        userBlockedConnections,
        userPrivateStatus,
        setUserPrivateStatus,
        connectionsScreenModalVisible,
        setConnectionsScreenModalVisible,

        //FOR LOGOUT
        logout,

        //FETCHING DATA LOADING STATES
        userInfoLoading,
        userLinksLoading,
        userConnectionsLoading,
        setUserConnectionsLoading,

        //publicProfile
        showPublicProfile,
        publicProfileInfo,
        publicProfileLinks,
        publicProfileDirectLink,
        publicConnectionStatus,
        addConnection,
        publicLoading,
        userNotFound,
        setUserNotFound,

        //DEACTIVATE/DELETE ACCOUNT
        deactivateAccount,
        deleteAccount,

        //DOWNLOAD AS VCF
        downloadVCF,

        //INSIGHTS
        getInsights,
        userProfileTaps,
        setUserProfileTaps,
        userLinksInsights,
        setUserLinksInsights,
        totalUserLinkTaps,
        setTotalUserLinkTaps,
        totalUserConnections,
        setTotalUserConnections,
        addProfileTap,
        addLinkTap,
        addProfileView,
        totalProfileViews,
        setTotalProfileViews,
        insightsLoading,
        setInsightsLoading,
        manageAccountLoading,
        setManageAccountLoading,

        //MODAL SHOW STATES
        loginModalVisible,
        setLoginModalVisible,
        lockedAccountModalVisible,
        setLockedAccountModalVisible,
        forgotEmailModalVisible,
        setForgotEmailModalVisible,
        resetCodeModalVisible,
        setResetCodeModalVisible,
        newPasswordModalVisible,
        setNewPasswordModalVisible,
        registrationModalVisible,
        setRegistrationModalVisible,
        confirmEmailModalVisible,
        setConfirmEmailModalVisible,
        inputNameModalVisible,
        setInputNameModalVisible,
        mobileNumberModalVisible,
        setMobileNumberModalVisible,
        addLinksModalVisible,
        setAddLinksModalVisible,
        viewConnectionModalVisible,
        setViewConnectionModalVisible,
        successPasswordModalVisible,
        setSuccessPasswordModalVisible,
        errorPasswordModalVisible,
        setErrorPasswordModalVisible,
        editLinkMessageModalVisible,
        setEditLinkMessageModalVisible,
        updateAccountModalVisible,
        setUpdateAccountModalVisible,
        updatePasswordErrorModalVisible,
        setUpdatePasswordErrorModalVisible,
        updatePasswordSuccessModalVisible,
        setUpdatePasswordSuccessModalVisible,
        welcomeModalVisible,
        setWelcomeModalVisible,
        deactivateModalVisible,
        setDeactivateModalVisible,
        invalidPasswordModalVisible,
        setInvalidPasswordModalVisible,
        reactivateModalVisible,
        setReactivateModalVisible,
        deleteAccountModalVisible,
        setDeleteAccountModalVisible,
        finalConfirmationModalVisible,
        setFinalConfirmationModalVisible,

        //CACHED DATA
        userName,
        setUserName,
        tempUserName,
        setTempUserName,
        userBio,
        setUserBio,
        tempUserBio,
        setTempUserBio,
        userCoverPhoto,
        setUserCoverPhoto,
        userProfilePhoto,
        setUserProfilePhoto,
        tempCoverPhoto,
        setTempCoverPhoto,
        tempProfilePhoto,
        setTempProfilePhoto,

        //clear all
        clearAll,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
