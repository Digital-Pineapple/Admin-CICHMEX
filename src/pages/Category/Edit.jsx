import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import UploadImage from "../../components/ui/UploadImage";
import AddImage from "../../../public/images/add.png";

const Edit = () => {
  const { id } = useParams();
  const { loadCategory, category, editCategory } = useCategories();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = ({ target }) => {
    setPreviewImage(URL.createObjectURL(target.files[0]));
    setSelectedFile(target.files[0]);
  };

  useEffect(() => {
    loadCategory(id);
  }, []);

  useEffect(() => {
    formik.setValues({
      name: category.name,
      description: category.description,
      status: category.status,
      category_image: previewImage,
    });
    console.log('xd');
  }, [category]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "",
      category_image: "",
    },
    onSubmit: (values) => {
      try {
        values.category_image = selectedFile;
        editCategory(category._id, values);
        navigate("/auth/CategoriaServicios", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al editar la categoria", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  const outEdit = () => {
    navigate("/auth/CategoriaServicios", { replace: true });
  };

  return (
    <Box marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Categoria</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
        <Grid
          item
          sm={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    selectedFile
                      ? previewImage
                      : category.category_image || AddImage
                  }
                  title={selectedFile ? selectedFile.name : "Selecciona imagen"}
                  component={"input"}
                  type={"file"}
                  id={"category_image"}
                  name={"category_image"}
                  accept={"image/png, image/jpeg"}
                  value={formik.values.category_image}
                  onChange={handleImage}
                />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {selectedFile ? selectedFile.name : "Selecciona una imagen"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <TextField
            focused
            fullWidth
            id="name"
            name="name"
            label="Nombre de la categoria"
            variant="outlined"
            value={formik.values.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          <Typography>Descripcion de la categoría</Typography>
          <TextareaAutosize
            aria-label="minimum height"
            id="description"
            name="description"
            minRows={6}
            label="Descripcion"
            value={formik.values.description}
            style={{ width: "100%", fontFamily: "BikoBold", marginBottom: 20 }}
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
  );
};

export default Edit;
