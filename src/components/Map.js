import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";
import Spinner from "./Spinner";

const Map = () => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <Spinner />;
  }

  return (
    <MapView
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      style={styles.map}
      showsUserLocation={true}
      showsMyLocationButton
      showsBuildings
      showsTraffic
      followsUserLocation={true}
      scrollEnabled={true}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={locations.map(loc => loc.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 400
  }
});

export default Map;
