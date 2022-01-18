import { GET_TUTOR_DETAILS } from "../actions/actionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TUTOR_DETAILS:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
