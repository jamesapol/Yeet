export const removeNotification = async (notificationID) => {
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