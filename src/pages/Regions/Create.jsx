import { Grid, Typography, Card, CardContent, CardActions, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import RegionSelector from './RegionSelector';
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRegions } from "../../hooks/useRegions";

const Create = () => {
  const [coordinates, setCoordinates] = useState([]);
  const {addNewRegion} = useRegions()
  useEffect(() => {
    if (coordinates) {
        formik.setFieldValue('type', coordinates[0]?.type);
        formik.setFieldValue('path', coordinates[0]?.path);
    }
  }, [coordinates]);

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    regionCode: Yup.string().required("El campo es obligatorio"),
    type:Yup.string().required("El campo es obligatorio"),
    path: Yup.array().min(1, 'Debe seleccionar al menos una región').required('El campo es obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      regionCode: "",
      type: [], // Asegúrate de que "type" coincida con el tipo esperado (array en este caso)
    },
    validationSchema,
    onSubmit: (values) => {
      addNewRegion(values)
    },
  });

  return (
    <Grid
      component="form"
      onSubmit={formik.handleSubmit}
      display={"flex"}
      container
      gap={2}
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
          Registrar nueva región
        </Typography>
      </Grid>

      <Grid item>
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', gap: 2 }}>
            <TextField
              id="name"
              label="Nombre de la región"
              variant="outlined"
              color="primary"
              margin="none"
              sizes="small"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              id="regionCode"
              label="Código de la región"
              variant="outlined"
              color="primary"
              margin="none"
              sizes="small"
              value={formik.values.regionCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.regionCode && Boolean(formik.errors.regionCode)}
              helperText={formik.touched.regionCode && formik.errors.regionCode}
            />
          </CardContent>
          
          <RegionSelector
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            zoom={10}
          />

          <CardActions>
            <Button variant="text" color="primary" size="small" type="submit">
              Guardar
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Create;
