import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";

import Navigation from "./src/navigation";

import * as Linking from "expo-linking";
// import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
// import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { BarCodeScanner } from "expo-barcode-scanner";
// import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useFonts } from "expo-font";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import useFonts from "./hooks/useFonts";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(["new NativeEventEmitter"]);

const prefix = Linking.createURL("/");

export default function App() {
  // let [fontsLoaded] = useFonts({
  //   Montserrat_400Regular,
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  // const [fontsLoaded] = useFonts({
  //   'Rubik': require('./assets/fonts/Rubik-Regular.ttf'),
  //   'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  // });

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        PublicProfileScreen: {
          path: "publicProfile/:id",
          parse: {
            id: (id) => `${id}`,
          },
        },
        // WelcomeScreen: {
        //   path: "welcome",
        // },
        // HomeScreen: {
        //   path: "home",
        // },
      },
    },
  };

  // function handleDeepLink(event) {
  //   let data = Linking.parse(event.url);
  //   setData(data);
  // }

  // useEffect(() => {
  //   async function getInitialURL() {
  //     const initialURL = await Linking.getInitialURL();
  //     if (initialURL) {
  //       setData(Linking.parse(initialURL));
  //     }
  //   }

  //   const subscription = Linking.addEventListener("url", handleDeepLink);
  //   if (!data) {
  //     getInitialURL();
  //     console.log("DATA: " + data);
  //   } else {
  //     console.log("DATA: " + JSON.stringify(data));
  //   }
  //   return () => subscription.remove();
  // }, []);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");

  const getNotificationPushToken = async (userLinkID) => {
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

  useEffect(() => {
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }

    //   let location = await Location.getCurrentPositionAsync({});
    //   setLocation(location);
    // })();

    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    const registerForPushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      // console.log(status);
      if (status !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          return;
        }
      }

      const token = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken(token);
    };

    registerForPushNotifications();

    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer linking={linking}>
        <StatusBar backgroundColor="#0000" translucent={true} />
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#300",
    alignItems: "center",
    justifyContent: "center",
  },
});
