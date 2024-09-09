import { useFormik } from "formik";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  ButtonGroup,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  Box,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useAuthStore } from "../../hooks";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import TextAreaInput from "../../components/inputs/TextAreaInput";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import { useDynamicRoutes } from "../../hooks/useDynamicRoutes";
import { enqueueSnackbar } from "notistack";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, rolesAllowed, theme) {
  return {
    fontWeight:
      rolesAllowed.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  path: Yup.string().required("La ruta es obligatoria"),
  component: Yup.string().required("El componente es obligatorio"),
  rolesAllowed: Yup.array()
    .min(1, "Debes seleccionar al menos un rol permitido")
    .required("Los roles permitidos son obligatorios"),
});

const AddDynamicRoute = () => {
  const theme = useTheme();
  const { navigate, loading } = useAuthStore();
  const { addRoute } = useDynamicRoutes();

  const formik = useFormik({
    initialValues: {
      name: "",
      path: "",
      component: "",
      rolesAllowed: [],
      authRequired: "",
      redirectTo: "",
      system: "",
    },
    validationSchema,
    onSubmit: (values) => {
      addRoute(values);
    },
  });

  const roles = [
    "SUPER-ADMIN",
    "ADMIN",
    "SUB-ADMIN",
    "CARRIER-DRIVER",
    "SELLER",
  ];

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      container
      gap={2}
    >
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight="100px"
        className="Titles"
      >
        <Typography
          textAlign="center"
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Registar nueva ruta
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        sx={{
          gridColumn: "span 2",
          gridRow: "span 4",
        }}
      >
        <Card variant="outlined">
          <CardHeader title="Detalles" />
          <CardContent
            sx={{ display: "flex", gap: 2, flexDirection: "column" }}
          >
            <TextField
              size="small"
              fullWidth
              id="name"
              name="name"
              label="Titulo de la ruta"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              size="small"
              id="path"
              name="path"
              label="Ruta"
              variant="outlined"
              value={formik.values.path}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.path && Boolean(formik.errors.path)}
              helperText={formik.touched.path && formik.errors.path}
            />
            <TextField
              fullWidth
              size="small"
              id="component"
              name="component"
              label="Componente"
              variant="outlined"
              value={formik.values.component}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.component && Boolean(formik.errors.component)
              }
              helperText={formik.touched.component && formik.errors.component}
            />
            <FormGroup>
              <InputLabel>¿La ruta es privada?</InputLabel>
              <RadioGroup
                id="authRequired"
                name="authRequired"
                value={formik.values.authRequired ? "true" : "false"}
                onChange={(e) => {
                  const booleanValue = e.target.value === "true";
                  formik.setFieldValue("authRequired", booleanValue);
                }}
              >
                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormGroup>
            <FormGroup>
              <InputLabel>Sistema</InputLabel>
              <RadioGroup
                id="system"
                name="system"
                value={formik.values.system} // Asume que formik.values.system es una cadena
                onChange={(e) => {
                  formik.setFieldValue("system", e.target.value); // Actualiza el valor de "system" en Formik
                }}
              >
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label="Administrador"
                />
                <FormControlLabel
                  value="Cichmex"
                  control={<Radio />}
                  label="Cichmex"
                />
                <FormControlLabel
                  value="Carwash"
                  control={<Radio />}
                  label="Carwash"
                />
              </RadioGroup>
            </FormGroup>

            <FormControl
              sx={{ m: 1, width: 300 }}
              error={
                formik.touched.rolesAllowed &&
                Boolean(formik.errors.rolesAllowed)
              }
            >
              <InputLabel id="roles-label">Roles Permitidos</InputLabel>
              <Select
                labelId="roles-label"
                id="roles-multiple-chip"
                multiple
                value={formik.values.rolesAllowed}
                onChange={(event) =>
                  formik.setFieldValue(
                    "rolesAllowed",
                    typeof event.target.value === "string"
                      ? event.target.value.split(",")
                      : event.target.value
                  )
                }
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Roles Permitidos"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {roles.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, formik.values.rolesAllowed, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.rolesAllowed && formik.errors.rolesAllowed ? (
                <FormHelperText>{formik.errors.rolesAllowed}</FormHelperText>
              ) : null}
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <ButtonGroup fullWidth>
          <Button type="submit" variant="contained" color="success">
            Crear
          </Button>
          <Button
            onClick={() => navigate("/auth/Productos", { replace: true })}
            variant="contained"
            color="warning"
          >
            Salir
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default AddDynamicRoute;
