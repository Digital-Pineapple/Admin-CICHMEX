import Swal from "sweetalert2";
import { instanceApi } from "../../apis/configAxios";
import { onAddAisle, onAddZone, onClearErrors, onClearErrorsAisles, onDeleteAisle, onDeleteZone, onErrorAisles, onErrorZones, onLoadAisles, onLoadZones, onStartLoadingAisles, onStartLoadingZones, onUpdateAisle, onUpdateZone } from "../reducer/warehouseReducer";

export const startLoadZones = () => async dispatch => {
    dispatch(onStartLoadingZones());
    try {
      const { data } = await instanceApi.get(`/warehouse/all_zones`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onLoadZones(data.data));
    } catch (error) {
      dispatch(onErrorZones(error.message));
    } finally {
      dispatch(onClearErrors());
    }
  };

  export const startLoadAisles = () => async dispatch => {
    dispatch(onStartLoadingAisles());
    try {
      const { data } = await instanceApi.get(`/warehouse/all_aisles`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onLoadAisles(data.data));
    } catch (error) {
      dispatch(onErrorAisles(error.message));
    } finally {
      dispatch(onClearErrorsAisles());
    }
  };

  export const startAddZones = (values, closeModal) => async dispatch => {
    dispatch(onStartLoadingZones());
    const info = {
      storehouse : '662fe69b9ba1d8b3cfcd3634',
      ...values
    }
    try {
      const { data } = await instanceApi.post(`/warehouse/add_zone`,info, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onAddZone(data.data));
      closeModal()
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
    } catch (error) {
      dispatch(onErrorZones(error.message));
    } finally {
      dispatch(onClearErrors());
    }
  };

  export const startAddAisle = (values, closeModal) => async dispatch => {
   dispatch(onStartLoadingAisles());
    const info = {
      storehouse : '662fe69b9ba1d8b3cfcd3634',
      ...values
    }
    try {
      const { data } = await instanceApi.post(`/warehouse/add_aisle`,info, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onAddAisle(data.data));
      closeModal()
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
    } catch (error) {
      dispatch(onErrorAisles(error.message));
    } finally {
      dispatch(onClearErrorsAisles());
    }
  };

  export const startUpdateZone = (id,values, closeModal) => async dispatch => {
    dispatch(onStartLoadingZones());
    try {
      const { data } = await instanceApi.post(`/warehouse/update_zone/${id}`,values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
      dispatch(onUpdateZone(data.data));
      closeModal()
    } catch (error) {
      console.log(error);
      
      dispatch(onErrorZones(error.message));
    } finally {
      dispatch(onClearErrors());
    }
  };

  export const startUpdateAisle = (id,values, closeModal) => async dispatch => {
    dispatch(onStartLoadingAisles());
    try {
      const { data } = await instanceApi.post(`/warehouse/update_aisle/${id}`,values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
      dispatch(onUpdateAisle(data.data));
      closeModal()
    } catch (error) {
      console.log(error);
      
      dispatch(onErrorAisles(error.message));
    } finally {
      dispatch(onClearErrorsAisles());
    }
  };
  export const startDeleteZone = (id) => async dispatch => {
    dispatch(onStartLoadingZones());
    try {
      const { data } = await instanceApi.delete(`/warehouse/delete_zone/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
      dispatch(onDeleteZone(data.data));
      closeModal()
    } catch (error) {
      console.log(error);      
      dispatch(onErrorZones(error.message));
    } finally {
      dispatch(onClearErrors());
    }
  };

  export const startDeleteAisle = (id) => async dispatch => {
    dispatch(onStartLoadingAisles());
    try {
      const { data } = await instanceApi.delete(`/warehouse/delete_aisle/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
   
      
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
      dispatch(onDeleteAisle(data.data));
      closeModal()
    } catch (error) {
      console.log(error);      
      dispatch(onErrorAisles(error.message));
    } finally {
      dispatch(onClearErrorsAisles());
    }
  };
  