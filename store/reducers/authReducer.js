import { AUTHENTICATE, LOGOUT } from "../actions/authActions";
const initialState = {
  token: null,
  localId: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.payload.token,
        localId: action.payload.localId,
        userId: action.payload.userId,

      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}