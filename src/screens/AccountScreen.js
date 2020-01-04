import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
  const { state, signout, getProfile } = useContext(AuthContext);
  const id = state.user;
  const { name, email, date_registered } = state.profile;

  let today = new Date(date_registered);
  let date =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  useEffect(() => {
    getProfile(id);
  }, []);

  if (state.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" style={{ alignSelf: "center" }} />
      </View>
    );
  }

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Text style={styles.profileHead}>Account Information</Text>
      <View style={styles.avatar}>
        <Avatar
          rounded
          source={{ uri: "https://source.unsplash.com/random" }}
          size={220}
        />
      </View>
      <Spacer>
        <View style={styles.profileContainer}>
          <Text style={styles.textStyle}>{name}</Text>
          <Text style={styles.textStyle}>{email}</Text>
          <Text style={styles.textStyle}>Registered on {date}</Text>
        </View>
      </Spacer>
      <Spacer />
      <Spacer>
        <Button title="Sign Out" onPress={signout} buttonStyle={styles.btn} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  profileHead: {
    fontSize: 20,
    alignSelf: "center"
  },
  avatar: {
    alignSelf: "center",
    paddingVertical: 30
  },
  profileContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    padding: 20,
    borderRadius: 6,
    opacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5
  },
  textStyle: {
    paddingVertical: 15,
    fontSize: 17
  },
  btn: {
    backgroundColor: "rgb(60, 150, 165)",
    width: 130,
    alignSelf: "center"
  }
});

AccountScreen.navigationOptions = {
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

export default AccountScreen;
