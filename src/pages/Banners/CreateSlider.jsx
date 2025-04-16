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
import BreadcrumbCustom from '../../components/ui/BreadCrumbCustom';

const CreateSlider = () => {
    // Hook para cargar descuentos y obtener la lista de descuentos disponibles
    const { loadAllDiscounts, discounts } = useDiscounts();

    // Estado para almacenar el descuento seleccionado
    const [selectedDiscount, setSelectedDiscount] = useState({});

    // Hooks personalizados para crear banners, manejar el estado de carga y navegación
    const { createOneBanner, loading, navigate } = useUI();

    // Hook para obtener información del usuario autenticado
    const { user } = useAuthStore();

    // Estado para manejar el estado de arrastre de archivos
    const [isDragging, setIsDragging] = useState(false);

    // Estado para manejar errores específicos de archivos
    const [fileErrors, setFileErrors] = useState({});

    // Tipos de archivos permitidos para las imágenes
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    // Efecto para cargar los descuentos cuando el usuario está disponible
    useEffect(() => {
        if (user) {
            loadAllDiscounts();
        }
    }, [user]);

    // Función para validar el tamaño y dimensiones de las imágenes
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
                URL.revokeObjectURL(img.src); // Liberar memoria
                if (img.width >= width && img.height >= height) {
                    resolve(true);
                } else {
                    reject(`La imagen debe tener un tamaño mínimo de ${width} x ${height} px.`);
                }
            };

            img.onerror = () => {
                URL.revokeObjectURL(img.src); // Limpiar memoria en caso de error
                reject("Error al cargar la imagen.");
            };
        });
    }, []);

    // Función para manejar el cambio de imagen y validarla
    const onChangeImage = async (event, name) => {
        const file = event.target.files[0];
        if (!file) return;

        // Limpiar errores previos para este campo
        setFileErrors(prev => ({ ...prev, [name]: null }));

        // Validar tipo de archivo
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

            // Si pasa la validación, limpiar errores
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

    // Función para manejar eventos de arrastre de archivos
    const handleDragEvents = (event, isOver) => {
        event.preventDefault();
        setIsDragging(isOver);
    };

    // Función para manejar la acción de soltar archivos en el área de arrastre
    const handleDrop = (event, fieldName) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files.length) {
            onChangeImage({ target: { files: event.dataTransfer.files } }, fieldName);
        }
    };

    // Función para eliminar la imagen seleccionada
    const removeImage = (inputName) => {
        setValue(inputName, null);
    };

    // Estilos para el área de arrastre de archivos
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

    // Tipos de descuentos disponibles
    const DISCOUNT_TYPES = [
        { value: "free_shipping", label: "Envío gratis" },
        { value: "first_buy", label: "Primera compra" },
        { value: "for_creators", label: "Creadores" },
        { value: "is_amount", label: "Monto de descuento" },
        { value: "is_percent", label: "Porcentaje" },
    ];

    // Configuración del formulario con valores predeterminados
    const {
        formState: { errors },
        control,
        setValue,
        reset,
        handleSubmit,
    } = useForm({
        defaultValues: {
            is_active: false,
            no_slide: 0,
            discount: '',
            title: '',
            description: '',
            type_event: 'non-click',
            image_slide: '',
            image_slide_movil: '',
            for_discount: false
        },
    });

    // Función para manejar el envío del formulario
    const onSubmit = async (data) => {
        createOneBanner(data);
    };

    // Función para manejar el cambio de descuento seleccionado
    const onChangeDiscount = (data) => {
        const discount = data.target.value;
        if (discount) {
            const select = discounts.find((i) => i._id === discount);
            setSelectedDiscount(select);
            setValue('discount', discount);
            setValue('for_discount', true);
        }
        if (discount === '') {
            setSelectedDiscount({});
            setValue('discount', '');
            setValue('for_discount', false);
        }
    };

    // Función para renderizar los detalles del descuento seleccionado
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

    // Mostrar pantalla de carga si está en estado de carga
    if (loading) {
        return <LoadingScreenBlue />;
    }

    // Rutas para el breadcrumb de navegación
    const paths = [
        { path: `/contenidos/banners`, name: "Banners" },
        { path: `/contenidos/banners/agregar`, name: "Crear slide" },
    ];

    return (
        <Grid2 container paddingX={{ xs: 0, lg: 10 }} gap={2}>
            {/* Encabezado de la página */}
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
                    <strong>Crear slide</strong>
                </Typography>
            </Grid2>

            {/* Breadcrumb para navegación */}
            <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
                <BreadcrumbCustom paths={paths} />
            </Grid2>

            {/* Tarjeta principal del formulario */}
            <Card variant="elevation" sx={{ width: '100%' }}>
                <CardHeader title="Ingrese datos para crear slide" />
                <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid2 container gap={2}>
                        {/* Campo para seleccionar el estado del slide */}
                        <Grid2 size={4}>
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

                        {/* Campo para seleccionar el número del slide */}
                        <Grid2 size={4}>
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

                        {/* Campo para seleccionar una promoción asociada */}
                        <Grid2 size={3.7}>
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
                                                onChangeDiscount(e); // Actualiza el descuento seleccionado
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

                        {/* Renderizado de detalles de la promoción seleccionada */}
                        <Grid2 size={12}>
                            {renderSelected(selectedDiscount)}
                        </Grid2>

                        {/* Campo para ingresar el título del slide */}
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

                        {/* Campo para ingresar la descripción del slide */}
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

                        {/* Campo para seleccionar el tipo de evento del slide */}
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

                    {/* Campos para subir imágenes del slide */}
                    <Grid2 container width={'100%'}>
                        {/* Campo para subir imagen del slide para escritorio */}
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

                                            {/* Vista previa de la imagen seleccionada */}
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
                                                            src={URL.createObjectURL(field.value)}
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

                        {/* Campo para subir imagen del slide para móviles */}
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

                                            {/* Vista previa de la imagen seleccionada */}
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
                                                            src={URL.createObjectURL(field.value)}
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

                    {/* Botones de acción */}
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

export default CreateSlider;