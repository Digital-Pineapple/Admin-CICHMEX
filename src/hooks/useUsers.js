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
  startLoadMyRoutes,
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

  // Selecciona datos del estado global de Redux
  const { user, users } = useSelector((state) => state.users); // Usuarios y usuario actual
  const { CarrierDrivers, CarrierDriver, optimizedRoutes, inRoute } = useSelector(
    (state) => state.carrierDriver // Conductores de transportistas y rutas optimizadas
  );
  const { warehouseman } = useSelector(
    (state) => state.warehouse // Información de almacenistas
  );

  const { loading } = useSelector(
    (state) => state.ui // Estado de carga
  );

  const allWarehouseman = warehouseman.all; // Todos los almacenistas
  const oneWarehouseman = warehouseman.one; // Un almacenista específico

  // Carga todos los usuarios
  const loadUsers = async () => await dispatch(getUsers());

  // Carga todos los conductores de transportistas
  const loadCarrierDrivers = () => dispatch(getCarrierDrivers());
  
  // Carga todos los almacenistas
  const loadAllWarehouseman = () => dispatch(getAllWarehouseman());

  // Carga un conductor de transportista específico por ID
  const loadOneCarrieDriver = (id) => dispatch(startOneCarrierDriver(id));

  // Carga un usuario específico por ID
  const loadUser = async (user_id) => await dispatch(getOneUser(user_id));

  // Elimina un usuario por ID
  const deleteUser = async (user_id) => await dispatch(deleteOneUser(user_id));

  // Verifica un usuario por ID
  const verifyUser = async (_id) => {
    await dispatch(verifyOneUser(_id));
  };

  // Agrega un nuevo transportista
  const addCarrier = async (values) =>
    await dispatch(addOneCarrier(values, navigate));

  // Elimina un conductor de transportista por ID
  const deleteOneCD = async (id) => await dispatch(deleteCarrierDriver(id));

  // Edita un usuario por ID
  const editUser = async (user_id, values) =>
    await dispatch(editOneUser(user_id, values, navigate));

  // Actualiza un transportista por ID
  const updateCarrier = async (id, values) =>
    await dispatch(updateOneCarrier(id, values, navigate));

  // Crea un nuevo almacenista
  const createWarehouseman = async (values) =>
    await dispatch(startCreateWarehouseman(values, navigate));

  // Carga un almacenista específico por ID
  const loadWarehouseman = async (id) =>
    await dispatch(startOneWarehouseman(id));

  // Actualiza un almacenista por ID
  const loadUpdateWarehouseman = async (id, values) =>
    await dispatch(startUpdateWarehouseman(id, values, navigate));

  // Mapea los conductores de transportistas para generar filas con IDs únicos
  const rowsCarrierDrivers = CarrierDrivers?.map((i, _id) => ({
    id: _id.toString(),
    ...i,
  }));

  // Genera filas genéricas a partir de datos
  const rows = (data) => data?.map((i, _id) => ({
    id: _id.toString(),
    ...i,
  }));

  // Carga rutas optimizadas basadas en coordenadas
  const loadOptimizedRoutes = async (myCoords) => {
    dispatch(startLoadOptimizedRoutes(myCoords));
  };

  // Inicia las rutas del usuario
  const loadStartMyRoutes = async (routes) => {
    dispatch(startLoadMyRoutes({ routes: routes }, navigate));
  };

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
    loadUpdateWarehouseman,
    loadStartMyRoutes,
  };
};
