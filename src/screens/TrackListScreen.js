import React, { useContext } from "react";
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem, Text, Button } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { Feather } from "@expo/vector-icons";
import Spacer from "../components/Spacer";

const TrackListScreen = ({ navigation }) => {
  const {
    state: { tracks },
    fetchTracks
  } = useContext(TrackContext);

  if (!tracks.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text h4 style={{ alignSelf: "center" }}>
          No Saved Tracks
        </Text>
        <Spacer>
          <Button
            buttonStyle={styles.btn}
            icon={
              <Feather name="plus" size={23} style={{ color: "#ffffff" }} />
            }
            onPress={() => navigation.navigate("TrackCreate")}
          />
        </Spacer>
      </View>
    );
  }

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={tracks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetails", {
                  trackId: item._id,
                  name: item.name
                })
              }
            >
              <ListItem
                chevron
                title={item.name}
                bottomDivider
                containerStyle={styles.listStyle}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    paddingVertical: 20
  },
  btn: {
    backgroundColor: "rgb(60, 150, 165)",
    width: 130,
    alignSelf: "center",
    paddingVertical: 15
  }
});

TrackListScreen.navigationOptions = {
  title: "Tracks"
};

export default TrackListScreen;
