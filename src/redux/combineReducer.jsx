import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

export const combineReducer = combineReducers({ useReducer: userReducer });
