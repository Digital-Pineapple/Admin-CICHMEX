import React, { useEffect } from "react";
import { Typography, Grid, Chip, IconButton, Tooltip, Button } from "@mui/material";
import { useBranches } from "../../hooks/useBranches";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Check, Clear, InfoOutlined } from "@mui/icons-material";
import DeleteAlert from "../../components/ui/DeleteAlert";

export const Branches = () => {
  // Hook personalizado para cargar sucursales y manejar navegación
  const { loadBranches, navigate, rowsBranches, deleteOneBranch } = useBranches();

  // Efecto para cargar las sucursales al montar el componente
  useEffect(() => {
    loadBranches();
  }, []);

  return (
    <Grid container>
      {/* Título principal de la página */}
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
        maxWidth={'85vw'}
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Puntos de entrega
        </Typography>
      </Grid>

      {/* Tabla de datos de sucursales */}
      <Grid item mt={2} xs={12}>
        {rowsBranches ? (
          <DataGrid
            // Estilos personalizados para la tabla
            sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
            // Definición de columnas de la tabla
            columns={[
              {
                field: "name",
                hideable: false,
                headerName: "Nombre",
                flex: 2,
                sortable: false, // Desactiva la opción de ordenar
              },
              {
                field: "description",
                hideable: false,
                headerName: "Descripción",
                flex: 2,
                sortable: false,
              },
              {
                field: "activated",
                hideable: false,
                headerName: "Activo",
                flex: 2,
                // Renderiza un Chip que indica si la sucursal está activa o no
                renderCell: (params) =>
                  params.value === false ? (
                    <Chip
                      icon={<Clear />}
                      label="No activo"
                      variant="filled"
                      color="warning"
                    />
                  ) : (
                    <Chip
                      icon={<Check />}
                      label="Activo"
                      variant="filled"
                      color="success"
                    />
                  ),
              },
              {
                field: "Opciones",
                headerName: "Opciones",
                align: "center",
                flex: 1,
                sortable: false,
                type: "actions",
                // Renderiza botones de acción dependiendo del estado de la sucursal
                renderCell: (params) =>
                  params.row.activated === false ? (
                    <>
                      {/* Alerta de confirmación para eliminar una sucursal */}
                      <DeleteAlert
                        title={`¿Deseas eliminar : ${params.row.name}?`}
                        callbackToDeleteItem={() => deleteOneBranch(params.row._id)}
                      />
                      {/* Botón para activar una sucursal */}
                      <Tooltip title="Activar punto de entrega">
                        <Button
                          aria-label="Activar"
                          onClick={() =>
                            navigate(`/auth/Puntos-de-entrega/${params.row?._id}`)
                          }
                          color="success"
                        >
                          Activar
                        </Button>
                      </Tooltip>
                    </>
                  ) : (
                    // Botón para ver información de la sucursal
                    <Tooltip title="Información de la punto de entrega">
                      <Button
                        aria-label="Información"
                        onClick={() => navigate(`/auth/Puntos-de-entrega/${params.row?._id}`)}
                        color="info"
                      >
                        Información
                      </Button>
                    </Tooltip>
                  ),
              },
            ]}
            // Filas de datos para la tabla
            rows={rowsBranches}
            // Configuración de la barra de herramientas
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            // Opciones de impresión
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
            }}
          />
        ) : (
          // Muestra un esqueleto de carga mientras se obtienen los datos
          <Skeleton title="Cargando..." variant="rectangular" />
        )}
      </Grid>
    </Grid>
  );
};
