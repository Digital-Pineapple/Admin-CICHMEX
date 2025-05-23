import { Login } from "../pages/Login";
import Users from "../pages/Usuarios/Users";
import Services from "../pages/Services/Services";
import EditUser from "../pages/Usuarios/Edit";
import EditServices from "../pages/Services/Edit";
import TypeCar from "../pages/TypeCar/TypeCar";
import Categories from "../pages/Category/Categories";
import CreateTypeCar from "../pages/TypeCar/Create";
import EditTypeCar from "../pages/TypeCar/Edit";
import CreateServices from "../pages/Services/Create";
import SubCategories from "../pages/SubCategory/SubCategories";
import Commissions from "../pages/Commission/Commissions";
import CreateCommission from "../pages/Commission/Create";
import EditCommission from "../pages/Commission/Edit";
import Documentation from "../pages/Documentation/Documentations";
import ServicesCustomer from "../pages/Usuarios/ServicesCustomer";
import MyCars from "../pages/Usuarios/MyCars";
import { Branches } from "../pages/Branches/Branches";
import { BranchesToVerified } from "../pages/Branches/BranchesToVerified";
import { BranchDetail } from "../pages/Branches/BranchDetail";
import Memberships from "../pages/Membership/Memberships";
import CreateMembership from "../pages/Membership/Create";
import EditMembership from "../pages/Membership/Edit";
import Products from "../pages/Products/Products";
import EditProduct from "../pages/Products/Edit";
import StoreHouse from "../pages/StoreHouse/StoreHouse";
import CreateStoreHouse from "../pages/StoreHouse/Create";
import EditStoreHouse from "../pages/StoreHouse/Edit";
import StockProductsSH from "../pages/StoreHouse/StockProductsSH";
import AddProductsToSH from "../pages/StoreHouse/AddProductsToSH";
import { MyStoreHouse } from "../pages/MyStoreHouse/MyStoreHouse";
import MyProductOrders from "../pages/ProductOrders/MyProductOrders";
import Principal from "../pages/Principal";
import FillOrder from "../pages/MyStoreHouse/FillOrder";
import AssignRoute from "../pages/MyStoreHouse/ AssignRoute";
import TypeUser from "../pages/TypeUser/TypeUser";
import CreateTypeUser from "../pages/TypeUser/Create";
import CarrierDrivers from "../pages/CarrierDriver/CarrierDrivers";
import CreateCarrier from "../pages/CarrierDriver/Create";
import ShippingCost from "../pages/ShippingCost/ShippingCost";
import ProductEntries from "../pages/MyStoreHouse/ProductEntries";
import ProductOutputs from "../pages/MyStoreHouse/ProductOutputs";
import PaidProductOrders from "../pages/ProductOrders/PaidProductOrders";
import ShippingDeliveryPoint from "../pages/Logistic/ShippingDeliveryPoint";
import ShippingDelivery from "../pages/Logistic/ShippingDelivery";
import LoadPackage from "../pages/Logistic/LoadPackage";
import VerifyPackage from "../pages/Logistic/VerifyPackage";
import DeliverPackage from "../pages/Logistic/DeliverPackage";
import StockMovements from "../pages/MyStoreHouse/StockMovements";
import AddEntries from "../pages/MyStoreHouse/AddEntries";
import AddOutputs from "../pages/MyStoreHouse/AddOutputs";
import VerifySales from "../pages/Sales/VerifySales";
import DetailSale from "../pages/Sales/DetailSale";
import { NotFound } from "../pages/ui/NotFound";
import Unauthorized from "../pages/ui/Unauthorized";
import AddDynamicRoute from "../pages/DynamicRoutes/AddDynamicRoute";
import DynamicRoutes from "../pages/DynamicRoutes/DynamicRoutes";
import EditDynamicRoute from "../pages/DynamicRoutes/EditDynamicRoute";
import CreateRegion from "../pages/Regions/Create";
import Regions from "../pages/Regions/Regions";
import EditRegion from "../pages/Regions/Edit";
import EditCarrierDriver from "../pages/CarrierDriver/Edit";
import Home from "../pages/Home";
import ReadyToDelivery from "../pages/Logistic/ReadyToDelivery";
import AllSales from "../pages/Sales/AllSales";
import CompletedOrdersDetail from "../pages/MyStoreHouse/CompletedOrdersDetail";
import AddVideo from "../pages/Products/AddVideo";
import TableGuides from "../pages/SizeDimensions/TableGuides";
import EditWithVariants from "../pages/Products/EditWithVariants";
import CreateWithVariants from "../pages/Products/CreateWithVariants";
import CreateOneProduct from "../pages/Products/CreateOneProduct";
import AllMySizeGuides from "../pages/SizeDimensions/AllMySizeGuides";
import EditMySizeGuides from "../pages/SizeDimensions/EditMySizeGuide";
import MainToSend from "../pages/Logistic/PackageToSend/MainToSend";
import Discounts from "../pages/Discounts/Discounts";
import CreateDiscount from "../pages/Discounts/CreateDiscount";
import UpdateDiscount from "../pages/Discounts/UpdateDiscount";
import CreateDeliveryPoint from "../pages/Points/Create";
import { PointsList } from "../pages/Points/PointsList";
import BranchOfficeEdit from "../pages/Points/Edit";
import BranchOfficeDetail from "../pages/Points/Detail";
import { DeliveryPointsOrder } from "../pages/Points/DeliveryPointOrders";
import Banners from "../pages/Banners/Banners";
import CreateSlider from "../pages/Banners/CreateSlider";
import UpdateSlider from "../pages/Banners/UpdateSlider";
import MyAccount from "../pages/Settings/MyAccount";
import InputsByFolio from "../pages/StockStoreHouse/InputsByFolio";
import AuthorizeInputs from "../pages/StockStoreHouse/AuthorizeInputs";
import WarehouseManagement from "../pages/Warehouse/WarehouseManagement/WarehouseManagement";
import ArrangeProducts from "../pages/StockStoreHouse/ArrangeProducts";
import Warehouseman from "../pages/Warehouse/Warehouseman/Warehouseman";
import CreateWarehouseman from "../pages/Warehouse/Warehouseman/Create";
import EditWarehouseman from "../pages/Warehouse/Warehouseman/EditWarehouseman";
import PackagesReady from "../pages/Logistic/DeliveryToPoint/PackagesReady";
import PackagesDelivered from "../pages/Points/DeliveryPointOrders/PackagesDelivered";
import OutOfStock from "../pages/StockStoreHouse/OutOfStock";

export const AllRoutes = [
  { id: 1000, element: <Login /> },
  { id: 0, element: <Unauthorized /> },
  { id: 1, element: <NotFound /> },
  { id: 2, element: <Home /> },
  { id: 3, element: <Users /> },
  { id: 4, element: <EditUser /> },
  { id: 5, element: <Documentation /> },
  { id: 6, element: <ServicesCustomer /> },
  { id: 7, element: <MyCars /> },

  { id: 8, element: <Services /> },
  { id: 9, element: <EditServices /> },
  { id: 10, element: <CreateServices /> },

  { id: 11, element: <TypeCar /> },
  { id: 12, element: <CreateTypeCar /> },
  { id: 13, element: <EditTypeCar /> },

  { id: 14, element: <Categories /> },

  { id: 17, element: <SubCategories /> },

  { id: 20, element: <TypeUser /> },
  { id: 21, element: <CreateTypeUser /> },
  { id: 22, element: <Commissions /> },
  { id: 23, element: <CreateCommission /> },
  { id: 24, element: <EditCommission /> },

  { id: 25, element: <Branches /> },
  { id: 26, element: <BranchesToVerified /> },
  { id: 27, element: <BranchDetail /> },

  { id: 28, element: <Memberships /> },
  { id: 29, element: <CreateMembership /> },
  { id: 30, element: <EditMembership /> },

  { id: 31, element: <Products /> },
  { id: 32, element: <CreateWithVariants /> },

  { id: 33, element: <EditProduct /> },

  { id: 34, element: <ShippingCost /> },

  { id: 36, element: <EditStoreHouse /> },

  { id: 37, element: <StoreHouse /> },

  { id: 38, element: <CreateStoreHouse /> },
  { id: 39, element: <StockProductsSH /> },
  { id: 40, element: <AddProductsToSH /> },

  { id: 41, element: <MyStoreHouse /> },
  { id: 42, element: <StockMovements /> },
  { id: 43, element: <ProductEntries /> },
  { id: 44, element: <AddEntries /> },

  { id: 45, element: <ProductOutputs /> },
  { id: 46, element: <AddOutputs /> },

  { id: 47, element: <PaidProductOrders /> },

  { id: 48, element: <ShippingDeliveryPoint /> },
  { id: 49, element: <ShippingDelivery /> },
  { id: 50, element: <LoadPackage /> },
  { id: 51, element: <VerifyPackage /> },

  { id: 53, element: <DeliverPackage /> },

  { id: 54, element: <AssignRoute /> },

  { id: 55, element: <FillOrder /> },

  { id: 56, element: <CarrierDrivers /> },
  { id: 57, element: <CreateCarrier /> },

  { id: 58, element: <VerifySales /> },
  { id: 59, element: <DetailSale /> },

  { id: 60, element: <DynamicRoutes /> },
  { id: 61, element: <AddDynamicRoute /> },
  { id: 62, element: <EditDynamicRoute /> },

  { id: 63, element: <MyProductOrders /> },
  { id: 64, element: <CreateRegion /> },
  { id: 65, element: <Regions /> },
  { id: 66, element: <EditRegion /> },

  { id: 67, element: <EditCarrierDriver /> },

  { id: 68, element: <ReadyToDelivery /> },
  { id: 69, element: <Principal /> },
  { id: 70, element: <AllSales /> },
  { id: 71, element: <CompletedOrdersDetail /> },
  { id: 72, element: <AddVideo /> },
  { id: 73, element: <EditWithVariants /> },
  { id: 74, element: <PointsList /> },

  { id: 75, element: <CreateOneProduct /> },

  { id: 76, element: <TableGuides /> },
  { id: 77, element: <AllMySizeGuides /> },
  { id: 78, element: <EditMySizeGuides /> },
  { id: 79, element: <AssignRoute /> },
  { id: 80, element: <MainToSend /> },
  { id: 81, element: <PackagesReady /> },

  { id: 90, element: <CreateDeliveryPoint /> },
  { id: 91, element: <BranchOfficeEdit /> },
  { id: 92, element: <BranchOfficeDetail /> },
  { id: 93, element: <DeliveryPointsOrder /> },
  { id: 94, element: <PackagesDelivered /> },

  { id: 100, element: <Discounts /> },
  { id: 101, element: <UpdateDiscount /> },
  { id: 102, element: <CreateDiscount /> },
  { id: 110, element: <Banners /> },

  { id: 111, element: <CreateSlider /> },
  { id: 112, element: <UpdateSlider /> },
  { id: 120, element: <MyAccount /> },
  { id: 130, element: <InputsByFolio /> },
  { id: 131, element: <AuthorizeInputs /> },
  { id: 132, element: <ArrangeProducts /> },
  { id: 133, element: <OutOfStock /> },

  { id: 140, element: <Warehouseman /> },
  { id: 141, element: <CreateWarehouseman /> },
  { id: 142, element: <EditWarehouseman /> },

  { id: 200, element: <WarehouseManagement /> },
];
