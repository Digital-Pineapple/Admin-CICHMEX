import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import Titles from "../../components/ui/Titles";
import UploadImage from "../../components/ui/UploadImage";
import Grid from "@mui/material/Grid";
import {
  Select,
  TextField,
  TextareaAutosize,
  FormControl,
  FormLabel,
  FormHelperText,
  MenuItem,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useCategories } from "../../hooks/useCategories";
import { useSelector } from "react-redux";
import { Card } from "antd";
import AddImage from "../../assets/Images/add.png";

const Edit = () => {
  const { id } = useParams();
  const { loadSubCategory, subCategory, editSubCategory } = useSubCategories();
  const { loadCategories } = useCategories();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = ({ target }) => {
    setPreviewImage(URL.createObjectURL(target.files[0]));
    setSelectedFile(target.files[0]);
  };

  useEffect(() => {
    loadSubCategory(id);
    loadCategories();
  }, []);

  useEffect(() => {
    formik.setValues({
      name: subCategory?.name,
      description: subCategory?.description,
      status: subCategory?.status,
      category: subCategory?.category,
      subCategory_image : previewImage,
    });
  }, [subCategory]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: true,
      subCategory_image: "",
      category: "",
    },
    onSubmit: (values) => {
      try {
        values.subCategory_image = selectedFile;
        editSubCategory(subCategory._id, values);
        navigate("/auth/SubCategorias", { replace: true });
      } catch (error) {
        console.log(error);
        return enqueueSnackbar("Error al editar la subcategoria", {
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
    navigate("/auth/SubCategorias", { replace: true });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Sub-Categorias</h2>} />
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
        >
           <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    selectedFile
                      ? previewImage
                      : subCategory?.subCategory_image || AddImage
                  }
                  title={selectedFile ? selectedFile.name : "Selecciona imagen"}
                  component={"input"}
                  type={"file"}
                  id={"subCategory_image"}
                  name={"subCategory_image"}
                  accept={"image/png, image/jpeg"}
                  value={formik.values.subCategory_image}
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
            label="Nombre de la subcategoria"
            variant="outlined"
            value={formik.values.name}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />
          <Typography>Descipcion de la subcategoría</Typography>
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
          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select
              id="category"
              name="category"
              value={formik.values.category}
              label="Categoria"
              onChange={formik.handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecciona una categoria</FormHelperText>
          </FormControl>

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
