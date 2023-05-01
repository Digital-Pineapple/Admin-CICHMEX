import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducer/authReducer';
import customerReducer from './reducer/customerReducer';
import uiReducer from './reducer/uiReducer';
import servicesReducer from './reducer/servicesReducer';

const rootReducer = combineReducers({
    auth        : authReducer,
    ui          : uiReducer,
    customers   : customerReducer,
    services    : servicesReducer,
})

export const store = configureStore({
    reducer: rootReducer,   
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})