import { db } from "../../firebase";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
// Add payment function
export const ADD_PAYMENT = "ADD_PAYMENT";

/**
 *
 * @param {string} userId
 * @param {string} projectId
 * @param {string} paymentImg
 * @param {string} amount
 * @returns a dispatch function that will be called by the redux thunk and return an action object
 */
export const addPayment = (userId, projectId, paymentImg, amount) => {
  return async (dispatch) => {
    try {
      const paymentToAdd = {
        userId,
        projectId,
        paymentImg,
        amount,
        status: "pending",
        createdAt: serverTimestamp(),
      };
      const payment = await addDoc(collection(db, "payments"), paymentToAdd);
      dispatch({
        type: ADD_PAYMENT,
        payload: paymentToAdd,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
