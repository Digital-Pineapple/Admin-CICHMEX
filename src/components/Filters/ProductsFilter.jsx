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
  const { loadCategories, categories, loading } = useCategories();
  const { loadSubCategories, subCategories = [] } = useSubCategories();
  const { loadProductsByCategory, products, loadProductsBySubCategory } =
    useProducts();
  const [valuesTable, setValuesTable] = useState([]);

  useEffect(() => {
    if (defaultProducts.length > 0 && products.length === 0) {
      setValuesTable(defaultProducts);
    } else if (products.length > 0) {
      setValuesTable(products);
    }
  }, [defaultProducts, products]);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, [active]);

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

  const selectedCategory = watch("category");

  const filteredSubCategories = useMemo(
    () => subCategories.filter((item) => item.category_id === selectedCategory),
    [subCategories, selectedCategory]
  );

  const onSubmit = (data) => {
    if (data.category && data.subCategory) {
      loadProductsBySubCategory(data.subCategory);
    } else if (data.category && data.subCategory === null) {
      loadProductsByCategory(data.category);
    } else {
      console.log("Debe seleccionar una categoría para filtrar los productos");
    }
  };

  const handleClick = (event, isSubmit) => {
    event.preventDefault();
    if (isSubmit) {
      handleSubmit(onSubmit)(); // Envía el formulario solo si `isSubmit` es `true`
    }
  };
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
      <Grid2 display={"flex"} flexDirection={"column"} gap={2} size={5}>
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

        <Button
          fullWidth
          variant="contained"
          type="submit"
          onClick={(e) => handleClick(e, true)}
          disabled={!selectedCategory || loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={(e) => resetForm(e)}
          // disabled={!selectedCategory || loading}
        >
          Limpiar filtros
        </Button>
      </Grid2>

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
