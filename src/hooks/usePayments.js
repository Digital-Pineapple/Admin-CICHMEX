import { useDispatch, useSelector } from "react-redux"
import { startValidateExpiredPayments } from "../store/actions/paymentsActions";

// Hook personalizado para manejar pagos
export const usePayments = () => {

    // Hook de Redux para despachar acciones
    const dispatch = useDispatch();

    // Hook de Redux para acceder al estado global de pagos
    const { payments, payment } = useSelector((state) => state.payments);

    // Función para validar pagos expirados llamando a una acción de Redux
    const loadValidateExpiredPayments = async () => await dispatch(startValidateExpiredPayments());

    // Retorna las funciones y datos necesarios para manejar pagos
    return { loadValidateExpiredPayments }
}