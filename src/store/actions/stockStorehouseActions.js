import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { startLoading, stopLoading } from "../reducer/uiReducer";
import { loadEntryReport, loadInputs } from "../reducer/useStockStoreHouse";

export const startLoadAllInputsByFolio = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const { data } = await instanceApi.get(
        `/stock-StoreHouse/inputs_pending_by_folio`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadInputs(data.data));
    } catch (error) {
      enqueueSnackbar(`Error:${error.data.message}'`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    }finally{
      dispatch(stopLoading())
    }
  };
};

export const startLoadEntryReport = (folio) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const { data } = await instanceApi.get(
        `/stock-StoreHouse/inputs_by_folio/${folio}`,
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      dispatch(loadEntryReport(data.data[0]));
    } catch (error) {
      enqueueSnackbar(`Error:${error.data.message}'`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally{
      dispatch(stopLoading())
    }
  };
};

export const startAuthorizeEntries = (entries, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const { data } = await instanceApi.post(
        `/stock-StoreHouse/authorize/inputs`,{entries:entries},
        {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      enqueueSnackbar(`${data.message}`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "success",
      });
      navigate('/almacenista/entradas_de_producto', {replace:true})
    } catch (error) {
      enqueueSnackbar(`Error:${error.data.message}'`, {
        anchorOrigin: { horizontal: "center", vertical: "top" },
        variant: "error",
      });
    } finally{
      dispatch(stopLoading())
    }
  };
};

export const printPDFInputsReport = (folio) => {
  
  return async (dispatch) => {
    try {
      dispatch(startLoading())
      const { data } = await instanceApi.get(`/stock-StoreHouse/inputs_report/${folio}`, {
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
      
    } catch (error) {
      console.log(error);
    } finally{
      dispatch(stopLoading())
    }
  };
};



