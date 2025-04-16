import { useDispatch, useSelector } from "react-redux"
import { startLoadCuServ, addOneCustomerService, deleteServicesOneCustomer } from "../store/actions/servicesCustomerActions";

export const useServicesCustomer = () => {

    const dispatch = useDispatch();

    // Obtiene los datos del estado global relacionados con los servicios del cliente
    const { servicesCustomer, serviceCustomer } = useSelector(state => state.servicesCustomer); 

    // Función para cargar los servicios de un cliente específico por su ID
    const loadCuServ  = async(id) => await dispatch(startLoadCuServ(id))

    // Función para agregar un servicio a un cliente específico
    const addServiceCustomer = async(services_id, values) => await dispatch(addOneCustomerService(services_id, values))

    // Función para eliminar un servicio específico de un cliente
    const deleteOneServiceCustomer = async (services_id, value) => await dispatch(deleteServicesOneCustomer(services_id, value))

    // Función adicional para agregar un servicio a un cliente (parece duplicada de `addServiceCustomer`)
    const addOneSCustomer = async (services_id, value) => await dispatch(addOneCustomerService(services_id, value))

    // Retorna las funciones y datos necesarios para interactuar con los servicios del cliente
    return { loadCuServ, addServiceCustomer, deleteOneServiceCustomer, servicesCustomer, serviceCustomer, addOneSCustomer }
}