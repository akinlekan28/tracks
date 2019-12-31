import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const TrackListScreen = ({ navigation }) => {
  return (
    <>
      <Text>Track List Screen</Text>
      <Button
        title="Track Details"
        onPress={() => navigation.navigate("TrackDetails")}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackListScreen;
