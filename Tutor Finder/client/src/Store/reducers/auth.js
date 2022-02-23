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
  TUTOR_LOADED,
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  isAuthenticated: null,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STUDENT:
    case REGISTER_TUTOR:
    case LOGIN_STUDENT:
    case LOGIN_TUTOR: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case LOGOUT:
    case LOGIN_FAIL:
    case REGISTER_FAIL: {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    }
    case TUTOR_LOADED:
    case STUDENT_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    }
    case AUTH_START_LOADING:
      return { ...state, loading: true };
    case AUTH_STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;
