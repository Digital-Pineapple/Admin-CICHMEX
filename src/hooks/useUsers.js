import { useSelector, useDispatch } from "react-redux";
import {
  addOneCarrier,
  deleteCarrierDriver,
  deleteOneUser,
  editOneUser,
  getAllWarehouseman,
  getCarrierDrivers,
  getOneUser,
  getUsers,
  startCreateWarehouseman,
  startLoadOptimizedRoutes,
  startOneCarrierDriver,
  startOneWarehouseman,
  startUpdateWarehouseman,
  updateOneCarrier,
  verifyOneUser,
} from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";

export const useUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, users } = useSelector((state) => state.users);
  const { CarrierDrivers, CarrierDriver, optimizedRoutes } = useSelector(
    (state) => state.carrierDriver
  );
  const { warehouseman } = useSelector(
    (state) => state.warehouse
  );

  const { loading } = useSelector(
    (state) => state.ui
  );

  const allWarehouseman = warehouseman.all
  const oneWarehouseman = warehouseman.one

  const loadUsers = async () => await dispatch(getUsers());

  const loadCarrierDrivers = () => dispatch(getCarrierDrivers());
  const loadAllWarehouseman = () => dispatch(getAllWarehouseman());

  const loadOneCarrieDriver = (id) => dispatch(startOneCarrierDriver(id));

  const loadUser = async (user_id) => await dispatch(getOneUser(user_id));

  const deleteUser = async (user_id) => await dispatch(deleteOneUser(user_id));

  const verifyUser = async (_id) => {
    await dispatch(verifyOneUser(_id));
  };

  const addCarrier = async (values) =>
    await dispatch(addOneCarrier(values, navigate));
  const deleteOneCD = async (id) => await dispatch(deleteCarrierDriver(id));
  const editUser = async (user_id, values) =>
    await dispatch(editOneUser(user_id, values, navigate));
  const updateCarrier = async (id, values) =>
    await dispatch(updateOneCarrier(id, values, navigate));

  const createWarehouseman = async (values) =>
    await dispatch(startCreateWarehouseman(values, navigate));

  const loadWarehouseman = async (id) =>
    await dispatch(startOneWarehouseman(id))

  const loadUpdateWarehouseman = async (id, values) =>
    await dispatch(startUpdateWarehouseman(id, values, navigate))


  const rowsCarrierDrivers = CarrierDrivers?.map((i, _id) => ({
    id: _id.toString(),
    ...i,
  }));
  const rows = (data) => data?.map((i, _id) => ({
    id: _id.toString(),
    ...i,
  }));

  const loadOptimizedRoutes = async (myCoords)=>{ dispatch(startLoadOptimizedRoutes(myCoords))}
  
  return {
    user,
    users,
    deleteOneCD,
    loadUser,
    addCarrier,
    loadUsers,
    loadOneCarrieDriver,
    deleteUser,
    verifyUser,
    editUser,
    navigate,
    loadCarrierDrivers,
    rowsCarrierDrivers,
    CarrierDriver,
    loading,
    CarrierDrivers,
    updateCarrier,
    loadOptimizedRoutes,
    optimizedRoutes,
    loadAllWarehouseman,
    rows,
    allWarehouseman,
    createWarehouseman,
    loadWarehouseman,
    oneWarehouseman,
    loadUpdateWarehouseman
  };
};
