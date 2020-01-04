import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import { Text } from "react-native-elements";

const TrackDetailsScreen = ({ navigation }) => {
  const {
    state: { tracks, error }
  } = useContext(TrackContext);

  const trackId = navigation.getParam("trackId");

  track = tracks.find(t => t._id === trackId);
  const initialCoords = track.locations[0].coords;

  return (
    <>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
        style={styles.map}
      >
        <Polyline
          coordinates={track.locations.map(location => location.coords)}
        />
      </MapView>
      {error ? (
        <View style={styles.borderIos}>
          <Text style={styles.errorContainer}>{error}</Text>
        </View>
      ) : null}
      {/* <Spacer />
      <Spacer />
      <Spacer>
        <Button
          title="Delete"
          buttonStyle={styles.btn}
          onPress={() => deleteTrack(trackId)}
        />
      </Spacer> */}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 400
  },
  btn: {
    backgroundColor: "rgb(240, 15, 75)",
    width: 130,
    alignSelf: "center"
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

TrackDetailsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: `${navigation.getParam("name") + " Details"}`
  };
};

export default TrackDetailsScreen;
