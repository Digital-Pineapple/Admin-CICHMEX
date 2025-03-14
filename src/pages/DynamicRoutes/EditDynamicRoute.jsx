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
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import { useDynamicRoutes } from "../../hooks/useDynamicRoutes";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

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
  const { id } = useParams();
  const {
    loadOneDynamicRoute,
    dynamicRoute,
    loading,
    navigate,
    loadEditDynamicRoute,
  } = useDynamicRoutes();

  const formik = useFormik({
    initialValues: {
      name: "",
      path: "",
      component: "",
      rolesAllowed: [],
      authRequired: false,
      redirectTo: "",
      system: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loadEditDynamicRoute(id, values);
    },
  });

  useEffect(() => {
    const fetchDynamicRoute = async () => {
      await loadOneDynamicRoute(id);
    };
    fetchDynamicRoute();
  }, [id]);

  useEffect(() => {
    if (dynamicRoute) {
      formik.setValues({
        name: dynamicRoute?.name || "",
        path: dynamicRoute?.path || "",
        component: dynamicRoute?.component || "",
        rolesAllowed: dynamicRoute?.rolesAllowed || [],
        authRequired: dynamicRoute?.authRequired || false,
        redirectTo: dynamicRoute?.redirectTo || "",
        system: dynamicRoute?.system || "",
      });
    }
  }, [dynamicRoute]);

  const roles = [
    "SUPER-ADMIN",
    "ADMIN",
    "SUB-ADMIN",
    "CARRIER-DRIVER",
    "SELLER",
    "WAREHOUSE-MANAGER",
    "WAREHOUSEMAN",
  ];

  if (loading) {
    return <LoadingScreenBlue />;
  }

  const paths = [
    { path: `/url`, name: "Todas mis url's" },
    { path: `/url/editar`, name: "Editar url" },
  ];

  return (
    <Grid2
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      container
      gap={2}
      paddingX={{ xs: 0, md: 10 }}
    >
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
          <strong>Editar url</strong>
        </Typography>
      </Grid2>
      <Grid2
        size={12}
        display={"flex"}
        margin={2}
        justifyContent={"space-between"}
      >
        <BreadcrumbCustom paths={paths} />
      </Grid2>

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
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <TextField
            size="small"
            fullWidth
            id="name"
            name="name"
            label="Titulo de la ruta"
            variant="outlined"
            value={formik.values?.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            size="small"
            id="path"
            sx={{ marginY: 2 }}
            name="path"
            label="Ruta"
            variant="outlined"
            value={formik.values?.path}
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
            value={formik.values?.component}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.component && Boolean(formik.errors.component)}
            helperText={formik.touched.component && formik.errors.component}
          />
        </Grid2>
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
              value={formik.values?.authRequired ? "true" : "false"}
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
              value={formik.values?.system}
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
        <Grid2 size={12}>
          <FormControl
            sx={{ m: 1 }}
            error={
              formik.touched.rolesAllowed && Boolean(formik.errors.rolesAllowed)
            }
          >
            <InputLabel id="roles-label">Roles Permitidos</InputLabel>
            <Select
              labelId="roles-label"
              id="roles-multiple-chip"
              multiple
              value={formik.values?.rolesAllowed}
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
              {roles?.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, formik?.values?.rolesAllowed, theme)}
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

      <Grid2 size={12} display={"flex"} gap={2}>
        <Button
          onClick={() => navigate("/url", { replace: true })}
          variant="contained"
          color="warning"
          fullWidth
        >
          Salir
        </Button>

        <Button fullWidth type="submit" variant="contained" color="success">
          Guardar cambios
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default AddDynamicRoute;
