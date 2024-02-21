import Cookies from "js-cookie";
import { instanceApi } from "../../apis/configAxios";
import {
  loadCustomers,
  loadCustomer,
  deleteCustomer,
  editCustomer,
  verifyCustomerRedux,
} from "../reducer/customerReducer";
import { enqueueSnackbar } from "notistack";

export const startLoadCustomers = () => {
<<<<<<< HEAD
    return async (dispatch) => {
        try {
            const { data } = await instanceApi.get('/user')
            dispatch(loadCustomers(data.data))
        } catch (error) {
            console.log(error)
        }
=======
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/user");
      dispatch(loadCustomers(data.data));
    } catch (error) {
      enqueueSnackbar(`Error: ${data.data.response?.message}`);
>>>>>>> 51f92ccf0726bf9bcec9bee579e196ab2d6180c5
    }
  };
};

export const getOneUser = (_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(`/user/${_id}`);
    dispatch(loadCustomer(data.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneCustomer = (_id) => async (dispatch) => {
  try {
    const response = await instanceApi.delete(`/user/delete-user/${_id}`);
    dispatch(deleteCustomer(_id))
    enqueueSnackbar(
      `Se elimino de manera correcta el usuario:${
        response.data?.fullname || ""
      }`,
      {
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      }
    );
  } catch (error) {
    enqueueSnackbar(`Error:${error.response}`);
  }
};

export const verifyOneCustomer = (customer_id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.post(
        `/customer/validate/${customer_id}`
      );
      console.log(data);
      dispatch(verifyCustomerRedux(customer_id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editOneCustomer = (customer_id, values) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("type_customer", values.type_customer);
      formData.append("profile_image", values.profile_image);
      const { data } = await instanceApi.post(
        `/user/update/${customer_id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem('token'),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(editCustomer(customer_id, data.data));
      enqueueSnackbar("Editado con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      return(data.data)
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        `Ocurrió un error al actualizar la el servicio : ${error}`,
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }
  };
};
