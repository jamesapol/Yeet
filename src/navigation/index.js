import React, { useEffect } from "react";
import { Dimensions, Image, StatusBar } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RFPercentage } from "react-native-responsive-fontsize";

import WelcomeScreen from "../../src/screens/AuthScreens/WelcomeScreen/WelcomeScreen";
import LoginScreen from "../screens/AuthScreens/LoginScreen/LoginScreen";
import SplashScreen from "../screens/SplashScreen/SplashScreen";

//HOME ICON
import homeIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/home.png";
import focusedHomeIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/homeFocused.png";

//CONNECTIONS ICON
import connectionsIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/connections.png";
import focusedConnectionsIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/connectionsFocused.png";

//NOTIFICATIONS ICON
import notificationsIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/notifications.png";
import focusedNotificationsIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/notificationsFocused.png";

//SETTINGS ICON
import settingsIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/settings.png";
import focusedSettingsIcon from "../../assets/UXMaterials/icons/flatIcons/purpleIcons/settingsFocused.png";

//YEET TAB
import yeetButton from "../../assets/UXMaterials/purpleButton.png";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import RegisterScreen from "../screens/AuthScreens/RegisterScreen/RegisterScreen";
import ConfirmEmailScreen from "../screens/AuthScreens/ConfirmEmailScreen/ConfirmEmailScreen";
import InputNameScreen from "../screens/AuthScreens/InputNameScreen/InputNameScreen";
import SelectPhotoScreen from "../screens/AuthScreens/SelectPhotoScreen/SelectPhotoScreen";
import ConfirmationScreen from "../screens/AuthScreens/ConfirmationScreen/ConfirmationScreen";
import HomeScreen from "../screens/AppScreens/HomeScreen/HomeScreen";
import PublicProfileScreen from "../screens/PublicScreens/PublicProfileScreen/PublicProfileScreen";
import AddLinksScreen from "../screens/AppScreens/HomeScreen/AddLinksScreen/AddLinksScreen";
import ManageLinksScreen from "../screens/AppScreens/HomeScreen/ManageLinksScreen/ManageLinksScreen";
import DirectLinkScreen from "../screens/AppScreens/HomeScreen/DirectLinkScreen/DirectLinkScreen";
import EditProfileScreen from "../screens/AppScreens/HomeScreen/EditProfileScreen/EditProfileScreen";
import PreviewProfileScreen from "../screens/AppScreens/HomeScreen/EditProfileScreen/PreviewProfileScreen";
import SettingsScreen from "../screens/AppScreens/SettingsScreen/SettingsScreen";
import ManageAccountScreen from "../screens/AppScreens/SettingsScreen/ManageAccountScreen/ManageAccountScreen";
import ChangeEmailScreen from "../screens/AppScreens/SettingsScreen/ManageAccountScreen/ChangeEmailScreen/ChangeEmailScreen";
import ChangePasswordScreen from "../screens/AppScreens/SettingsScreen/ManageAccountScreen/ChangePasswordScreen/ChangePasswordScreen";
import PrivacySettingsScreen from "../screens/AppScreens/SettingsScreen/PrivacySettingsScreen/PrivacySettingsScreen";
import BlockedContactsScreen from "../screens/AppScreens/SettingsScreen/PrivacySettingsScreen/BlockedContactsScreen/BlockedContactsScreen";
import ActivateYeetDeviceScreen from "../screens/AppScreens/SettingsScreen/ActivateYeetDeviceScreen/ActivateYeetDeviceScreen";
import MyYeetDevicesScreen from "../screens/AppScreens/SettingsScreen/ActivateYeetDeviceScreen/MyYeetDevicesScreen/MyYeetDevicesScreen";
import ScanQRScreen from "../screens/AppScreens/SettingsScreen/ActivateYeetDeviceScreen/ScanQRScreen/ScanQRScreen";
import AboutScreen from "../screens/AppScreens/SettingsScreen/AboutScreen/AboutScreen";
import InsightsScreen from "../screens/AppScreens/SettingsScreen/InsightsScreen/InsightsScreen";
import AboutUsScreen from "../screens/AppScreens/SettingsScreen/AboutScreen/AboutUsScreen";
import FAQScreen from "../screens/AppScreens/SettingsScreen/AboutScreen/FAQScreen";
import PrivacyPolicyScreen from "../screens/AppScreens/SettingsScreen/AboutScreen/PrivacyPolicyScreen/PrivacyPolicyScreen";
import TermsOfServiceScreen from "../screens/AppScreens/SettingsScreen/AboutScreen/TermsOfServiceScreen/TermsOfServiceScreen";
import ConnectionsScreen from "../screens/AppScreens/ConnectionsScreen/ConnectionsScreen";
import ViewConnectionScreen from "../screens/AppScreens/ConnectionsScreen/ViewConnectionScreen/ViewConnectionScreen";
import YeetScreen from "../screens/AppScreens/YeetScreen/YeetScreen";
import NotificationsScreen from "../screens/AppScreens/NotificationsScreen/NotificationsScreen";
import ForgotPasswordScreen from "../screens/AuthScreens/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordCodeScreen from "../screens/AuthScreens/ForgotPasswordScreen/ResetPasswordCodeScreen/ResetPasswordCodeScreen";
import ResetPasswordScreen from "../screens/AuthScreens/ForgotPasswordScreen/ResetPasswordScreen/ResetPasswordScreen";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";
import MobileNumberScreen from "../screens/AuthScreens/MobileNumberScreen/MobileNumberScreen";
import AddConnectionQRScreen from "../screens/AppScreens/AddConnectionQRScreen/AddConnectionQRScreen";
import ChangeMobileNumberScreen from "../screens/AppScreens/SettingsScreen/ManageAccountScreen/ChangeMobileNumberScreen/ChangeMobileNumberScreen";
var { width } = Dimensions.get("window");
var { height } = Dimensions.get("window");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

const SplashStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const PublicStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function AuthStackNavigator() {
  const {
    userInfo,
    userToken,
    splashLoading,
    getUserConnections,
    userConnections,
    allLinks,
    getAllLinks,
    getActiveYeetDevice,
  } = useContext(AuthContext);

  return (
    <AuthStack.Navigator
      screenOptions={{ animation: "fade", headerShown: false }}
    >
      {!userToken ? (
        <>
          <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
          <AuthStack.Screen
            name="ConfirmEmailScreen"
            component={ConfirmEmailScreen}
          />
          <AuthStack.Screen
            name="InputNameScreen"
            component={InputNameScreen}
          />
          <AuthStack.Screen
            name="MobileNumberScreen"
            component={MobileNumberScreen}
          />
          <AuthStack.Screen
            name="SelectPhotoScreen"
            component={SelectPhotoScreen}
          />
          <AuthStack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
          />
          <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
          <AuthStack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
          <AuthStack.Screen
            name="ResetPasswordCodeScreen"
            component={ResetPasswordCodeScreen}
          />
          <AuthStack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </>
      ) : (
        <AuthStack.Screen name="AppScreens" component={AppScreens} />
      )}
    </AuthStack.Navigator>
  );
}
export default function Navigation() {
  const {
    userInfo,
    userToken,
    splashLoading,
    getUserConnections,
    userConnections,
    allLinks,
    getAllLinks,
    getActiveYeetDevice,
  } = useContext(AuthContext);

  if (splashLoading) {
    return <SplashScreen />;
  }
  return (
    <RootStack.Navigator
      screenOptions={{ animation: "fade", headerShown: false }}
    >
      {/* {splashLoading == true ? (
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      ) : (
        <> */}
      <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
      <RootStack.Screen
        name="PublicProfileScreen"
        component={PublicProfileScreen}
      />
    </RootStack.Navigator>
  );
}

const AppScreens = () => {
  const {
    getUserConnections,
    userConnections,
    getActiveYeetDevice,
    getUserNotifications,
    setUserBlockStatus,
    userBlockStatus,
    userNotifications,
    logout,
    notificationCount,
    readNotification,
    setNotificationCount,
  } = useContext(AuthContext);

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#562C73",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: { height: height * 0.07, backgroundColor: "#FFF" },
        tabBarLabelStyle: {
          fontSize: 10,
          color: "#D81D4C",
          marginBottom: "5%",
        },
        tabBarIconStyle: { marginTop: "5%" },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigation}
        options={{
          unmountOnBlur: "true",
          title: "HOME",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Image
                source={focusedHomeIcon}
                style={{
                  height: RFPercentage(3.5),
                  width: RFPercentage(3.5),
                }}
              />
            ) : (
              <Image
                source={homeIcon}
                style={{
                  height: RFPercentage(2.5),
                  width: RFPercentage(2.5),
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ConnectionsTab"
        component={ConnectionsNavigation}
        options={{
          unmountOnBlur: "true",
          title: "CONNECTIONS",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Image
                source={focusedConnectionsIcon}
                style={{
                  height: RFPercentage(4.5),
                  width: RFPercentage(4.5),
                }}
              />
            ) : (
              <Image
                source={connectionsIcon}
                style={{
                  height: RFPercentage(3.5),
                  width: RFPercentage(3.5),
                }}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            setUserBlockStatus(0);
            if (Object.keys(userConnections).length == 0) {
              getUserConnections();
            }
          },
        }}
      />

      <Tab.Screen
        name="YeetTab"
        component={YeetNavigation}
        options={{
          title: "",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Image
                source={yeetButton}
                style={{
                  height: RFPercentage(12),
                  width: RFPercentage(12),
                  marginBottom: height * 0.03,
                }}
              />
            ) : (
              <Image
                source={yeetButton}
                style={{
                  height: RFPercentage(10),
                  width: RFPercentage(10),
                  marginBottom: height * 0.03,
                }}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            getActiveYeetDevice();
          },
        }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsNavigation}
        options={{
          unmountOnBlur: "true",

          tabBarBadge: notificationCount == 0 ? null : notificationCount,

          title: "NOTIFICATIONS",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Image
                source={focusedNotificationsIcon}
                style={{ height: RFPercentage(3), width: RFPercentage(3) }}
              />
            ) : (
              <Image
                source={notificationsIcon}
                style={{ height: RFPercentage(2), width: RFPercentage(2) }}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            // if (Object.keys(userNotifications).length == 0) {
            getUserNotifications();
            // readNotification();
            setNotificationCount(0);
            // console.log(notificationCount)
            // }
          },
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsNavigation}
        options={{
          unmountOnBlur: "true",
          title: "SETTINGS",
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Image
                source={focusedSettingsIcon}
                style={{
                  height: RFPercentage(5.5),
                  width: RFPercentage(5.5),
                }}
              />
            ) : (
              <Image
                source={settingsIcon}
                style={{ height: RFPercentage(4), width: RFPercentage(4) }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
    // <Tab.Navigator>
    //   <Tab.Screen name="HomeScreen" component={HomeScreen} />
    //   <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    // </Tab.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "fade", headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddLinksScreen" component={AddLinksScreen} />
      <Stack.Screen
        name="ManageLinksScreen"
        component={ManageLinksScreen}
        options={{ animation: "none" }}
      />
      <Stack.Screen name="DirectLinkScreen" component={DirectLinkScreen} />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="PreviewProfileScreen"
        component={PreviewProfileScreen}
        options={{ animation: "fade", animationDuration: 250 }}
      />
    </Stack.Navigator>
  );
};

const ConnectionsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "fade", headerShown: false }}>
      <Stack.Screen name="ConnectionsScreen" component={ConnectionsScreen} />
      <Stack.Screen
        name="ViewConnectionScreen"
        component={ViewConnectionScreen}
      />

      <Stack.Screen
        name="AddConnectionQRScreen"
        component={AddConnectionQRScreen}
      />
    </Stack.Navigator>
  );
};

const YeetNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "fade", headerShown: false }}>
      <Stack.Screen name="YeetScreen" component={YeetScreen} />
    </Stack.Navigator>
  );
};

const NotificationsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "fade", headerShown: false }}>
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="ViewConnectionScreen"
        component={ViewConnectionScreen}
      />
    </Stack.Navigator>
  );
};

const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ animation: "fade", headerShown: false }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen
        name="ManageAccountScreen"
        component={ManageAccountScreen}
      />
      <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="ChangeMobileNumberScreen"
        component={ChangeMobileNumberScreen}
      />
      <Stack.Screen name="InsightsScreen" component={InsightsScreen} />
      <Stack.Screen
        name="PrivacySettingsScreen"
        component={PrivacySettingsScreen}
      />
      <Stack.Screen
        name="BlockedContactsScreen"
        component={BlockedContactsScreen}
      />
      <Stack.Screen
        name="ActivateYeetDeviceScreen"
        component={ActivateYeetDeviceScreen}
      />
      <Stack.Screen
        name="MyYeetDevicesScreen"
        component={MyYeetDevicesScreen}
      />
      <Stack.Screen name="ScanQRScreen" component={ScanQRScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="FAQScreen" component={FAQScreen} />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name="TermsOfServiceScreen"
        component={TermsOfServiceScreen}
      />
    </Stack.Navigator>
  );
};
