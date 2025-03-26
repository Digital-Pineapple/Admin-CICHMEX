import {
  Button,
  Typography,
  Box,
  OutlinedInput,
  InputLabel,
  IconButton,
  InputAdornment,
  FormControl,
  Grid2,
  Divider,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  BlockSharp,
  SendSharp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../hooks";
import Image from "mui-image";
import logo from "../assets/Images/logotipo.png";
import LogoCHMX from "../assets/Images/CHMX/Imagotipo CHMX Blanco.png";
import { blue, orange, teal } from "@mui/material/colors";
import { ErrorMessage } from "@hookform/error-message";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

export const Login = () => {
  const captchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const { register, control, formState, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { StartLogin } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const [captcha, setCaptcha] = useState(null); // Estado para almacenar el valor del captcha
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCaptchaChange = (value) => {
    setCaptcha(value); // Captura el valor del reCAPTCHA
  };

  const onSubmit = (data) => {
    if (!captcha) {
      Swal.fire({
        title: "Por favor, verifica que no eres un robot.",
        confirmButtonColor: "red",
        icon: "error",
        iconColor: "red",
      });
      return;
    }
    // Inicia sesión pasando el token de reCAPTCHA
    StartLogin(data.email, data.password, captcha); // Pasa el token de reCAPTCHA a tu función de login
  };

  return (
    <>
      <Grid2
        bgcolor={"#0D0318"}
        container
        minHeight={"100vh"}
        justifyContent={"center"}
        padding={{ xs: 2, sm: 4 }}
        display={"flex"}
        alignContent={"space-evenly"}
      >
        <Grid2
          maxHeight={"250px"}
          padding={2}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
          container
          width={'100%'}
        >
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
          <Grid2 size={12}>
            <Typography
              fontSize={{ xs: 25, sm: 30, md: 35, lg: 34}}
              textAlign={"center"}
              color={orange[900]}
            >
              Inicio de Sesión
            </Typography>
          </Grid2>

          {/* CORREO */}
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

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Valor requerido" },
              // pattern: {
              //   value:
              //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              //   message:
              //     "Debe contener: Letra mayuscula, minúscula, un numero, carácter especial, min 8 caracteres",
              // },
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
          <Grid2 display={"flex"} justifyContent={"center"} mt={1} size={12}>
            <ReCAPTCHA
              sitekey={captchaSiteKey}
              onChange={handleCaptchaChange}
            />
          </Grid2>
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
