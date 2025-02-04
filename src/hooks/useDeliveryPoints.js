import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateDeliveryPoint, deleteBranchImage, desactivateDeliveryPoint, getDeliveryPoint, getPoints, handleDeleteDeliveryPoint, loadSucursalRegister, updateDeliveryPoint } from "../store/actions/deliveryPoints";
import { resetDeliveryPoint } from "../store/reducer/deliveryPointsReducer";
import { useNavigate } from "react-router-dom";
import { getOrdersByBranch } from "../store/actions/deliveryPointsOrders";

const useDeliveryPoints = () => {
  const { deliveryPoints , deliveryPoint, loading, orders } = useSelector((state) => state.deliveryPoints);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onGetDeliveryPoints = () => {
    dispatch(getPoints());
  };
  const onGetDeliveryPoint = (id, callback = () => null) => {
    dispatch(getDeliveryPoint(id, callback));
  }
  const onResetDeliveryPoint = () => {
    dispatch(resetDeliveryPoint())
  }
  const onRegisterDeliveryPoint = (data, marker, schedules_f, images) => {
    dispatch(loadSucursalRegister(data, marker, schedules_f, images, navigate));
  }
  const onEditDeliveryPoint = (id, data, marker, schedules_f, images) => {
    dispatch(updateDeliveryPoint(id, data, marker, schedules_f, images, navigate))
  }
  const onDeleteDeliveryPoint = (id) => {
    dispatch(handleDeleteDeliveryPoint(id));
  }

  const onActivateDeliveryPoint = (id, name) => {
    dispatch(activateDeliveryPoint(id, name));
  }
  const onDesactivateDeliveryPoint = (id, name) => {
    dispatch(desactivateDeliveryPoint(id, name))
  }
  const onLoadOrdersByPointDelivery = (id) => {
    dispatch(getOrdersByBranch(id));
  }

  const onDeleteImage = (branch_id, image_id) => {
    dispatch(deleteBranchImage(branch_id, image_id));
  }
  

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
    onDeleteImage      
  }
};

export default useDeliveryPoints;
