import {
    Grid2,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
    TextField,
    IconButton,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDiscounts } from '../../hooks/useDiscounts';
import { useAuthStore, useUI } from '../../hooks';
import { localDate } from '../../Utils/ConvertIsoDate';
import { grey, orange } from '@mui/material/colors';
import { Box, height, width } from '@mui/system';
import { Delete, UploadFileRounded } from '@mui/icons-material';
import LoadingScreenBlue from '../../components/ui/LoadingScreenBlue';
import { useParams } from 'react-router-dom';
import BreadcrumbCustom from '../../components/ui/BreadCrumbCustom';

const UpdateSlider = () => {
    const { id } = useParams()
    const { loadAllDiscounts, discounts } = useDiscounts();
    const [selectedDiscount, setSelectedDiscount] = useState({})
    const { updateOneBanner, loading, navigate, loadOneBanner, banner } = useUI()

    const [isDragging, setIsDragging] = useState(false);
    const [fileErrors, setFileErrors] = useState({});
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    useEffect(() => {
        if (id) {
            loadAllDiscounts();
            loadOneBanner(id)
        }
    }, [id]);  

    const validateImageSize = useCallback((file, { width, height, maxSizeMB = 10 }) => {
        return new Promise((resolve, reject) => {
            // Validar tamaño del archivo primero (10 MB)
            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            if (file.size > maxSizeBytes) {
                reject(`El tamaño del archivo no debe exceder ${maxSizeMB} MB.`);
                return;
            }

            // Validar dimensiones de la imagen
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(img.src); // Importante para liberar memoria
                if (img.width >= width && img.height >= height) {
                    resolve(true);
                } else {
                    reject(`La imagen debe tener un tamaño mínimo de ${width} x ${height} px.`);
                }
            };

            img.onerror = () => {
                URL.revokeObjectURL(img.src); // Limpiar incluso en errores
                reject("Error al cargar la imagen.");
            };
        });
    }, []);

    const onChangeImage = async (event, name) => {
        const file = event.target.files[0];
        if (!file) return;

        // Limpiamos errores previos para este campo
        setFileErrors(prev => ({ ...prev, [name]: null }));

        if (!allowedTypes.includes(file.type)) {
            setFileErrors(prev => ({
                ...prev,
                [name]: "Tipo de archivo no permitido. Usa JPEG, PNG o WEBP."
            }));
            setValue(name, null);
            return;
        }

        const VALUES_VALIDATE = {
            image_slide: { width: 1920, height: 1080 },
            image_slide_movil: { width: 1000, height: 300 }
        };

        try {
            if (!VALUES_VALIDATE[name]) {
                throw new Error("Validación de tamaño no definida para este campo.");
            }

            await validateImageSize(file, VALUES_VALIDATE[name]);

            // Si pasa la validación, limpiamos errores
            setFileErrors(prev => ({ ...prev, [name]: null }));
            setValue(name, file);

        } catch (error) {
            setFileErrors(prev => ({
                ...prev,
                [name]: error
            }));
            setValue(name, null);
        }
    };

    const handleDragEvents = (event, isOver) => {
        event.preventDefault();
        setIsDragging(isOver);
    };

    const handleDrop = (event, fieldName) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files.length) {
            onChangeImage({ target: { files: event.dataTransfer.files } }, fieldName);
        }
    };

    const removeImage = (inputName) => {
        setValue(inputName, null);
    };

    const dropZoneStyles = {
        position: "relative",
        backgroundColor: isDragging ? "secondary.main" : orange[200],
        width: "100%",
        minHeight: "150px",
        padding: "30px 70px",
        borderRadius: "20px",
        border: "2px dashed #E0730D",
        textAlign: "center",
        transition: "background-color 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: orange[400],
            border: "2px dashed #FA8E00",
        },
    };


    const DISCOUNT_TYPES = [
        { value: "free_shipping", label: "Envío gratis" },
        { value: "first_buy", label: "Primera compra" },
        { value: "for_creators", label: "Creadores" },
        { value: "is_amount", label: "Monto de descuento" },
        { value: "is_percent", label: "Porcentaje" },
    ];

    const getDefaultValues = (data) => {
        if (!data) {
            return {
                is_active: false,
                no_slide: 0,
                discount: "",
                title: "",
                description: "",
                type_event: 'non-click',
                image_slide: "",
                image_slide_movil: "",
                for_discount: false,
            };
        }
        
        return { 
            is_active: data.is_active || false,
            no_slide: data.no_slide || 0,
            discount: data.discount?._id || "",
            title: data.title || "",
            description: data.description || "",
            type_event: data.type_event || 'non-click',
            image_slide: data.image_slide || "",
            image_slide_movil: data.image_slide_movil || "",
            for_discount: data.for_discount || false,
        };
    };


    const {
        formState: { errors },
        control,
        setValue,
        reset,
        handleSubmit,
    } = useForm ( {defaultValues: getDefaultValues()})

    useEffect(() => {
        if (banner) {
          reset(getDefaultValues(banner));

        }
        if (banner.discount) {
            setSelectedDiscount(banner.discount)
        }
      }, [banner, reset]);


    const onSubmit = async (data) => {
        updateOneBanner(id, data)
    };

    const onChangeDiscount = (data) => {
        const discount = data.target.value;
        if (discount) {
            const select = discounts.find((i) => i._id === discount)
            setSelectedDiscount(select)
            setValue('discount', discount)
            setValue('for_discount', true)
        }
        if (discount === '') {
            setSelectedDiscount({})
            setValue('discount', '')
            setValue('for_discount', false)
        }

    }

    const renderSelected = (data) => {

        if (!data || Object.keys(data).length === 0) {
            return '';
        }

        const { name, code, description, start_date, expiration_date, type_discount, min_cart_amount, max_cart_amount, maxUses, unlimited, is_active } = data;
        return (
            <Grid2 size={12} sx={{ backgroundColor: grey[200], padding: 2, borderRadius: '15px' }} >
                <Typography textAlign="center" variant="h6" component="h2">
                    <strong>Nombre:</strong> {name}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    <strong>Descripción:</strong> {description} <br />
                    <strong>{`Tipo de descuento: ${DISCOUNT_TYPES.find((item) => item.value === type_discount)?.label || "Desconocido"
                        }`}</strong>
                    <br />
                    <strong>Código:</strong> {code} <br />
                    <strong>Fecha de inicio:</strong> {localDate(start_date)} <br />
                    <strong>Fecha de expiración:</strong> {localDate(expiration_date)} <br />
                    <strong>Monto mínimo de compra:</strong> ${min_cart_amount} <br />
                    <strong>Monto máximo de compra:</strong> ${max_cart_amount} <br />
                    <strong>Usos:</strong> {unlimited ? "Ilimitado" : maxUses} <br />
                    <strong>Estado:</strong> {is_active ? "Activo" : "Desactivado"} <br />
                </Typography>
            </Grid2>
        );
    };

    if (loading) {
        return <LoadingScreenBlue />
    }

    const paths = [
        { path: `/contenidos/banners`, name: "Banners" },
        { path: `/contenidos/banners/editar/:id`, name: "Editar slide" },
    ];

    return (
        <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={2}>
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
                    <strong>Editar slide</strong>
                </Typography>
            </Grid2>
            <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
                <BreadcrumbCustom paths={paths} />

            </Grid2>
            <Card variant="elevation" sx={{ width: '100%' }}>
                <CardHeader title="Ingrese datos para crear slide" />
                <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid2 container gap={2}>
                        <Grid2 size={3}>
                            <Controller
                                name="is_active"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.is_active}>
                                        <InputLabel id="select-status-label">Estado</InputLabel>
                                        <Select {...field} labelId="select-status" label="Estado">
                                            <MenuItem value={true}>Activo</MenuItem>
                                            <MenuItem value={false}>Desactivo</MenuItem>
                                        </Select>
                                        {errors.is_active && (
                                            <FormHelperText>{errors.is_active.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <Controller
                                name="no_slide"
                                control={control}
                                rules={{ required: 'Campo requerido' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.no_slide}>
                                        <InputLabel id="select-no-slide-label">No. slide</InputLabel>
                                        <Select {...field} labelId="select-no-slide" label="No. slide">
                                            {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                                                <MenuItem key={value} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.no_slide && (
                                            <FormHelperText>{errors.no_slide.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <Controller
                                name="discount"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.discount}>
                                        <InputLabel id="select-discount-label">Exclusivo de una promoción</InputLabel>
                                        <Select
                                            {...field}
                                            labelId="select-discount-label"
                                            label="Exclusivo de una promoción"
                                            onChange={(e) => {
                                                onChangeDiscount(e); // Primero ejecutas tu lógica
                                            }}
                                        >
                                            <MenuItem value={''}>No</MenuItem>
                                            {discounts.map((item) => (
                                                <MenuItem
                                                    key={item._id}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.discount && (
                                            <FormHelperText>{errors.discount.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            {renderSelected(selectedDiscount)} {/* Renderiza en tiempo real */}
                        </Grid2>
                        <Grid2 size={12}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Título(Opcional)"
                                        fullWidth
                                        error={!!errors.title}
                                        helperText={errors?.title?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Desctipción(Opcional)"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        error={!!errors.description}
                                        helperText={errors?.description?.message}
                                    />
                                )}
                            />
                        </Grid2>
                        <Grid2 size={3}>
                            <Controller
                                name="type_event"
                                control={control}
                                rules={{ required: 'Campo requerido' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.type_event}>
                                        <InputLabel id="select-status-label">Tipo de evento</InputLabel>
                                        <Select {...field} labelId="select-type-event" label="Tipo de evento">
                                            <MenuItem value={'non-click'}>Sin click</MenuItem>
                                            <MenuItem value={'with-click'}>Con click</MenuItem>
                                        </Select>
                                        {errors.type_event && (
                                            <FormHelperText>{errors.type_event.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container width={'100%'}>
                        <Grid2 size={6}>
                            <Controller
                                name='image_slide'
                                control={control}
                                rules={{ required: 'Campo requerido' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.image_slide}>
                                        <Typography textAlign={'center'} variant="body1" color={!!errors.image_slide ? 'error' : 'primary'}>Imagen slide</Typography>
                                        <Grid2 container sx={{ width: "100%", margin: "auto", display: 'flex', justifyContent: 'center' }}>
                                            <Grid2
                                                container
                                                direction="column"
                                                alignItems="center"
                                                component="label"
                                                htmlFor={`imageInput-${field.name}`}
                                                sx={{ cursor: "pointer" }}
                                                onDragOver={(e) => handleDragEvents(e, true)}
                                                onDragLeave={(e) => handleDragEvents(e, false)}
                                                onDrop={(e) => handleDrop(e, field.name)}
                                                display={field.value ? "none" : "block"}
                                                tabIndex="0"
                                            >
                                                <Box sx={dropZoneStyles}>
                                                    <Typography variant="body2">
                                                        <UploadFileRounded /> <strong>Seleccionar o arrastrar archivos aquí</strong>
                                                        <br />
                                                        {' Sube tu imagen en JPEG, PNG o WEBP, mínimo 50px de tamaño y hasta 10MB.'}
                                                    </Typography>
                                                    <input
                                                        id={`imageInput-${field.name}`}
                                                        type="file"
                                                        ref={field.ref}
                                                        onChange={(e) => onChangeImage(e, field.name)}
                                                        style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, image/webp"
                                                    />
                                                </Box>
                                            </Grid2>

                                            {field.value && (
                                                <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
                                                    <Box
                                                        sx={{
                                                            position: "relative",
                                                            border: "1px solid #ccc",
                                                            borderRadius: "4px",
                                                            overflow: "hidden",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                field.value
                                                                  ? typeof field.value === 'string'
                                                                    ? field.value.startsWith('https')
                                                                      ? field.value
                                                                      : URL.createObjectURL(field.value)
                                                                    : URL.createObjectURL(field.value)
                                                                  : undefined
                                                              }
                                                              
                                                              
                                                            alt="Preview"
                                                            style={{
                                                                width: "100%",
                                                                height: "400px",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                position: "absolute",
                                                                top: 5,
                                                                right: 5,
                                                                color: "red",
                                                                backgroundColor: "white",
                                                                boxShadow: 1,
                                                            }}
                                                            onClick={() => removeImage(field.name)}
                                                        >
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Grid2>
                                            )}
                                            {fileErrors[field.name] && (
                                                <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                                                    {fileErrors[field.name]}
                                                </FormHelperText>
                                            )}
                                        </Grid2>
                                        {errors.image_slide && (
                                            <FormHelperText>{errors.image_slide.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Grid2>

                        <Grid2 size={6}>
                            <Controller
                                control={control}
                                name='image_slide_movil'
                                rules={{ required: 'Campo requerido' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.image_slide_movil}>
                                        <Typography textAlign={'center'} variant="body1" color={!!errors.image_slide_movil ? 'error' : 'primary'}>Imagen slide móviles</Typography>
                                        <Grid2 container sx={{ width: "100%", margin: "auto", display: 'flex', justifyContent: 'center' }}>
                                            <Grid2
                                                container
                                                direction="column"
                                                alignItems="center"
                                                component="label"
                                                htmlFor={`imageInput-${field.name}`}
                                                sx={{ cursor: "pointer" }}
                                                onDragOver={(e) => handleDragEvents(e, true)}
                                                onDragLeave={(e) => handleDragEvents(e, false)}
                                                onDrop={(e) => handleDrop(e, field.name)}
                                                display={field.value ? "none" : "block"}
                                                tabIndex="0"
                                            >
                                                <Box sx={dropZoneStyles}>
                                                    <Typography variant="body2">
                                                        <UploadFileRounded /> <strong>Seleccionar o arrastrar archivos aquí</strong>
                                                        <br />
                                                        {' Sube tu imagen en JPEG, PNG o WEBP, mínimo 50px de tamaño y hasta 10MB.'}
                                                    </Typography>
                                                    <input
                                                        id={`imageInput-${field.name}`}
                                                        type="file"
                                                        ref={field.ref}
                                                        onChange={(e) => onChangeImage(e, field.name)}
                                                        style={{ display: "none" }}
                                                        accept="image/png, image/jpeg, image/webp"
                                                    />
                                                </Box>
                                            </Grid2>

                                            {field.value && (
                                                <Grid2 container justifyContent="center" sx={{ mt: 2, maxHeight: '400px' }} >
                                                    <Box
                                                        sx={{
                                                            position: "relative",
                                                            border: "1px solid #ccc",
                                                            borderRadius: "4px",
                                                            overflow: "hidden",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                field.value
                                                                  ? typeof field.value === 'string'
                                                                    ? field.value.startsWith('https')
                                                                      ? field.value
                                                                      : URL.createObjectURL(field.value)
                                                                    : URL.createObjectURL(field.value)
                                                                  : undefined
                                                              }
                                                              
                                                            alt="Preview"
                                                            style={{
                                                                width: "100%",
                                                                height: "400px",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                position: "absolute",
                                                                top: 5,
                                                                right: 5,
                                                                color: "red",
                                                                backgroundColor: "white",
                                                                boxShadow: 1,
                                                            }}
                                                            onClick={() => removeImage(field.name)}
                                                        >
                                                            <Delete fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </Grid2>
                                            )}
                                            {fileErrors[field.name] && (
                                                <FormHelperText error sx={{ textAlign: "center", mt: 1 }}>
                                                    {fileErrors[field.name]}
                                                </FormHelperText>
                                            )}
                                        </Grid2>
                                        {errors.image_slide_movil && (
                                            <FormHelperText>{errors.image_slide_movil.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />

                        </Grid2>
                    </Grid2>
                    <CardActions>
                        <Button fullWidth variant="contained" color="error" size="small" onClick={() => navigate('/contenidos/banners')}>
                            Cancelar
                        </Button>
                        <Button fullWidth variant="contained" color="success" size="small" type="submit">
                            Guardar
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Grid2>
    );
};

export default UpdateSlider;