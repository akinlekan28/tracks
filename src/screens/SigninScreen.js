import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearScreenMessages } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{
        uri:
          "https://res.cloudinary.com/djnhrvjyf/image/upload/f_auto,q_auto:eco/v1577806915/woman-pointing-at-sky-on-seashore-1117493_q9gdw8.jpg"
      }}
    >
      <NavigationEvents onWillBlur={clearScreenMessages} />
      <View style={styles.container}>
        {state.errorMessage ? (
          <View style={styles.borderIos}>
            <Text style={styles.errorContainer}>{state.errorMessage}</Text>
          </View>
        ) : null}
        <Spacer>
          <Text h3 style={{ alignSelf: "center", color: "white" }}>
            Tracker Signin
          </Text>
        </Spacer>
        <Spacer />
        <Spacer>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            labelStyle={styles.white}
            inputStyle={styles.white}
            inputContainerStyle={{ borderColor: "white" }}
          />
        </Spacer>
        <Spacer>
          <Input
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            labelStyle={styles.white}
            inputStyle={styles.white}
            inputContainerStyle={{ borderColor: "white" }}
          />
        </Spacer>
        <Spacer />
        <Spacer>
          <Button
            title="Sign In"
            buttonStyle={styles.btn}
            onPress={() => signin({ email, password })}
          />
        </Spacer>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Spacer>
            <Text style={styles.link}>
              Don't have an account? Go back to sign up
            </Text>
          </Spacer>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 160
  },
  btn: {
    backgroundColor: "rgb(60, 150, 165)",
    width: 130,
    alignSelf: "center"
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    opacity: 0.8
  },
  white: {
    color: "white"
  },
  errorContainer: {
    color: "rgb(255, 255, 255)"
  },
  borderIos: {
    fontSize: 17,
    backgroundColor: "rgb(195, 30, 60)",
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignSelf: "flex-end",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: "hidden"
  },
  link: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    alignSelf: "center"
  }
});

export default SigninScreen;
