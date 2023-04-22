import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import uiReducer from './reducer/uiReducer';

const rootReducer = combineReducers({
    users : userReducer,
    ui    : uiReducer
})

export const store = configureStore({
    reducer: rootReducer,   
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})