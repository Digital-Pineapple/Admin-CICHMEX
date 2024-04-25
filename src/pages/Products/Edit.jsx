import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import AddImage from "../../assets/Images/add.png";
import { useProducts } from "../../hooks/useProducts";
import { SlideBranchesImages } from "../../components/Images/SlideBranchesImages";
import useImages from "../../hooks/useImages";
import LoadingScreen from '../../components/ui/LoadingScreen'

const Edit = () => {
  const { id } = useParams();
  const { loadProduct, product, editProduct, navigate } = useProducts();
  const [loading, setLoading] = useState(true)
  const { images, handleImageChange, deleteImage } = useImages();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    console.log(product.length);
    setTimeout(async()=>{
      await loadProduct(id)
      if (product) {
        await formik.setValues({
          name: product.name,
          description: product.description,
          price: product.price,
          size: product.size,
          tag: product.tag,
        });
        setLoading(false)
      }
    },500)
    
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: true,
      size: "",
      tag: "",
      images: "",
    },

    onSubmit: (values) => {
      try {
        editProduct(id, values);
        navigate("/auth/productos", { replace: true });
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

  const outEdit = () => {
    navigate("/auth/productos", { replace: true });
  };

  return (
    <>
    
    {
      loading ? <LoadingScreen />  
      :
   
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Producto</h2>} />

      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
        <Grid
          container
          item
          className="image-branch-container"
          xs={12}
          md={6}
          display={"flex"}
          margin={"auto"}
          justifyContent={"center"}
        >
          {product.images?.length ? (
            <SlideBranchesImages
              images={product?.images}
              altura={isSmallScreen ? "200px" : "400px"}
            />
          ) : (
            <Typography marginY={"80px"}>
              No tienes imagenes para mostrar
            </Typography>
          )}
        </Grid>

        <Grid
          item
          sm={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <TextField
            focused
            fullWidth
            id="name"
            name="name"
            label="Nombre del producto"
            variant="outlined"
            value={formik.values?.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          <Typography>Descripción del prducto</Typography>
          <TextareaAutosize
            aria-label="minimum height"
            id="description"
            name="description"
            minRows={6}
            label="Descripcion"
            value={formik.values?.description}
            style={{ width: "100%", fontFamily: "BikoBold", marginBottom: 20 }}
            onChange={formik.handleChange}
          />
          <TextField
            focused
            type="number"
            fullWidth
            id="price"
            name="price"
            label="Precio del producto"
            variant="outlined"
            value={formik.values?.price}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          <TextField
            focused
            fullWidth
            id="size"
            name="size"
            label="Tamaño"
            variant="outlined"
            value={formik.values?.size}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />

          <Grid
            container
            justifyContent={"center"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
              <Button onClick={outEdit} variant="outlined" color="secondary">
                Salir
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
}
</>
  )
}

export default Edit;
