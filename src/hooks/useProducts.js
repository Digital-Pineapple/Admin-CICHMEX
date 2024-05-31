import { useDispatch, useSelector } from "react-redux"
import { LoadOneProduct, addOneProduct, deleteOneProduct, editOneProduct, startLoadProducts, startLoadStockProducts } from "../store/actions/productsActions";
import { useNavigate } from "react-router-dom";
import { cleanProductDetail } from "../store/reducer/productsReducer";

export const useProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { products, product, isLoading } = useSelector(state => state.products);

    const loadProducts = async () => dispatch((startLoadProducts()))

    const loadStockProducts = async () => dispatch((startLoadStockProducts()))

    const loadProduct = async (_id) => {
        dispatch((LoadOneProduct(_id)));
    } 
   
    const createProduct = async (values, images ) => dispatch(addOneProduct(values, images, navigate))

    const editProduct = async (id, values, images) => dispatch(editOneProduct(id, values, images, navigate))

    const deleteProduct = async (id) => dispatch(deleteOneProduct(id))

    const cleanProductD = () => dispatch(cleanProductDetail())

    return { loadProducts, loadProduct, createProduct, editProduct, deleteProduct, product, products, navigate, isLoading, cleanProductD, loadStockProducts }
}