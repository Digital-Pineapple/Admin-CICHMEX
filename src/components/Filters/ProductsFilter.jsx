import React, { useEffect, useState, useMemo } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useProducts } from "../../hooks";
import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Button,
  FormHelperText,
  Grid,
} from "@mui/material";
import ListProductDiscount from "../Tables/ListProductsDiscount";
import { Controller, useForm } from "react-hook-form";

const ProductsFilter = ({
  active,
  setSelectedProducts,
  defaultProducts = [],
}) => {
  // Hook para cargar categorías
  const { loadCategories, categories, loading } = useCategories();
  // Hook para cargar subcategorías
  const { loadSubCategories, subCategories = [] } = useSubCategories();
  // Hook para cargar productos
  const { loadProductsByCategory, products, loadProductsBySubCategory } =
    useProducts();

  // Estado para manejar los productos que se mostrarán en la tabla
  const [valuesTable, setValuesTable] = useState([]);

  // useEffect para sincronizar los productos por defecto o los productos cargados
  useEffect(() => {
    if (defaultProducts.length > 0 && products.length === 0) {
      setValuesTable(defaultProducts);
    } else if (products.length > 0) {
      setValuesTable(products);
    }
  }, [defaultProducts, products]);

  // useEffect para cargar categorías y subcategorías cuando `active` cambia
  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, [active]);

  // Configuración del formulario con react-hook-form
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      category: null,
      subCategory: null,
    },
  });

  // Observa el valor seleccionado de la categoría
  const selectedCategory = watch("category");

  // Filtra las subcategorías según la categoría seleccionada
  const filteredSubCategories = useMemo(
    () => subCategories.filter((item) => item.category_id === selectedCategory),
    [subCategories, selectedCategory]
  );

  // Maneja el envío del formulario para cargar productos según la categoría o subcategoría seleccionada
  const onSubmit = (data) => {
    if (data.category && data.subCategory) {
      loadProductsBySubCategory(data.subCategory);
    } else if (data.category && data.subCategory === null) {
      loadProductsByCategory(data.category);
    } else {
      console.log("Debe seleccionar una categoría para filtrar los productos");
    }
  };

  // Maneja el clic en los botones, diferenciando si es para enviar el formulario
  const handleClick = (event, isSubmit) => {
    event.preventDefault();
    if (isSubmit) {
      handleSubmit(onSubmit)(); // Envía el formulario solo si `isSubmit` es `true`
    }
  };

  // Resetea los valores del formulario
  const resetForm = (event) => {
    event.preventDefault();
    reset();
  };

  return (
    <Grid2
      container
      spacing={2}
      alignItems="center"
      component={"form"}
      onSubmit={onSubmit}
    >
      {/* Contenedor para los filtros */}
      <Grid2 display={"flex"} flexDirection={"column"} gap={2} size={5}>
        {/* Selector de categoría */}
        <Controller
          name="category"
          control={control}
          rules={{ required: "Campo requerido*" }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors?.category}>
              <InputLabel id="select-label-category">Categoría</InputLabel>
              <Select
                {...field}
                labelId="select-label-category"
                label="Categoría*"
              >
                {categories.map((i, index) => (
                  <MenuItem key={index} value={i._id}>
                    {i.name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.category && (
                <FormHelperText sx={{ color: "warning.main" }}>
                  {errors?.category?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Selector de subcategoría */}
        <Controller
          name="subCategory"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors?.subCategory}>
              <InputLabel id="select-label-subCategory">
                Subcategoría
              </InputLabel>
              <Select
                {...field}
                labelId="select-label-subCategory"
                label="Subcategoría*"
              >
                <MenuItem key={Date.now()} value={null}>
                  <i>Todas las subcategorias</i>
                </MenuItem>
                {filteredSubCategories.map((i, index) => (
                  <MenuItem key={index} value={i._id}>
                    {i.name}
                  </MenuItem>
                ))}
              </Select>
              {errors?.subCategory && (
                <FormHelperText sx={{ color: "warning.main" }}>
                  {errors?.subCategory?.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Botón para buscar productos */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          onClick={(e) => handleClick(e, true)}
          disabled={!selectedCategory || loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>

        {/* Botón para limpiar los filtros */}
        <Button
          fullWidth
          variant="contained"
          onClick={(e) => resetForm(e)}
        >
          Limpiar filtros
        </Button>
      </Grid2>

      {/* Contenedor para la tabla de productos */}
      <Grid2 size={7}>
        <ListProductDiscount
          setSelectedProducts={setSelectedProducts}
          products={valuesTable}
        />
      </Grid2>
    </Grid2>
  );
};

export default ProductsFilter;
