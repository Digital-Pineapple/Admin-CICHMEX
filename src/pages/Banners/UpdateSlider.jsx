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
    // Obtiene el parámetro "id" de la URL
    const { id } = useParams();

    // Hook para cargar descuentos y obtener la lista de descuentos
    const { loadAllDiscounts, discounts } = useDiscounts();

    // Estado para almacenar el descuento seleccionado
    const [selectedDiscount, setSelectedDiscount] = useState({});

    // Hook para manejar la lógica de UI y datos relacionados con banners
    const { updateOneBanner, loading, navigate, loadOneBanner, banner } = useUI();

    // Estados para manejar el arrastre de archivos y errores de validación de archivos
    const [isDragging, setIsDragging] = useState(false);
    const [fileErrors, setFileErrors] = useState({});
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"]; // Tipos de archivos permitidos

    // Efecto para cargar descuentos y un banner específico al montar el componente
    useEffect(() => {
        if (id) {
            loadAllDiscounts(); // Carga todos los descuentos
            loadOneBanner(id); // Carga un banner específico por su ID
        }
    }, [id]);

    // Valida el tamaño y las dimensiones de una imagen
    const validateImageSize = useCallback((file, { width, height, maxSizeMB = 10 }) => {
        return new Promise((resolve, reject) => {
            const maxSizeBytes = maxSizeMB * 1024 * 1024; // Tamaño máximo en bytes
            if (file.size > maxSizeBytes) {
                reject(`El tamaño del archivo no debe exceder ${maxSizeMB} MB.`);
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(img.src); // Libera memoria
                if (img.width >= width && img.height >= height) {
                    resolve(true);
                } else {
                    reject(`La imagen debe tener un tamaño mínimo de ${width} x ${height} px.`);
                }
            };

            img.onerror = () => {
                URL.revokeObjectURL(img.src); // Libera memoria en caso de error
                reject("Error al cargar la imagen.");
            };
        });
    }, []);

    // Maneja el cambio de imagen y valida el archivo
    const onChangeImage = async (event, name) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileErrors(prev => ({ ...prev, [name]: null })); // Limpia errores previos

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

            setFileErrors(prev => ({ ...prev, [name]: null })); // Limpia errores si pasa la validación
            setValue(name, file);

        } catch (error) {
            setFileErrors(prev => ({
                ...prev,
                [name]: error
            }));
            setValue(name, null);
        }
    };

    // Maneja eventos de arrastre de archivos
    const handleDragEvents = (event, isOver) => {
        event.preventDefault();
        setIsDragging(isOver);
    };

    // Maneja el evento de soltar archivos en el área de arrastre
    const handleDrop = (event, fieldName) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files.length) {
            onChangeImage({ target: { files: event.dataTransfer.files } }, fieldName);
        }
    };

    // Elimina la imagen seleccionada
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

    // Obtiene los valores predeterminados para el formulario
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

    // Configuración del formulario con react-hook-form
    const {
        formState: { errors },
        control,
        setValue,
        reset,
        handleSubmit,
    } = useForm({ defaultValues: getDefaultValues() });

    // Efecto para actualizar el formulario cuando se carga un banner
    useEffect(() => {
        if (banner) {
            reset(getDefaultValues(banner)); // Resetea el formulario con los valores del banner
        }
        if (banner.discount) {
            setSelectedDiscount(banner.discount); // Establece el descuento seleccionado
        }
    }, [banner, reset]);

    // Maneja el envío del formulario
    const onSubmit = async (data) => {
        updateOneBanner(id, data); // Actualiza el banner con los datos del formulario
    };

    // Maneja el cambio de descuento seleccionado
    const onChangeDiscount = (data) => {
        const discount = data.target.value;
        if (discount) {
            const select = discounts.find((i) => i._id === discount);
            setSelectedDiscount(select); // Establece el descuento seleccionado
            setValue('discount', discount);
            setValue('for_discount', true);
        }
        if (discount === '') {
            setSelectedDiscount({});
            setValue('discount', '');
            setValue('for_discount', false);
        }
    };

    // Renderiza la información del descuento seleccionado
    const renderSelected = (data) => {
        // Si no hay datos o el objeto está vacío, no renderiza nada
        if (!data || Object.keys(data).length === 0) {
            return '';
        }

        // Desestructura los datos del descuento
        const { name, code, description, start_date, expiration_date, type_discount, min_cart_amount, max_cart_amount, maxUses, unlimited, is_active } = data;

        // Renderiza un contenedor con la información del descuento
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

    // Muestra una pantalla de carga mientras se están obteniendo los datos
    if (loading) {
        return <LoadingScreenBlue />
    }

    // Define las rutas para el componente de breadcrumb
    const paths = [
        { path: `/contenidos/banners`, name: "Banners" }, // Ruta para la lista de banners
        { path: `/contenidos/banners/editar/:id`, name: "Editar slide" }, // Ruta para editar un banner específico
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
                    <strong>Editar slide</strong>
                </Typography>
            </Grid2>

            {/* Breadcrumb para navegación */}
            <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
                <BreadcrumbCustom paths={paths} />
            </Grid2>

            {/* Contenedor principal del formulario */}
            <Card variant="elevation" sx={{ width: '100%' }}>
                <CardHeader title="Ingrese datos para crear slide" />
                <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid2 container gap={2}>
                        {/* Selector de estado del slide */}
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

                        {/* Selector del número de slide */}
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

                        {/* Selector de descuento asociado */}
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
                                                onChangeDiscount(e); // Lógica para manejar el cambio de descuento
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

                        {/* Información del descuento seleccionado */}
                        <Grid2 size={12}>
                            {renderSelected(selectedDiscount)} {/* Renderiza en tiempo real */}
                        </Grid2>

                        {/* Campo para el título del slide */}
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

                        {/* Campo para la descripción del slide */}
                        <Grid2 size={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Descripción(Opcional)"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        error={!!errors.description}
                                        helperText={errors?.description?.message}
                                    />
                                )}
                            />
                        </Grid2>

                        {/* Selector del tipo de evento */}
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

                    {/* Contenedor para las imágenes del slide */}
                    <Grid2 container width={'100%'}>
                        {/* Imagen para dispositivos de escritorio */}
                        <Grid2 size={6}>
                            <Controller
                                name='image_slide'
                                control={control}
                                rules={{ required: 'Campo requerido' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.image_slide}>
                                        <Typography textAlign={'center'} variant="body1" color={!!errors.image_slide ? 'error' : 'primary'}>Imagen slide</Typography>
                                        <Grid2 container sx={{ width: "100%", margin: "auto", display: 'flex', justifyContent: 'center' }}>
                                            {/* Área de arrastre y selección de archivo */}
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
                                                        {/* Botón para eliminar la imagen */}
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
                                            {/* Mensaje de error si la imagen no es válida */}
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

                        {/* Imagen para dispositivos móviles */}
                        <Grid2 size={6}>
                            <Controller
                                control={control}
                                name='image_slide_movil'
                                rules={{ required: 'Campo requerido' }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.image_slide_movil}>
                                        <Typography textAlign={'center'} variant="body1" color={!!errors.image_slide_movil ? 'error' : 'primary'}>Imagen slide móviles</Typography>
                                        <Grid2 container sx={{ width: "100%", margin: "auto", display: 'flex', justifyContent: 'center' }}>
                                            {/* Área de arrastre y selección de archivo */}
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
                                                        {/* Botón para eliminar la imagen */}
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
                                            {/* Mensaje de error si la imagen no es válida */}
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

export default UpdateSlider;