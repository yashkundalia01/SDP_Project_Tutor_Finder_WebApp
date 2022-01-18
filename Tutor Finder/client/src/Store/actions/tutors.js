import axios from "axios";
import { GET_TUTOR_DETAILS } from "./actionTypes";

// Get All tutors details
export const getTutors = () => async (dispatch) => {
  const tutors = await axios.get("/api/tutors");
  dispatch({ type: GET_TUTOR_DETAILS, payload: tutors.data });
};
