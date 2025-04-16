import React, { useState } from "react";
import Titles from "../../components/ui/Titles";
import UploadImage from "../../components/ui/UploadImage";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useTypeCars } from "../../hooks/UseTypeCars";
import AddImage from "../../../src/assets/Images/add.png";

const Edit = () => {
  const { id } = useParams(); // Obtener el ID del tipo de auto desde los parámetros de la URL
  const { loadTypeCar, editTypeCar, typeCar } = useTypeCars(); // Hook personalizado para manejar los datos de los tipos de autos
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado
  const [previewImage, setPreviewImage] = useState(null); // Estado para almacenar la vista previa de la imagen

  // Manejar la selección de una imagen y generar una vista previa
  const handleImage = ({ target }) => {
    setPreviewImage(URL.createObjectURL(target.files[0]));
    setSelectedFile(target.files[0]);
  };

  // Cargar los datos del tipo de auto al montar el componente
  useEffect(() => {
    loadTypeCar(id);
  }, []);

  // Actualizar los valores del formulario cuando se carguen los datos del tipo de auto
  useEffect(() => {
    formik.setValues({
      name: typeCar.name,
      status: typeCar.status,
      typeCar_image: previewImage,
    });
  }, [typeCar]);

  // Configuración del formulario con Formik
  const formik = useFormik({
    initialValues: {
      name: "", // Nombre del tipo de auto
      status: true, // Estado del tipo de auto
      typeCar_image: "", // Imagen del tipo de auto
    },
    onSubmit: (values) => {
      try {
        values.typeCar_image = selectedFile; // Asignar la imagen seleccionada al formulario
        editTypeCar(typeCar._id, values); // Llamar a la función para editar el tipo de auto
        navigate("/auth/typeCar", { replace: true }); // Navegar de regreso a la lista de tipos de autos
      } catch (error) {
        console.log(error);
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

  // Función para salir de la edición y regresar a la lista de tipos de autos
  const outEdit = () => {
    navigate("/auth/typeCar", { replace: true });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      {/* Título del formulario */}
      <Titles name={<h2 align="center">Editar Tipo de auto</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
        <Grid item>
          {/* Tarjeta para mostrar la imagen seleccionada o actual */}
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <CardMedia
                sx={{ height: 140 }}
                image={
                  previewImage
                    ? previewImage
                    : typeCar.typeCar_image || AddImage
                }
                title={selectedFile ? selectedFile.name : "Selecciona imagen"}
              />

              <Typography gutterBottom variant="h5" component="div">
                {selectedFile
                  ? selectedFile.name
                  : previewImage
                  ? "Cambiar imagen"
                  : "Elige una imagen"}
              </Typography>
            </CardContent>
            <CardActions>
              {/* Input para seleccionar una imagen */}
              <input
                type="file"
                id="typeCar_image"
                name="typeCar_image"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImage(e)}
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid
          item
          sm={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          {/* Campo de texto para el nombre del tipo de auto */}
          <TextField
            focused
            fullWidth
            id="name"
            name="name"
            label="Nombre del tipo de auto"
            variant="outlined"
            value={formik.values?.name}
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
              {/* Botones para guardar o salir */}
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
