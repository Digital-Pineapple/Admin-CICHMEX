import { useDispatch, useSelector } from "react-redux"
import { startLoadOneShippingCost, startLoadShippingCosts, startCreateShippingCost, startDeleteShippingCost, startUpdateShippingCost } from "../store/actions/shippingCostActions";
import { useNavigate } from "react-router-dom";

export const useShippingCost = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { shippingCosts, shippingCost } = useSelector(state => state.shippingCost); 
    const { loading } = useSelector(state => state.ui); 

    const loadShippingCosts  = async () => await dispatch(startLoadShippingCosts())

    const loadOneShippingCost = async(id) => await dispatch(startLoadOneShippingCost(id))

    const createShippingCost = async (values) => await dispatch((startCreateShippingCost(values, navigate)))

    const updateShippingCost = async (id, values) => await dispatch(startUpdateShippingCost(id, values, navigate))

    const deleteShippingCost = async (id) => await dispatch(startDeleteShippingCost(id))

    const rowsShippingCosts = shippingCosts.map((item, _id) => ({
        id: _id.toString(),
        ...item,
      }));
 



    return { shippingCost,shippingCosts,loading, loadShippingCosts, loadOneShippingCost, createShippingCost,updateShippingCost, deleteShippingCost, rowsShippingCosts }
}