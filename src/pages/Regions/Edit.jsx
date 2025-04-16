import { Grid, Typography, Card, CardContent, CardActions, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import RegionSelector from './RegionSelector';
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRegions } from "../../hooks/useRegions";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams(); // Obtiene el parámetro `id` de la URL
    const { updateRegion, loadOneRegion, region, navigate } = useRegions(); // Hooks personalizados para manejar regiones
    const [coordinates, setCoordinates] = useState([]); // Estado para almacenar las coordenadas seleccionadas
    
    // Carga los datos de la región cuando el componente se monta
    useEffect(() => {
        loadOneRegion(id);
    }, [id]);

    // Actualiza las coordenadas cuando cambian los datos de la región
    useEffect(() => {
        if (region && region.coordinates) {
            setCoordinates(region.coordinates);
        }
    }, [region]);

    // Actualiza los campos de Formik cuando cambian las coordenadas
    useEffect(() => {
        if (coordinates.length > 0) {
            formik.setFieldValue('type', coordinates[0]?.type);
            formik.setFieldValue('path', coordinates[0]?.path);
        }
    }, [coordinates]);

    // Esquema de validación para los campos del formulario
    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        regionCode: Yup.string().required("El campo es obligatorio"),
        type: Yup.string().required("El campo es obligatorio"),
        path: Yup.array().min(1, 'Debe seleccionar al menos una región').required('El campo es obligatorio'),
    });

    // Configuración de Formik para manejar el formulario
    const formik = useFormik({
        initialValues: {
            name: region.name || "", // Nombre de la región
            regionCode: region.regionCode || "", // Código de la región
            type: region.type || "", // Tipo de región
            path: region.path || "" // Ruta o coordenadas de la región
        },
        validationSchema, // Esquema de validación
        enableReinitialize: true, // Permite reinicializar el formulario cuando cambian los datos de la región
        onSubmit: (values) => {
            updateRegion(id, values); // Llama a la función para actualizar la región
        },
    });

    return (
        <Grid
            component="form"
            onSubmit={formik.handleSubmit} // Maneja el envío del formulario
            display={"flex"}
            container
            gap={2}
        >
            {/* Título de la página */}
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
                   Editar región
                </Typography>
            </Grid>

            {/* Contenedor del formulario */}
            <Grid item xs={12}>
                <Card variant="outlined" sx={{width:'100%'}}>
                    <CardContent sx={{ display: 'flex', gap: 2 }}>
                        {/* Campo para el nombre de la región */}
                        <TextField
                            id="name"
                            fullWidth
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
                        {/* Campo para el código de la región */}
                        <TextField
                            id="regionCode"
                            fullWidth
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

                    {/* Componente para seleccionar las coordenadas de la región */}
                    <RegionSelector
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        zoom={13}
                    />

                    {/* Botones de acción */}
                    <CardActions sx={{justifyContent:'center'}} >
                        {/* Botón para cancelar y volver a la lista de regiones */}
                        <Button variant="contained" color="error" fullWidth onClick={()=>navigate('/region/regiones', {replace:true})} >
                           Cancelar
                        </Button>
                        {/* Botón para guardar los cambios */}
                        <Button variant="contained" color="success" fullWidth type="submit">
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Edit;
