import { SET_USER, UPDATE_USER } from "../actions/userActions";
//reducer for user
const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  picture: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};
