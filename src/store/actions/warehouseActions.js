import { instanceApi } from "../../apis/configAxios";
import { onAddZone, onClearErrors, onErrorZones, onLoadZones, onStartLoadingZones } from "../reducer/warehouseReducer";

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

  export const startAddZones = (values, closeModal) => async dispatch => {
    dispatch(onStartLoadingZones());
    try {
      const { data } = await instanceApi.post(`/warehouse/add_zone`,values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onAddZone(data.data));
      closeModal()
    } catch (error) {
      dispatch(onErrorZones(error.message));
    } finally {
      dispatch(onClearErrors());
    }
  };
  