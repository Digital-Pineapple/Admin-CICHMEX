// Importación de componentes y módulos necesarios de Material-UI y otros archivos
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Button } from '@mui/material';
import ServicesCard from '../cards/ServicesCard';
import { useState, useRef, useEffect } from 'react';
import { AutoAwesomeMosaicTwoTone, HomeWorkOutlined, RemoveCircleOutline } from '@mui/icons-material';
import { useServiceAdd } from '../../providers/ServicesProvider';
import ListCheck from '../ui/ListCheck';
import ModalAdd from '../ui/ModalAdd';
import ActiveCarCard from '../cards/ActiveCarCard';

// Componente principal que representa la navegación personalizada con botones
const CustomButtonNavigation = ({ available, myServices, id, services_id }) => {
  // Estado para manejar el valor seleccionado en la navegación
  const [value, setValue] = useState(0);

  // Referencia para manejar el contenedor principal
  const ref = useRef(null);

  return (
    <Box ref={ref}>
      {/* Renderizado condicional basado en el valor seleccionado en la navegación */}
      {value === 0 ? (
        <>
          {/* Sección "Mis servicios" */}
          <Typography variant="h3" textAlign="center" color="primary">
            Mis servicios
          </Typography>
          <Grid sx={{ backgroundColor: 'ButtonHighlight' }} width={'100%'} container columns={18}>
            {/* Mapeo de los servicios del usuario */}
            {myServices
              ? myServices.map((item) => {
                  return (
                    <>
                      <ActiveCarCard
                        item={item}
                        key={item?._id}
                        services_id={item?._id}
                        info={available}
                      />
                    </>
                  );
                })
              : 'Sin servicios disponibles'}
          </Grid>
        </>
      ) : value === 1 ? (
        <>
          {/* Sección "Servicios disponibles" */}
          <Grid container columns={20}>
            {/* Mapeo de los servicios disponibles */}
            {available
              ? available.map((item) => {
                  return (
                    <ServicesCard item={item} key={item?._id} services_id={services_id} />
                  );
                })
              : 'Sin servicios disponibles'}
          </Grid>
          <Typography variant="h4" color="inherit">
            Servicios a agregar
          </Typography>
          {/* Modal para agregar servicios */}
          <ModalAdd setValue={setValue} myServices={myServices} id={id} />
        </>
      ) : value === 2 ? (
        <>
          {/* Sección "Eliminar servicios" */}
          <Grid container columns={20}>
            {/* Mapeo de los servicios del usuario */}
            {myServices
              ? myServices.map((item) => {
                  return (
                    <ServicesCard
                      item={item}
                      key={item._id}
                      services_id={item?._id}
                      // setNew={setNewValues}
                    />
                  );
                })
              : 'Sin servicios disponibles'}
          </Grid>
        </>
      ) : null}

      {/* Barra de navegación inferior */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {/* Botones de navegación */}
          <BottomNavigationAction label="Mis servicios" icon={<AutoAwesomeMosaicTwoTone />} />
          <BottomNavigationAction label="Servicios disponibles" icon={<HomeWorkOutlined />} />
          <BottomNavigationAction label="Eliminar servicios" icon={<RemoveCircleOutline />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

// Exportación del componente
export default CustomButtonNavigation;
