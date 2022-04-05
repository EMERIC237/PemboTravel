import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { insertInfos } from "../../utils/database";
import uploadImageAsync from "../../utils/uploadImage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
export const AUTHENTICATE = "ATHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;
//!! Clear unecessary code from this file
//TODO: Find a way to handle save data on the phone storage. This is a temporary solution
/**
 *
 * @param {string} email
 * @param {string} password
 * @param {string} lastName
 * @param {string} firstName
 * @param {string} phone
 * @returns a dispatch function that will be called by the redux thun and return an action object
 */
export const signup = (
  email,
  password,
  lastName,
  firstName,
  phone,
  userImg,
  projectId
) => {
  return async (dispacth) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let imageUrl = null;
      //upload the image to firebase storage using blob
      if (userImg) {
        imageUrl = await uploadImageAsync(
          userImg,
          `users/${userCredentials.user.uid}`
        );
      }
      const response = await setDoc(
        doc(db, "users", userCredentials.user.uid),
        {
          firstName,
          lastName,
          email,
          phone,
          userImg: imageUrl,
        }
      );
      await insertInfos(firstName, lastName, email, phone, "", imageUrl);
      const user = userCredentials.user;
      dispacth({
        type: AUTHENTICATE,
        payload: {
          userId: user.uid,
          isAdmin: false,
        },
      });
    } catch (error) {
      let errorCode = error.code;
      let errorMsg = error.message;
      let message = "Something went wrong!";
      if (errorCode == "auth/weak-password") {
        message = "The password is too weak.";
      } else {
        message = errorMsg;
      }
      console.log(error);
      throw new Error(message);
    }
  };
};

export const login = (email, password) => {
  return async (dispacth) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const checkIsAdmin = await user.getIdTokenResult();
      user.isAdmin = checkIsAdmin.claims.admin;

      dispacth({
        type: AUTHENTICATE,
        payload: {
          userId: user.uid,
          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      let errorCode = error.code;
      let errorMsg = error.message;
      let message = "Something went wrong!";
      if (errorCode == "auth/wrong-password") {
        message = "The password is wrong.";
      } else {
        message = errorMsg;
      }
      console.log(error);
      throw new Error(message);
    }
  };
};

export const authenticate = (user) => {
  return async (dispacth) => {
    dispacth({
      type: AUTHENTICATE,
      payload: {
        userId: user.uid,
        isAdmin: user.isAdmin,
      },
    });
  };
};

export const logout = () => {
  return async (dispacth) => {
    try {
      await signOut(auth);
      dispacth({ type: LOGOUT });
    } catch (error) {
      console.log(error);
    }
  };
};
