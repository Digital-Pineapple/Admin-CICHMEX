// Importaciones necesarias de Material UI y hooks personalizados
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProductOrder } from '../../../hooks/useProductOrder';
import { useAuthStore } from '../../../hooks';
import { AppBar, Button, Grid2, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import ReadyToSend from '../ReadyToSend';
import { useTheme } from '@mui/material/styles';
import { localDate } from '../../../Utils/ConvertIsoDate';
import LoadingScreenBlue from '../../../components/ui/LoadingScreenBlue';
import { useMediaQuery } from '@mui/system';

// Componente para renderizar el contenido de cada pestaña
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: '100%' }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Función para agregar propiedades de accesibilidad a las pestañas
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Función para transformar los datos de órdenes de productos
const rowsPO = (PO) =>
  PO?.map((item, index) => ({
    id: index,
    date: localDate(item.createdAt), // Convierte la fecha de creación a formato local
    supply_date: localDate(item.supply_detail?.date), // Convierte la fecha de suministro a formato local
    ...item,
  }));

// Filtra las órdenes de productos en diferentes categorías
const filteredPOPaid = (data) => {
  const rowsAllPO = rowsPO(data); // Todas las órdenes
  const assignedUser = rowsPO(data.filter((i) => i.route_detail?.user)); // Órdenes asignadas a usuarios
  const assignedCompany = rowsPO(data.filter((i) => i.route_detail?.guide)); // Órdenes asignadas a paquetería
  const NoAssigned = rowsPO(data.filter((i) => !i.route_detail)); // Órdenes no asignadas
  return { assignedUser, assignedCompany, NoAssigned, rowsAllPO };
};

// Componente principal
const MainToSend = () => {
  const { user } = useAuthStore(); // Obtiene el usuario autenticado
  const theme = useTheme(); // Obtiene el tema actual
  const { loadProductOrdersPaidAndFill, productOrders, loading } = useProductOrder(); // Hook para manejar órdenes de productos
  const [value, setValue] = useState(0); // Estado para manejar la pestaña activa

  // Memoriza las órdenes filtradas
  const rowsFiltered = useMemo(() => filteredPOPaid(productOrders), [productOrders]);

  // Callback para cargar las órdenes de productos
  const CallBackAllPO = useCallback(() => {
    loadProductOrdersPaidAndFill();
  }, [user]);

  // Maneja el cambio de pestañas
  const handleChange = (event, newValue) => setValue(newValue);

  // Carga las órdenes de productos al montar el componente
  useEffect(() => {
    CallBackAllPO();
  }, [CallBackAllPO]);

  const isXs = useMediaQuery('(max-width:600px)'); // Detecta si la pantalla es pequeña

  // Obtiene los datos de la pestaña actual
  const getCurrentTabData = () => {
    if (value === 0) return rowsFiltered.rowsAllPO; // Todas las órdenes
    if (value === 1) return rowsFiltered.NoAssigned; // Órdenes no asignadas
    if (value === 2) return rowsFiltered.assignedCompany; // Órdenes asignadas a paquetería
    if (value === 3) return rowsFiltered.assignedUser; // Órdenes asignadas a usuarios
    return [];
  };

  // Muestra una pantalla de carga si los datos están cargando
  if (loading) return <LoadingScreenBlue />;

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>
      {/* Encabezado */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "16px", lg: "30px" } }}>
          <strong>Asignar envío</strong>
        </Typography>
      </Grid2>

      {/* Barra de pestañas */}
      <AppBar position="static" sx={{ borderRadius: "10px", bgcolor: '#fff', color: '#000', fontWeight: 'Bold' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant={isXs ? "scrollable" : "fullWidth"} // Cambia el diseño según el tamaño de la pantalla
          aria-label="full width tabs example"
        >
          <Tab label="Todos" />
          <Tab label="Pedidos por asignar" />
          <Tab label="Asignados a paquetería" />
          <Tab label="Asignados a usuario" />
        </Tabs>
      </AppBar>

      {/* Paneles de contenido para cada pestaña */}
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ReadyToSend rows={getCurrentTabData()} type={0} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ReadyToSend rows={getCurrentTabData()} type={1} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <ReadyToSend rows={getCurrentTabData()} type={2} />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <ReadyToSend rows={getCurrentTabData()} type={3} />
      </TabPanel>
    </Grid2>
  );
};

export default MainToSend;
