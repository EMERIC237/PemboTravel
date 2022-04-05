import { functions } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import { db } from "../../firebase";
import { updateDoc, doc, getDoc, getDocFromCache } from "firebase/firestore";
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
  return async (dispatch, getState) => {
    try {
      let userInfos = {};
      // get the user id
      const userId = getState().auth.userCredentials.userId;
      const user = await fetchInfos();
      //if we don't get the user from the phone storage, we get it from the database
      if (user) {
        userInfos = user;
      }
      const userRef = doc(db, "users", userId);
      const querySnapshot = await getDoc(userRef);
      if (querySnapshot.exists()) {
        userInfos = querySnapshot.data();
      }
      dispatch({
        type: SET_USER,
        payload: {
          id: userId,
          firstName: userInfos.firstName ? userInfos.firstName : "",
          lastName: userInfos.lastName ? userInfos.lastName : "",
          email: userInfos.email ? userInfos.email : "",
          phone: userInfos.phone ? userInfos.phone : "",
          picture: userInfos.picture ? userInfos.picture : "",
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
  phone,
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
        phone: phone,
        email: email,
        picture: picture,
      });
      await updateInfos(
        userId,
        firstName,
        lastName,
        email,
        phone,
        (address = ""),
        picture
      );
      dispatch({
        type: UPDATE_USER,
        payload: {
          userId,
          firstName,
          lastName,
          phone,
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
