import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, token: action.payload };

    case "SIGN_OUT":
      return { ...state, token: action.payload };

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
  if (token) {
    dispatch({ type: "SIGN_IN", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
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

    dispatch({
      type: "SIGN_IN",
      payload: response.data.token
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

    dispatch({
      type: "SIGN_IN",
      payload: response.data.token
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
    signout
  },
  { token: null, errorMessage: "" }
);
