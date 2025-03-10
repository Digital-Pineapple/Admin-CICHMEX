import Swal from "sweetalert2";
import { instanceApi } from "../../apis/configAxios";
import { onAddAisle, onAddSection, onAddZone, onClearErrors, onClearErrorsAisles, onClearErrorsSections, onClearSection, onDeleteAisle, onDeleteSection, onDeleteZone, onErrorAisles, onErrorSections, onErrorZones, onLoadAisles, onLoadOneSection, onLoadSection, onLoadSections, onLoadZones, onStartLoadingAisles, onStartLoadingSections, onStartLoadingZones, onStopLoaderSection, onUpdateAisle, onUpdateSection, onUpdateZone } from "../reducer/warehouseReducer";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import { onUpdateInput } from "../reducer/useStockStoreHouse";

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

  export const startGetSection = (id) => async dispatch => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get(`/warehouse/section/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onLoadSection(data.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
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

  export const startLoadSectionPDF = (id) => {
    return async (dispatch) => {
      dispatch(onStartLoadingSections());
      try {
        const { data } = await instanceApi.get(`/warehouse/print_section_code/${id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // Asegura que la respuesta sea tratada como un archivo Blob
        });
  
        // Crear un URL para el Blob
        const pdfUrl = URL.createObjectURL(
          new Blob([data], { type: "application/pdf" })
        );
  
        // Abrir el PDF en una nueva pestaña del navegador
        const pdfWindow = window.open(pdfUrl);
  
        // Opcional: Si deseas imprimirlo directamente al abrirlo
        pdfWindow.onload = () => {
          pdfWindow.print();
        };
        dispatch(onStopLoaderSection())
      } catch (error) {
        dispatch(onErrorSections(error.message));
      } finally {
        dispatch(onClearErrorsSections());
      }
    };
  };

  export const startSearchProductSection = (id, handleSearch, product, handleSection) => {
    return async (dispatch) => {
      dispatch(startLoading());
      try {
        const { data } = await instanceApi.get(`/warehouse/search_product_section/${id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (!data.data) {
          Swal.fire({
            title: "No se encontró ubicación",
            text:'Agregar ubicación',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
             handleSearch({value: true, data: product})
            }
          });
        }
        Swal.fire({
          title: `El producto se encuentra en la sección: ${data.data.name}`,
          // text:`Pasillo${data.data.aisle.name}, Zona:${data.data.zone.name}`,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
           handleSection({value: true,data: product, section: data.data})
          }
        });
      } catch (error) {
        console.log(error);
        
      } finally {
        dispatch(stopLoading());
      }
    };
  };

  export const startSearchProductFill = ({id, handleOpen, product}) => {
    return async (dispatch) => {
      dispatch(startLoading());
  
      try {
        const { data } = await instanceApi.get(`/warehouse/search_product_section/${id}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!data?.data) {
          Swal.fire({
            title: "No se encontró ubicación",
            text: 'Agrega una ubicación de este producto',
            confirmButtonText: "Ok",
          });
          return; // Sale de la función si no hay datos válidos
        }
  
        const sectionData = data.data;
        
        Swal.fire({
          title: `El producto se encuentra en la sección: ${sectionData.name}`,
          text: `Pasillo: ${sectionData.aisle?.name || "No especificado"}`,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(handleOpen,'funcion');
            
          handleOpen({value:true, data:product, section: data.data})
          }
        });
  
      } catch (error) {
        console.error('Error al buscar la ubicación del producto:', error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al intentar obtener la ubicación del producto.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } finally {
        dispatch(stopLoading());
      }
    };
  };
  


  export const startUpdateStock = (values, handleClose, setSection, clearValuate) => async dispatch => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.patch(`/warehouse/section/update_stock`,values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
       // Obtener información actualizada de la sección
       const inSection = await instanceApi.patch(`/stock-StoreHouse/input/in_section/${values.input}`);
       // Actualizar el estado en Redux
       dispatch(onUpdateInput(inSection.data.data));
 
       // Cerrar modal/desactivar vista
       handleClose({ value: false, data: {} , section:{}});
       setSection(null)
       clearValuate(null)
       dispatch(onClearSection())
 
       // Mostrar mensaje de éxito
       Swal.fire({
         title: `${data.message}`,
         text: `${inSection.data.message}`,
         icon: 'success',
       });
    } catch (error) {
      console.log(error);      
      
    } finally {
      dispatch(stopLoading());
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
  export const startAddProductToSection = (values, handleClose, setSection, clearValuate) => {
    return async (dispatch) => {
      try {
        dispatch(startLoading());
  
        // Enviar producto a la sección
        const { data } = await instanceApi.post(
          `/warehouse/section/add_product`, values,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        // Obtener información actualizada de la sección
        const inSection = await instanceApi.patch(`/stock-StoreHouse/input/in_section/${values.input}`);
        // Actualizar el estado en Redux
        dispatch(onUpdateInput(inSection.data.data));
  
        // Cerrar modal/desactivar vista
        handleClose({ value: false, data: {}, section:{} });
        setSection(null)
        clearValuate(null)
        Swal.fire({
          title: `${data.message}`,
          text: `${inSection.data.message}`,
          icon: 'success',
        });
  
      } catch (error) {
        console.error("Error al agregar el producto:", error);
  
        // Manejo de errores con SweetAlert
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Hubo un problema en la solicitud",
          icon: "error",
        });
        dispatch(onClearSection())
      } finally {
        dispatch(stopLoading());
      }
    };
  };
  
  