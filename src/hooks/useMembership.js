import { useDispatch, useSelector } from "react-redux"
import { startLoadServices, deleteOneServices, getOneService, editOneService, addOneService, searchServices, startLoadCuServ, addOneCustomerService } from "../store/actions/servicesActions";
import { useNavigate } from "react-router-dom";

export const useMembership = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { services, service } = useSelector(state => state.services);

    const loadServices = async () => dispatch(startLoadServices());

    const loadService = async service_id => dispatch(getOneService(service_id));

    const deleteService = async service_id => dispatch(deleteOneServices(service_id))

    const editService = async (service_id, values) => dispatch(editOneService(service_id, values))

    const addService = async values => 
    {
        const response  = await dispatch(addOneService(values));
        if (response) {
            navigate('/auth/servicios')
        }

    }

    const searchService = async value => await dispatch(searchServices(value));


    return { loadServices, services, deleteService, loadService, service, editService, addService, searchService }
}