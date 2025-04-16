import Stack from "@mui/material/Stack";
import { Typography, IconButton, Grid } from "@mui/material";
import { FacebookOutlined, Instagram, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const FooterParthners = () => {
  return (
    <>
      <Grid
        // Contenedor principal que organiza los elementos en una fila
        container
        spacing={0}
        direction="row"
        justify="flex-start"
        alignItems={'center'}
        alignContent='center'
        wrap="nowrap"
        bgcolor={'#89C2FF'} // Color de fondo del footer
        sx={{ opacity: '0.9', justifyContent: 'space-evenly' }} // Estilos adicionales
        position={'relative'}
      >
        <Stack
          // Sección de avisos legales
          paddingX={{ xs: 0, sm: 10, md: 11, lg: 22, xl: 20 }} // Espaciado horizontal
          direction={{ xs: "column", sm: "column" }} // Dirección de los elementos
          alignItems={'center'} // Alineación centrada
        >
          <Typography variant="h5" align="center">
            Avisos
          </Typography>
          <Link
            // Enlace para el aviso de privacidad
            component="button"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Aviso de privacidad
          </Link>

          <Link
            // Enlace para el aviso de cookies
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Aviso de cookies
          </Link>
        </Stack>
        <Stack
          // Sección de redes sociales
          spacing={{ sm: 2, md: 2 }} // Espaciado entre los elementos
          direction={{ xs: "column", sm: 'row' }} // Dirección de los elementos
          display={'inline-block'}
          justifyContent={'center'} // Alineación centrada
        >
          <Typography variant="h5" align="center">
            ¡Siguenos en redes Sociales!
          </Typography>

          <IconButton
            // Botón para Facebook
            color="primary"
            aria-label="Facebook"
          >
            <FacebookOutlined sx={{ fontSize: 50 }} />
          </IconButton>

          <IconButton
            // Botón para Instagram
            color="primary"
            aria-label="Instagram"
          >
            <Instagram sx={{ fontSize: 50 }} />
          </IconButton>

          <IconButton
            // Botón para YouTube
            color="primary"
            aria-label="YouTube"
          >
            <YouTube sx={{ fontSize: 50 }} />
          </IconButton>
        </Stack>
      </Grid>
    </>
  );
};
