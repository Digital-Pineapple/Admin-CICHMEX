import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateDeliveryPoint, deleteBranchImage, desactivateDeliveryPoint, getDeliveryPoint, getPoints, handleDeleteDeliveryPoint, loadSucursalRegister, updateDeliveryPoint } from "../store/actions/deliveryPoints";
import { resetDeliveryPoint } from "../store/reducer/deliveryPointsReducer";
import { useNavigate } from "react-router-dom";
import { getOrdersByBranch } from "../store/actions/deliveryPointsOrders";
import { startLoadPackagesDelivered } from "../store/actions/productOrderActions";

const useDeliveryPoints = () => {
  // Accede al estado global de deliveryPoints y otras propiedades del store
  const { deliveryPoints , deliveryPoint, loading, orders } = useSelector((state) => state.deliveryPoints);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtiene todos los puntos de entrega
  const onGetDeliveryPoints = () => {
    dispatch(getPoints());
  };

  // Obtiene un punto de entrega específico por su ID
  const onGetDeliveryPoint = (id, callback = () => null) => {
    dispatch(getDeliveryPoint(id, callback));
  }

  // Resetea el estado del punto de entrega actual
  const onResetDeliveryPoint = () => {
    dispatch(resetDeliveryPoint())
  }

  // Registra un nuevo punto de entrega con los datos proporcionados
  const onRegisterDeliveryPoint = (data, marker, schedules_f, images) => {
    dispatch(loadSucursalRegister(data, marker, schedules_f, images, navigate));
  }

  // Edita un punto de entrega existente por su ID
  const onEditDeliveryPoint = (id, data, marker, schedules_f, images) => {
    dispatch(updateDeliveryPoint(id, data, marker, schedules_f, images, navigate))
  }

  // Elimina un punto de entrega por su ID
  const onDeleteDeliveryPoint = (id) => {
    dispatch(handleDeleteDeliveryPoint(id));
  }

  // Activa un punto de entrega por su ID y nombre
  const onActivateDeliveryPoint = (id, name) => {
    dispatch(activateDeliveryPoint(id, name));
  }

  // Desactiva un punto de entrega por su ID y nombre
  const onDesactivateDeliveryPoint = (id, name) => {
    dispatch(desactivateDeliveryPoint(id, name))
  }

  // Carga las órdenes asociadas a un punto de entrega específico
  const onLoadOrdersByPointDelivery = (id) => {
    dispatch(getOrdersByBranch(id));
  }

  // Elimina una imagen asociada a una sucursal específica
  const onDeleteImage = (branch_id, image_id) => {
    dispatch(deleteBranchImage(branch_id, image_id));
  }

  // Carga los paquetes entregados asociados a un punto de entrega
  const loadPackagesDelivered = (id)=>{
    dispatch(startLoadPackagesDelivered(id))
  }
  
  // Retorna todas las funciones y datos necesarios para interactuar con los puntos de entrega
  return {
    onGetDeliveryPoints,
    deliveryPoints,
    deliveryPoint,
    onGetDeliveryPoint, 
    onResetDeliveryPoint,
    loading,
    onRegisterDeliveryPoint,
    onEditDeliveryPoint,
    onDeleteDeliveryPoint,
    onActivateDeliveryPoint,
    onDesactivateDeliveryPoint,
    onLoadOrdersByPointDelivery,
    orders,
    onDeleteImage,
    loadPackagesDelivered      
  }
};

export default useDeliveryPoints;
