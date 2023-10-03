import { useDispatch, useSelector } from "react-redux"
import { startLoadMyCars,getOneMyCar,deleteOneMyCar,addOneMyCar,editOneMyCar } from "../store/actions/myCarActions";

export const useMyCars = () => {

    const dispatch = useDispatch();

    const { myCars, myCar } = useSelector(state => state.myCars);

    const loadMyCars = async _id => await dispatch(startLoadMyCars(_id));

    const loadMyCar = async _id => await dispatch(getOneMyCar(_id));

    const deleteMyCar = async _id => await  dispatch(deleteOneMyCar(_id))

    const editMyCar = async (_id, values) => await dispatch(editOneMyCar(_id, values))

    const addMyCar = async (_id,values) => await dispatch(addOneMyCar(_id,values));



    return { loadMyCars, loadMyCar, deleteMyCar, editMyCar, addMyCar, myCars, myCar }
}