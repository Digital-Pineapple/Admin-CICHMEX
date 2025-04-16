import Swal from "sweetalert2";
import { instanceApi } from "../../apis/configAxios";
import {
  editDiscount,
  loadDiscount,
  loadDiscounts,
  startLoadingDiscount,
  stopLoadingDiscount,
} from "../reducer/discountsReducer";
import { onClearProducts } from "../reducer/productsReducer";

// Carga la lista de descuentos desde el servidor
export const startLoadDiscounts = () => {
  return async (dispatch) => {
    dispatch(startLoadingDiscount());
    try {
      const { data } = await instanceApi.get("/discounts", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadDiscounts(data.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoadingDiscount());
    }
  };
};

// Crea un nuevo descuento en el servidor
export const startLoadCreateDiscount = (values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoadingDiscount());
    values.products = values.products.map((i) => i._id);
    values.is_active = values.is_active === "active" ? true : false;
    try {
      const { data } = await instanceApi.post(
        "/discounts",
        { values: values },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: data.message,
        timer: 2000,
        confirmButtonColor: "success",
        willClose: () => navigate("/promociones/descuentos", { replace: true }),
      });
      dispatch(loadDiscounts(data.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoadingDiscount());
    }
  };
};

// Actualiza un descuento existente en el servidor
export const startLoadUpdateDiscount = (id, values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoadingDiscount());
    values.products = values.products.map((i) => i._id);
    values.is_active = values.is_active === "active" ? true : false;
    try {
      const { data } = await instanceApi.put(
        `/discounts/update/${id}`,
        { values: values },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: data.message,
        timer: 2000,
        confirmButtonColor: "success",
        willClose: () => navigate("/promociones/descuentos", { replace: true }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoadingDiscount());
    }
  };
};

// Obtiene los detalles de un descuento específico
export const startLoadDiscountDetail = (id) => {
  return async (dispatch) => {
    dispatch(startLoadingDiscount());
    try {
      const { data } = await instanceApi.get(`/discounts/get_one/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadDiscount(data.data));
      dispatch(onClearProducts());
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoadingDiscount());
    }
  };
};

// Cambia el estado activo/inactivo de un descuento
export const startLoadChangeActive = (id, value) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.put(
        `/discounts/changeActive/${id}`,
        { is_active: value },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        title: data.message,
        icon: 'success',
        timer: 2000,
        confirmButtonColor: "green",
      });
      dispatch(editDiscount(data.data));
      dispatch(onClearProducts());
    } catch (error) {
      console.log(error);
    }
  };
};
