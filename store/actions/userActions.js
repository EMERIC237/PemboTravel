import { functions } from "../../firebase";
import { httpsCallable } from "firebase/functions";

export const MAKE_ADMIN = "MAKE_ADMIN";
export const CREATE_USER = "CREATE_USER";
export const signup = () => {
  return async (dispatch) => {};
};

export const makeAdmin = (userEmail) => {
  return async (dispatch) => {
    try {
      const addAdminRole = await httpsCallable(functions, "addAdminRole");
      const result = await addAdminRole({ email: userEmail });
      console.log(result);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
