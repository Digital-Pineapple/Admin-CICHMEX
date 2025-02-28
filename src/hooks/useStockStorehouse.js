import { useSelector, useDispatch } from 'react-redux';
import { startLoadSubCategories } from '../store/actions/subCategoryActions'; 
import { useNavigate } from 'react-router-dom';
import { printPDFInputsReport, startAuthorizeEntries, startLoadAllInputsByFolio, startLoadEntryReport } from '../store/actions/stockStorehouseActions';

export const useStockStorehouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { inputs, EntryReport } = useSelector(state => state.stockStorehouse)
    const {loading} = useSelector(state => state.ui)


    const loadInputs = async () => await dispatch(startLoadAllInputsByFolio());
    const loadEntryReport = (folio) =>  dispatch(startLoadEntryReport(folio)); 
    const loadPDFReport = (folio) =>  dispatch(printPDFInputsReport(folio));
    const loadAuthorizeEntries = ({products}) =>  {
        console.log(products);
        const info = products.map(i => ({
            _id: i._id,
            SHStock_id: i.SHStock_id,
            MyQuantity: i.MyQuantity,
            product_detail: {_id:i.product_detail._id,
            product_id: i.product_detail.product_id|| null,
        name: i.product_detail.name
        }, 
            notes: i.notes || null
        }));
        dispatch(startAuthorizeEntries(info, navigate))
        }

   

    return { inputs, EntryReport, loading, loadInputs, loadEntryReport, navigate, loadAuthorizeEntries, loadPDFReport }


}
