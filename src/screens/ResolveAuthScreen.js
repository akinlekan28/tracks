import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);
  return (
    <View>
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
        quibusdam adipisci nobis delectus excepturi id veniam, quasi officia
        repellat laborum, placeat accusantium hic reiciendis. Quod hic omnis
        molestias eveniet non, facilis minima! Hic similique officiis
        accusantium voluptas odio fuga culpa.
      </Text>
    </View>
  );
};

export default ResolveAuthScreen;
