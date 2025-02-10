import { Visibility } from "@mui/icons-material"
import { Grid2, IconButton, InputAdornment, TextField, Typography, Button, CircularProgress, Grid } from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import PasswordCriteria from "../../components/inputs/PasswordCriteria"
import { useAuthStore } from "../../hooks"


const ChangePassword = ({ handleClose }) => {

    const [inputTypes, setInputTypes] = useState({
        oldPassword: 'password',
        newPassword: 'password'
    });
    const { loading, changePassword } = useAuthStore()
    const { control, formState: { errors }, handleSubmit, watch } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
        }
    })
    const handleChangeType = (inputName) => {
        setInputTypes((prevTypes) => ({
            ...prevTypes,
            [inputName]: prevTypes[inputName] === 'password' ? 'text' : 'password'
        }));
    };
    const onSubmit = async (data) => {
        changePassword(data, handleClose)
    }

    const passwordValue = watch('newPassword');
    if (loading) {
        return (
            <Grid2 width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <CircularProgress color="primary" />
            </Grid2>
        )
    }

    return (
        <Grid2 container component={'form'} onSubmit={handleSubmit(onSubmit)}>
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
            <Grid2 display={'flex'} justifyContent={'center'} padding={2} width={'100%'} gap={2} flexDirection={'column'}  >
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
                                            <IconButton on onClick={() => handleChangeType(field.name)}>
                                                <Visibility />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    )}
                />

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
                            // Este patrón requiere al menos una minúscula, una mayúscula y un caracter especial.
                            // Puedes ajustar la expresión regular según tus necesidades.
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
                                            <IconButton on onClick={() => handleChangeType(field.name)}>
                                                <Visibility />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    )}
                />
                <PasswordCriteria password={passwordValue} />
            </Grid2>

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
