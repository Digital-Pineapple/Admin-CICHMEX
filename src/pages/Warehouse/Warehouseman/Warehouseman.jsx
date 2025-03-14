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
    deleteOneCD,
    loadAllWarehouseman,
    allWarehouseman,
    rows,
    navigate,
    loading,
  } = useUsers();
  const { user } = useAuthStore();

  useEffect(() => {
    loadAllWarehouseman();
  }, [user]);

  const Delete = (value) => {
    deleteOneCD(value);
  };
  if (loading) {
    return <LoadingScreenBlue />;
  }
  const paths = [
    { path: `/usuarios/almacenistas`, name: "Mis almacenistas" },
  ];
  

  return (
    <Grid2 container paddingX={10}>
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
      <Grid2 size={12} display={"flex"}margin={2} justifyContent={"space-between"}>
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
      <Grid2 size={12}>
        {allWarehouseman ? (
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
                field: "fullname",
                hideable: false,
                headerName: "Nombre",
                flex: 2,
                sortable: false,
              },
              {
                field: "email",
                hideable: false,
                headerName: "Correo",
                flex: 2,
                sortable: false,
              },
              {
                field: "Opciones",
                headerName: "Opciones",
                align: "center",
                flex: 1,
                sortable: false,
                type: "actions",
                getActions: (params) => [
                  <DeleteAlert
                    title="¿Desea eliminar el siguiente elemento?"
                    callbackToDeleteItem={() => Delete(params.row._id)}
                  />,
                  <EditButton
                    title={`Desea editar ${params.row.fullname}?`}
                    callbackToEdit={() =>{
                        console.log(params.row._id),
                      navigate( `/almacenistas/editar/${params.row._id}`,{replace:true} )}
                    }
                  />,
                ],
              },
            ]}
            rows={rows(allWarehouseman)}
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
            style={{ fontFamily: "sans-serif", fontSize: "15px" }}
            initialState={{
              sorting: {
                sortModel: [{ field: "name", sort: "desc" }],
              },
              pagination: {
                paginationModel: { pageSize: 20, page: 0 },
              },
            }}
          />
        ) : (
          <Skeleton title="Cargando..." variant="rectangular" />
        )}
      </Grid2>
    </Grid2>
  );
};


export default Warehouseman
