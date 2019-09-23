import {createStore, compose} from "redux";
import userReducer from "../reducers/userReducer";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(userReducer, composeEnhancers());