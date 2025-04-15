import { useDispatch, useSelector } from "react-redux"
import { startLoadServices, deleteOneServices, getOneService, editOneService, addOneService, searchServices, startLoadCuServ, addOneCustomerService } from "../store/actions/servicesActions";
import { useNavigate } from "react-router-dom";

export const useServices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Extrae los servicios y un servicio específico del estado global
    const { services, service } = useSelector(state => state.services);

    // Carga todos los servicios desde el backend y los almacena en el estado global
    const loadServices = async () => dispatch(startLoadServices());

    // Carga un servicio específico basado en su ID
    const loadService = async service_id => dispatch(getOneService(service_id));

    // Elimina un servicio específico basado en su ID
    const deleteService = async service_id => dispatch(deleteOneServices(service_id))

    // Edita un servicio específico basado en su ID y los valores proporcionados
    const editService = async (service_id, values) => dispatch(editOneService(service_id, values))

    // Agrega un nuevo servicio con los valores proporcionados y redirige a otra página
    const addService = async values =>  await dispatch(addOneService(values, navigate));

    // Busca servicios basados en un valor de búsqueda
    const searchService = async value => await dispatch(searchServices(value));

    // Retorna todas las funciones y datos necesarios para interactuar con los servicios
    return {navigate, loadServices, services, deleteService, loadService, service, editService, addService, searchService }
}