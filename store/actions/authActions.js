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

      // dispacth(
      //   authenticate(
      //     userCredentials.localId,
      //     userCredentials.idToken,
      //     parseInt(userCredentials.expiresIn) * 1000
      //   )
      // );
      // const onExpiration = new Date(
      //   new Date().getTime() + parseInt(userCredentials.expiresIn) * 1000
      // );
      // saveDataToStorage(
      //   userCredentials.idToken,
      //   userCredentials.localId,
      //   onExpiration
      // );
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
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};
/**
 * Google Authentication
 * @returns dispatch function
 */
// export const googleSignUp = () => {
//   return async (dispacth) => {
//     console.log({ androidClientId });
//     console.log({ iosClientId });
//     try {
//       const loginResult = await GoogleAuthentication.logInAsync({
//         androidStandaloneAppClientId:
//           "944635196629-g80900cpvr4s749jcj29t34sj4ktks4r.apps.googleusercontent.com",
//         iosStandaloneAppClientId:
//           "944635196629-g80900cpvr4s749jcj29t34sj4ktks4r.apps.googleusercontent.com",
//         scopes: ["profile", "email"],
//       });
//       if (loginResult.type === "success") {
//         const { idToken, accesToken } = loginResult;
//         const credential = GoogleAuthProvider.credential(idToken, accesToken);
//         signInWithCredential(auth, credential);
//       }
//     } catch (error) {
//       console.log(error);
//       throw new Error(error.message);
//     }
//   };
//
