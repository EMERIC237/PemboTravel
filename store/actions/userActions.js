import { functions } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { updateInfos, fetchInfos } from "../../utils/database";

export const MAKE_ADMIN = "MAKE_ADMIN";
export const UPDATE_USER = "UPDATE_USER";
export const SET_USER = "SET_USER";

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

export const setUser = () => {
  return async (dispatch) => {
    try {
      const user = await fetchInfos();
      dispatch({
        type: SET_USER,
        payload: {
          user: user,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};

export const updateUser = (
  userId,
  firstName,
  lastName,
  phoneNumber,
  email,
  picture
) => {
  return async (dispatch, getState) => {
    try {
      //get the user id
      const userIdFromServer = getState().auth.userCredentials.userId;
      const userRef = doc(db, "users", userIdFromServer);
      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        picture: picture,
      });
      await updateInfos(
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        (address = ""),
        picture
      );
      dispatch({
        type: UPDATE_USER,
        payload: {
          userId,
          firstName,
          lastName,
          phoneNumber,
          email,
          picture,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
