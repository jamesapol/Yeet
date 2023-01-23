import axios from "axios";
import React, { createContext } from "react";

import * as SecureStore from "expo-secure-store";

import { BASE_URL } from "../config";
import * as Device from "expo-device";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //LOGGED IN USER ALL DATA
  const [userInfo, setUserInfo] = useState({});
  const [userNFCDevices, setUserNFCDevices] = useState({});
  const [userActiveNFCDevice, setUserActiveNFCDevice] = useState({});
  const [notificationCount, setNotificationCount] = useState();

  const [nfcDeviceLoading, setNfcDeviceLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);

  //LOGIN ATTEMPTS
  const [attemptCount, setAttemptCount] = useState(0);

  //PASSWORD MATCHING
  const [passwordMatched, setPasswordMatched] = useState(false);

  //USER BLOCKED CONNECTIONS
  const [userBlockedConnections, setUserBlockedConnections] = useState({});

  //UPDATE PROFILE STATES
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  //LOGGED IN USER LINKS
  const [userLinks, setUserLinks] = useState({});
  const [userLinksLoading, setUserLinksLoading] = useState(false);
  //AUTH TOKEN
  const [userToken, setUserToken] = useState();
  //GET ALL LINKS FROM DATABASE
  const [allLinks, setAllLinks] = useState({});
  const [addLinkLoading, setAddLinkLoading] = useState(false);
  const [showAddLinkMessage, setShowAddLinkMessage] = useState(false);

  const [linksUserDoesNotHave, setLinksUserDoesNotHave] = useState({});
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

  //PREVIEW PROFILE STUFF
  const [previewName, setPreviewName] = useState();
  const [previewBio, setPreviewBio] = useState();
  const [previewProfilePhotoURI, setPreviewProfilePhotoURI] = useState();
  const [previewCoverPhotoURI, setPreviewCoverPhotoURI] = useState();

  const [publicProfileInfo, setPublicProfileInfo] = useState({});
  const [publicProfileLinks, setPublicProfileLinks] = useState({});
  const [publicProfileDirectLink, setPublicProfileDirectLink] = useState();
  const [publicConnectionStatus, setPublicConnectionStatus] = useState();
  const [publicLoading, setPublicLoading] = useState(false);

  const [userNotifications, setUserNotifications] = useState({});
  const [userNotificationsLoading, setUserNotificationsLoading] =
    useState(false);
  const [notificationConnection, setNotificationConnection] = useState({});
  const [notificationConnectionLinks, setNotificationConnectionLinks] =
    useState({});

  //INSIGHTS
  const [totalTaps, setTotalTaps] = useState();
  const [linkTaps, setLinkTaps] = useState();

  const [userProfileTaps, setUserProfileTaps] = useState();
  const [userLinksInsights, setUserLinksInsights] = useState({});
  const [totalUserLinkTaps, setTotalUserLinkTaps] = useState();
  const [totalUserConnections, setTotalUserConnections] = useState();

  const [userTheme, setUserTheme] = useState({});

  //MODAL STATES
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

  const [updateAccountModalVisible, setUpdateAccountModalVisible] =
    useState(false);
  const [updatePasswordErrorModalVisible, setUpdatePasswordErrorModalVisible] =
    useState(false);
  const [
    updatePasswordSuccessModalVisible,
    setUpdatePasswordSuccessModalVisible,
  ] = useState(false);

  //LOADING STATES
  const [loginLoading, setLoginLoading] = useState(false);
  const [forgotPasswordEmailLoading, setForgotPasswordEmailLoading] =
    useState(false);

  const [publicProfileLoading, setPublicProfileLoading] = useState(false);
  const [insightsLoading, setInsightsLoading] = useState(false);

  //REGISTRATION STEP 1
  const checkEmailAvailability = (email, password, confirmPassword) => {
    setValid(false);
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}api/checkEmailAvailability`,
        {
          email: email,
          password: password,
          password_confirmation: confirmPassword,
          deviceName: Device.modelName,
        },
        {}
      )
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setValid(true);
      })
      .catch((e) => {
        console.log("Error: " + e);
        setShowModal(true);
        setErrorMessage(
          e.response.data.errors.email && e.response.data.errors.password
            ? e.response.data.message
            : e.response.data.errors.email
            ? e.response.data.errors.email
            : e.response.data.errors.password
            ? e.response.data.errors.password
            : ""
        );
        console.log(
          e.response.data.errors.email && e.response.data.errors.password
            ? e.response.data.message
            : e.response.data.errors.email
            ? e.response.data.errors.email
            : e.response.data.errors.password
            ? e.response.data.errors.password
            : ""
        );
        setValid(false);
        setIsLoading(false);
      });
  };

  const checkConfirmationCode = async (code, email) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}api/checkConfirmationCode`, {
        code: code,
        email: email,
      })
      .then((response) => {
        if (response.data.code == 200) {
          setValid(true);
        } else if (response.data.code == 401) {
          setValid(false);
          setConfirmEmailModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.error);
        }
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setConfirmEmailModalVisible(true);
        setModalHeader("Error");
        setModalMessage(e.response.data.errors);
        console.log(e.response.data);
        setIsLoading(false);
      });
    // console.log(code)
  };

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
    setUserLinksLoading(true);
    if (!fileUri) {
      await axios
        .post(`${BASE_URL}api/register`, {
          fullName: fullName,
          email: email,
          password: password,
          deviceName: Device.modelName,
          mobileNumber: mobileNumber,
        })
        .then((response) => {
          setRegistered(true);

          let userInfo = response.data;
          setUserInfo(userInfo.user);
          setUserActiveNFCDevice(userInfo.activeNFCDevice);
          setUserNFCDevices(userInfo.nfcDevice);
          setUserToken(userInfo.token);
          setUserDirectLink(userInfo.user.usr_direct_link_active);
          setUserDirectLinkID(userInfo.user.uln_id);
          setUserLinks(userInfo.userLinks);
          setUserTheme(userInfo.userTheme);

          SecureStore.setItemAsync("userUUID", userInfo.user.usr_uuid);
          SecureStore.setItemAsync("userToken", userInfo.token);

          setUserInfoLoading(false);
          setUserLinksLoading(false);
          console.log(userInfo);
        })
        .catch((e) => {
          console.log(e.response.data);
          setIsLoading(false);
          setRegistered(false);
        });
    } else {
      let formData = new FormData();

      formData.append("profileImage", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
      console.log(fileUri + fileName + fileType);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("deviceName", Device.modelName);
      formData.append("mobileNumber", mobileNumber);

      await axios({
        method: "POST",
        url: `${BASE_URL}api/register`,
        data: formData,
        // body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          setRegistered(true);

          let userInfo = response.data;
          setUserInfo(userInfo.user);
          setUserActiveNFCDevice(userInfo.activeNFCDevice);
          setUserNFCDevices(userInfo.nfcDevice);
          setUserToken(userInfo.token);
          setUserDirectLink(userInfo.user.usr_direct_link_active);
          setUserDirectLinkID(userInfo.user.uln_id);
          setUserLinks(userInfo.userLinks);
          setUserTheme(userInfo.userTheme);

          SecureStore.setItemAsync("userUUID", userInfo.user.usr_uuid);
          SecureStore.setItemAsync("userToken", userInfo.token);

          setUserInfoLoading(false);
          setUserLinksLoading(false);
          console.log(userInfo);
        })
        .catch((error) => {
          console.log(error);
          setUserInfoLoading(false);
          setUserLinksLoading(false);
        });
    }
    ///////////////THIS IS WORKING/////////////
    // await fetch(`${BASE_URL}api/register`, {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((response) => {
    //     console.log("YAWA");
    //     console.log(response.data);
    //     response.json();
    //     setIsLoading(false);
    //     setRegistered(true);
    //   })
    //   .catch((error) => {
    //     console.log("ANIMAL");
    //     console.log(error);
    //     setIsLoading(false);
    //     setRegistered(false);
    //   });
    //////////////////////////////////////////
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
    setUserInfoLoading(true);
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
    formData.append("userBio", userBio);
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
        let userInfo = response.data;
        setShowUpdateSuccess(true);
        setUserInfo(userInfo);
        setUserInfoLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setUserInfoLoading(false);
      });
  };

  const updateEmail = async (newEmail, password) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    axios
      .patch(
        `${BASE_URL}api/updateUserEmail/${userUUID}`,
        {
          newEmail: newEmail,
          password: password,
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
        if (response.data.passwordError) {
          console.log(response.data.passwordError);
          setShowModal(true);
          setErrorMessage(response.data.passwordError);
        } else if (response.data.emailError) {
          console.log(response.data.emailError);
          setShowModal(true);
          setErrorMessage(response.data.emailError);
        } else {
          let userInfo = response.data.user;
          console.log(userInfo);
          setUserInfo(userInfo);
          setShowModal(true);
          setSuccessMessage(response.data.success);
        }
        // console.log(response)
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.errors.newEmail);
        setShowModal(true);
        setErrorMessage(error.response.data.errors.newEmail);
        setIsLoading(false);
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
          setIsLoading(false);
          setValidEmail(false);
          setForgotEmailModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.emailError);
        } else {
          setIsLoading(false);
          setValidEmail(true);
        }
        // setIsLoading(false);
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
    setIsLoading(true);

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
          setShowModal(true);
          setModalHeader("Error");
          setModalMessage(response.data.passwordError);
        } else if (response.data.success) {
          setShowModal(true);
          setModalHeader("Success");
          setModalMessage(response.data.success);

          SecureStore.deleteItemAsync("userInfo");
          SecureStore.deleteItemAsync("userUUID");
          SecureStore.deleteItemAsync("userToken");
          // AsyncStorage.removeItem("userInfo");
          setUserToken(null);
          setUserLinks({});
          setUserInfo({});
          setUserActiveNFCDevice({});
          setUserNFCDevices({});
          setAllLinks({});
          setUserConnections({});
          setUserConnectionData({});
          setUserConnectionLinks({});
        }
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const updateProfilePhoto = async (fileUri, fileName, fileType) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    let formData = new FormData();

    formData.append("profilePhoto", {
      uri: fileUri,
      name: fileName,
      type: fileType,
    });

    await axios({
      method: "POST",
      url: `${BASE_URL}api/editProfile/updateProfilePhoto/${userUUID}`,
      data: formData,
      // body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log(userUUID);
        setIsLoading(false);
      });
  };

  const updateCoverPhoto = async (fileUri, fileName, fileType) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");
    let formData = new FormData();

    formData.append("coverPhoto", {
      uri: fileUri,
      name: fileName,
      type: fileType,
    });

    await axios({
      method: "POST",
      url: `${BASE_URL}api/editProfile/updateCoverPhoto/${userUUID}`,
      data: formData,
      // body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        console.log(userUUID);
        setIsLoading(false);
      });
  };

  const updateNameAndBio = async (userName, userBio) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    axios
      .patch(
        `${BASE_URL}api/editProfile/updateNameAndBio/${userUUID}`,
        {
          userName: userName,
          userBio: userBio,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        getUserData(userUUID, userToken);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data);
        setIsLoading(false);
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
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/checkPassword/${userUUID}`,
        {
          password: password,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.passwordError) {
          setPasswordMatched(false);
        } else if (response.data.success) {
          setPasswordMatched(true);
        }
        console.log(passwordMatched);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const login = async (email, password) => {
    // setUserLinksLoading(true);
    setUserInfoLoading(true);
    if (attemptCount < 3) {
      axios
        .post(`${BASE_URL}api/login`, {
          email: email,
          password: password,
          deviceName: Device.modelName,
        })
        .then((response) => {
          if (response.data.emailError) {
            setLoginModalVisible(true);
            setModalHeader("Error");
            setModalMessage(response.data.emailError);
            // setAttemptCount(attemptCount + 1);
            // console.log(attemptCount);
            console.log(response.data);
          } else if (response.data.passwordError) {
            setLoginModalVisible(true);
            setModalHeader("Error");
            setModalMessage(response.data.passwordError);
            setAttemptCount(attemptCount + 1);
            // console.log(attemptCount);
            console.log(response.data);
          } else if (response.data.blockedAccount) {
            setLockedAccountModalVisible(true);
            setModalHeader("Account Locked");
            setModalMessage(response.data.blockedAccount);
            console.log(response.data);
          } else {
            setAttemptCount(0);
            let userInfo = response.data;
            setUserInfo(userInfo.user);
            setUserActiveNFCDevice(userInfo.activeNFCDevice);
            setUserNFCDevices(userInfo.nfcDevice);
            setUserToken(userInfo.token);
            setUserDirectLink(userInfo.user.usr_direct_link_active);
            setUserDirectLinkID(userInfo.user.uln_id);
            setUserLinks(userInfo.userLinks);
            setUserTheme(userInfo.userTheme);
            console.log(userInfo);

            SecureStore.setItemAsync("userUUID", userInfo.user.usr_uuid);
            SecureStore.setItemAsync("userToken", userInfo.token);

            console.log("EXECUTED");
          }
          setUserInfoLoading(false);
        })
        .catch((error) => {
          setUserInfoLoading(false);
          console.log(error.response);
        });
    } else {
      axios
        .post(`${BASE_URL}api/lockProfile`, {
          email: email,
        })
        .then((response) => {
          setLockedAccountModalVisible(true);
          setModalHeader("Account Locked");
          setModalMessage(response.data.blockedAccount);
          setUserInfoLoading(false);
        })
        .catch((error) => {
          setUserInfoLoading(false);
          console.log(error.response);
        });
      setAttemptCount(0);
    }
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}api/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        SecureStore.deleteItemAsync("userInfo");
        SecureStore.deleteItemAsync("userUUID");
        SecureStore.deleteItemAsync("userToken");
        // AsyncStorage.removeItem("userInfo");
        setUserToken(null);
        setUserLinks({});
        setUserInfo({});
        setUserActiveNFCDevice({});
        setUserNFCDevices({});
        setAllLinks({});
        setUserConnections({});
        setUserConnectionData({});
        setUserConnectionLinks({});
        setIsLoading(false);
        setSplashLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data);
        console.log(userInfo.token);
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

  const getUserData = async (uuid, token) => {
    // setIsLoading(true);
    setUserInfoLoading(true);
    await axios
      .get(`${BASE_URL}api/getUserData/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.user);
        let userInfo = response.data;
        setUserInfo(userInfo.user);
        setUserActiveNFCDevice(userInfo.activeNFCDevice);
        setUserNFCDevices(userInfo.nfcDevice);
        setUserToken(userInfo.token);
        setUserDirectLink(userInfo.user.usr_direct_link_active);
        setUserDirectLinkID(userInfo.user.uln_id);
        setUserLinks(userInfo.userLinks);
        setUserTheme(userInfo.userTheme);
        setNotificationCount(userInfo.notificationCount);
        // console.log(response.data);
        console.log("Logged In as: " + userInfo.user.usr_email);
        console.log(
          "Direct Link Active: " + userInfo.user.usr_direct_link_active
        );
        console.log("Direct Link ID: " + userInfo.user.uln_id);
        // console.log(userInfo.notificationCount);
        console.log(userInfo.userLinks);
        // setRefreshing(false);
        // setSplashLoading(false);
        // setIsLoading(false);
        setUserInfoLoading(false);

        setShowModal(false);
      })
      .catch((e) => {
        console.log("User Data Error: " + e.response.data);
        // console.log(userInfo.uuid)
        setUserInfoLoading(false);
        setSplashLoading(false);
        setShowModal(true);
        setErrorMessage("Please check your connection!");
      });
  };

  const getAllLinks = async () => {
    setIsLoading(true);
    setRefreshing(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getAllLinks`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let allLinks = response.data;
        setAllLinks(allLinks);
        // console.log("Links: ", allLinks.socialMedia);
        setRefreshing(false);
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setRefreshing(false);
        setIsLoading(false);
      });
  };

  const getLinksUserDoesNotHave = async () => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getLinksUserDoesNotHave/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let linksUserDoesNotHave = response.data;
        // console.log(linksUserDoesNotHave);
        setLinksUserDoesNotHave(linksUserDoesNotHave);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const removeLinkFromUser = async (userLinkID) => {
    // setUserLinksLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/removeLinkFromUser`,
        {
          userUUID: userUUID,
          userLinkID: userLinkID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);

        // getUserLinks(userUUID, userToken);
        // setIsLoading(false);
      })
      .catch((error) => {
        console(error.response);
        setUserLinksLoading(false);
      });
  };

  const addLink = async (userLinkID, userLinkURLHeader, userLinkURL) => {
    setAddLinkLoading(true);
    // setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/addUserLink`,
        {
          userUUID: userUUID,
          userLinkID: userLinkID,
          userLinkURLHeader: userLinkURLHeader,
          userLinkURL: userLinkURL,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.duplicateLink) {
          setAddLinkLoading(false);
          setAddLinksModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.duplicateLink);
        } else {
          let userLinks = response.data;

          console.log(userLinks);
          setUserLinks(userLinks);
          setAddLinksModalVisible(true);
          setModalHeader("Success");
          setModalMessage("Link saved successfully!");
          // getUserLinks(userUUID, userToken);
          // setIsLoading(false);1
          setAddLinkLoading(false);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const addCustomLink = async (userLinkID, userLinkName, userLinkURL) => {
    setAddLinkLoading(true);
    // setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(
        `${BASE_URL}api/addCustomLink`,
        {
          userUUID: userUUID,
          userLinkID: userLinkID,
          userLinkName: userLinkName,
          userLinkURL: userLinkURL,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.duplicateLink) {
          setAddLinkLoading(false);
          setAddLinksModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.duplicateLink);
        } else {
          let userLinks = response.data;

          console.log(userLinks);
          setUserLinks(userLinks);
          setAddLinksModalVisible(true);
          setModalHeader("Success");
          setModalMessage("Link saved successfully!");
          // getUserLinks(userUUID, userToken);
          // setIsLoading(false);1
          setAddLinkLoading(false);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const uploadPaymentPhoto = async (
    userLinkID,
    paymentPhotoURI,
    paymentPhotoFileName,
    paymentPhotoFileType
  ) => {
    setAddLinkLoading(true);
    // setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    let formData = new FormData();
    formData.append("paymentPhoto", {
      uri: paymentPhotoURI,
      name: paymentPhotoFileName,
      type: paymentPhotoFileType,
    });

    formData.append("userUUID", userUUID);
    formData.append("userLinkID", userLinkID);
    await axios({
      method: "POST",
      url: `${BASE_URL}api/uploadPaymentPhoto`,
      data: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        let userLinks = response.data;
        setUserLinks(userLinks);
        setAddLinksModalVisible(true);
        setAddLinkLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setAddLinkLoading(false);
      });
  };

  const uploadFile = async (fileURI, fileName, fileType, fileTitle) => {
    setAddLinkLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    let formData = new FormData();
    formData.append("file", {
      uri: fileURI,
      name: fileName,
      type: fileType,
    });
    formData.append("originalFileName", fileName);
    formData.append("fileTitle", fileTitle);
    formData.append("userUUID", userUUID);

    await axios({
      method: "POST",
      url: `${BASE_URL}api/uploadFile`,
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
        setAddLinksModalVisible(true);
        setModalHeader("Success");
        setModalMessage("File successfully uploaded.");
        setAddLinkLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAddLinkLoading(false);
      });
  };

  const editFile = async (
    fileURI,
    fileName,
    fileType,
    fileTitle,
    linkIndex
  ) => {
    setUserLinksLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    if (!fileURI) {
      await axios
        .post(
          `${BASE_URL}api/editFile`,
          {
            userUUID: userUUID,
            fileTitle: fileTitle,
            linkIndex: linkIndex,
          },
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          let userLinks = response.data;
          setUserLinks(userLinks);
          setShowSuccessModal(true);
          setModalMessage("File successfully renamed.");
          setUserLinksLoading(false);
        })
        .catch((error) => {
          console.log(error.response.data);
          setUserLinksLoading(false);
        });
    } else {
      let formData = new FormData();
      formData.append("file", {
        uri: fileURI,
        name: fileName,
        type: fileType,
      });
      formData.append("originalFileName", fileName);
      formData.append("fileTitle", fileTitle);
      formData.append("userUUID", userUUID);
      formData.append("linkIndex", linkIndex);

      await axios({
        method: "POST",
        url: `${BASE_URL}api/editFile`,
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
          setShowSuccessModal(true);
          setModalMessage("File successfully uploaded.");
          setUserLinksLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setUserLinksLoading(false);
        });
    }
  };

  const editLink = async (userLinkIndex, userLinkURL) => {
    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/editUserLink/${userUUID}`,
        {
          userUUID: userUUID,
          userLinkIndex: userLinkIndex,
          userLinkURL: userLinkURL,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.duplicateLink) {
          setEditLinkMessageModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.duplicateLink);
        } else {
          let userLinks = response.data.userLinks;
          setUserLinks(userLinks);
          setEditLinkMessageModalVisible(true);
          setModalHeader("Success");
          setModalMessage("Link successfully updated");
        }
        // console.log(response.data);
        // let userLinks = response.data.userLinks;
        // setUserLinks(userLinks);
        // if (userLinksLoading == false) {
        //   setShowModal(true);
        //   setSuccessMessage("Link successfully updated.");
        // }
        // setIsLoading(false);
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
        `${BASE_URL}api/editCustomLink/${userUUID}`,
        {
          userUUID: userUUID,
          userLinkIndex: userLinkIndex,
          userLinkName: userLinkName,
          userLinkURL: userLinkURL,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.duplicateLink) {
          setEditLinkMessageModalVisible(true);
          setModalHeader("Error");
          setModalMessage(response.data.duplicateLink);
        } else {
          let userLinks = response.data.userLinks;
          setUserLinks(userLinks);
          setShowModal(true);
          setModalHeader("Success");
          setSuccessMessage("Link successfully updated");
        }
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
      url: `${BASE_URL}api/editPaymentPhoto`,
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
        setUserLinksLoading(false);
        if (userLinksLoading == false) {
          setShowSuccessModal(true);
          setSuccessMessage("Payment Image successfully updated.");
        }
      })
      .catch((error) => {
        console.log(error.response);
        setUserLinksLoading(false);
      });
  };

  const setDirectLink = async (linkID) => {
    // setUserInfoLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/setDirectLink/${userUUID}`,
        {
          linkID: linkID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserDirectLink(1);
        setUserDirectLinkID(linkID);
        // getUserData(userUUID, userToken);
        // getUserLinks(userUUID, userToken);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const removeDirectLink = async () => {
    // setUserInfoLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/removeDirectLink/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        // getUserData(userUUID, userToken);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
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
        // console.log(userConnectionLinks);
        console.log(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const showProfileFromQR = async (code) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    console.log(userUUID);

    await axios
      .get(`${BASE_URL}api/showProfileFromQR/${code}/${userUUID}`, {})
      .then((response) => {
        let blockStatus = response.data.blockStatus;
        setUserBlockStatus(blockStatus);

        let userConnectionData = response.data.userProfileData;
        setUserConnectionData(userConnectionData);

        let userConnectionLinks = response.data.userProfileLinks;
        setUserConnectionLinks(userConnectionLinks);

        let userConnectionStatus = response.data.connectionStatus;
        setUserConnectionStatus(userConnectionStatus);
        // console.log(userConnectionLinks);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        setIsLoading(false);
      });
  };

  const leaveNote = async (note, connectionUUID) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/leaveNote/${connectionUUID}`,
        {
          note: note,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let successMessage = response.data.success;
          console.log(successMessage);

          setShowSuccessModal(true);
          setModalHeader("Success");
          setModalMessage(successMessage);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const reportConnection = async (report, connectionUUID) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/reportConnection/${connectionUUID}`,
        {
          report: report,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let successMessage = response.data.success;
          console.log(successMessage);

          setShowSuccessModal(true);
          setModalHeader("Success");
          setModalMessage(successMessage);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const deleteConnection = async (connectionUUID) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/deleteConnection/`,
        {
          userUUID: userUUID,
          connectionUUID: connectionUUID,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          let successMessage = response.data.success;
          let userConnections = response.data.userConnections;
          setUserConnections(userConnections);
          console.log(successMessage);

          setShowSuccessModal(true);
          setModalHeader("Success");
          setModalMessage(successMessage);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
      });
  };

  const blockConnection = async (connectionConnUUID, connectionUUID) => {
    setIsLoading(true);

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
        if (response.data.success) {
          let successMessage = response.data.success;
          let userConnections = response.data.userConnections;
          setUserConnections(userConnections);
          console.log(successMessage);

          setShowSuccessModal(true);
          setModalHeader("Success");
          setModalMessage(successMessage);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
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
        let privateStatus = response.data.privateStatus;
        let blockStatus = response.data.blockStatus;
        let publicProfileData = response.data.publicProfileInfo;
        let publicProfileLinks = response.data.publicProfileLinks;
        let publicProfileDirectLink = response.data.publicProfileDirectLink;
        let connectionStatus = response.data.connectionStatus;

        addProfileTap(response.data.publicProfileInfo.usr_uuid)

        setUserPrivateStatus(privateStatus);
        setUserBlockStatus(blockStatus);
        setPublicProfileInfo(publicProfileData);
        setPublicProfileLinks(publicProfileLinks);
        setPublicProfileDirectLink(publicProfileDirectLink);
        setPublicConnectionStatus(connectionStatus);
        console.log(response.data);
        // console.log(publicProfileLinks);
        setPublicProfileLoading(false);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        setPublicProfileLoading(false);
      });
  };

  const checkConnectionStatus = async (connectionUUID) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .post(`${BASE_URL}api/checkConnectionStatus`, {
        userUUID: userUUID,
        connectionUUID: connectionUUID,
      })
      .then((response) => {
        let connectionStatus = response.connectionStatus;

        setPublicConnectionStatus(connectionStatus);
        console.log(connectionStatus);
        // console.log(publicProfileLinks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setIsLoading(false);
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
        // console.log(response.data)
        if (response.data.error) {
          console.log(response.data.error);

          setShowModal(true);
          setModalHeader("Error");
          setModalMessage(response.data.error);
        } else if (response.data.ownedDevice) {
          console.log(response.data.ownedDevice);

          setShowModal(true);
          setModalHeader("Error");
          setModalMessage(response.data.ownedDevice);
        } else if (response.data.deviceTaken) {
          console.log(response.data.deviceTaken);

          setShowModal(true);
          setModalHeader("Device Taken");
          setModalMessage(response.data.deviceTaken);
        } else if (response.data.success) {
          console.log(response.data.success);

          setShowModal(true);
          setModalHeader("Success");
          setModalMessage(response.data.success);
          console.log(response.data.yeetDevices);
          setUserNFCDevices(response.data.yeetDevices);
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
    setNfcDeviceLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getActiveYeetDevice/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        console.log("NFC Active Device: " + response.data);
        if (response.data) {
          console.log("YAWA");
        }
        setUserActiveNFCDevice(response.data);
        setNfcDeviceLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setNfcDeviceLoading(false);
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
        setUserActiveNFCDevice(activeYeetDevice);

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

  const getUserNotifications = async () => {
    setUserNotificationsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/getNotifications/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
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

  const readNotification = async () => {
    setUserNotificationsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .patch(
        `${BASE_URL}api/readNotification/${userUUID}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((response) => {
        let userNotifications = response.data.userNotifications;
        setUserNotifications(userNotifications);
        // setNotificationCount(0);
        setUserNotificationsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setUserNotificationsLoading(false);
      });
  };

  const openNotification = async (connectionUUID) => {
    setIsLoading(true);

    let userUUID = await SecureStore.getItemAsync("userUUID");
    let userToken = await SecureStore.getItemAsync("userToken");

    await axios
      .get(`${BASE_URL}api/openNotification/${connectionUUID}/${userUUID}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        let userConnectionData = response.data.connectionData;
        setUserConnectionData(userConnectionData);

        let userConnectionLinks = response.data.connectionLinks;
        setUserConnectionLinks(userConnectionLinks);

        let publicConnectionStatus = response.data.connectionStatus;
        setPublicConnectionStatus(publicConnectionStatus);
        // console.log(userConnectionLinks);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const removeNotification = async (notificationID) => {
    // setUserNotificationsLoading(true);

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

  const uploadPhoto = (imageURI, imageType, imageName) => {
    // setIsLoading(true);
    axios
      .post(
        `${BASE_URL}api/uploadPhoto`,
        {
          fileURI: imageURI,
          fileType: imageType,
          fileName: imageName,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response.data);
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
        let userProfileTaps = response.data.userProfileTaps;
        let userLinksInsights = response.data.userLinksInsights;
        let totalUserLinkTaps = response.data.totalUserLinkTaps;
        let totalUserConnections = response.data.totalUserConnections;

        setUserProfileTaps(userProfileTaps);
        setUserLinksInsights(userLinksInsights);
        setTotalUserLinkTaps(totalUserLinkTaps);
        setTotalUserConnections(totalUserConnections);

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
    try {
      setSplashLoading(true);
      setUserInfoLoading(true);
      // let userInfo = await SecureStore.getItemAsync("userInfo");
      // userInfo = await JSON.parse(userInfo);

      let userUUID = await SecureStore.getItemAsync("userUUID");
      let userToken = await SecureStore.getItemAsync("userToken");

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
        await axios
          .get(`${BASE_URL}api/getUserData/${userUUID}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            // console.log(response.data.user);
            let userInfo = response.data;
            let userTheme = response.data.userTheme;

            setUserInfo(userInfo.user);
            setUserActiveNFCDevice(userInfo.activeNFCDevice);
            setUserNFCDevices(userInfo.nfcDevice);
            setUserToken(userInfo.token);
            setUserDirectLink(userInfo.user.usr_direct_link_active);
            setUserDirectLinkID(userInfo.user.uln_id);
            setUserLinks(userInfo.userLinks);
            setUserTheme(userInfo.userTheme);
            setNotificationCount(userInfo.notificationCount);

            console.log("Logged In as: " + userInfo.user.usr_email);
            console.log(
              "Direct Link Active: " + userInfo.user.usr_direct_link_active
            );
            console.log("Direct Link ID: " + userInfo.user.uln_id);
            console.log("Notification Count: " + userInfo.notificationCount);
            // setRefreshing(false);
            // setIsLoading(false);
            setSplashLoading(false);
            setUserInfoLoading(false);
            // setIsLoading(false);
            setPublicLoading(false);
            setAddLinkLoading(false);
            setUserLinksLoading(false);
            setNfcDeviceLoading(false);
            setUserConnectionsLoading(false);
            setShowModal(false);
          })
          .catch((e) => {
            console.log("Logged In User Data Error: " + e.response.data);
            setSplashLoading(false);
            // console.log(userInfo.uuid)setSplashLoading(false);
            setUserInfoLoading(false);
            // setIsLoading(false);
            setPublicLoading(false);
            setAddLinkLoading(false);
            setUserLinksLoading(false);
            setNfcDeviceLoading(false);
            setUserConnectionsLoading(false);
            setShowModal(false);
            setShowModal(true);
            setErrorMessage("Please check your connection!");
          });
      }
    } catch (e) {
      setSplashLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    if (attemptCount >= 3) {
      console.log("PRISO");
    }
    console.log(attemptCount);
  }, [attemptCount]);

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

        //FOR EMAIL CHECKING (REGISTRATION STEP 1)
        checkEmailAvailability,

        //FOR CODE CONFIRMATION
        checkConfirmationCode,

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
        notificationCount,
        setNotificationCount,

        //NFC STUFF

        //MODAL MESSAGE
        modalHeader,
        modalMessage,

        //ACTIVATE/REMOVE YEET DEVICE
        nfcDeviceLoading,
        setNfcDeviceLoading,
        getActiveYeetDevice,
        userActiveNFCDevice,
        setUserActiveNFCDevice,
        userNFCDevices,
        setUserNFCDevices,
        activateYeetDevice,
        getYeetDevices,
        displayYeetDevice,
        disconnectYeetDevice,

        //TOGGLE NOTIFICATIONS/ACCOUNT PRIVACY
        toggleNotifications,
        toggleAccountPrivacy,

        //VIEW ALL LINKS
        allLinks,
        getAllLinks,

        //VIEW LINKS THAT USER DOES NOT HAVE
        //SECOND OPTION
        linksUserDoesNotHave,
        getLinksUserDoesNotHave,

        //ADD LINKS
        addLink,
        addCustomLink,
        addLinkLoading,
        setAddLinkLoading,
        showAddLinkMessage,
        setShowAddLinkMessage,
        uploadPaymentPhoto,

        //EDIT LINKS
        editLink,
        editCustomLink,
        editPaymentPhoto,

        //REMOVE LINKS
        removeLinkFromUser,

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
        updateProfilePhoto,
        updateCoverPhoto,
        updateNameAndBio,
        updateProfile,
        showUpdateSuccess,
        setShowUpdateSuccess,

        updateEmail,
        updatePassword,
        updateMobileNumber,

        //FOR GETTING USER CONNECTIONS
        getUserConnections,
        userConnections,
        setUserConnections,
        showUserConnection,
        userConnectionStatus,
        setUserConnectionStatus,
        userConnectionData,
        userConnectionLinks,
        userBlockStatus,
        setUserBlockStatus,
        leaveNote,
        reportConnection,
        deleteConnection,
        blockConnection,
        unblockConnection,
        showBlockedConnections,
        userBlockedConnections,
        userPrivateStatus,
        setUserPrivateStatus,

        //GET CONNECTION FROM QR
        showProfileFromQR,

        //FOR LOGOUT
        logout,

        //FOR UPLOADING PHOTO
        uploadPhoto,

        //FOR UPLOADING FILE
        uploadFile,
        editFile,

        //FETCHING DATA LOADING STATES
        userInfoLoading,
        userLinksLoading,
        userConnectionsLoading,

        //PREVIEW STATES
        previewName,
        previewBio,
        previewProfilePhotoURI,
        previewCoverPhotoURI,
        setPreviewName,
        setPreviewBio,
        setPreviewProfilePhotoURI,
        setPreviewCoverPhotoURI,

        //publicProfile
        showPublicProfile,
        publicProfileInfo,
        publicProfileLinks,
        publicProfileDirectLink,
        publicConnectionStatus,
        addConnection,
        publicLoading,

        //DEACTIVATE/DELETE ACCOUNT
        deactivateAccount,

        //DOWNLOAD AS VCF
        downloadVCF,

        //USER NOTIFICATIONS
        getUserNotifications,
        readNotification,
        openNotification,
        userNotifications,
        setUserNotifications,
        userNotificationsLoading,
        setUserNotificationsLoading,
        removeNotification,

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
        insightsLoading,
        setInsightsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
