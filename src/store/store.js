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
import sizeGuideReducer from "./reducer/sizeGuideReducer";
import discountsReducer from "./reducer/discountsReducer";
import deliveryPointsReducer from "./reducer/deliveryPointsReducer";
import stockStorehouseReducer from "./reducer/useStockStoreHouse";
import warehouseReducer from "./reducer/warehouseReducer";
import notificationsReducer from "./reducer/notificationsReducer";

// Combina todos los reducers en un único reducer raíz
const rootReducer = combineReducers({
  auth: authReducer, // Maneja el estado de autenticación
  ui: uiReducer, // Maneja el estado de la interfaz de usuario
  users: userReducer, // Maneja el estado de los usuarios
  allProductOrders: productOrdersReducer, // Maneja el estado de las órdenes de productos
  dynamicRoutes: dynamicRoutes, // Maneja las rutas dinámicas
  discounts: discountsReducer, // Maneja los descuentos
  services: servicesReducer, // Maneja los servicios
  categories: categoryReducer, // Maneja las categorías
  typeCars: typeCarReducer, // Maneja los tipos de autos
  typeUser: typeUserReducer, // Maneja los tipos de usuarios
  subCategories: subCategoryReducer, // Maneja las subcategorías
  commissions: commissionReducer, // Maneja las comisiones
  documentations: documentationReducer, // Maneja la documentación
  servicesCustomer: servicesCustomerReducer, // Maneja los servicios para clientes
  myCars: myCarReducer, // Maneja los autos del usuario
  branches: branchReducer, // Maneja las sucursales
  memberships: membershipReducer, // Maneja las membresías
  products: productsReducer, // Maneja los productos
  storeHouse: storeHouseReducer, // Maneja los almacenes
  carrierDriver: carrierDriverReducer, // Maneja los conductores de transporte
  shippingCost: shippingCostReducer, // Maneja los costos de envío
  payments: paymentsReducer, // Maneja los pagos
  regions: regionsReducer, // Maneja las regiones
  sizeGuide: sizeGuideReducer, // Maneja la guía de tallas
  deliveryPoints: deliveryPointsReducer, // Maneja los puntos de entrega
  stockStorehouse: stockStorehouseReducer, // Maneja el stock de los almacenes
  warehouse: warehouseReducer, // Maneja los almacenes
  notifications: notificationsReducer // Maneja las notificaciones
});

// Configura la tienda de Redux
export const store = configureStore({
  reducer: rootReducer, // Asigna el reducer raíz
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Agrega middleware adicional como redux-thunk
  // devTools:false // Desactiva las herramientas de desarrollo si es necesario
});
