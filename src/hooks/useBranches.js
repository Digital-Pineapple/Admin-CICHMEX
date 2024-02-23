import { useSelector, useDispatch } from 'react-redux';

import {  startLoadBranch, startLoadBranches } from '../store/actions/branchActions'; 
import { useNavigate } from 'react-router-dom';

export const useBranches = () => {
    
    const dispatch = useDispatch();
    
    const { branches, branch } = useSelector(state => state.branches)
    const navigate = useNavigate()

    const loadBranches = async () => await dispatch(startLoadBranches());

    const loadOneBranch = async (id) => await dispatch(startLoadBranch(id));

    const pendingToVerify = (branches) => {
        let num = branches.filter((item) => item.activated === false);
        let ok = num.length;
        return ok
    }
    const pendingBranches = (branches) => {
        let num = branches.filter((item) => item.activated === false);
        return num
    }

    const activeBranches = (branches) => {
        let num = branches.filter((item) => item.activated === true);
        let ok = num.length;
        return ok
    }



    return { branch, branches, loadBranches, pendingToVerify, activeBranches, navigate, pendingBranches, loadOneBranch }


}