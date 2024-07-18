import { useDispatch, useSelector } from "react-redux"
import { LoadOneProduct, addOneProduct, deleteOneProduct, editOneProduct, startLoadNonExistProduct, startLoadProducts, startLoadStockProducts } from "../store/actions/productsActions";
import { useNavigate } from "react-router-dom";
import { cleanProductDetail } from "../store/reducer/productsReducer";
import { useForm } from "react-hook-form";
import { Category } from "@mui/icons-material";

export const useProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {reset} = useForm()

    const { products, product, isLoading, stockProducts } = useSelector(state => state.products);

    const loadProducts = async () => dispatch((startLoadProducts()))

    const loadStockProducts = async () => dispatch((startLoadStockProducts()))
    
    const loadNoStockProducts = async () => dispatch((startLoadNonExistProduct()))

    const loadProduct = async (_id) => {
        dispatch((LoadOneProduct(_id)));
    } 
   
    const createProduct = async (values, images ) =>{ dispatch(addOneProduct(values, images, navigate))}

    const editProduct = async (id, values, images) => dispatch(editOneProduct(id, values, images, navigate))

    const deleteProduct = async (id) => dispatch(deleteOneProduct(id))

    const cleanProductD = () => dispatch(cleanProductDetail())

    const rowsStockProducts = stockProducts.map((item, _id) => ({
        id: _id.toString(),
        ...item,
      }));

    const rowsOutOfStockProducts = products?.map((item, _id) => ({
        id: _id.toString(),
        ...item,
      }));

      const rowsProducts = products?.map((item, _id) => ({
        id: _id.toString(),
        Category: item.category.name,
        SubCategory: item.subCategory.name,
        ...item,
      }));

    return { loadProducts,rowsOutOfStockProducts,stockProducts, rowsProducts,loadNoStockProducts,  loadProduct, createProduct, editProduct, deleteProduct,rowsStockProducts, product, products, navigate, isLoading, cleanProductD, loadStockProducts }
}