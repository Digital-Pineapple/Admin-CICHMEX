import { useDispatch, useSelector } from "react-redux"
import { addOneDocumentation, deleteOneDocumentation, editOneDocumentation, getOneDocumentation, searchDocumenation, startLoadDocumentations } from "../store/actions/documentationActions";

export const useDocumentations = () => {

    const dispatch = useDispatch();

    const { documentations, documentation } = useSelector(state => state.documentations);

    const loadDocumentations = async () => dispatch(startLoadDocumentations());

    const loadDocumentation = async customer_id => dispatch(getOneDocumentation(customer_id));

    const deleteDocumentation = async documentation_id => dispatch(deleteOneDocumentation(documentation_id))

    const editDocumentation = async (documentation_id, values) => dispatch(editOneDocumentation(documentation_id, values))

    const addDocumentation = async values => await dispatch(addOneDocumentation(values));

    const searchDocumentation = async value => await dispatch(searchDocumenation(value));

    const varifyDocumentation = async values => await dispatch(verifyOneDocument(values));

    return { documentations, documentation, loadDocumentations, loadDocumentation, deleteDocumentation, editDocumentation, addDocumentation, searchDocumentation, varifyDocumentation }
}