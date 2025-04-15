import { useSelector, useDispatch } from 'react-redux';

import { startDeleteBranch, startLoadBranch, startLoadBranches, startVerifyBranch } from '../store/actions/branchActions'; 
import { useNavigate } from 'react-router-dom';

export const useBranches = () => {
    
    const dispatch = useDispatch();
    
    // Obtiene las sucursales y una sucursal específica del estado global
    const { branches, branch } = useSelector(state => state.branches)
    const navigate = useNavigate()

    // Carga todas las sucursales desde el backend
    const loadBranches = async () => await dispatch(startLoadBranches());

    // Carga una sucursal específica desde el backend
    const loadOneBranch = async (id) => await dispatch(startLoadBranch(id));

    // Verifica una sucursal específica con un usuario y redirige si es necesario
    const verifyOneBranch = async (id, user_id) => await dispatch(startVerifyBranch(id, user_id, navigate));

    // Calcula el número de sucursales pendientes de verificación
    const pendingToVerify = (branches) => {
        let num = branches.filter((item) => item.activated === false);
        let ok = num.length;
        return ok
    }

    // Obtiene una lista de sucursales pendientes de verificación
    const pendingBranches = () => {
        let num = branches.filter((item) => item.activated === false);
        return num
    }

    // Calcula el número de sucursales activas
    const activeBranches = (branches) => {
        let num = branches.filter((item) => item.activated === true);
        let ok = num.length;
        return ok
    }

    // Mapea las sucursales para generar filas con un formato específico
    const rowsBranches = branches?.map((i, _id) => ({
        id: _id.toString(),
        ...i,
    }));

    // Mapea las sucursales pendientes para generar filas con un formato específico
    const rowsPendingBranches = pendingBranches()?.map((i, _id) => ({
        id: _id.toString(),
        ...i,
    }))

    // Elimina una sucursal específica
    const deleteOneBranch = async (id) => await dispatch(startDeleteBranch(id));

    // Retorna todas las funcionalidades y datos necesarios
    return { 
        branch, 
        branches,
        rowsPendingBranches,  
        loadBranches, 
        pendingToVerify, 
        activeBranches, 
        navigate, 
        pendingBranches, 
        loadOneBranch, 
        verifyOneBranch, 
        rowsBranches, 
        deleteOneBranch 
    }
}