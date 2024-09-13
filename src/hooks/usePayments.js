import { useDispatch, useSelector } from "react-redux"
import { startValidateExpiredPayments } from "../store/actions/paymentsActions";

export const usePayments = () => {

    const dispatch = useDispatch();

     const { payments, payment} = useSelector((state) => state.payments);

    const loadValidateExpiredPayments = async () => await dispatch(startValidateExpiredPayments());



    return { loadValidateExpiredPayments }
}