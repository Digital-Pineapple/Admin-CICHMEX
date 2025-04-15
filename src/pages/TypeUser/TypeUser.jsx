import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Grid2, Skeleton, Typography } from "@mui/material";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useAuthStore } from "../../hooks";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

const TypeUser = () => {
  const { loadTypeUsers, rowsTypeUser } = useTypeUser(); // Hook personalizado para cargar y obtener los datos de tipos de usuario
  const { user } = useAuthStore(); // Hook para obtener información del usuario autenticado

  useEffect(() => {
    loadTypeUsers(); // Carga los tipos de usuario al montar el componente o cuando cambia el usuario
  }, [user]);

  const paths = [{ path: `/tipo-usuario`, name: "Todos los tipos de usuario" }]; // Rutas para el componente de breadcrumb

  return (
    <Grid2 container paddingX={{ xs: 10 }}>
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
          <strong>Tipos de usuarios</strong>
        </Typography>
      </Grid2>

      {/* Componente de breadcrumb para mostrar la navegación */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Tabla de datos o skeleton de carga */}
      <Grid2 size={12}>
        {rowsTypeUser ? (
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
            localeText={esES.components.MuiDataGrid.defaultProps.localeText} // Traducción al español para la tabla
            columns={[
              {
                field: "role",
                hideable: false,
                headerName: "Tipo de usuario", // Columna para mostrar el tipo de usuario
                flex: 2,
                sortable: false,
              },
              {
                field: "system",
                hideable: false,
                headerName: "sistema", // Columna para mostrar el sistema
                flex: 2,
                sortable: false,
              },
              // Ejemplo de columna de acciones comentada
              // {
              //   field: "Opciones",
              //   headerName: "Opciones",
              //   align: "center",
              //   flex: 1,
              //   sortable: false,
              //   type: "actions",
              //   getActions: (params) => [
              //     <GridActionsCellItem icon={<Edit />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar Usuario" />,
              //   ],
              // },
            ]}
            rows={rowsTypeUser} // Datos de las filas de la tabla
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 }, // Configuración inicial de paginación
              },
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true, // Habilitar filtro rápido
                quickFilterProps: { debounceMs: 500 }, // Configuración del filtro rápido
              },
            }}
            printOptions={{
              hideFooter: true, // Ocultar pie de página al imprimir
              hideToolbar: true, // Ocultar barra de herramientas al imprimir
            }}
          />
        ) : (
          <Skeleton title="Cargando..." variant="rectangular" /> // Skeleton de carga mientras se obtienen los datos
        )}
      </Grid2>
    </Grid2>
  );
};

export default TypeUser; // Exportar el componente para su uso en otras partes de la aplicación
