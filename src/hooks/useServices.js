import { useDispatch, useSelector } from "react-redux"
import { startLoadServices, deleteOneServices } from "../store/actions/servicesActions";

export const useServices = () => {

    const dispatch = useDispatch();

    const { services } = useSelector(state => state.services);

    const loadServices = async () => dispatch(startLoadServices());

    const deleteService = async service_id => dispatch(deleteOneServices(service_id))

    return { loadServices, services, deleteService }
}