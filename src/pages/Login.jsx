import {
  Button,
  Typography,
  Box,
  OutlinedInput,
  InputLabel,
  IconButton,
  InputAdornment,
  FormControl,
  Grid,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  BlockSharp,
  SendSharp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useAuth, useAuthStore } from "../hooks";
import Image from "mui-image";
import logo from "../assets/Images/logotipo.png";
import LogoCHMX from "../assets/Images/CHMX/Imagotipo CHMX Blanco.png"
import { blue, orange } from "@mui/material/colors";
import { ErrorMessage } from "@hookform/error-message";

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  
  const {login} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
        <Grid
          bgcolor={'#0D0318'}
          container
          minHeight={"100vh"}
          justifyContent={'center'}
          padding={{xs:2, sm:4}}
          display={'flex'}

        >
          <Grid maxHeight={'250px'} padding={2} boxSizing={'border-box'} display={'flex'} justifyContent={'center'} item container xs={12}>
            <Grid item xs={12}>
            <Typography variant="h1" fontWeight={'Bold'} textAlign={'center'} fontSize={{xs:'40px', md:'45px', xl:'50px'}}color="#fff">Administrador</Typography>
            </Grid>
          <Grid  item xs={6}xl={4}>  
          <Image
              src={logo}
              fit="contain"
              duration={1000}
              style={{
                position: "static",
                minWidth: "150px",
                maxWidth:'300px'
              }}
            />
          </Grid>
          <Grid item xs={6} xl={4}>
            <Image
              src={LogoCHMX}
              fit="contain"
              duration={1000}
              style={{
                position: "static",
                minWidth: "150px",
                maxWidth:'300px'
              }}
            />
          </Grid>
          </Grid>
          <Grid
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(login)}
            borderRadius={'20px'}
            border={'4px solid'}
            borderColor={blue[900]}
            sx={{ backgroundColor: "white" }}
            container
            maxWidth={{sm:'70%', md:'60%', lg:'50%'}}
            maxHeight={{xs:'400px'}}
            padding={{xs:1}}
          >
            <Grid item xs={12} >
            <Typography
              fontSize={{ xs: 25, sm: 30, md: 35, lg: 34, xl: 40 }}
              textAlign={'center'}
              color={orange[900]}
            >
              Inicio de Sesión
            </Typography>
            </Grid>
              
            {/* CORREO */}
            <FormControl  fullWidth required variant="outlined">
              <InputLabel>Correo</InputLabel>
              <OutlinedInput
                {...register("email", {
                  required: true,
                  pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ },
                })}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                label="Correo"
              />
               <ErrorMessage errors={errors.root?.message} name="email" />

            </FormControl>

            {/* CONTRASEÑA */}
            <FormControl
              fullWidth
              required
              variant="outlined"
            >
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                {...register("password", {
                  required: {
                    value:true,
                    message:'Campo requerido'
                  },
                  minLength:{
                    value:8,
                    message:'Min 8 caracteres'
                  }
                  // pattern: {
                  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                  // },
                })}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                
              />
            </FormControl>
            <Divider variant="middle" />
            {/* ACTIVACION DE BOTON */}
            <Grid marginTop={2} container sx={{ justifyContent: "center" }}>
              {!password || !email ? (
                <Button
                  variant="outlined"
                  disabled
                  endIcon={<BlockSharp />}
                  style={{ borderRadius: "20px" }}
                  size="large"
                >
                  Iniciar sesión
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  type="submit"
                  endIcon={<SendSharp />}
                  style={{ borderRadius: "20px" }}
                >
                  Iniciar sesión
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
 
    </>
  );
};