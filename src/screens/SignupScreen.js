import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const SignupScreen = ({ navigation }) => {
  return (
    <>
      <Text>Signup screen</Text>
      <Button title="Signin" onPress={() => navigation.navigate("Signin")} />
      <Button
        title="Main flow"
        onPress={() => navigation.navigate("mainFlow")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default SignupScreen;
