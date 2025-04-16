import { useDispatch, useSelector } from "react-redux"
import { startLoadMyCars, getOneMyCar, deleteOneMyCar, addOneMyCar, editOneMyCar } from "../store/actions/myCarActions";

export const useMyCars = () => {

    const dispatch = useDispatch();

    // Obtiene los datos del estado global relacionados con los autos del usuario
    const { myCars, myCar } = useSelector(state => state.myCars);

    // Carga la lista de autos del usuario desde el servidor
    const loadMyCars = async _id => await dispatch(startLoadMyCars(_id));

    // Carga la información de un auto específico del usuario
    const loadMyCar = async _id => await dispatch(getOneMyCar(_id));

    // Elimina un auto específico del usuario
    const deleteMyCar = async _id => await dispatch(deleteOneMyCar(_id));

    // Edita la información de un auto específico del usuario
    const editMyCar = async (_id, values) => await dispatch(editOneMyCar(_id, values));

    // Agrega un nuevo auto al listado del usuario
    const addMyCar = async (_id, values) => await dispatch(addOneMyCar(_id, values));

    // Retorna las funciones y datos necesarios para interactuar con los autos del usuario
    return { loadMyCars, loadMyCar, deleteMyCar, editMyCar, addMyCar, myCars, myCar }
}