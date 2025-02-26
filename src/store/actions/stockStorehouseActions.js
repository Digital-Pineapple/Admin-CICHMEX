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

