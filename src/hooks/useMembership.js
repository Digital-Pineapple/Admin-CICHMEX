import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addOneMembership, deleteOneMembership, editOneMembership, getOneMembership, startLoadMemberships } from "../store/actions/membershipActions";

export const useMembership = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { memberships,membership } = useSelector(state => state.memberships);

    const loadMemberships = async () => dispatch(startLoadMemberships());

    const loadMembership = async _id => dispatch(getOneMembership(_id));

    const deleteMembership = async _id => dispatch(deleteOneMembership(_id))

    const editMembership = async (_id, values) => dispatch(editOneMembership(_id, values))

    const addMembership = async values => dispatch(addOneMembership(values, navigate))
    
    return { addMembership, deleteMembership, dispatch, editMembership, loadMembership, loadMemberships, membership, memberships, navigate }
}