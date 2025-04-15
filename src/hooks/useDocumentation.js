import { useDispatch, useSelector } from "react-redux"
import { addOneDocumentation, deleteOneDocumentation, editOneDocumentation, getOneDocumentation, searchDocumenation, startLoadDocumentations, verifyOneDocument } from "../store/actions/documentationActions";

export const useDocumentations = () => {

    const dispatch = useDispatch();

    // Obtiene el estado de las documentaciones desde el store de Redux
    const { documentations, documentation } = useSelector(state => state.documentations);

    // Carga todas las documentaciones desde el servidor
    const loadDocumentations = async () => dispatch(startLoadDocumentations());

    // Carga una documentación específica basada en el ID del cliente
    const loadDocumentation = async customer_id => dispatch(getOneDocumentation(customer_id));

    // Elimina una documentación específica basada en su ID
    const deleteDocumentation = async documentation_id => dispatch(deleteOneDocumentation(documentation_id))

    // Edita una documentación específica con nuevos valores
    const editDocumentation = async (documentation_id, values) => dispatch(editOneDocumentation(documentation_id, values))

    // Agrega una nueva documentación con los valores proporcionados
    const addDocumentation = async values => await dispatch(addOneDocumentation(values));

    // Busca documentaciones basadas en un valor de búsqueda
    const searchDocumentation = async value => await dispatch(searchDocumenation(value));

    // Verifica una documentación específica, indicando si es válida o no, y opcionalmente un mensaje
    const varifyDocumentation = async (_id, verify, message) => {
        const ok = await dispatch(verifyOneDocument(_id, verify, message))
        return ok
    }

    // Retorna todas las funciones y estados relacionados con las documentaciones
    return { documentations, documentation, loadDocumentations, loadDocumentation, deleteDocumentation, editDocumentation, addDocumentation, searchDocumentation, varifyDocumentation }
}