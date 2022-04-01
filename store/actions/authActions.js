import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
 * @param {string} nom
 * @param {string} prenom
 * @param {string} phoneNumber
 * @returns a dispatch funcyion that will be called by the redux thun and return an action object
 */
export const signup = (
  email,
  password,
  nom,
  prenom,
  phoneNumber,
  projectId
) => {
  return async (dispacth) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const response = await setDoc(
        doc(db, "users", userCredentials.user.uid),
        {
          nom,
          prenom,
          phoneNumber,
        }
      );
      dispacth({
        type: AUTHENTICATE,
        payload: {
          token: userCredentials._tokenResponse.idToken,
          localId: userCredentials._tokenResponse.localId,
          userId: userCredentials.user.uid,
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
      let paytest = {
        token: userCredentials._tokenResponse.idToken,
        localId: userCredentials._tokenResponse.localId,
        userId: userCredentials.user.uid,
      };
      console.log(paytest);
      dispacth({
        type: AUTHENTICATE,
        payload: {
          token: userCredentials._tokenResponse.idToken,
          localId: userCredentials._tokenResponse.localId,
          userId: userCredentials.user.uid,
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

/**
 * This function is use to authenticate(sign in on sign up )on the device
 * The function will dispatch to action : the setLogoutTimer which will set a timer
 * to expire the token after the expire date is passed
 * @param {string} userId
 * @param {string} token
 * @returns an action object that will be used on the reducer function
 */
export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, payload: { userId, token } });
  };
};

/**
 *  function to save the token on the device
 * @param {string} token
 * @param {string} userId
 * @param {date object} onExpiration
 * @implements AsyncStorage
 */
const saveDataToStorage = async (token, userId, onExpiration) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token,
        userId,
        expiryDate: onExpiration.toISOString(),
      })
    );
  } catch (error) {
    console.log(error);
  }
};
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
/**
 *
 * This function is use to setup a timer for the token
 * @param {date object} expirationTime
 * @returns a dispacth funtion
 */
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const logout = () => {
  return async (dispacth) => {
    try {
      await signOut(auth);
      dispacth({ type: LOGOUT });
      clearLogoutTimer();
    } catch (error) {
      console.log(error);
    }
  };
};
