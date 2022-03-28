// Add payment function
export const ADD_PAYMENT = "ADD_PAYMENT";
export const addPayment = (paymentImg, amount) => {
  return {
    type: ADD_PAYMENT,
    payload: { paymentImg, amount },
  };
};
