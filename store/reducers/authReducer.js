import { AUTHENTICATE, LOGOUT } from "../actions/authActions";
const initialState = {
  userCredentials: {
    userId: null,
    isAdmin: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userCredentials: action.payload,
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
