import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducer/authReducer';
import uiReducer from './reducer/uiReducer';
import userReducer from './reducer/userReducer';

const rootReducer = combineReducers({
    auth  : authReducer,
    ui    : uiReducer,
    users : userReducer,
})

export const store = configureStore({
    reducer: rootReducer,   
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})