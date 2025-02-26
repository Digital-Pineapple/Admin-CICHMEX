import { useSelector, useDispatch } from 'react-redux';
import { startLoadSubCategories } from '../store/actions/subCategoryActions'; 
import { useNavigate } from 'react-router-dom';
import { startLoadAllInputsByFolio, startLoadEntryReport } from '../store/actions/stockStorehouseActions';

export const useStockStorehouse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { inputs, EntryReport } = useSelector(state => state.stockStorehouse)
    const {loading} = useSelector(state => state.ui)


    const loadInputs = async () => await dispatch(startLoadAllInputsByFolio());
    const loadEntryReport = (folio) =>  dispatch(startLoadEntryReport(folio));

   

    return { inputs, EntryReport, loading, loadInputs, loadEntryReport, navigate  }


}
