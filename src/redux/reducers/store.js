import {createStore, compose, applyMiddleware} from "redux";
import userReducer from "../reducers/userReducer";
import promise from "redux-promise-middleware";

// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(userReducer, applyMiddleware(promise));