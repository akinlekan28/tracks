import React, { useState, useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{
        uri:
          "https://res.cloudinary.com/djnhrvjyf/image/upload/q_auto,f_auto/v1577806915/woman-pointing-at-sky-on-seashore-1117493_q9gdw8.jpg"
      }}
    >
      <View style={styles.container}>
        {state.errorMessage ? (
          <View style={styles.borderIos}>
            <Text style={styles.errorContainer}>{state.errorMessage}</Text>
          </View>
        ) : null}
        <Spacer>
          <Text h3 style={{ alignSelf: "center", color: "white" }}>
            Tracker Signup
          </Text>
        </Spacer>
        <Spacer />
        <Spacer>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            labelStyle={styles.white}
            inputStyle={styles.white}
            inputContainerStyle={{ borderColor: "white" }}
          />
        </Spacer>
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
            title="Sign Up"
            buttonStyle={styles.btn}
            onPress={() => {
              signup({ name, email, password });
            }}
          />
        </Spacer>
      </View>
    </ImageBackground>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 180
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
  }
});

export default SignupScreen;
