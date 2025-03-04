import Swal from "sweetalert2";
import { instanceApi } from "../../apis/configAxios";
import { onAddAisle, onAddSection, onAddZone, onClearErrors, onClearErrorsAisles, onClearErrorsSections, onDeleteAisle, onDeleteSection, onDeleteZone, onErrorAisles, onErrorSections, onErrorZones, onLoadAisles, onLoadSections, onLoadZones, onStartLoadingAisles, onStartLoadingSections, onStartLoadingZones, onUpdateAisle, onUpdateSection, onUpdateZone } from "../reducer/warehouseReducer";

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

  export const startLoadSections = () => async dispatch => {
    dispatch(onStartLoadingSections());
    try {
      const { data } = await instanceApi.get(`/warehouse/all_sections`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onLoadSections(data.data));
    } catch (error) {
      dispatch(onErrorSections(error.message));
    } finally {
      dispatch(onClearErrorsSections());
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

  export const startAddSection = (values, closeModal) => async dispatch => {
    dispatch(onStartLoadingSections());
     const info = {
       storehouse : '662fe69b9ba1d8b3cfcd3634',
       ...values
     }
     try {
       const { data } = await instanceApi.post(`/warehouse/add_section`,info, {
         headers: {
           "Content-type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });
       dispatch(onAddSection(data.data));
       closeModal()
       Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
     } catch (error) {
       dispatch(onErrorSections(error.message));
     } finally {
       dispatch(onClearErrorsSections());
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
  export const startUpdateSection = (id,values, closeModal) => async dispatch => {
    dispatch(onStartLoadingSections());
    try {
      const { data } = await instanceApi.post(`/warehouse/update_section/${id}`,values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
      dispatch(onUpdateSection(data.data));
      closeModal()
    } catch (error) {
      console.log(error);
      
      dispatch(onErrorSections(error.message));
    } finally {
      dispatch(onClearErrorsSections());
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
  export const startDeleteSection = (id) => async dispatch => {
    dispatch(onStartLoadingSections());
    try {
      const { data } = await instanceApi.delete(`/warehouse/delete_section/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({title:`${data.message}`, icon:'success', color:'success'})
      dispatch(onDeleteSection(data.data));
      closeModal()
    } catch (error) {
      console.log(error);      
      dispatch(onErrorSections(error.message));
    } finally {
      dispatch(onClearErrorsSections());
    }
  };
  