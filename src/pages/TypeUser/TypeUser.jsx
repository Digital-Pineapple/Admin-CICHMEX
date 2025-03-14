import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Grid2, Skeleton, Typography } from "@mui/material";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useAuthStore } from "../../hooks";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import { esES } from "@mui/x-data-grid/locales";

const TypeUser = () => {
  const { loadTypeUsers, rowsTypeUser } = useTypeUser();
  const { user } = useAuthStore();

  useEffect(() => {
    loadTypeUsers();
  }, [user]);

  const paths = [{ path: `/tipo-usuario`, name: "Todos los tipos de usuario" }];

  return (
    <Grid2 container paddingX={{ xs: 10 }}>
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
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2 size={12}>
        {rowsTypeUser ? (
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
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={[
              {
                field: "role",
                hideable: false,
                headerName: "Tipo de usuario",
                flex: 2,
                sortable: false,
              },
              {
                field: "system",
                hideable: false,
                headerName: "sistema",
                flex: 2,
                sortable: false,
              },
              //   {
              //     field: "Opciones",
              //     headerName: "Opciones",
              //     align: "center",
              //     flex: 1,
              //     sortable: false,
              //     type: "actions",
              //     getActions: (params) => [
              //       <GridActionsCellItem icon={<Edit />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar Usuario" />,
              //     ],
              //   },
            ]}
            rows={rowsTypeUser}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            printOptions={{
              hideFooter: true,
              hideToolbar: true,
            }}
          />
        ) : (
          <Skeleton title="Cargando..." variant="rectangular" />
        )}
      </Grid2>
    </Grid2>
  );
};

export default TypeUser;
