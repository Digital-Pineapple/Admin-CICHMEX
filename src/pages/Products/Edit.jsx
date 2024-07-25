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
const Edit = () => {
  const { id } = useParams();
  const { loadProduct, product, editProduct, navigate, isLoading } =
    useProducts();
  const { categories, loadCategories } = useCategories();
  const { subCatByCategory, loadSubcategoriesByCategory } = useSubCategories();
  const isSmallScreen = useMediaQuery("(max-width:400px)");
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 0,
      top: 1,
    },
  }));
  useEffect(() => {
    loadProduct(id);
  }, [id]);
  console.log(product);
  useEffect(() => {
    formik.setValues({
      name: product.name ? product.name : "",
      description: product.description || "",
      price: product.price || "",
      size: product.size || "",
      tag: product.tag || "",
      images: product.images || "",
      category: product.category?._id || "",
      subCategory: product.subCategory?._id || "",
      weight: product.weight || "",
    });
    loadCategories();
    loadSubcategoriesByCategory(product?.category?._id);
  }, [product]);

  const formik = useFormik({
    onSubmit: (values) => {
      try {
        editProduct(id, values, imagesFiles());
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

  const { images, handleImageChange, deleteImage, imagesFiles } = useImages();

  const outEdit = () => {
    navigate("/auth/productos", { replace: true });
  };

  return (
    <>
      {isLoading && product ? (
        <LoadingScreenBlue />
      ) : (
        <Grid
          component="form"
          padding={1}
          gap={2}
          container
          onSubmit={formik.handleSubmit}
          paddingLeft={{ xs: "65px", sm: "75px" }}
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
              Editar
            </Typography>
          </Grid>
          <Grid container maxWidth={'70vw'} >
            {product.images?.length ? (
              <SlideBranchesImages
                images={product?.images}
                altura={"300px"}
              />
            ) : (
              <Typography marginY={"80px"}>
                No tienes imagenes para mostrar
              </Typography>
            )}
          </Grid>
          <Grid container>
            {images.length > 0 && (
              <Grid item  xs={12}>
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

            <Typography marginTop={"10px"}>
              {" "}
              peso max de imagen(500 kb)
            </Typography>
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

          <Grid item xs={12} sm={5}>
            <TextField
              focused
              fullWidth
              id="name"
              name="name"
              label="Nombre del producto"
              variant="outlined"
              value={formik.values?.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              focused
              type="number"
              fullWidth
              id="price"
              name="price"
              label="Precio del producto"
              variant="outlined"
              value={formik.values?.price}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              focused
              fullWidth
              id="size"
              name="size"
              label="Tamaño"
              variant="outlined"
              value={formik.values?.size}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              focused
              fullWidth
              id="weight"
              name="weight"
              label="Peso"
              variant="outlined"
              value={formik.values?.weight}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              focused
              fullWidth
              id="tag"
              name="tag"
              label="Código"
              variant="outlined"
              value={formik.values?.tag}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography>Descripción del prducto</Typography>
            <TextareaAutosize
              aria-label="Descripción"
              id="description"
              name="description"
              minRows={2}
              label="Descripcion"
              value={formik.values?.description}
              style={{
                width: "100%",
                fontFamily: "BikoBold",
                marginBottom: 20,
              }}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={5.8}>
            <FormControl fullWidth>
              <FormLabel>Categoría</FormLabel>
              <Select
                id="category"
                name="category"
                value={formik.values?.category}
                label="Categoria"
                onChange={(e) => {
                  formik.setFieldValue("subCategory", "");
                  formik.handleChange(e);
                  loadSubcategoriesByCategory(e.target.value);
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
          </Grid>
          <Grid item xs={12} sm={5.8}>
            <FormControl fullWidth>
              <FormLabel>Subcategoría</FormLabel>
              <Select
                id="subCategory"
                name="subCategory"
                value={formik.values?.subCategory}
                label="subcategoria"
                onChange={formik.handleChange}
              >
                {formik.values?.category &&
                  subCatByCategory?.map((subCategory) => (
                    <MenuItem key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Selecciona una subcategoria</FormHelperText>
            </FormControl>
          </Grid>

          <Button
            type="submit"
            sx={{ minHeight: "50px" }}
            color="success"
            variant="contained"
            fullWidth
          >
            Guardar
          </Button>
          <Button
            onClick={outEdit}
            fullWidth
            variant="contained"
            color="warning"
            sx={{ minHeight: "50px" }}
          >
            Cancelar
          </Button>
        </Grid>
      )}
    </>
  );
};

export default Edit;
