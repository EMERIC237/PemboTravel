import { functions } from "../../firebase";
import { httpsCallable } from "firebase/functions";

export const MAKE_ADMIN = "MAKE_ADMIN";
export const GET_USER = "GET_USER";

export const makeAdmin = (userEmail) => {
  return async (dispatch) => {
    try {
      const addAdminRole = await httpsCallable(functions, "addAdminRole");
      const result = await addAdminRole({ email: userEmail });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    try {
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
