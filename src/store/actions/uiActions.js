// Función para agregar una nueva ruta dinámica
export const startAddRoute = (values, navigate) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.post(
        "/dynamic-route",
        { values: values },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      enqueueSnackbar(`${data.message}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      navigate("/principal", { replace: true });
    } catch (error) {
      enqueueSnackbar(`${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

// Función para cargar todas las rutas dinámicas
export const loadAllRoutes = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get("/dynamic-route/all", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadDynamicRoutes(data.data));
    } catch (error) {
      enqueueSnackbar(`${error.response.data?.message}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } finally {
      dispatch(stopLoading());
    }
  };
};

// Función para cargar los colores de los productos
export const startLoadColors = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/colorProduct");
      dispatch(onLoadColors(data.data));
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar las comisiones + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

// Función para cargar todos los banners
export const startLoadAllBanners = () => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get("/banner", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onLoadBanners(data.data));
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar las comisiones + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

// Función para cargar un banner específico por ID
export const startLoadOneBanner = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(`/banner/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onLoadOneBanner(data.data));
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar las comisiones + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};

// Función para cambiar el estado activo de un banner
export const startChangeActive = (id, active) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await instanceApi.put(
        `/banner/change_active/${id}`,
        { is_active: active },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(updateActiveBanner(data.data));
      Swal.fire(`${data.message}`, "", "success");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };
};

// Función para crear un nuevo banner
export const startCreateOneBanner = (
  {
    is_active,
    no_slide,
    for_discount,
    discount,
    title,
    description,
    type_event,
    image_slide,
    image_slide_movil,
  },
  navigate
) => {
  return async (dispatch) => {
    dispatch(startLoading());
    const formData = new FormData();
    formData.append("is_active", is_active);
    formData.append("no_slide", no_slide);
    formData.append("for_discount", for_discount);
    formData.append("discount", discount);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type_event", type_event);
    formData.append("image_slide", image_slide);
    formData.append("image_slide_movil", image_slide_movil);
    try {
      const { data } = await instanceApi.post(
        `/banner/create/addBanner`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire(`${data.message}`, "", "success");
      dispatch(onAddNewSlide(data.data));
      navigate("/contenidos/banners", { replace: true });
    } catch (error) {
      console.log(error);
      dispatch(stopLoading());
    }
  };
};

// Función para actualizar un banner existente
export const startUpdateOneBanner = (
  id,
  {
    is_active,
    no_slide,
    for_discount,
    discount,
    title,
    description,
    type_event,
    image_slide,
    image_slide_movil,
  },
  navigate
) => {
  return async (dispatch) => {
    console.log(image_slide, image_slide_movil);

    dispatch(startLoading());
    const formData = new FormData();
    formData.append("is_active", is_active);
    formData.append("no_slide", no_slide);
    formData.append("for_discount", for_discount);
    formData.append("discount", discount);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type_event", type_event);
    if (image_slide instanceof File && image_slide.type.startsWith("image/")) {
      formData.append("image_slide", image_slide);
    }
    if (
      image_slide_movil instanceof File &&
      image_slide_movil.type.startsWith("image/")
    ) {
      formData.append("image_slide_movil", image_slide_movil);
    }
    try {
      const { data } = await instanceApi.put(
        `/banner/update/ok/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire(`${data.message}`, "", "success");
      navigate("/contenidos/banners", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };
};

// Función para eliminar un banner por ID
export const startDeleteBanner = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.delete(`/banner/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onDeleteBanner(data.data));
      Swal.fire(`${data.message}`, "", "success");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
    }
  };
};
