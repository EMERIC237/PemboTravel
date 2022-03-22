import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import projectReducer from "./reducers/projectReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
});

export default createStore(rootReducer);
