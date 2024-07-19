import { useDispatch, useSelector } from "react-redux";
import {
  LoadOneProduct,
  addOneProduct,
  deleteOneProduct,
  editOneProduct,
  startLoadEntriesProduct,
  startLoadNonExistProduct,
  startLoadProducts,
  startLoadStockProducts,
} from "../store/actions/productsActions";
import { useNavigate } from "react-router-dom";
import { cleanProductDetail } from "../store/reducer/productsReducer";
import { useForm } from "react-hook-form";
import { Category } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";

export const useProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reset } = useForm();

  const { products, product, isLoading, stockProducts, entries } = useSelector(
    (state) => state.products
  );

  const loadProducts = async () => dispatch(startLoadProducts());

  const loadEntriesProducts = async () => dispatch(startLoadEntriesProduct());

  const loadStockProducts = async () => dispatch(startLoadStockProducts());

  const loadNoStockProducts = async () => dispatch(startLoadNonExistProduct());

  const loadProduct = async (_id) => {
    dispatch(LoadOneProduct(_id));
  };

  const createProduct = async (values, images) => {
    dispatch(addOneProduct(values, images, navigate));
  };

  const editProduct = async (id, values, images) =>
    dispatch(editOneProduct(id, values, images, navigate));

  const deleteProduct = async (id) => dispatch(deleteOneProduct(id));

  const cleanProductD = () => dispatch(cleanProductDetail());

  const rowsStockProducts = stockProducts.map((item, _id) => ({
    id: _id.toString(),
    total : item.price * item.stock,
    ...item,
  }));

  const rowsOutOfStockProducts = products?.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));

  const rowsProducts = products?.map((item, _id) => ({
    id: _id.toString(),
    Category: item?.category?.name,
    SubCategory: item?.subCategory?.name,
    ...item,
  }));

  const rowsEntriesProducts = entries?.map((item, index) => {
    const allInputs = item.Inputs.map((item1) => {
      return {
        quantity: item1?.quantity,
        newQuantity: item1?.newQuantity,
        day: dayjs(item1?.createdAt).format('DD/MM/YYYY'),
        hour: dayjs(item1?.createdAt).format('HH:mm:ss'), // Cambiado para obtener la hora en el formato correcto
        responsible: item1?.responsible?.fullname
      };
    });
    const row = {
      id: index,
      stock_id:item?._id,
      name: item?.product[0]?.name,
      price: item?.product[0]?.price,
      tag: item?.product[0]?.tag,
      stock: item.stock,
      inputs: allInputs
    };
    return row;
  });
  

  return {
    loadProducts,
    rowsOutOfStockProducts,
    stockProducts,
    rowsProducts,
    loadNoStockProducts,
    loadProduct,
    createProduct,
    editProduct,
    deleteProduct,
    rowsStockProducts,
    product,
    products,
    navigate,
    isLoading,
    cleanProductD,
    loadStockProducts,
    entries,
    loadEntriesProducts,
    rowsEntriesProducts
  };
};
