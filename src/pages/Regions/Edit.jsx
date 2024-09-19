import { Grid, Typography, Card, CardContent, CardActions, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import RegionSelector from './RegionSelector';
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRegions } from "../../hooks/useRegions";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const { updateRegion, loadOneRegion, region,navigate  } = useRegions();
    const [coordinates, setCoordinates] = useState([]);
    
    // Load region data when component mounts
    useEffect(() => {
        loadOneRegion(id);
    }, [id]);

    // Update coordinates when region data changes
    useEffect(() => {
        if (region && region.coordinates) {
            setCoordinates(region.coordinates);
        }
    }, [region]);

    // Update formik fields when coordinates change
    useEffect(() => {
        if (coordinates.length > 0) {
            formik.setFieldValue('type', coordinates[0]?.type);
            formik.setFieldValue('path', coordinates[0]?.path);
        }
    }, [coordinates]);

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es obligatorio"),
        regionCode: Yup.string().required("El campo es obligatorio"),
        type: Yup.string().required("El campo es obligatorio"),
        path: Yup.array().min(1, 'Debe seleccionar al menos una región').required('El campo es obligatorio'),
    });

    const formik = useFormik({
        initialValues: {
            name: region.name || "",
            regionCode: region.regionCode || "",
            type: region.type || "",
            path: region.path || ""
        },
        validationSchema,
        enableReinitialize: true, // Reinitialize form when region changes
        onSubmit: (values) => {
            updateRegion(id,values)
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
                   Editar región
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Card variant="outlined" sx={{width:'100%'}}>
                    <CardContent sx={{ display: 'flex', gap: 2 }}>
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

                    <RegionSelector
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        zoom={13}
                    />

                    <CardActions sx={{justifyContent:'center'}} >
                        <Button variant="contained" color="error" fullWidth onClick={()=>navigate('/region/regiones', {replace:true})} >
                           Cancelar
                        </Button>
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
