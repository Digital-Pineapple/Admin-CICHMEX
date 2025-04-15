// Carga todas las categorías desde la API y las almacena en el estado global
export const startLoadCategories = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await instanceApi.get("/category", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(loadCategories(data.data));
      dispatch(stopLoading());
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al cargar las categorias + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch(stopLoading());
    }
  };
};

// Obtiene una categoría específica por su ID y la almacena en el estado global
export const getOneCategory = (category_id) => async (dispatch) => {
  try {
    const { data } = await instanceApi.get(
      `/category/${category_id}`,
      headerConfig
    );
    dispatch(loadCategory(data.data));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al cargar la categoria + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

// Agrega una nueva categoría con nombre e imagen, y actualiza el estado global
export const addOneCategory =
  ({ name, image }, handleClose) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await instanceApi.post(`/category`, formData, {
        headers: {
          "Content-type": "/multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(onAddNewCategory(data.data));
      enqueueSnackbar("Categoria creada con éxito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
    } finally {
      dispatch(stopLoading());
    }
  };

// Elimina una categoría específica por su ID y actualiza el estado global
export const deleteOneCategory = (category_id) => async (dispatch) => {
  try {
    await instanceApi.delete(`/category/${category_id}`, headerConfig);
    dispatch(deleteCategory(category_id));
  } catch (error) {
    enqueueSnackbar(`Ocurrió un error al eliminar la categoria + ${error}`, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
};

// Edita una categoría específica por su ID y actualiza el estado global
export const editOneCategory = (
  category_id,
  { name, category_image },
  handleClose
) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", category_image);
      const { data } = await instanceApi.patch(
        `/category/${category_id}`,
        formData,
        {
          headers: {
            "Content-type": "/multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(editCategory(data.data));
      Swal.fire(`${data.message}`, '', 'success');
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopLoading());
      handleClose();
    }
  };
};

// Busca categorías por un valor de búsqueda y actualiza el estado global
export const searchCategories = ({ value }) => {
  return async (dispatch) => {
    try {
      const { data } = await instanceApi.get(
        `/category/search/search${value ? `?search=${value}` : `?search=${""}`}`
      );
      console.log(data);
      dispatch(loadCategories(data.data));
      enqueueSnackbar("Categorias encontradas con exito", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar(`Ocurrió un error al buscar la categoria + ${error}`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };
};
