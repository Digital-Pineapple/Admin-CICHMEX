import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Fab, Grid2, Skeleton, Typography } from "@mui/material";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useAuthStore } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import { Add, Delete, Edit } from "@mui/icons-material";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import EditButton from "../../components/Buttons/EditButton";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

const CarrierDrivers = () => {
  // Hooks personalizados para manejar datos de usuarios y autenticación
  const {
    rowsCarrierDrivers, // Lista de transportistas
    deleteOneCD, // Función para eliminar un transportista
    loadCarrierDrivers, // Función para cargar transportistas
    navigate, // Función para navegar entre rutas
    loading, // Estado de carga
  } = useUsers();
  const { user } = useAuthStore(); // Información del usuario autenticado

  // useEffect para cargar los transportistas al montar el componente
  useEffect(() => {
    loadCarrierDrivers();
  }, [user]);

  // Función para eliminar un transportista
  const Delete = (value) => {
    deleteOneCD(value);
  };

  // Mostrar pantalla de carga mientras se obtienen los datos
  if (loading) {
    return <LoadingScreenBlue />;
  }

  // Definición de rutas para el componente de breadcrumb
  const paths = [
    { path: `/usuarios/transportistas`, name: "Transportistas" },
  ];

  return (
    <Grid2 container paddingX={10}>
      {/* Título de la página */}
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
          <strong>Transportistas</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para agregar transportista */}
      <Grid2 size={12} display={"flex"} margin={2} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />

        {/* Botón flotante para agregar un nuevo transportista */}
        <Fab
          onClick={() =>
            navigate("/usuarios/agregar-transportista", { replace: true })
          }
          color="secondary"
          aria-label="Alta de transportista"
          title="Alta de transportista"
        >
          <Add />
        </Fab>
      </Grid2>

      {/* Tabla de transportistas */}
      <Grid2 size={12}>
        {rowsCarrierDrivers ? (
          <DataGrid
            sx={{
              fontSize: "12px",
              fontFamily: "sans-serif",
              borderRadius: "20px",
              bgcolor: "#fff",
              border: "1px solid rgb(209, 205, 205)", // Borde exterior naranja
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno claro
              },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Localización en español
            columns={[
              {
                field: "fullname", // Columna para el nombre completo
                hideable: false,
                headerName: "Nombre",
                flex: 2,
                sortable: false,
              },
              {
                field: "email", // Columna para el correo electrónico
                hideable: false,
                headerName: "Correo",
                flex: 2,
                sortable: false,
              },
              {
                field: "Opciones", // Columna para las acciones (editar/eliminar)
                headerName: "Opciones",
                align: "center",
                flex: 1,
                sortable: false,
                type: "actions",
                getActions: (params) => [
                  // Componente para confirmar eliminación
                  <DeleteAlert
                    title="¿Desea eliminar el siguiente elemento?"
                    callbackToDeleteItem={() => Delete(params.row._id)}
                  />,
                  // Botón para editar transportista
                  <EditButton
                    title={`Desea editar ${params.row.fullname}?`}
                    callbackToEdit={() =>
                      navigate(
                        `/usuarios/transportistas/editar/${params.row._id}`
                      )
                    }
                  />,
                ],
              },
            ]}
            rows={rowsCarrierDrivers} // Datos de los transportistas
            slotProps={{
              toolbar: {
                showQuickFilter: true, // Filtro rápido
                quickFilterProps: { debounceMs: 500 }, // Debounce para el filtro
              },
            }}
            printOptions={{
              hideFooter: true, // Ocultar pie de página al imprimir
              hideToolbar: true, // Ocultar barra de herramientas al imprimir
            }}
            style={{ fontFamily: "sans-serif", fontSize: "15px" }}
            initialState={{
              sorting: {
                sortModel: [{ field: "name", sort: "desc" }], // Orden inicial
              },
              pagination: {
                paginationModel: { pageSize: 20, page: 0 }, // Paginación inicial
              },
            }}
          />
        ) : (
          // Mostrar un esqueleto de carga si no hay datos
          <Skeleton title="Cargando..." variant="rectangular" />
        )}
      </Grid2>
    </Grid2>
  );
};

export default CarrierDrivers;
