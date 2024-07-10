import Titles from "../../components/ui/Titles";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Button, Typography } from "@mui/material";
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
    <Box component="form" onSubmit={formik.handleSubmit}>
     <Grid item marginTop={{xs:'-30px'}} xs={12} minHeight={'100px'} className="Titles">   
      <Typography textAlign={'center'} variant="h1" fontSize={{xs:'20px', sm:'30px', lg:'40px'}} >
        Crear tipo de Auto
      </Typography>
      </Grid>
      <Grid
        mt={3}
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
      <Button fullWidth type="submit" variant="contained" color="success">
        Crear
      </Button>
    </Box>
  );
};

export default CreateTypeCar;
