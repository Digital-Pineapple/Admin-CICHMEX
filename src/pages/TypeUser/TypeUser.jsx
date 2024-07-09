
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { Button, Grid, Skeleton, Typography, } from "@mui/material";
import { useTypeUser } from "../../hooks/useTypeUser";
import { useAuthStore } from "../../hooks";


const TypeUser = () => {
  const { loadTypeUsers, rowsTypeUser, navigate } = useTypeUser();
  const {user} =useAuthStore()


  useEffect(() => {
 loadTypeUsers();
  }, [user]);


  return (
    <Grid style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
       <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Tipos de auto
        </Typography>
      </Grid>
      <Button
          variant="contained"
          disableElevation
          color="secondary"
          sx={{ my: 5, p: 2, borderRadius: 5 }}
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
      
    </Grid>
  );
}

export default TypeUser