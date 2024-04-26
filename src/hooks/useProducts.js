import { useDispatch, useSelector } from "react-redux"
import { LoadOneProduct, addOneProduct, deleteOneProduct, editOneProduct, startLoadProducts } from "../store/actions/productsActions";
import { useNavigate } from "react-router-dom";

export const useProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { products, product } = useSelector(state => state.products);

    const loadProducts = async () => dispatch((startLoadProducts()));

    const loadProduct = async (_id) => {
        dispatch((LoadOneProduct(_id)));
    } 

    const createProduct = async (values, images ) => dispatch(addOneProduct(values, images, navigate))

    const editProduct = async (id, values, images) => dispatch(editOneProduct(id, values, images, navigate))

    const deleteProduct = async (id) => dispatch(deleteOneProduct(id))

    return { loadProducts, loadProduct, createProduct, editProduct, deleteProduct, product, products, navigate }
}