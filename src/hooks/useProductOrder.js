import { useDispatch, useSelector } from "react-redux"
import {LoadOneProductOrder, startLoadProductOrders } from "../store/actions/productOrderActions";
import { useNavigate } from "react-router-dom";

export const useProductOrder = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { productOrders, productOrder, isLoading   } = useSelector(state => state.allProductOrders);

    const loadProductOrders = async () => dispatch((startLoadProductOrders()))

    const loadProductOrder = async (id) => dispatch((LoadOneProductOrder(id)))


    return { dispatch, navigate, productOrder,productOrders, isLoading, loadProductOrders, loadProductOrder}
}