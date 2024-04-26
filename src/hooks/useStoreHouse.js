import { useDispatch, useSelector } from "react-redux"
import { startLoadAllStock, startAddStockProduct, startCreateStockProduct, startRemoveStockProduct, startReturnStockProduct } from "../store/actions/storehouseActions";
import { useNavigate } from "react-router-dom";

export const useStoreHouse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { AllStock, OneProductStock } = useSelector(state => state.StoreHouse);

    const loadAllStock = async () => dispatch((startLoadAllStock()));

    const createStockProduct = async (values) => dispatch(startCreateStockProduct(values, navigate))

    const addStockProduct = async (id, values) => dispatch(startAddStockProduct(id, values, navigate))

    const removeStockProduct = async (id, values) => dispatch(startRemoveStockProduct(id, values, navigate))

    const returnStockProduct = async (id, values) => dispatch(startReturnStockProduct(id, values, navigate))



    return { AllStock, OneProductStock, loadAllStock, createStockProduct, addStockProduct, removeStockProduct, returnStockProduct }
}
