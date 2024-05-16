import Titles from "../../components/ui/Titles";

import Box from "@mui/material/Box";

import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {
  Grid,
  Badge,
  IconButton,
  Avatar,
  TextareaAutosize,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  
} from "@mui/material";
import { Typography } from "antd";
import { useProducts } from "../../hooks/useProducts";
import useImages from "../../hooks/useImages";
import FilterIcon from "@mui/icons-material/Filter";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 1,
  },
}));
const styleStatus = {
  position: { xs: "static", md: "absolute" },
  left: { xs: "70%", md: "35%" },
  marginTop: { xs: "10px", md: "0px" },
};

const CreateProduct = () => {
  const { createProduct } = useProducts();
  const { loadSubCategories, subCategories, loadSubcategoriesByCategory, subsByCategory } = useSubCategories()
  const { categories, loadCategories } = useCategories();
  const { images, handleImageChange, deleteImage, imagesPreview, imagesFiles } =
    useImages();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      size: "",
      tag: "",
      subCategory:"",
      category:""
    },
    onSubmit: (values) => {
      try {
        createProduct(values, imagesFiles());
      } catch (error) {
        return enqueueSnackbar(`Error: ${error.data.response?.message}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

 
  useEffect(() => {
    loadSubCategories()
    loadCategories()
  }, [])
  

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Crear Producto</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre del producto "
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
        <TextField
          focused
          fullWidth
          id="price"
          name="price"
          label="Precio del producto"
          variant="outlined"
          value={formik.values.price}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
        <TextField
          focused
          fullWidth
          id="size"
          name="size"
          label="Tamaño del producto"
          variant="outlined"
          value={formik.values.size}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
         <FormControl>
            <FormLabel>Categoría</FormLabel>
            <Select
              id="category"
              name="category"
              value={formik.values.category}
              label="Categoria"
              onChange={(e)=>{
                formik.handleChange(e)
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
         <FormControl>
            <FormLabel>Subcategoria</FormLabel>
            <Select
              id="subCategory"
              name="subCategory"
              value={formik.values.subCategory}
              label="Subcategoria"
              onChange={formik.handleChange}
            >
              { formik.values.category && subsByCategory.map((subCategory) => (
                <MenuItem key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecciona una sub-categoria</FormHelperText>
          </FormControl>
        <TextField
          focused
          fullWidth
          id="tag"
          name="tag"
          label="Código"
          variant="outlined"
          value={formik.values.tag}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
        <Typography>Descipcion del Producto</Typography>
        <TextareaAutosize
          aria-label="Descripcion"
          id="description"
          name="description"
          minRows={6}
          label="Descripcion"
          value={formik.values.description}
          style={{ width: "100%", fontFamily: "BikoBold", marginBottom: 20 }}
          onChange={formik.handleChange}
        />

        {images.length > 0 && (
          <Grid item xs={12} md={4}>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpg"
              onChange={handleImageChange}
              hidden
            />
            <label htmlFor={"image"}>
              <Button component="span" color="primary" variant="outlined">
                Agrega Fotos
              </Button>
            </label>
          </Grid>
        )}

        <Typography marginTop={"10px"}> peso max de imagen(500 kb)</Typography>
        <Grid
          className="image-branch-container"
          item
          xs={12}
          display={"flex"}
          justifyContent={"flex-start"}
        >
          {/* <ImagesBranchComponent /> */}
          {
            images.length ? (
              <>
                <Grid
                  container
                  xs={12}
                  md={12}
                  spacing={1}
                  item
                  display={"flex"}
                  justifyContent={"flex-start"}
                  padding={"10px"}
                  marginTop={"20px"}
                  sx={{ backgroundColor: "#F7F7F7" }}
                >
                  {images.map(({ id, filePreview }) => (
                    <Grid item xs={12} md={6} key={id}>
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
                item
                xs={12}
                md={12}
                sx={{ backgroundColor: "#F7F7F7" }}
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
                {/* <Typography>Agrega imagenes de tu sucursal</Typography> */}
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  hidden
                />
                <label htmlFor={"image"}>
                  <Button component="span" color="primary" variant="outlined">
                    Agrega Fotos
                  </Button>
                </label>
              </Grid>
            )
            // <Grid></Grid>
          }
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="secondary">
        Crear
      </Button>
    </Box>
  );
};

export default CreateProduct;
