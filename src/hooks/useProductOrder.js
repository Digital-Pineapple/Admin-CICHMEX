import { useDispatch, useSelector } from "react-redux"
import {LoadOneProductOrder, StartCompleteProductOrder, StartLoadResumeSales, startLoadProductOrders } from "../store/actions/productOrderActions";
import { useNavigate } from "react-router-dom";

export const useProductOrder = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { productOrders, productOrder, isLoading, resumeOrders   } = useSelector(state => state.allProductOrders);

    const loadProductOrders = async () => dispatch((startLoadProductOrders()))

    const loadProductOrder = async (id) => dispatch((LoadOneProductOrder(id)))

    const loadResumeProductOrder = async ()=> dispatch(StartLoadResumeSales())

    const completeProductOrder = (id)=> dispatch (StartCompleteProductOrder(id, navigate))

    const rowsProducts = ()=>{
        const products = productOrder?.products;
       return  products?.map((product, index) => {
            return {
              ...product.item,
              id: index.toString(),
              quantity: product.quantity,
            };
          });

    }

    return { dispatch, navigate, rowsProducts,  loadResumeProductOrder, productOrder,productOrders, isLoading, loadProductOrders, loadProductOrder, resumeOrders, completeProductOrder}
}