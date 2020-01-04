import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRACKS":
      return { tracks: action.payload };

    case "DELETE_TRACK":
      return state.tracks.filter(tracks => tracks._id !== action.payload);

    case "GET_ERROR":
      return { ...state, error: action.payload };

    case "CLEAR_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

const fetchTracks = dispatch => async () => {
  const response = await trackerApi.get("/tracks");
  dispatch({
    type: "GET_TRACKS",
    payload: response.data
  });
};

const createTrack = () => async (name, locations) => {
  await trackerApi.post("/tracks", { name, locations });
};

const deleteTrack = dispatch => async trackId => {
  try {
    await trackerApi.delete(`/tracks/${trackId}`);
    // dispatch({
    //   type: "DELETE_TRACK",
    //   payload: trackId
    // });
    navigate("TrackList");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "GET_ERROR",
      payload: error.response.data.message
    });

    setTimeout(function() {
      dispatch({
        type: "CLEAR_ERROR",
        payload: ""
      });
    }, 4000);
  }
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack, deleteTrack },
  { error: "", tracks: [] }
);
