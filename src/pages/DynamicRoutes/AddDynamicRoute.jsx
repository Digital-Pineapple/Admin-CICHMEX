import { useFormik } from "formik";
import {
  Grid2,
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
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

// Configuración de las propiedades del menú desplegable
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

// Función para aplicar estilos a los roles seleccionados
function getStyles(name, rolesAllowed, theme) {
  return {
    fontWeight:
      rolesAllowed.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// Esquema de validación para el formulario usando Yup
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  path: Yup.string().required("La ruta es obligatoria"),
  component: Yup.string().required("El componente es obligatorio"),
  rolesAllowed: Yup.array()
    .min(1, "Debes seleccionar al menos un rol permitido")
    .required("Los roles permitidos son obligatorios"),
});

const AddDynamicRoute = () => {
  const theme = useTheme(); // Hook para acceder al tema de Material-UI
  const { navigate, loading } = useAuthStore(); // Hook personalizado para autenticación
  const { addRoute } = useDynamicRoutes(); // Hook personalizado para manejar rutas dinámicas

  // Configuración del formulario con Formik
  const formik = useFormik({
    initialValues: {
      name: "", // Título de la ruta
      path: "", // Ruta del componente
      component: "", // Nombre del componente
      rolesAllowed: [], // Roles permitidos
      authRequired: "", // Indica si la ruta requiere autenticación
      redirectTo: "", // Redirección en caso de no autenticación
      system: "", // Sistema al que pertenece la ruta
    },
    validationSchema, // Esquema de validación
    onSubmit: (values) => {
      addRoute(values); // Llama a la función para agregar una nueva ruta
    },
  });

  // Lista de roles disponibles
  const roles = [
    "SUPER-ADMIN",
    "ADMIN",
    "SUB-ADMIN",
    "CARRIER-DRIVER",
    "SELLER",
    "WAREHOUSE-MANAGER",
    "WAREHOUSEMAN"

  ];

  // Muestra una pantalla de carga si el estado de carga está activo
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/url`, name: "Todas mis url's" },
    { path: `/url/agregar`, name: "Crear url" },
  ];

  return (
    <Grid2
      component="form"
      onSubmit={formik.handleSubmit} // Maneja el envío del formulario
      display="flex"
      container
      gap={2}
      paddingX={{ xs: 0, md: 10 }}
    >
      {/* Encabezado del formulario */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4">
          <strong>Crear url</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb para navegación */}
      <Grid2
        size={12}
        display={"flex"}
        margin={2}
        justifyContent={"space-between"}
      >
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Contenedor principal del formulario */}
      <Grid2
        container
        sx={{
          borderRadius: "20px",
          bgcolor: "#fff",
          padding: { xs: 4 },
          display: "flex",
          gap: 2,
        }}
      >
        {/* Campo para el título de la ruta */}
        <Grid2 size={{ xs: 12, lg: 4 }}>
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

          {/* Campo para la ruta */}
          <TextField
            fullWidth
            size="small"
            id="path"
            name="path"
            label="Ruta"
            variant="outlined"
            value={formik.values.path}
            onChange={formik.handleChange}
            sx={{ marginY: 2 }}
            onBlur={formik.handleBlur}
            error={formik.touched.path && Boolean(formik.errors.path)}
            helperText={formik.touched.path && formik.errors.path}
          />

          {/* Campo para el componente */}
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
            error={formik.touched.component && Boolean(formik.errors.component)}
            helperText={formik.touched.component && formik.errors.component}
          />
        </Grid2>

        {/* Selección de si la ruta es privada */}
        <Grid2
          size={{ xs: 12, lg: 4 }}
          display={"flex"}
          justifyContent={"center"}
        >
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
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormGroup>
        </Grid2>

        {/* Selección del sistema */}
        <Grid2
          size={{ xs: 12, md: 3.6 }}
          display={"flex"}
          justifyContent={"center"}
        >
          <FormGroup>
            <InputLabel>Sistema</InputLabel>
            <RadioGroup
              id="system"
              name="system"
              value={formik.values.system}
              onChange={(e) => {
                formik.setFieldValue("system", e.target.value);
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
        </Grid2>

        {/* Selección de roles permitidos */}
        <Grid2 size={12}>
          <FormControl
            sx={{ m: 1, width: 300 }}
            error={
              formik.touched.rolesAllowed && Boolean(formik.errors.rolesAllowed)
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
        </Grid2>
      </Grid2>

      {/* Botones de acción */}
      <Grid2 size={12} display={"flex"} gap={2} justifyContent={"center"}>
        <Button
          onClick={() => navigate("/url", { replace: true })} // Navega a la lista de URLs
          variant="contained"
          color="warning"
          fullWidth
        >
          Salir
        </Button>
        <Button fullWidth type="submit" variant="contained" color="success">
          Crear
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AddDynamicRoute;
