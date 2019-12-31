import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return { ...state, token: action.payload };

    case "GET_ERROR":
      return { ...state, errorMessage: action.payload };

    case "CLEAR_ERROR":
      return { ...state, errorMessage: action.payload };

    default:
      return state;
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
      type: "ADD_TOKEN",
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

const signin = dispatch => {
  return ({ email, password }) => {};
};

const signout = dispatch => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { token: null, errorMessage: "" }
);
