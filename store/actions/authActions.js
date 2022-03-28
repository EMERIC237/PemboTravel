import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { maybeCompleteAuthSession } from "expo-web-browser";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
export const AUTHENTICATE = "ATHENTICATE";
/**
 *
 * @param {string} email
 * @param {string} password
 * @param {string} nom
 * @param {string} prenom
 * @param {string} phoneNumber
 * @returns a dispatch funcyion that will be called by the redux thun and return an action object
 */
export const signup = (email, password, nom, prenom, phoneNumber) => {
  return async (dispacth) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log({ nom });
      console.log({ prenom });
      console.log({ phoneNumber });
      const response = await setDoc(
        doc(db, "users", userCredentials.user.uid),
        {
          nom,
          prenom,
          phoneNumber,
        }
      );
      console.log({ response });
      console.log({ userCredentials });
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
  console.log({ email });
  console.log({ password });
  return async (dispacth) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
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

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  };
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
