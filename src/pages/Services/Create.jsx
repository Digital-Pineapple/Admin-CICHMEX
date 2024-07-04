import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {
  Grid,
  TextareaAutosize,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography, ButtonGroup,
} from "@mui/material";
import { useServices } from "../../hooks/useServices";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEffect } from "react";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";

const CreateService = () => {
  const { addService, navigate } = useServices();
  const { loadSubCategories, subCategories } = useSubCategories();

  useEffect(() => {
    loadSubCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      subCategory: ""
    },
    onSubmit: (values) => {
      const values2 = {
        ...values,
        service_image: values?.profile_image ? values?.profile_image : null,
      };
      try {
        addService(values2);
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
  const outCreate = () => {
    navigate("/auth/servicios", { replace: true });
  };

  return (
    <Grid
    container
    component="form"
    onSubmit={formik.handleSubmit}
    style={{ marginLeft: "10%", height: "70%", width: "80%", display:'flex', justifyContent:'center' }}
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
          Servicios Globales
        </Typography>
      </Grid>
      <Grid
         item
         sm={8}
         display={"flex"}
         flexDirection={"column"}
         alignItems={"center"}
      >
         <Grid item xs={12} sm={5} md={5.7}>
        <ProfileImageUploader
          formik={formik}
          id={"image"}
          name={"image"}
        />
      </Grid>
        <TextField
          focused
          fullWidth
          id="name"
          name="name"
          label="Nombre del servicio"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
        <Typography>Descipcion del Servicio</Typography>
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
        <FormControl>
          <FormLabel>subCategoria</FormLabel>
          <Select
            id="subCategory"
            name="subCategory"
            value={formik.values.subCategory}
            label="subCategoria"
            onChange={formik.handleChange}
          >
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Selecciona una sub-categoria</FormHelperText>
        </FormControl>
      </Grid>
      <ButtonGroup
        variant="contained"
        color="inherit"
        size="large"
        aria-label="group"
        fullWidth
      >
        <Button type="submit" variant="contained" color="success">
          Guardar
        </Button>
        <Button
          onClick={outCreate}
          variant="contained"
          size="large"
          color="warning"
        >
          Salir
        </Button>
      </ButtonGroup>
     
    </Grid>
  );
};

export default CreateService;
