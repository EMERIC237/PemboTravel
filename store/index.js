import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import projectReducer from "./reducers/projectReducer";
import authReducer from "./reducers/authReducer";
import paymentReducer from "./reducers/paymentReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
  auth: authReducer,
  payment: paymentReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
