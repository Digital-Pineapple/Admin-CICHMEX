import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import {
  loadOneServiceCustomer,
  onAddNewServiceCustomer,
  deleteServiceCustomer,
  editServiceCustomer,
} from "../reducer/servicesCustomerReducer";
import Cookies from "js-cookie";
import { object } from "yup";

export const startLoadCuServ = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/service-customer/customer/${id}`
      );
      dispatch(loadOneServiceCustomer(data.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOneCustomerService = (services_id, values) => async (dispatch) => {
  try {
    console.log(services_id);
    const { data } = await instanceApi.post(
      `/service-customer/edit/${services_id}`,
      values,
      {
        headers: {
          token: Cookies.get("session"),
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(editServiceCustomer(services_id, data.data));
    enqueueSnackbar("Actualizada con exito", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  } catch (error) {
    console.log(error);
    enqueueSnackbar(`Ocurrió un error + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

export const deleteServicesOneCustomer = (services_id, values) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/service-customer/edit/${services_id}`,
        values,
        {
          headers: {
            token: Cookies.get("session"),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(editServiceCustomer(services_id, data.data));
      enqueueSnackbar("Actualizada con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`Ocurrió un error + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
