import {
  ADD_PAYMENT,
  SET_PAYMENTS,
  GET_ALL_PAYMENTS,
  UPDATE_PAYMENT_STATUS,
} from "../actions/paymentActions";
const initialState = {
  allPayments: [],
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
    case GET_ALL_PAYMENTS:
      return {
        ...state,
        allPayments: action.payments,
      };
    case UPDATE_PAYMENT_STATUS:
      const paymentsUpdater = (payments) => {
        return payments.map((payment) => {
          if (payment.paymentId === action.paymentId) {
            return {
              ...payment,
              status: action.status,
            };
          }
          return payment;
        });
      };
      return {
        ...state,
        payments: paymentsUpdater(state.payments),
        allPayments: paymentsUpdater(state.allPayments),
        verifiedPayments: paymentsUpdater(state.verifiedPayments),
      };
    default:
      return state;
  }
};
