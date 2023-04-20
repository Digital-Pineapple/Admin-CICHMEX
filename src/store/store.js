import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer
})

export const store = configureStore({
    reducer: rootReducer,   
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})