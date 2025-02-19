import { useDispatch, useSelector } from "react-redux";
import {
  startLoadAllStock,
  startAddStockProduct,
  startCreateStockProduct,
  startRemoveStockProduct,
  startReturnStockProduct,
  startLoadOneStoreHouse,
  startLoadStoreHouses,
  startDeleteStoreHouse,
  startCreateStoreHouse,
  startUpdateStoreHouse,
} from "../store/actions/storehouseActions";
import { useNavigate } from "react-router-dom";

export const useStoreHouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { AllStock, OneProductStock, StoreHouses, StoreHouseDetail } =
    useSelector((state) => state.storeHouse);

  const loadStoreHouse = async () => dispatch(startLoadStoreHouses());

  const loadOneStoreHouse = async (id) => dispatch(startLoadOneStoreHouse(id));

  const loadCreateStoreHouse = (data, marker) => {
    dispatch(startCreateStoreHouse(data, marker, navigate));
  };
  const loadUpdateStoreHouse = (id,data, marker) => {
    dispatch(startUpdateStoreHouse(id, data, marker, navigate));
  };

  const loadAllStock = async (id) => dispatch(startLoadAllStock(id));

  const createStockProduct = async (values) => {
    dispatch(startCreateStockProduct(values, navigate));
  };

  const addStockProduct = async (id, values) =>
    dispatch(startAddStockProduct(id, values, navigate));

  const removeStockProduct = async (id, values) => {
    dispatch(startRemoveStockProduct(id, values, navigate));
  };

  const returnStockProduct = async (id, values) =>
    dispatch(startReturnStockProduct(id, values, navigate));
  const deleteStoreHouse = async (id) => {
    dispatch(startDeleteStoreHouse(id));
  };

  const rowsStocks = AllStock?.map((item, index) => {
    const row = {
      id: index,
      _id: item._id,
      product_id: item?.product_id?._id,
      name: item?.product_id?.name,
      price: item?.product_id?.price,
      size: item?.product_id?.size,
      tag: item?.product_id?.tag,
      weight: item?.product_id?.weight,
      stock: item.stock,
    };
    return row;
  });

  return {
    AllStock,
    OneProductStock,
    loadAllStock,
    createStockProduct,
    addStockProduct,
    removeStockProduct,
    returnStockProduct,
    StoreHouses,
    StoreHouseDetail,
    loadStoreHouse,
    loadOneStoreHouse,
    loadCreateStoreHouse,
    navigate,
    deleteStoreHouse,
    rowsStocks,
    loadUpdateStoreHouse,
  };
};
