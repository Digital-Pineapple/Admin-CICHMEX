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
import { SlideBranchesImages } from "../../components/Images/SlideBranchesImages";
import useImages from "../../hooks/useImages";
import FilterIcon from "@mui/icons-material/Filter";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VideoUploadField from "../../components/Forms/VideoUploadField";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";
import TextAreaInput from "../../components/inputs/TextAreaInput";
import { AttachMoney } from "@mui/icons-material";
import WordsInput from "../../components/inputs/WordsInput";

const Edit = () => {
  const { id } = useParams();
  const { loadProduct, product, editProduct, navigate, loading } =
    useProducts();
  const { categories, loadCategories } = useCategories();
  const {
    subCategoriesByCategory,
    loadSubCategories,
    loadSubCategoriesByCategory,
  } = useSubCategories();
  const [video, setVideo] = useState(null);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 0,
      top: 1,
    },
  }));
  useEffect(() => {
    loadProduct(id);
  }, [id]);

  useEffect(() => {
    formik.setValues({
      name: product.name ? product.name : "",
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      brand: product.brand || "",
      dimensions: product.dimensions | "",
      price: product.price || "",
      porcentDiscount: product.porcentDiscount || "",
      discountPrice: product.discountPrice || "",
      size: product.size || "",
      tag: product.tag || "",
      images: product.images || "",
      category: product.category?._id || "",
      subCategory: product.subCategory?._id || "",
      weight: product.weight || "",
      thumbnail: product.thumbnail || "",
      seoDescription: product.seoDescription || "",
      seoKeywords: product.seoKeywords || "",
      product_key: product.product_key || "",
      videos: product.videos || "",
    });
    loadCategories();
    loadSubCategories();
    loadSubCategoriesByCategory(product.category?._id);
  }, [product]);

  const formik = useFormik({
    onSubmit: (values) => {
      try {
        const values2 = {
          ...values,
          videos: [video],
          thumbnail: formik.values?.profile_image,
          images: imagesFiles(),
        };

        editProduct(id, values2, imagesFiles());
      } catch (error) {
        return enqueueSnackbar(
          `Error al editar ${error.response.data.message}`,
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      }
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previene que el Enter envíe el formulario
    }
  };

  const { images, handleImageChange, deleteImage, imagesFiles } = useImages();

  const outEdit = () => {
    navigate("/auth/productos", { replace: true });
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

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

  return (
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
          Registar nuevo producto
        </Typography>
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
              onKeyDown={handleKeyDown}
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
                  formik.setFieldValue("subCategory", "");
                  formik.handleChange(e);
                  loadSubCategoriesByCategory(e.target.value);
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
                onChange={formik.handleChange}
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
      <Grid item
        xs={12}
        >
        
      <Card variant="outlined">
        <CardContent>
          <CardHeader title="Multimedia" />
          <Grid container width={'100%'} display={'flex'} justifyContent={'space-between'} >
            
          <Grid item xs={12} lg={3}>
            <VideoUploadField
              setVideo={setVideo}
              initialVideo={formik.values?.videos[0]}
              label={"Subir video"}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Typography marginTop={"10px"}>Imagen principal</Typography>
            <ProfileImageUploader
              formik={formik}
              id={"thumbnail"}
              name={"thumbnail"}
              previewImage1={formik.values?.thumbnail}
            />
           
          </Grid>
          <Grid item xs={12} lg={3}>
          <Typography marginTop={"10px"}>
            {" "}
            Imagenes de detalle (peso max de imagen:500 kb)
          </Typography>
          {product.images?.length ? (
              <SlideBranchesImages images={product?.images} altura={"300px"} />
            ) : (
              <Typography variant="body1" color="inherit">
                No hay imagenes
              </Typography>
            )}
          {images.length > 0 && (
            <Grid item xs={12}>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/jpg"
                onChange={handleImageChange}
                hidden
              />
              <label htmlFor={"image"}>
                <Button
                  fullWidth
                  component="span"
                  color="primary"
                  variant="contained"
                >
                  Agrega Fotos
                </Button>
              </label>
            </Grid>
          )}
          {images.length ? (
            <>
              <Grid
                container
                display={"flex"}
                justifyContent={"center"}
                padding={"10px"}
                marginTop={"20px"}
                sx={{ backgroundColor: "#cfd8dc" }}
                gap={2}
              >
                {images.map(({ id, filePreview }) => (
                  <Grid item xs={12} sm={3} key={id}>
                    <StyledBadge
                      badgeContent={
                        <IconButton
                          sx={{ backgroundColor: "black", color: "black" }}
                          onClick={() => deleteImage(id)}
                        >
                          {" "}
                          <DeleteIcon
                            sx={{ color: "white", fontSize: "20px" }}
                          />{" "}
                        </IconButton>
                      }
                    >
                      <Avatar
                        src={filePreview}
                        variant="square"
                        sx={{ width: "100%", height: "200px" }}
                      />
                    </StyledBadge>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Grid
              container
              sx={{ backgroundColor: "#cfd8dc" }}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              marginTop={"20px"}
              height={"300px"}
              borderRadius={"5px"}
            >
              <FilterIcon
                style={{
                  fontSize: "40px",
                  alignSelf: "center",
                  marginBottom: "10px",
                }}
              />

              <input
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                hidden
              />
              <label htmlFor={"image"}>
                <Button component="span" color="primary" variant="contained">
                  Agregar Fotos
                </Button>
              </label>
            </Grid>
          )}
            
          </Grid>
          </Grid>

        </CardContent>
      </Card>
      </Grid>

      <Grid container>
        <ButtonGroup fullWidth>
          <Button type="submit" variant="contained" color="success">
            Guardar Cambios
          </Button>
          <Button
            onClick={() => navigate("/auth/Productos", { replace: true })}
            variant="contained"
            color="warning"
          >
            Salir
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Edit;
