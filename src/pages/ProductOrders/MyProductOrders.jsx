import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import PaidProductOrders from "./PaidProductOrders";
import CompletedOrders from "../MyStoreHouse/CompletedOrders";
import { Grid2 } from "@mui/material";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

// Componente para renderizar el contenido de cada pestaña
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      style={{ width: "100%" }}
      hidden={value !== index} // Oculta el contenido si no es la pestaña activa
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>} {/* Muestra el contenido si es la pestaña activa */}
    </div>
  );
}

// Componente principal que contiene las pestañas y su contenido
export default function FullWidthTabs() {
  const theme = useTheme(); // Obtiene el tema actual de Material-UI
  const [value, setValue] = useState(0); // Estado para controlar la pestaña activa

  // Maneja el cambio de pestaña
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Rutas para el componente de breadcrumb
  const paths = [{ path: `/almacenista/mis-ventas`, name: "Pedidos" }];

  return (
    <Grid2 container paddingX={{ xs: 0, lg: 10 }} display={"flex"} gap={2}>
      {/* Encabezado con el título de la página */}
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
          <strong>Pedidos</strong>
        </Typography>
      </Grid2>

      {/* Componente de breadcrumb para mostrar la navegación */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Barra de pestañas */}
      <AppBar
        position="static"
        sx={{ borderRadius: "10px", bgcolor: "#fff", color: "#000", fontWeight: "Bold" }}
      >
        <Tabs
          value={value} // Pestaña activa
          onChange={handleChange} // Cambia la pestaña activa
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          {/* Pestaña 1: Pedidos pendientes */}
          <Tab
            label="Pedidos pendientes por surtir"
            sx={{ fontWeight: "Bold", fontSize: { xs: "8px", md: "14px" } }}
          />
          {/* Pestaña 2: Pedidos completados */}
          <Tab
            label="Pedidos ya surtidos"
            sx={{ fontWeight: "Bold", fontSize: { xs: "8px", md: "14px" } }}
          />
        </Tabs>
      </AppBar>

      {/* Contenido de la pestaña 1 */}
      <TabPanel value={value} index={0} dir={theme.direction}>
        <PaidProductOrders /> {/* Componente para mostrar pedidos pendientes */}
      </TabPanel>

      {/* Contenido de la pestaña 2 */}
      <TabPanel value={value} index={1} dir={theme.direction}>
        <CompletedOrders /> {/* Componente para mostrar pedidos completados */}
      </TabPanel>
    </Grid2>
  );
}
