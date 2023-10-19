import { useDispatch, useSelector } from "react-redux"
import {  startLoadCuServ, addOneCustomerService, deleteServicesOneCustomer } from "../store/actions/servicesCustomerActions";

export const useServicesCustomer = () => {

    const dispatch = useDispatch();

    const { servicesCustomer, serviceCustomer } = useSelector(state => state.servicesCustomer); 

    const loadCuServ  = async(id) => await dispatch (startLoadCuServ(id))

    const addServiceCustomer = async(services_id, values) => await dispatch(addOneCustomerService(services_id, values))

    const deleteOneServiceCustomer = async (services_id, value) => await dispatch(deleteServicesOneCustomer(services_id, value))

    const addOneSCustomer = async (services_id, value) => await dispatch(addOneCustomerService(services_id, value))
 



    return { loadCuServ, addServiceCustomer, deleteOneServiceCustomer, servicesCustomer,serviceCustomer,addOneSCustomer }
}