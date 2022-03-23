import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import projectReducer from "./reducers/projectReducer";

const rootReducer = combineReducers({
  projects: projectReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
