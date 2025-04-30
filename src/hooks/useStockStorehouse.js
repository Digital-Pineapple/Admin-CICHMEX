import { useSelector, useDispatch } from 'react-redux';
import { startLoadSubCategories } from '../store/actions/subCategoryActions'; 
import { useNavigate } from 'react-router-dom';
import { printPDFInputsReport, startAuthorizeEntries, startLoadAllInputsByFolio, startLoadEntryReport } from '../store/actions/stockStorehouseActions';

export const useStockStorehouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Obtiene los datos del estado global de Redux
    const { inputs, EntryReport } = useSelector(state => state.stockStorehouse);
    const { loading } = useSelector(state => state.ui);

    // Función para cargar todos los insumos por folio
    const loadInputs = async () => await dispatch(startLoadAllInputsByFolio());

    // Función para cargar el reporte de entradas basado en un folio
    const loadEntryReport = (folio) => dispatch(startLoadEntryReport(folio)); 

    // Función para generar y cargar un reporte en PDF basado en un folio
    const loadPDFReport = (folio) => dispatch(printPDFInputsReport(folio));

    // Función para autorizar entradas de productos
    const loadAuthorizeEntries = ({ products }, folio) => {
        // Mapea los productos para estructurarlos correctamente antes de enviarlos a la acción
        const info = products.map(i => ({
            _id: i._id,
            SHStock_id: i.SHStock_id,
            MyQuantity: i.MyQuantity,
            product_detail: {
                _id: i.product_detail._id,
                product_id: i.product_detail.product_id || null,
                name: i.product_detail.name
            }, 
            notes: i.notes || null
        }));
        // Despacha la acción para autorizar las entradas y redirige con `navigate`
        dispatch(startAuthorizeEntries(info, navigate, folio));
    };

    // Función para transformar los datos en un formato adecuado para ser usados en tablas
    const rows = (data) => data.map((i, index) => ({
        id: index.toString(),
        ...i,
    }));

    // Retorna todas las funciones y datos necesarios para ser utilizados en el componente
    return { inputs, EntryReport, loading, loadInputs, loadEntryReport, navigate, loadAuthorizeEntries, loadPDFReport, rows };
};
