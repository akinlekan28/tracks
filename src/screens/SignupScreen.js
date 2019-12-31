import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const SignupScreen = ({ navigation }) => {
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
        <Spacer>
          <Text h3 style={{ alignSelf: "center", color: "white" }}>
            Tracker Signup
          </Text>
        </Spacer>
        <Spacer />
        <Spacer>
          <Input
            label="Name"
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
          <Button title="Sign Up" buttonStyle={styles.btn} />
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
  }
});

export default SignupScreen;
