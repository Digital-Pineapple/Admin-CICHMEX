import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import {
  Grid,
  Button,
  Typography, ButtonGroup,
} from "@mui/material";
import ProfileImageUploader from "../../components/ui/ProfileImageUploader";
import { useCategories } from "../../hooks/useCategories";

const CreateCategory = () => {
  const { addCategory, navigate } = useCategories();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      subCategory: ""
    },
    onSubmit: (values) => {
      const values2 = {
        ...values,
        image: values?.profile_image ? values?.profile_image : null,
      };
      try {
        addCategory(values2);
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
    navigate("/auth/categorias", { replace: true });
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
          Crear Categoría
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
          label="Nombre de la categoría"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
       
       
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

export default CreateCategory;

