import Typography from "@mui/material/Typography";
import { Grid2 } from "@mui/material";
import React from "react";
import SalesTransfer from "./SalesTransfer";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

export default function VerifySales() {
  // Definimos las rutas para el componente BreadcrumbCustom
  const paths = [
    { path: `/contaduria/verificar-ventas`, name: "Verificar ventas" },
  ];

  return (
    // Contenedor principal con diseño de cuadrícula y espaciado
    <Grid2 container paddingX={10} display={"flex"} gap={2}>
      {/* Sección del encabezado con título */}
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        {/* Título principal de la página */}
        <Typography variant="h4">
          <strong>Verificar ventas</strong>
        </Typography>
      </Grid2>

      {/* Componente de navegación Breadcrumb */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Componente que gestiona la transferencia de ventas */}
      <SalesTransfer />
    </Grid2>
  );
}
