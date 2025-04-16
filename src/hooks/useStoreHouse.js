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

  // Accede a los datos del estado global relacionados con el almacén
  const { AllStock, OneProductStock, StoreHouses, StoreHouseDetail } =
    useSelector((state) => state.storeHouse);

  // Carga la lista de todos los almacenes
  const loadStoreHouse = async () => dispatch(startLoadStoreHouses());

  // Carga los detalles de un almacén específico por su ID
  const loadOneStoreHouse = async (id) => dispatch(startLoadOneStoreHouse(id));

  // Crea un nuevo almacén con los datos proporcionados
  const loadCreateStoreHouse = (data, marker) => {
    dispatch(startCreateStoreHouse(data, marker, navigate));
  };

  // Actualiza un almacén existente con los datos proporcionados
  const loadUpdateStoreHouse = (id, data, marker) => {
    dispatch(startUpdateStoreHouse(id, data, marker, navigate));
  };

  // Carga el inventario completo de un almacén específico
  const loadAllStock = async (id) => dispatch(startLoadAllStock(id));

  // Crea un nuevo producto en el inventario
  const createStockProduct = async (values) => {
    dispatch(startCreateStockProduct(values, navigate));
  };

  // Agrega stock a un producto existente en el inventario
  const addStockProduct = async (id, values) =>
    dispatch(startAddStockProduct(id, values, navigate));

  // Elimina stock de un producto existente en el inventario
  const removeStockProduct = async (id, values) => {
    dispatch(startRemoveStockProduct(id, values, navigate));
  };

  // Devuelve stock de un producto al inventario
  const returnStockProduct = async (id, values) =>
    dispatch(startReturnStockProduct(id, values, navigate));

  // Elimina un almacén específico por su ID
  const deleteStoreHouse = async (id) => {
    dispatch(startDeleteStoreHouse(id));
  };

  // Mapea los datos del inventario para estructurarlos en filas
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
    AllStock, // Lista de todo el inventario
    OneProductStock, // Detalles de un producto específico en el inventario
    loadAllStock, // Función para cargar todo el inventario
    createStockProduct, // Función para crear un nuevo producto en el inventario
    addStockProduct, // Función para agregar stock a un producto
    removeStockProduct, // Función para eliminar stock de un producto
    returnStockProduct, // Función para devolver stock a un producto
    StoreHouses, // Lista de todos los almacenes
    StoreHouseDetail, // Detalles de un almacén específico
    loadStoreHouse, // Función para cargar todos los almacenes
    loadOneStoreHouse, // Función para cargar un almacén específico
    loadCreateStoreHouse, // Función para crear un nuevo almacén
    navigate, // Navegador para redirigir entre rutas
    deleteStoreHouse, // Función para eliminar un almacén
    rowsStocks, // Datos estructurados del inventario en formato de filas
    loadUpdateStoreHouse, // Función para actualizar un almacén existente
  };
};
