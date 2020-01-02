import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";

export default callback => {
  const [err, setErr] = useState(null);

  const startWatch = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        callback
      );
    } catch (error) {
      setErr(error);
    }
  };

  useEffect(() => {
    startWatch();
  }, []);

  return [err];
};
