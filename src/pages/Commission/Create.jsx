import Titles from "../../components/ui/Titles";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCommissions } from "../../hooks/useCommissions";

const CreateCommission = () => {
  const { addCommission } = useCommissions();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      amount :"",
      status: "true",
    },
    onSubmit: (values) => {
      try {
        addCommission(values);
        navigate("/auth/comisiones", { replace: true });
      } catch (error) {
        return enqueueSnackbar(`Error al crear la comision:${error}`, {
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
      <Titles name={<h2 align="center">Crear comisión</h2>} />
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
          label="Nombre de la comisión"
          variant="outlined"
          value={formik.values.name}
          sx={{ margin: 2 }}
          onChange={formik.handleChange}
        />
        <TextField
          focused
          fullWidth
          id="amount"
          name="amount"
          label="Precio de la comisión"
          variant="outlined"
          value={formik.values.amount}
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

export default CreateCommission;
