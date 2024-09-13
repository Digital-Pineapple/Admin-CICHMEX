import { useDispatch, useSelector } from "react-redux"
import { startLoadMyCars,getOneMyCar,deleteOneMyCar,addOneMyCar,editOneMyCar } from "../store/actions/myCarActions";
import { startAddNewRegion, startDeleteRegion, startLoadAllRegions, startLoadOneRegion } from "../store";
import { useNavigate } from "react-router-dom";


export const useRegions = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {regions, region} = useSelector((state)=> state.regions)

    const loadAllRegions = () => dispatch(startLoadAllRegions())

    const loadOneRegion = id => dispatch(startLoadOneRegion(id))

    const addNewRegion = values => dispatch(startAddNewRegion(values,navigate))

    const onDeleteRegion = id => dispatch(startDeleteRegion(id))


   



    return { loadAllRegions, region, regions, loadOneRegion, addNewRegion, onDeleteRegion }
}