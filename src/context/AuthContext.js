import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.userId
      };

    case "SIGN_OUT":
      return {
        ...state,
        token: action.payload,
        user: action.payload,
        profile: action.payload
      };

    case "GET_PROFILE":
      return { ...state, profile: action.payload };

    case "GET_ERROR":
      return { ...state, errorMessage: action.payload };

    case "CLEAR_ERROR":
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  const userId = await AsyncStorage.getItem("user");
  if (token && userId) {
    dispatch({ type: "SIGN_IN", payload: { token, userId } });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const getProfile = dispatch => async userId => {
  try {
    const response = await trackerApi.get(`/profile/${userId}`);
    dispatch({
      type: "GET_PROFILE",
      payload: response.data
    });
  } catch (error) {
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

const signup = dispatch => async ({ name, email, password }) => {
  try {
    const response = await trackerApi.post("/signup", {
      name,
      email,
      password
    });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", response.data.userId);

    dispatch({
      type: "SIGN_IN",
      payload: response.data
    });

    navigate("TrackList");
  } catch (error) {
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

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });

    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("user", response.data.userId);

    dispatch({
      type: "SIGN_IN",
      payload: response.data
    });

    navigate("TrackList");
  } catch (error) {
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

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT", payload: null });
  navigate("loginFlow");
};

const clearScreenMessages = dispatch => () => {
  dispatch({
    type: "CLEAR_ERROR",
    payload: ""
  });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    clearScreenMessages,
    tryLocalSignin,
    getProfile,
    signout
  },
  { token: null, errorMessage: "", user: null, profile: {} }
);
