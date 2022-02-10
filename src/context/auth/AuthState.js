import React, { useReducer } from "react";
import axios from "axios";

// Set Auth TOken Utility
import setAuthToken from "../../utils/setAuthToken";

// Context
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    // Load token in Global State
    if (localStorage.getItem("token")) {
      // alert(
      //   "Found token in LOAD USER - Try : " + localStorage.getItem("token")
      // );
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      // alert("PROBLEM IS LOAD CATCH");
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      // console.log(res);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });

      loadUser();
      //
    } catch (error) {
      // console.log(error);
      // console.log(res);
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);

      // console.log(res);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });

      loadUser();
      //
    } catch (error) {
      // console.log(error);
      // console.log(res);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  // Logout User
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;