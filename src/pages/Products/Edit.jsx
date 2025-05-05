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
  Grid2,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
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
import * as Yup from "yup";

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

  const validationSchema = Yup.object({
      name: Yup.string()
        .required("El nombre del producto es obligatorio")
        .min(3, "El nombre debe tener al menos 3 caracteres"),
      price: Yup.number()
        .required("El precio es obligatorio")
        .min(1, "El precio debe ser mayor o igual a 0"),
      porcentDiscount: Yup.number()
      .min(0, "El descuento no puede ser negativo")
      .lessThan(100, "El descuento no puede ser mayor o igual al 100%"),
      description: Yup.string().required("La descripción es obligatoria"),
      brand: Yup.string().required("La marca es obligatoria"),
      tag: Yup.string().required("El código es obligatorio"),
      category: Yup.string().required("La categoría es obligatoria"),
      subCategory: Yup.string().required("La subcategoría es obligatoria"),
      product_key: Yup.string().required("La clave sat es obligatoria"),
     purchase_price: Yup.number()
           .required("El precio de compra es obligatorio")
           .test(
             "is-less-than-price", // Nombre del test
             "El precio de compra debe ser menor o igual que el precio neto", // Mensaje de error
             function (value) {
               const { price } = this.parent; // Accede al campo `price`
               return value <= price; // Valida que sea menor
             }
           ),
      // dimensions: Yup.string().required("Las dimensiones son obligatorias"),
      weight: Yup.number()
        .required("El peso es obligatorio")
        .min(1, "El peso debe ser mayor a 0"),
      // seoDescription: Yup.string()
      //   .required("La descripción SEO es obligatoria")
      //   .max(160, "La descripción SEO no puede tener más de 160 caracteres"),
      // seoKeywords: Yup.string().required("Las palabras clave son obligatorias"),
    });

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
      purchase_price:"",
    },
    validationSchema,
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
        porcentDiscount: product.porcentDiscount? product.porcentDiscount : 0,
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

    let newPrice = formik.values.price;
    let newPorcentDiscount = formik.values.porcentDiscount;
    let newTotalPrice = formik.values.totalPrice;

    if (name === "price") {
      newPrice = newValue;
      if (newPorcentDiscount > 0) {
        newTotalPrice = newPrice - (newPrice * newPorcentDiscount) / 100;
      } else {
        newTotalPrice = newPrice;
      }
    } else if (name === "porcentDiscount") {
      newPorcentDiscount = newValue;
      if (newPorcentDiscount > 0) {
        newTotalPrice = newPrice - (newPrice * newPorcentDiscount) / 100;
      } else {
        newTotalPrice = newPrice;
      }
    }

    formik.setValues({
      ...formik.values,
      price: newPrice,
      porcentDiscount: newPorcentDiscount,
      discountPrice: newTotalPrice,
    });
  };


  const outEdit = () => navigate("/almacen/productos", { replace: true });
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previene que el Enter envíe el formulario
    }
  };
  if (loading) return <LoadingScreenBlue />;


  return (
    <>
      <Grid2
        component="form"
        onSubmit={formik.handleSubmit}
        display={"flex"}
        container
        gap={2}
      >
        <Grid2
          
          marginTop={{ xs: "-30px" }}
          size={12}
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
        </Grid2>
        <Grid2
          
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          size={12}
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
              navigate(`/productos/variantes/editar/${id}`)
            }
            variant="contained"
            color="secondary"
          >
            Agregar variantes
          </Button>
        </Grid2>
        <Grid2
          size={{xs:12, lg:3}}
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
                error={Boolean(formik.errors.name)} // Añade el atributo error
                helperText={formik.errors.name}
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
                error={Boolean(formik.errors.brand)} // Añade el atributo error
              helperText={formik.errors.brand}

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
                onKeyDown={handleKeyDown}
                error={Boolean(formik.errors.tag)} // Añade el atributo error
                helperText={formik.errors.tag}
              />

              <FormControl fullWidth>
                <FormLabel>Categoría</FormLabel>
                <Select
                  id="category"
                  name="category"
                  size="small"
                  value={formik.values?.category}
                  label="Categoria"
                  error={Boolean(formik.errors.category)}
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
                  error={Boolean(formik.errors.subCategory)}
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
                error={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
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
        </Grid2>
        <Grid2
           size={{xs:12, lg:2}}
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
                error={Boolean(formik.errors.weight)} // Añade el atributo error
                helperText={formik.errors.weight}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">gr</InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2
           size={{xs:12, lg:3}}
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
              id="purchase_price"
              name="purchase_price"
              type="number"
              label="Precio de compra"
              variant="outlined"
              value={formik.values.purchase_price}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.purchase_price)} // Añade el atributo error
              helperText={formik.errors.purchase_price} // Muestra el mensaje de error
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
                id="price"
                name="price"
                type="number"
                label="Precio neto"
                variant="outlined"
                value={formik.values?.price}
                onChange={handleInputChange}
                error={Boolean(formik.errors.price)} // Añade el atributo error
              helperText={formik.errors.price}
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
                error={Boolean(formik.errors.porcentDiscount)} // Añade el atributo error
                helperText={formik.errors.porcentDiscount}
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
                error={Boolean(formik.errors.discountPrice)} // Añade el atributo error
                helperText={formik.errors.discountPrice}
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
                error={Boolean(formik.errors.product_key)} // Añade el atributo error
               helperText={formik.errors.product_key}
              />
              <Link to={'https://www.sat.gob.mx/consultas/53693/catalogo-de-productos-y-servicios'} target="_blank" rel="noopener noreferrer" >
                          Buscar código
                        </Link>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2
           size={{xs:12, lg:3}}
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
        </Grid2>

        <Grid2 display={'flex'} gap={2} marginY={1} size={12}>
         
            <Button
              onClick={() => outEdit()}
              variant="contained"
              color="warning"
              fullWidth
            >
              Salir
            </Button>
            <Button fullWidth type="submit" variant="contained" color="success">
              Guardar Cambios
            </Button>
         
        </Grid2>
      </Grid2>
      <Grid2 container width={"100%"}>
        <Card variant="outlined">
          <CardContent>
            <CardHeader title="Multimedia" />
            <Grid2
              container
              width={"100%"}
              display={"flex"}
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid2  size={{xs:12, lg:6}}>
                <VideoUpdateField
                  videosIniciales={product.videos ? product.videos : null}
                  onSubmit={updateVideo}
                  idProduct={id}
                />
              </Grid2>
              <Grid2  size={{xs:12, lg:6}}>
                <DetailImagesUpdateField
                  onSubmit={addOneImage}
                  imagesProduct={product.images ? product.images : null}
                  idProduct={id}
                  onDelete={deleteImageDetail}
                />
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>
    </>
  );
};

export default Edit;
