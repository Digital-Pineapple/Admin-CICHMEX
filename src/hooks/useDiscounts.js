import { useSelector, useDispatch } from 'react-redux';
import { startLoadChangeActive, startLoadCreateDiscount, startLoadDiscountDetail, startLoadDiscounts, startLoadUpdateDiscount } from '../store/actions/discountsActions';
import { useNavigate } from 'react-router-dom';

export const useDiscounts = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { discounts, discount, loadingDiscount } = useSelector(state => state.discounts)
    const { loading } = useSelector(state => state.ui)

    const loadAllDiscounts = () =>  dispatch(startLoadDiscounts());
    const loadDiscountDetail = (id) =>  dispatch(startLoadDiscountDetail(id));

    const createDiscount = (values) =>dispatch(startLoadCreateDiscount(values,navigate))
    const updateDiscount = (id,values) =>dispatch(startLoadUpdateDiscount(id,values,navigate))
    const changeActiveDiscount = (id, value)=>dispatch(startLoadChangeActive(id, value))


    return { loadAllDiscounts,createDiscount, discounts, discount, loading, loadingDiscount, loadDiscountDetail, updateDiscount, changeActiveDiscount}


}