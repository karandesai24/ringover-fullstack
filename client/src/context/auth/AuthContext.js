import { useReducer, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  AuthorizeUser,
  AuthStart,
  AuthSuccess,
  AuthError,
  Logout,
} from "./AuthActions";

import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const authorizeUser = async () => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users/showMe`,
        {
          withCredentials: true,
        }
      );
      dispatch(AuthorizeUser(user.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  const loginRequest = async ({ email, password }) => {
    dispatch(AuthStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(AuthSuccess(res.data.user));
      toast.success("Logged in succesfully");
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      dispatch(AuthError(err.response.data));
      toast.error("Incoorect Crediatinals");
    }
  };

  const registerRequest = async (body) => {
    dispatch(AuthStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        body,
        {
          withCredentials: true,
        }
      );
      toast.success("Registered succesfully");
      dispatch(AuthSuccess(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      toast.error("Fill the data correctly");
      dispatch(AuthError(err.response.data));
    }
  };

  const logoutRequest = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    localStorage.removeItem("user");
    dispatch(Logout());
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authorizeUser,
        loginRequest,
        registerRequest,
        logoutRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
