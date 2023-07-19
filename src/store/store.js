import { configureStore, combineReducers, } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducer/authReducer';
import customerReducer from './reducer/customerReducer';
import uiReducer from './reducer/uiReducer';
import servicesReducer from './reducer/servicesReducer';
import categoryReducer from './reducer/categoryReducer';
import typeCarReducer from './reducer/typeCarReducer';
import subCategoryReducer from './reducer/subCategoryReducer';
import commissionReducer from './reducer/commissionReducer';

const rootReducer = combineReducers({
    auth        : authReducer,
    ui          : uiReducer,
    customers   : customerReducer,
    services    : servicesReducer,
    categories  : categoryReducer,
    typeCars    : typeCarReducer,
    subCategories: subCategoryReducer,
    commissions : commissionReducer,

})

export const store = configureStore({
    reducer: rootReducer,   
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
})