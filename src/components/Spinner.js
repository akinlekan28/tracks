import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Spinner = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/spinner.gif")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 350,
    paddingHorizontal: 80
  }
});

export default Spinner;
