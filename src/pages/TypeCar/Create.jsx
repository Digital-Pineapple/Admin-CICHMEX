import Titles from "../../components/ui/Titles";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTypeCars } from "../../hooks/UseTypeCars";

const CreateTypeCar = () => {
  const { addTypeCar } = useTypeCars();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "true",
    },
    onSubmit: (values) => {
      try {
        console.log(values, 'crear');
        addTypeCar(values);
        navigate("/auth/typeCar", { replace: true });
      } catch (error) {
        return enqueueSnackbar("Error al crear el tipo de auto", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} marginX={"10%"}>
      <Titles name={<h2 align="center">Crear tipo de auto</h2>} />
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
          label="Nombre del tipo de auto"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
      </Grid>
      <Button type="submit" variant="contained" color="secondary">
        Crear
      </Button>
    </Box>
  );
};

export default CreateTypeCar;
