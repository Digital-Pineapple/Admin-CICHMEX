import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  TextField,
  TextareaAutosize,
  useMediaQuery,
  Avatar,
  Badge,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  Card,
  CardContent,
  CardHeader,
  ButtonGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import TextAreaInput from "../../components/inputs/TextAreaInput";
import { AttachMoney, Refresh, ViewModule } from "@mui/icons-material";
import WordsInput from "../../components/inputs/WordsInput";
import VideoUpdateField from "../../components/Forms/VideoUpdateField";
import DetailImagesUpdateField from "../../components/Forms/DetailImagesUpdateField";

const Edit = () => {
  const { id } = useParams();
  const {
    loadProduct,
    product,
    editProduct,
    navigate,
    loading,
    updateVideo,
    updateThumbnail,
    addOneImage,
    deleteImageDetail,
  } = useProducts();
  const { categories, loadCategories } = useCategories();
  const {
    subCategoriesByCategory,
    loadSubCategories,
    loadSubCategoriesByCategory,
  } = useSubCategories();

  useEffect(() => {
    loadProduct(id);
  }, [id]);

  useEffect(() => {
    loadCategories();
    loadProduct(id);
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      shortDescription: "",
      brand: "",
      dimensions: "",
      price: "",
      porcentDiscount: "",
      discountPrice: "",
      size: "",
      tag: "",
      category: "",
      subCategory: "",
      weight: "",
      thumbnail: "",
      seoDescription: "",
      seoKeywords: "",
      product_key: "",
    },
    onSubmit: (values) => {
      try {
        editProduct(id, values);
      } catch (error) {
        enqueueSnackbar(
          `Error al editar ${error.response?.data?.message || error.message}`,
          {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          }
        );
      }
    },
  });

  useEffect(() => {
    if (product) {
      formik.setValues({
        ...formik.initialValues,
        ...product,
        category: product.category?._id || "",
        subCategory: product.subCategory?._id || "",
      });

      // Cargar subcategorías si hay categoría inicial
      if (product.category?._id) {
        loadSubCategoriesByCategory(product.category._id);
      }
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseFloat(value) || "";
    const { price, porcentDiscount } = formik.values;

    let newTotalPrice =
      name === "price"
        ? newValue - (newValue * porcentDiscount) / 100
        : price - (price * newValue) / 100;

    formik.setValues({
      ...formik.values,
      [name]: newValue,
      discountPrice: newTotalPrice,
    });
  };

  const outEdit = () => navigate("/mi-almacen/productos", { replace: true });

  if (loading) return <LoadingScreenBlue />;

  return (
    <>
      <Grid
        component="form"
        onSubmit={formik.handleSubmit}
        display={"flex"}
        container
        gap={2}
      >
        <Grid
          item
          marginTop={{ xs: "-30px" }}
          xs={12}
          minHeight={"100px"}
          className="Titles"
        >
          <Typography
            textAlign={"center"}
            variant="h1"
            fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
          >
            Editar producto
          </Typography>
        </Grid>
        <Grid
          item
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          xs={12}
        >
          <Button
            startIcon={<Refresh />}
            onClick={() => loadProduct(id)}
            variant="contained"
            color="primary"
          >
            Recargar
          </Button>
          <Button
            startIcon={<ViewModule />}
            onClick={() =>
              navigate(`/mi-almacen/productos/variantes/editar/${id}`)
            }
            variant="contained"
            color="secondary"
          >
            Agregar variantes
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            gridColumn: "span 2",
            gridRow: "span 4",
          }}
        >
          <Card variant="outlined">
            <CardHeader title="Detalles" />
            <CardContent
              sx={{ display: "flex", gap: 2, flexDirection: "column" }}
            >
              <TextField
                size="small"
                fullWidth
                id="name"
                name="name"
                label="Nombre del producto "
                variant="outlined"
                value={formik.values?.name}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                size="small"
                id="brand"
                name="brand"
                label="Marca"
                variant="outlined"
                value={formik.values?.brand}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                size="small"
                id="tag"
                name="tag"
                label="Código"
                variant="outlined"
                value={formik.values?.tag}
                onChange={formik.handleChange}
                // onKeyDown={handleKeyDown}
              />

              <FormControl fullWidth>
                <FormLabel>Categoría</FormLabel>
                <Select
                  id="category"
                  name="category"
                  size="small"
                  value={formik.values?.category}
                  label="Categoria"
                  onChange={(e) => {
                    const selectedCategory = e.target.value;

                    // Actualiza la categoría y limpia subcategoría
                    formik.setFieldValue("category", selectedCategory);
                    formik.setFieldValue("subCategory", "");

                    // Cargar subcategorías para la nueva categoría
                    loadSubCategoriesByCategory(selectedCategory);
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Selecciona una categoria</FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Subcategoria</FormLabel>
                <Select
                  id="subCategory"
                  name="subCategory"
                  size="small"
                  value={formik.values?.subCategory}
                  label="Subcategoria"
                  onChange={(e) =>
                    formik.setFieldValue("subCategory", e.target.value)
                  }
                >
                  {formik.values?.category &&
                    subCategoriesByCategory.map((subCategory) => (
                      <MenuItem key={subCategory._id} value={subCategory._id}>
                        {subCategory.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText>Selecciona una sub-categoria</FormHelperText>
              </FormControl>

              <TextAreaInput
                aria-label="Descripcion"
                placeholder="Descripción"
                id="description"
                name="description"
                minRows={2}
                maxRows={4}
                value={formik.values?.description}
                style={{ width: "100%", marginBottom: 20 }}
                onChange={formik.handleChange}
              />
              <TextAreaInput
                aria-label="Descripcion corta"
                id="shortDescription"
                name="shortDescription"
                minRows={1}
                maxRows={2}
                value={formik.values?.shortDescription}
                style={{ width: "100%", marginBottom: 20 }}
                onChange={formik.handleChange}
                placeholder="Descripción corta"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          sx={{
            gridColumn: "span 2",
            gridRow: "span 1",
          }}
        >
          <Card variant="outlined">
            <CardHeader title="Dimensiones" />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                fullWidth
                size="small"
                type="text"
                id="dimensions"
                name="dimensions"
                label="Ancho,Largo,Alto"
                variant="outlined"
                value={formik.values?.dimensions}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                size="small"
                id="weight"
                name="weight"
                label="Peso"
                type="number"
                variant="outlined"
                value={formik.values?.weight}
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">gr</InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            gridColumn: "span 2",
            gridRow: "span 4",
          }}
        >
          <Card variant="outlined">
            <CardHeader title="Precio y facturación" />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                fullWidth
                id="price"
                name="price"
                type="number"
                label="Precio neto"
                variant="outlined"
                value={formik.values?.price}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                id="porcentDiscount"
                name="porcentDiscount"
                type="number"
                label="Descuento"
                variant="outlined"
                value={formik.values?.porcentDiscount}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                id="discountPrice"
                name="discountPrice"
                type="number"
                label="Precio con descuento"
                variant="outlined"
                value={formik.values?.discountPrice}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                id="product_key"
                name="product_key"
                type="number"
                label="Clave SAT"
                variant="outlined"
                value={formik.values?.product_key}
                onChange={formik.handleChange}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            gridColumn: "span 2",
            gridRow: "span 3",
          }}
        >
          <Card variant="outlined">
            <CardHeader title="Optimización para motores de búsqueda" />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextAreaInput
                aria-label="Descripcion optimizada"
                id="seoDescription"
                name="seoDescription"
                minRows={1}
                maxRows={2}
                value={formik.values?.seoDescription}
                style={{ width: "100%", marginBottom: 20 }}
                onChange={formik.handleChange}
                placeholder="Descripción optimizada"
              />
              <WordsInput
                formik={formik}
                id={"seoKeywords"}
                name={"seoKeywords"}
                label={"Palabras clave para CEO"}
                keywords={formik.values?.seoKeywords}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid container>
          <ButtonGroup fullWidth>
            <Button type="submit" variant="contained" color="success">
              Guardar Cambios
            </Button>
            <Button
              onClick={() => outEdit()}
              variant="contained"
              color="warning"
            >
              Salir
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid container width={"100%"}>
        <Card variant="outlined">
          <CardContent>
            <CardHeader title="Multimedia" />
            <Grid
              container
              width={"100%"}
              display={"flex"}
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item xs={12} lg={6}>
                <VideoUpdateField
                  videosIniciales={product.videos ? product.videos : null}
                  onSubmit={updateVideo}
                  idProduct={id}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <DetailImagesUpdateField
                  onSubmit={addOneImage}
                  imagesProduct={product.images ? product.images : null}
                  idProduct={id}
                  onDelete={deleteImageDetail}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Edit;
