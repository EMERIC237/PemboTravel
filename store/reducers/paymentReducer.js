import { ADD_PAYMENT } from "../actions/paymentActions";
import Payment from "../../models/payment";
const initialState = {
  payments: [],
  verifiedPayments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PAYMENT:
      //create a new id for the payment
      const newId = Math.random().toString();
      const payment = new Payment(
        newId,
        action.payload.paymentImg,
        action.payload.amount
      );
      return {
        ...state,
        payments: [...state.payments, payment],
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
