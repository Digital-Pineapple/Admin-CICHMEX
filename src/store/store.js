import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";
import uiReducer from "./reducer/uiReducer";
import servicesReducer from "./reducer/servicesReducer";
import categoryReducer from "./reducer/categoryReducer";
import typeCarReducer from "./reducer/typeCarReducer";
import subCategoryReducer from "./reducer/subCategoryReducer";
import commissionReducer from "./reducer/commissionReducer";
import documentationReducer from "./reducer/documentationReducer";
import servicesCustomerReducer from "./reducer/servicesCustomerReducer";
import myCarReducer from "./reducer/myCarReducer";
import typeUserReducer from "./reducer/typeUserReducer";
import branchReducer from "./reducer/branchReducer";
import membershipReducer from "./reducer/membershipReducer";
import userReducer from "./reducer/userReducer";
import productsReducer from "./reducer/productsReducer";
import storeHouseReducer from "./reducer/storeHouseReducer";
import productOrdersReducer from "./reducer/productOrdersReducer";
import carrierDriverReducer from "./reducer/carrierDriverReducer";
import shippingCostReducer from "./reducer/shippingCostReducer";
import dynamicRoutes from "./reducer/dynamicRoutes";
import paymentsReducer from "./reducer/paymentsReducer";
import regionsReducer from "./reducer/regionsReducer";
import sizeGuideReducer  from "./reducer/sizeGuideReducer";
import  discountsReducer from "./reducer/discountsReducer";
import deliveryPointsReducer  from "./reducer/deliveryPointsReducer";
import  stockStorehouseReducer  from "./reducer/useStockStoreHouse";



const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  users: userReducer,
  allProductOrders: productOrdersReducer,
  dynamicRoutes : dynamicRoutes,
  discounts: discountsReducer,
  services: servicesReducer,
  categories: categoryReducer,
  typeCars: typeCarReducer,
  typeUser: typeUserReducer,
  subCategories: subCategoryReducer,
  commissions: commissionReducer,
  documentations: documentationReducer,
  servicesCustomer: servicesCustomerReducer,
  myCars: myCarReducer,
  branches: branchReducer,
  memberships: membershipReducer,
  products : productsReducer,
  storeHouse : storeHouseReducer,
  carrierDriver : carrierDriverReducer,
  shippingCost: shippingCostReducer,
  payments: paymentsReducer,
  regions: regionsReducer,
  sizeGuide : sizeGuideReducer,
  deliveryPoints: deliveryPointsReducer,
  stockStorehouse: stockStorehouseReducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), 
  // devTools:false
});
