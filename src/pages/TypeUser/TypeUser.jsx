
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Skeleton, } from "@mui/material";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useAuthStore } from "../../hooks";


const TypeUser = () => {
  const { loadTypeUsers, rowsTypeUser, navigate } = useTypeUser();
  const {user} =useAuthStore()


  useEffect(() => {
 loadTypeUsers();
  }, [user]);


  return (
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <h1>Tipos de usuario</h1>
      <Button
          variant="contained"
          disableElevation
          sx={{ color: "primary", my: 5, p: 2, borderRadius: 5 }}
          onClick={()=>navigate('/auth/crear-tipo-usuario')}
        >
          Registrar nuevo tipo de usuario
        </Button>

        {
            rowsTypeUser ? (
<DataGrid
        sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
        columns={[
          {
            field: "name",
            hideable: false,
            headerName: "Tipo de usuario",
            flex: 2,
            sortable: false,
          },
          {
            field: "type",
            hideable: false,
            headerName: "ID",
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
            ):(<Skeleton  title="Cargando..." variant="rectangular" />)
        }
      
    </div>
  );
}

export default TypeUser