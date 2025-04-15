import { useDispatch, useSelector } from "react-redux"
import { startLoadMyCars,getOneMyCar,deleteOneMyCar,addOneMyCar,editOneMyCar } from "../store/actions/myCarActions";
import { startAddNewRegion, startDeleteRegion, startLoadAllRegions, startLoadOneRegion, startUpdateRegion } from "../store";
import { useNavigate } from "react-router-dom";

// Hook personalizado para manejar las regiones
export const useRegions = () => {

    const dispatch = useDispatch(); // Hook de Redux para despachar acciones
    const navigate = useNavigate(); // Hook de React Router para navegar entre rutas
    const {regions, region} = useSelector((state)=> state.regions); // Obtiene el estado de las regiones desde Redux

    // Carga todas las regiones desde el servidor
    const loadAllRegions = () => dispatch(startLoadAllRegions());

    // Carga una región específica por su ID
    const loadOneRegion = id => { dispatch(startLoadOneRegion(id)) };

    // Agrega una nueva región con los valores proporcionados y navega a otra página
    const addNewRegion = values => dispatch(startAddNewRegion(values, navigate));

    // Actualiza una región existente con un ID y valores proporcionados, y navega a otra página
    const updateRegion = (id, values) => dispatch(startUpdateRegion(id, values, navigate));

    // Elimina una región específica por su ID
    const onDeleteRegion = id => dispatch(startDeleteRegion(id));

    // Retorna las funciones y datos necesarios para manejar las regiones
    return { loadAllRegions, region, regions, loadOneRegion, addNewRegion, onDeleteRegion, updateRegion, navigate };
}