import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addOneMembership, deleteOneMembership, editOneMembership, getOneMembership, startLoadMemberships } from "../store/actions/membershipActions";

export const useMembership = () => {

    const dispatch = useDispatch(); // Hook de Redux para despachar acciones.
    const navigate = useNavigate(); // Hook de React Router para navegar entre rutas.

    // Extrae los datos del estado global de Redux relacionados con las membresías.
    const { memberships, membership } = useSelector(state => state.memberships);

    // Función para cargar todas las membresías desde el backend.
    const loadMemberships = async () => dispatch(startLoadMemberships());

    // Función para cargar una membresía específica por su ID.
    const loadMembership = async _id => dispatch(getOneMembership(_id));

    // Función para eliminar una membresía específica por su ID.
    const deleteMembership = async _id => dispatch(deleteOneMembership(_id));

    // Función para editar una membresía específica con nuevos valores.
    const editMembership = async (_id, values) => dispatch(editOneMembership(_id, values));

    // Función para agregar una nueva membresía y redirigir al usuario después de agregarla.
    const addMembership = async values => dispatch(addOneMembership(values, navigate));
    
    // Retorna todas las funciones y datos necesarios para interactuar con las membresías.
    return { addMembership, deleteMembership, dispatch, editMembership, loadMembership, loadMemberships, membership, memberships, navigate }
}