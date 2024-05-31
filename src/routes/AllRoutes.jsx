import { Navigate } from 'react-router-dom'
import {Login} from '../pages/Login'
import { Principal } from '../pages/Principal'
import Users from '../pages/Usuarios/Users'
import Services from '../pages/Services/Services'
import EditUser from '../pages/Usuarios/Edit'
import EditServices from '../pages/Services/Edit'
import TypeCar from '../pages/TypeCar/TypeCar'
import Categories from '../pages/Category/Categories'
import EditCategory from '../pages/Category/Edit'
import CreateCategory from '../pages/Category/Create'
import CreateTypeCar from '../pages/TypeCar/Create'
import EditTypeCar from '../pages/TypeCar/Edit'
import CreateServices from '../pages/Services/Create'
import SubCategories from '../pages/SubCategory/SubCategories'
import CreateSubCategory from '../pages/SubCategory/Create'
import EditSubCategory from '../pages/SubCategory/Edit'
import Commissions from '../pages/Commission/Commissions'
import CreateCommission from '../pages/Commission/Create'
import EditCommission from '../pages/Commission/Edit'
import Documentation from '../pages/Documentation/Documentations'
import ServicesCustomer from '../pages/Usuarios/ServicesCustomer'
import MyCars from '../pages/Usuarios/MyCars'
import { Branches } from '../pages/Branches/Branches'
import { BranchesToVerified } from '../pages/Branches/BranchesToVerified'
import { BranchDetail } from '../pages/Branches/BranchDetail'
import Memberships from '../pages/Membership/Memberships'
import CreateMembership from '../pages/Membership/Create'
import EditMembership from '../pages/Membership/Edit'
import Products from '../pages/Products/Products'
import CreateProduct from '../pages/Products/Create'
import EditProduct from '../pages/Products/Edit'
import StoreHouse from '../pages/StoreHouse/StoreHouse'
import CreateStoreHouse from '../pages/StoreHouse/Create'
import EditStoreHouse from '../pages/StoreHouse/Edit'
import StockProductsSH from '../pages/StoreHouse/StockProductsSH'
import AddProductsToSH from '../pages/StoreHouse/AddProductsToSH'
import { MyStoreHouse } from '../pages/MyStoreHouse/MyStoreHouse'
import MyStockProducts from '../pages/MyStoreHouse/MyStockProducts'
import MyProductOrders from '../pages/MyStoreHouse/MyProductOrders'


export const AllRoutes = [
  { type: 0, path: '/*', element: <Login/>},
  { type: 0, path: '/pruebas', element: <Users/>},
  
  { type: 1, path: '/', element: <Navigate to={"/Home"} /> },

  { type: 1, path: '/Home', element: <Principal/>},
  { type: 1, path: '/usuarios', element: <Users/>},
  { type: 1, path: '/usuarios/:id', element: <EditUser/>},
  { type: 1, path: '/usuarios/validate/:id', element: <Documentation/>},
  { type: 1, path: '/usuarios/services/:id', element: <ServicesCustomer/>},
  { type: 1, path: '/usuarios/myCars/:id', element: <MyCars/>},

  { type: 1, path: '/servicios', element: <Services/>},
  { type: 1, path: '/servicios/:id', element: <EditServices/>},
  { type: 1, path: '/createService', element: <CreateServices/>},
  


  { type: 1, path: '/typeCar', element: <TypeCar/>},
  { type: 1, path: '/createTypeCar', element: <CreateTypeCar/>},
  { type: 1, path: '/typeCar/:id', element: <EditTypeCar/>},
  
  { type: 1, path: '/CategoriaServicios', element: <Categories/>},
  { type: 1, path: '/CrearCategoria', element: <CreateCategory/>},
  { type: 1, path: '/CategoriaServicios/:id', element: <EditCategory/>},

  { type: 1, path: '/SubCategorias', element: <SubCategories/>},
  { type: 1, path: '/CrearSubCategoria', element: <CreateSubCategory/>},
  { type: 1, path: '/SubCategorias/:id', element: <EditSubCategory/>},

  { type: 1, path: '/Comisiones', element: <Commissions/>},
  { type: 1, path: '/CrearComisiones', element: <CreateCommission/>},
  { type: 1, path: '/Comisiones/:id', element: <EditCommission/>},

  { type: 1, path: '/Sucursales', element: <Branches/>},
  { type: 1, path: '/Sucursales/pending', element: <BranchesToVerified/>},
  { type: 1, path: '/Sucursales/:id', element: <BranchDetail/>},

  { type: 1, path: '/Membresias', element: <Memberships/> },
  { type: 1, path: '/CrearMembresia', element: <CreateMembership/>},
  { type: 1, path: '/Membresias/:id', element: <EditMembership/>},

  { type: 1, path: '/Productos', element: <Products/> },
  { type: 1, path: '/CrearProducto', element: <CreateProduct/>},
  { type: 1, path: '/Productos/:id', element: <EditProduct/>},

  { type: 1, path: '/Almacenes', element: <StoreHouse/> },
  { type: 1, path: '/CrearAlmacen', element: <CreateStoreHouse/>},
  { type: 1, path: '/Almacenes/:id', element: <StockProductsSH/>},
  { type: 1, path: '/agregar-productos/:id', element: <AddProductsToSH/>},

  { type: 1, path: '/MiAlmacen', element: <MyStoreHouse/> },
  { type: 1, path: '/MiAlmacen/stock', element: <MyStockProducts/> },
  { type: 1, path: '/MiAlmacen/product-orders', element: <MyProductOrders/> },

]