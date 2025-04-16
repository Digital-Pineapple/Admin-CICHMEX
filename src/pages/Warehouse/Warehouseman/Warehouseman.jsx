import { useEffect } from "react";
import { useAuthStore } from "../../../hooks";
import { useUsers } from "../../../hooks/useUsers";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";
import { Fab, Grid2, Skeleton, Typography } from "@mui/material";
import BreadcrumbCustom from "../../../components/ui/BreadCrumbCustom";
import { Add } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import DeleteAlert from "../../../components/ui/DeleteAlert";
import EditButton from "../../../components/Buttons/EditButton";

const Warehouseman = () => {
  const {
    deleteOneCD, // Función para eliminar un almacenista
    loadAllWarehouseman, // Función para cargar todos los almacenistas
    allWarehouseman, // Lista de todos los almacenistas
    rows, // Función para mapear los datos a filas del DataGrid
    navigate, // Navegación entre rutas
    loading, // Estado de carga
  } = useUsers();
  const { user } = useAuthStore(); // Información del usuario autenticado

  useEffect(() => {
    loadAllWarehouseman(); // Cargar todos los almacenistas al montar el componente
  }, [user]);

  const Delete = (value) => {
    deleteOneCD(value); // Lógica para eliminar un almacenista
  };

  if (loading) {
    return <LoadingScreenBlue />; // Pantalla de carga mientras se obtienen los datos
  }

  const paths = [
    { path: `/usuarios/almacenistas`, name: "Mis almacenistas" }, // Ruta para el breadcrumb
  ];

  return (
    <Grid2 container paddingX={10}>
      {/* Encabezado de la página */}
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
          <strong>Mis almacenistas</strong>
        </Typography>
      </Grid2>

      {/* Breadcrumb y botón para crear un nuevo almacenista */}
      <Grid2 size={12} display={"flex"} margin={2} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
        <Fab
          onClick={() =>
            navigate("/usuarios/almacenistas/crear", { replace: true })
          }
          color="secondary"
          aria-label="Crear almacenista"
          title="Crear almacenista"
        >
          <Add />
        </Fab>
      </Grid2>

      {/* Tabla que muestra la lista de almacenistas */}
      <Grid2 size={12}>
        {allWarehouseman ? (
          <DataGrid
            sx={{
              fontSize: "12px",
              fontFamily: "sans-serif",
              borderRadius: "20px",
              bgcolor: "#fff",
              border: "1px solid rgb(209, 205, 205)", // Borde exterior
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid rgb(230, 223, 223)", // Borde interno
              },
            }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Localización en español
            columns={[
              {
                field: "fullname",
                hideable: false,
                headerName: "Nombre", // Columna para el nombre
                flex: 2,
                sortable: false,
              },
              {
                field: "email",
                hideable: false,
                headerName: "Correo", // Columna para el correo
                flex: 2,
                sortable: false,
              },
              {
                field: "Opciones",
                headerName: "Opciones", // Columna para las acciones
                align: "center",
                flex: 1,
                sortable: false,
                type: "actions",
                getActions: (params) => [
                  <DeleteAlert
                    title="¿Desea eliminar el siguiente elemento?"
                    callbackToDeleteItem={() => Delete(params.row._id)} // Acción para eliminar
                  />,
                  <EditButton
                    title={`Desea editar ${params.row.fullname}?`}
                    callbackToEdit={() => {
                      console.log(params.row._id),
                        navigate(`/almacenistas/editar/${params.row._id}`, { replace: true });
                    }} // Acción para editar
                  />,
                ],
              },
            ]}
            rows={rows(allWarehouseman)} // Datos de las filas
            slotProps={{
              toolbar: {
                showQuickFilter: true, // Filtro rápido
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
            }}
            style={{ fontFamily: "sans-serif", fontSize: "15px" }}
            initialState={{
              sorting: {
                sortModel: [{ field: "name", sort: "desc" }], // Orden inicial
              },
              pagination: {
                paginationModel: { pageSize: 20, page: 0 }, // Configuración de paginación
              },
            }}
          />
        ) : (
          <Skeleton title="Cargando..." variant="rectangular" /> // Esqueleto de carga
        )}
      </Grid2>
    </Grid2>
  );
};

export default Warehouseman;
