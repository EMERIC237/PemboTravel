import { ADD_PAYMENT, SET_PAYMENTS } from "../actions/paymentActions";
const initialState = {
  payments: [],
  verifiedPayments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENTS:
      return {
        payments: action.payments,
        verifiedPayments: state.payments.filter(
          (payment) => payment.status === "verified"
        ),
      };
    case ADD_PAYMENT:
      return {
        ...state,
        payments: [...state.payments, action.payload],
      };
    // case VERIFY_PAYMENT:
    //   return {
    //     ...state,
    //     verifiedPayments: [...state.verifiedPayments, action.payload],
    //   };
    // case DELETE_PAYMENT:
    //   return {
    //     ...state,
    //     payments: state.payments.filter(
    //       (payment) => payment.id !== action.payload
    //     ),
    //   };
    default:
      return state;
  }
};
