import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  TextField,
  TextareaAutosize,
  useMediaQuery,
  Avatar,
  Badge
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
import FilterIcon from "@mui/icons-material/Filter";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const Edit = () => {
  const { id } = useParams();
  const { loadProduct, product, editProduct, navigate } = useProducts();
  const [loading, setLoading] = useState(true)
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 0,
      top: 1,
    },
  }));
  useEffect(() => {
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
        editProduct(id, values, imagesFiles() );
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

  const { images, handleImageChange, deleteImage, imagesPreview, imagesFiles } =
  useImages();

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
          xs={12}
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
            )
            // <Grid></Grid>
          }
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
