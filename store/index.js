import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import projectReducer from "./reducers/projectReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
  auth: authReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
