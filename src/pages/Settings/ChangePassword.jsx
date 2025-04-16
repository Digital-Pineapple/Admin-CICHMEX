import { Visibility } from "@mui/icons-material"
import { Grid2, IconButton, InputAdornment, TextField, Typography, Button, CircularProgress, Grid } from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import PasswordCriteria from "../../components/inputs/PasswordCriteria"
import { useAuthStore } from "../../hooks"

// Componente para cambiar la contraseña
const ChangePassword = ({ handleClose }) => {

    // Estado para manejar los tipos de entrada (texto o contraseña)
    const [inputTypes, setInputTypes] = useState({
        oldPassword: 'password',
        newPassword: 'password'
    });

    // Hook personalizado para manejar el estado de autenticación
    const { loading, changePassword } = useAuthStore()

    // Hook de react-hook-form para manejar el formulario
    const { control, formState: { errors }, handleSubmit, watch } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        }
    })

    // Función para alternar entre mostrar y ocultar las contraseñas
    const handleChangeType = (inputName) => {
        setInputTypes((prevTypes) => ({
            ...prevTypes,
            [inputName]: prevTypes[inputName] === 'password' ? 'text' : 'password'
        }));
    };

    // Función que se ejecuta al enviar el formulario
    const onSubmit = async (data) => {
        changePassword(data, handleClose)
    }

    // Observa el valor del campo "newPassword" para validaciones adicionales
    const passwordValue = watch('newPassword');

    // Muestra un indicador de carga si el estado "loading" está activo
    if (loading) {
        return (
            <Grid2 width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <CircularProgress color="primary" />
            </Grid2>
        )
    }

    return (
        // Contenedor principal del formulario
        <Grid2 container component={'form'} onSubmit={handleSubmit(onSubmit)}>
            {/* Título del formulario */}
            <Grid2
                size={12}
                minHeight={"100px"}
                className="Titles"
            >
                <Typography
                    textAlign={"center"}
                    variant="h1"
                    fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
                >
                    Cambiar contraseña
                </Typography>
            </Grid2>

            {/* Campos del formulario */}
            <Grid2 display={'flex'} justifyContent={'center'} padding={2} width={'100%'} gap={2} flexDirection={'column'}  >
                {/* Campo para la contraseña antigua */}
                <Controller
                    name='oldPassword'
                    control={control}
                    rules={{
                        required: "La contraseña es obligatoria",
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Antigua contraseña'
                            fullWidth
                            type={inputTypes.oldPassword}
                            error={!!errors.oldPassword}
                            helperText={errors.oldPassword && errors.oldPassword.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handleChangeType(field.name)}>
                                                <Visibility />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    )}
                />

                {/* Campo para la nueva contraseña */}
                <Controller
                    name='newPassword'
                    control={control}
                    rules={{
                        required: "La contraseña es obligatoria",
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                        },
                        pattern: {
                            // Validación para asegurar que la contraseña cumpla con ciertos criterios
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
                            message: "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial"
                        }
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label='Nueva contraseña'
                            fullWidth
                            type={inputTypes.newPassword}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword && errors.newPassword.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handleChangeType(field.name)}>
                                                <Visibility />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    )}
                />

                {/* Componente para mostrar los criterios de la contraseña */}
                <PasswordCriteria password={passwordValue} />
            </Grid2>

            {/* Botones de acción */}
            <Grid2 display={'flex'} gap={2} size={12} >
                <Button fullWidth variant="contained" onClick={() => handleClose()} color="error">
                    Cancelar
                </Button>
                <Button fullWidth variant="contained" type="submit" color="success">
                    Guardar
                </Button>
            </Grid2>

        </Grid2>
    )
}

export default ChangePassword
