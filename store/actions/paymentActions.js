// Add payment function
export const ADD_PAYMENT = "ADD_PAYMENT";
export const addPayment = (userId, projectId, paymentImg, amount) => {
  return async (dispatch) => {
    try {
      const paymentToAdd = {
        userId,
        projectId,
        paymentImg,
        amount,
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
