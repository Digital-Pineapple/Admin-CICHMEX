import {
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Grid2,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  SendSharp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../hooks";
import Image from "mui-image";
import logo from "../assets/Images/logotipo.png";
import LogoCHMX from "../assets/Images/CHMX/Imagotipo CHMX Blanco.png";
import { orange, teal } from "@mui/material/colors";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

/**
 * Componente Login - Página de autenticación de usuarios
 * @returns {JSX.Element} Componente de inicio de sesión
 */
export const Login = () => {
  // Obtener la clave del sitio para reCAPTCHA desde las variables de entorno
  const captchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Configuración del formulario con react-hook-form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Obtener la función de inicio de sesión del store de autenticación
  const { StartLogin } = useAuthStore();

  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);
  
  // Estado para almacenar el token de reCAPTCHA
  const [captcha, setCaptcha] = useState(null);

  /**
   * Alterna la visibilidad de la contraseña
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  /**
   * Previene el comportamiento por defecto del evento
   * @param {Event} event - Evento del mouse
   */
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /**
   * Maneja el cambio en el reCAPTCHA
   * @param {string} value - Token generado por reCAPTCHA
   */
  const handleCaptchaChange = (value) => {
    setCaptcha(value);
  };

  /**
   * Maneja el envío del formulario
   * @param {Object} data - Datos del formulario (email y password)
   */
  const onSubmit = (data) => {
    // Validar que el reCAPTCHA esté completado
    if (!captcha) {
      Swal.fire({
        title: "Por favor, verifica que no eres un robot.",
        confirmButtonColor: "red",
        icon: "error",
        iconColor: "red",
      });
      return;
    }
    // Llamar a la función de inicio de sesión con los datos del formulario y el token de reCAPTCHA
    StartLogin(data.email, data.password, captcha);
  };

  return (
    <>
      {/* Contenedor principal con fondo oscuro */}
      <Grid2
        bgcolor={"#0D0318"}
        container
        minHeight={"100vh"}
        justifyContent={"center"}
        padding={{ xs: 2, sm: 4 }}
        display={"flex"}
        alignContent={"space-evenly"}
      >
        {/* Sección superior con logos y título */}
        <Grid2
          maxHeight={"250px"}
          padding={2}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          container
          width={'100%'}
        >
          {/* Título "Administrador" */}
          <Grid2 size={12}>
            <Typography
              variant="h1"
              fontWeight={"Bold"}
              textAlign={"center"}
              fontSize={{ xs: "35px", md: "45px", xl: "50px" }}
              color="#fff"
            >
              Administrador
            </Typography>
          </Grid2>
          
          {/* Logo principal */}
          <Grid2 size={{ xs: 6, lg:4 }}>
            <Image
              src={logo}
              fit="contain"
              duration={1000}
              style={{
                position: "static",
                minWidth: "150px",
                maxWidth: "300px",
              }}
            />
          </Grid2>
          
          {/* Logo CHMX */}
          <Grid2 size={{ xs: 6, lg:4 }}>
            <Image
              src={LogoCHMX}
              fit="contain"
              duration={1000}
              style={{
                position: "static",
                minWidth: "150px",
                maxWidth: "300px",
              }}
            />
          </Grid2>
        </Grid2>

        {/* Formulario de inicio de sesión */}
        <Grid2
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          borderRadius={"20px"}
          border={"4px solid"}
          borderColor={teal[900]}
          sx={{ backgroundColor: "white" }}
          container
          maxWidth={{ sm: "70%", md: "60%", lg: "40%" }}
          maxHeight={{ xs: "400px" }}
          padding={{ xs: 1, md: 4 }}
        >
          {/* Título del formulario */}
          <Grid2 size={12}>
            <Typography
              fontSize={{ xs: 25, sm: 30, md: 35, lg: 34}}
              textAlign={"center"}
              color={orange[900]}
            >
              Inicio de Sesión
            </Typography>
          </Grid2>

          {/* Campo de email */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Valor requerido" },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Correo inválido",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                fullWidth
                label="Correo"
                sx={{ marginY: 2 }}
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
              />
            )}
          />

          {/* Campo de contraseña */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Valor requerido" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                variant="outlined"
                label="Contraseña"
                helperText={
                  fieldState.error ? <b>{fieldState.error.message}</b> : ""
                }
                error={fieldState.invalid}
                inputProps={{ ...field }}
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          
          {/* reCAPTCHA */}
          <Grid2 display={"flex"} justifyContent={"center"} mt={1} size={12}>
            <ReCAPTCHA
              sitekey={captchaSiteKey}
              onChange={handleCaptchaChange}
            />
          </Grid2>
          
          {/* Botón de submit */}
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={!captcha}
            endIcon={<SendSharp />}
            sx={{ maxHeight: "50px", bgcolor: orange[900], marginY: 2 }}
          >
            Iniciar sesión
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};