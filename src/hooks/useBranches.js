import { useSelector, useDispatch } from 'react-redux';

import {  startDeleteBranch, startLoadBranch, startLoadBranches, startVerifyBranch } from '../store/actions/branchActions'; 
import { useNavigate } from 'react-router-dom';

export const useBranches = () => {
    
    const dispatch = useDispatch();
    
    const { branches, branch } = useSelector(state => state.branches)
    const navigate = useNavigate()

    const loadBranches = async () => await dispatch(startLoadBranches());

    const loadOneBranch = async (id) => await dispatch(startLoadBranch(id));

    const verifyOneBranch = async (id, user_id) => await dispatch(startVerifyBranch(id, user_id, navigate));

    const pendingToVerify = (branches) => {
        let num = branches.filter((item) => item.activated === false);
        let ok = num.length;
        return ok
    }
    const pendingBranches = () => {
        let num = branches.filter((item) => item.activated === false);
        return num
    }

    const activeBranches = (branches) => {
        let num = branches.filter((item) => item.activated === true);
        let ok = num.length;
        return ok
    }

    const rowsBranches = branches?.map((i, _id) => ({
        id: _id.toString(),
        ...i,
      }));
      const rowsPendingBranches = pendingBranches()?.map((i, _id) => ({
        id: _id.toString(),
        ...i,
      }))

      const deleteOneBranch = async (id) => await dispatch(startDeleteBranch(id));



    return { branch, branches,rowsPendingBranches,  loadBranches, pendingToVerify, activeBranches, navigate, pendingBranches, loadOneBranch, verifyOneBranch, rowsBranches, deleteOneBranch }


}