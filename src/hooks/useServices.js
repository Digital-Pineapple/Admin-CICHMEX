import { useDispatch, useSelector } from "react-redux"
import { startLoadServices, deleteOneServices, getOneService, editOneService, addOneService, searchServices, startLoadCuServ, addOneCustomerService } from "../store/actions/servicesActions";
import { useNavigate } from "react-router-dom";

export const useServices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { services, service } = useSelector(state => state.services);

    const loadServices = async () => dispatch(startLoadServices());

    const loadService = async service_id => dispatch(getOneService(service_id));

    const deleteService = async service_id => dispatch(deleteOneServices(service_id))

    const editService = async (service_id, values) => dispatch(editOneService(service_id, values))

    const addService = async values =>  await dispatch(addOneService(values, navigate));

    const searchService = async value => await dispatch(searchServices(value));


    return {navigate, loadServices, services, deleteService, loadService, service, editService, addService, searchService }
}