import { SET_USER, UPDATE_USER } from "../actions/userActions";
//reducer for user
const initialState = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    picture: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
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
