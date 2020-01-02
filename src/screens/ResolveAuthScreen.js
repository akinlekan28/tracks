import React, { useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text style={{ alignSelf: "center" }}>
        <Image source={require("../../assets/spinner.gif")} />
      </Text>
    </View>
  );
};

export default ResolveAuthScreen;
