import { setAlert } from ".";
import axios from "axios";

import {
  REGISTER_FAIL,
  REGISTER_STUDENT,
  REGISTER_TUTOR,
  LOGIN_FAIL,
  LOGIN_TUTOR,
  LOGIN_STUDENT,
  LOGOUT,
  STUDENT_LOADED,
  AUTH_START_LOADING,
  AUTH_STOP_LOADING,
  UPDATE_STUDENT,
  UPDATE_TUTOR,
  UPDATE_FAIL,
  TUTOR_LOADED,
} from "./actionTypes";

// Get Current Student
export const loadStudent = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    if (localStorage.token != null) {
      dispatch({ type: AUTH_START_LOADING });
      const res = await axios.get("/api/students/auth", config);
      dispatch({ type: AUTH_STOP_LOADING });
      dispatch({ type: STUDENT_LOADED, payload: res.data });
    }
  } catch (err) {
    console.log("ERROR   " + err);
  }
};

// Get Current Tutor
export const loadTutor = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "x-auth-token": localStorage.token,
      },
    };
    if (localStorage.token != null) {
      dispatch({ type: AUTH_START_LOADING });
      const res = await axios.get("/api/tutors/auth", config);
      dispatch({ type: AUTH_STOP_LOADING });
      dispatch({ type: TUTOR_LOADED, payload: res.data });
    }
  } catch (err) {
    console.log("ERROR   " + err);
  }
};

// REGISTER STUDENT
// @desc To Register student.
export const registerStudent =
  ({ name, email, password, education_info, city, country, phone_no }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      education_info,
      city,
      country,
      phone_no,
    });
    try {
      dispatch({ type: AUTH_START_LOADING });
      const res = await axios.post("/api/students", body, config);

      dispatch({
        type: REGISTER_STUDENT,
        payload: res.data,
      });
      dispatch(loadStudent());
      dispatch({ type: AUTH_STOP_LOADING });
      dispatch(setAlert("Successfully Registered", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({ type: AUTH_STOP_LOADING });
    }
  };

// REGISTER TUTOR
// @desc To Register tutor.
export const registerTutor =
  ({ name, email, password, city, country, phone_no, photo_url }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      city,
      country,
      phone_no,
      photo_url,
    });
    try {
      dispatch({ type: AUTH_START_LOADING });
      const res = await axios.post("/api/tutors", body, config);

      dispatch({
        type: REGISTER_TUTOR,
        payload: res.data,
      });
      dispatch(loadTutor());
      dispatch({ type: AUTH_STOP_LOADING });
      dispatch(setAlert("Successfully Registered", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({ type: AUTH_STOP_LOADING });
    }
  };

// LOGIN STUDENT
// @desc To Login student.
export const loginStudent =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      dispatch({ type: AUTH_START_LOADING });
      // returning token
      const res = await axios.post("/api/students/auth", body, config);

      dispatch({
        type: LOGIN_STUDENT,
        payload: res.data,
      });

      dispatch(loadStudent());
      dispatch({ type: AUTH_STOP_LOADING });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({ type: AUTH_STOP_LOADING });
    }
  };

// LOGIN Tutor
// @desc To Login tutor.
export const loginTutor =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      dispatch({ type: AUTH_START_LOADING });
      // returning token
      const res = await axios.post("/api/tutors/auth", body, config);

      dispatch({
        type: LOGIN_TUTOR,
        payload: res.data,
      });

      dispatch(loadTutor());
      dispatch({ type: AUTH_STOP_LOADING });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({ type: AUTH_STOP_LOADING });
    }
  };

//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// UPDATE STUDENT
// @desc To Update student details.
export const updateStudent =
  ({ name, email, education_info, city, country, phone_no }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };
    const body = JSON.stringify({
      name,
      email,
      education_info,
      city,
      country,
      phone_no,
    });
    try {
      dispatch({ type: AUTH_START_LOADING });
      const res = await axios.post("/api/students/edit", body, config);

      dispatch({
        type: UPDATE_STUDENT,
        payload: res.data,
      });
      dispatch(loadStudent());
      dispatch({ type: AUTH_STOP_LOADING });
      dispatch(setAlert("Successfully Updated", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: UPDATE_FAIL,
      });
      dispatch({ type: AUTH_STOP_LOADING });
    }
  };

// UPDATE TUTOR
// @desc To Update tutor details.
export const updateTutor =
  ({ name, email, city, country, phone_no, photo_url }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.token,
      },
    };
    const body = JSON.stringify({
      name,
      email,
      city,
      country,
      phone_no,
      photo_url,
    });
    try {
      dispatch({ type: AUTH_START_LOADING });
      const res = await axios.post("/api/tutors/edit", body, config);

      dispatch({
        type: UPDATE_TUTOR,
        payload: res.data,
      });
      dispatch(loadTutor());
      dispatch({ type: AUTH_STOP_LOADING });
      dispatch(setAlert("Successfully Updated", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
      }
      dispatch({
        type: UPDATE_FAIL,
      });
      dispatch({ type: AUTH_STOP_LOADING });
    }
  };
