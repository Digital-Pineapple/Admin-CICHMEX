import { useState, useEffect } from "react";
import { getRemainingTimeUntilMsTimestamp } from "../../Utils";
import { Box, Paper, Typography, Grid, BottomNavigation, Button } from "@mui/material";
import { RegisterButton } from "../Buttons/RegisterButton";
import { LoginButton } from "../Buttons/LoginButton";
import styled from "@emotion/styled";

// Valor por defecto para el tiempo restante
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

// Componente principal del temporizador de cuenta regresiva
export const CountdownTimer = ({ countdownTimestampMs }) => {
  // Estado para almacenar el tiempo restante
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // Efecto para actualizar el tiempo restante cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId); // Limpieza del intervalo al desmontar el componente
  }, [countdownTimestampMs]);

  // Función para calcular y actualizar el tiempo restante
  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <>
      {/* Contenedor principal del temporizador */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'flex' },
          flexWrap: "wrap",
          position: 'absolute',
          width: '50%',
          height: '60%',
          justifyContent: { xs: 'center', sm: 'left' },
          top: { xs: '2%', sm: '10%', md: '20%' },
          ml: { xs: `calc(20%)`, sm: `calc(4%)`, md: `calc(20%)`, lg: `calc(30%)`, xl: `calc(35%)` },
        }}
      >
        {/* Contenedor de los bloques de tiempo */}
        <Box
          sx={{
            mt: { xs: '110px' },
            display: { xs: 'block', sm: 'flex' },
            flexWrap: 'nowrap',
            justifyContent: 'center',
            "& > :not(style)": {
              width: 100,
              height: 130,
            }
          }}
        >
          {/* Bloque para los días */}
          <Grid position={'static'} ml={{ xs: 3, md: -10 }}>
            <Paper
              sx={{
                minHeight: { xs: '120px', sm: '130px', md: '180px' },
                minWidth: { xs: '120px', sm: '130px', md: '180px' },
                opacity: 0.5,
                padding: "2px",
                position: "absolute",
              }}
              elevation={24}
            ></Paper>
            <Typography
              paddingLeft={{ xs: '25px', md: '35px' }}
              paddingTop={{ xs: '2' }}
              position={"absolute"}
              color="black"
              fontSize={{ xs: 50, md: 80 }}
            >
              {remainingTime.days} {/* Días restantes */}
            </Typography>
            <Typography
              paddingLeft={{ xs: 4, md: '50px' }}
              paddingTop={{ xs: '60px', md: '100px' }}
              position={"absolute"}
              fontSize={{ xs: 30, md: 40 }}
            >
              Días
            </Typography>
          </Grid>

          {/* Bloque para las horas */}
          <Grid position={'relative'} ml={{ xs: 3, sm: 5, md: 12 }}>
            <Paper
              sx={{
                minHeight: { xs: '120px', sm: '130px', md: '180px' },
                minWidth: { xs: '120px', sm: '130px', md: '180px' },
                opacity: 0.5,
                padding: "2px",
                position: "absolute",
              }}
              elevation={24}
            ></Paper>
            <Typography
              paddingLeft={{ xs: '25px', md: '47px' }}
              paddingTop={{ xs: '2' }}
              position={"absolute"}
              color="black"
              fontSize={{ xs: 50, md: 80 }}
            >
              {remainingTime.hours} {/* Horas restantes */}
            </Typography>
            <Typography
              paddingLeft={{ xs: '18px', md: '42px' }}
              paddingTop={{ xs: '60px', md: '100px' }}
              position={"absolute"}
              fontSize={{ xs: 30, md: 40 }}
            >
              Horas
            </Typography>
          </Grid>

          {/* Bloque para los minutos */}
          <Grid position={'relative'} ml={{ xs: 3, sm: 5, md: 12 }}>
            <Paper
              sx={{
                minHeight: { xs: '120px', sm: '130px', md: '180px' },
                minWidth: { xs: '120px', sm: '130px', md: '180px' },
                opacity: 0.5,
                padding: "2px",
                position: "absolute",
              }}
              elevation={24}
            ></Paper>
            <Typography
              paddingLeft={{ xs: '25px', md: '47px' }}
              paddingTop={{ xs: '2' }}
              position={"absolute"}
              color="black"
              fontSize={{ xs: 50, md: 80 }}
            >
              {remainingTime.minutes} {/* Minutos restantes */}
            </Typography>
            <Typography
              paddingLeft={{ xs: '9px', md: '22px' }}
              paddingTop={{ xs: '60px', md: '100px' }}
              position={"absolute"}
              fontSize={{ xs: 30, md: 40 }}
            >
              Minutos
            </Typography>
          </Grid>

          {/* Bloque para los segundos */}
          <Grid position={'relative'} ml={{ xs: 3, sm: 5, md: 12 }}>
            <Paper
              sx={{
                minHeight: { xs: '120px', sm: '130px', md: '180px' },
                minWidth: { xs: '120px', sm: '130px', md: '180px' },
                opacity: 0.5,
                padding: "2px",
                position: "absolute",
              }}
              elevation={24}
            ></Paper>
            <Typography
              paddingLeft={{ xs: '25px', md: '47px' }}
              paddingTop={{ xs: '2' }}
              position={"absolute"}
              color="black"
              fontSize={{ xs: 50, md: 80 }}
            >
              {remainingTime.seconds} {/* Segundos restantes */}
            </Typography>
            <Typography
              paddingLeft={{ xs: '0px', md: '10px' }}
              paddingTop={{ xs: '60px', md: '100px' }}
              position={"absolute"}
              fontSize={{ xs: 30, md: 40 }}
            >
              Segundos
            </Typography>
          </Grid>

          {/* Botón de registro */}
          <Grid
            width={'100%'}
            mt={{ xs: `calc(2%)`, sm: `calc(50%)`, md: `calc(70%)` }}
            ml={{ xs: '-30px', sm: '-350px', md: '-400px' }}
            container spacing={1}
          >
            <RegisterButton /> {/* Botón para registrar */}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
