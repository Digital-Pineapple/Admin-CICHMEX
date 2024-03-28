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
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import AddImage from "../../assets/Images/add.png";
import CustomBreadcrumb from "../../components/ui/CustomBreadcrumb";
import { useTypeUser } from '../../hooks/useTypeUser'
import { useUsers } from "../../hooks/useUsers";

const Edit = () => {
  const { id } = useParams();
  const {loadUser, editUser, user}= useUsers()
  const {loadTypeUsers, typeUsers} = useTypeUser()
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = ({ target }) => {
    setPreviewImage(URL.createObjectURL(target.files[0]));
    setSelectedFile(target.files[0]);
  };

  useEffect(() => {
    loadUser(id);
    loadTypeUsers()
  }, [id]);

  useEffect(() => {
    formik.setValues({
      fullname: user.fullname,
      type_customer: user.type_user?.name,
      profile_image: previewImage,
    });
    setPreviewImage(user.profile_image);
  }, [user]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      type_user: user.type_user?.name,
      profile_image: "",
    },
    onSubmit: (values) => {
      try {
        values.profile_image = selectedFile;
        console.log(values,'edit');
        editUser(user._id, values);
      } catch (error) {
        return enqueueSnackbar(`Error: ${error.response.data?.message}`, {
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
    navigate("/auth/usuarios", { replace: true });
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Editar Usuario</h2>} />
      <Grid
        color="#F7BFBF"
        borderRadius={5}
        mt={3}
        sx={{ border: 10, p: 5 }}
        container
        spacing={4}
      >
        <CustomBreadcrumb id={id} />
        <Grid
          item
          sm={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <CardMedia
                  sx={{ height: 140 }}
                  image={
                    previewImage
                      ? previewImage
                      : user.profile_image || AddImage
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
                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => handleImage(e)}
                />
              </CardActions>
            </Card>
          </Grid>
          <TextField
            focused
            fullWidth
            id="fullname"
            name="fullname"
            label="Nombre"
            variant="outlined"
            value={formik.values.fullname}
            sx={{ margin: 2 }}
            onChange={formik.handleChange}
          />

          <FormControl>
            <FormLabel>TIpo de usuario</FormLabel>
            <Select
              id="type_user"
              type="text"
              name="type_user"
              value={formik.values.type_user}
              label="Tipo de usuario"
              onChange={formik.handleChange}
            >
              {typeUsers? typeUsers.map((item, index)=>{return(
                <MenuItem key={index} value={item?._id}>{item.name}</MenuItem>
              )}):''}
            </Select>
            <FormHelperText>Selecciona un tipo de usuario</FormHelperText>
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
