import { db } from "../../firebase";
import { addContributor } from "./projectActions";
import {
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
  query,
  where,
  getDocs,
} from "firebase/firestore";
// Add payment function
export const ADD_PAYMENT = "ADD_PAYMENT";
export const SET_PAYMENTS = "SET_PAYMENTS";

/**
 *
 * @param {string} userId
 * @param {string} projectId
 * @param {string} paymentImg
 * @param {string} amount
 * @returns a dispatch function that will be called by the redux thunk and return an action object
 */
export const addPayment = (userId, projectId, paymentImg, amount) => {
  return async (dispatch, getState) => {
    try {
      //get the current project
      const project = getState().projects.projects.find(
        (project) => project.projectId === projectId
      );
      const paymentToAdd = {
        userId,
        projectId,
        paymentImg,
        amount,
        status: "pending",
        createdAt: serverTimestamp(),
      };
      const payment = await addDoc(collection(db, "payments"), paymentToAdd);
      //After adding the payment, we need to update the project's contributors
      if (!project.contributors.includes(userId)) {
        //if the user is already a contributor, we just need to update the amount
        const projectRef = doc(db, "projects", projectId);
        await updateDoc(projectRef, {
          contributors: arrayUnion(userId),
        });
        dispatch(addContributor(projectId, userId));
      }
      dispatch({
        type: ADD_PAYMENT,
        payload: { ...paymentToAdd, paymentId: payment.id },
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};

export const setPayments = () => {
  return async (dispatch, getState) => {
    try {
      let payments = [];
      //get the current user id
      const userId = getState().auth.userCredentials.userId;
      const q = query(
        collection(db, "payments"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        payments.push({ paymentId: doc.id, ...doc.data() });
      });
      dispatch({
        type: SET_PAYMENTS,
        payments,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
