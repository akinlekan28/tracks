import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer />
      <Spacer>
        <Input
          placeholder="Enter track name"
          value={name}
          onChangeText={changeName}
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button
            title="Stop"
            buttonStyle={styles.btn}
            onPress={stopRecording}
          />
        ) : (
          <Button
            title="Start Recording"
            buttonStyle={styles.btn}
            onPress={startRecording}
          />
        )}
      </Spacer>

      {!recording && locations.length ? (
        <Spacer>
          <Button
            title="Save Recording"
            buttonStyle={styles.btn}
            onPress={saveTrack}
          />
        </Spacer>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "rgb(60, 150, 165)",
    width: 200,
    alignSelf: "center"
  }
});

export default TrackForm;
