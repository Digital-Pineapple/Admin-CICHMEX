
import {
    DataGrid,
    GridActionsCellItem,
  } from "@mui/x-data-grid";
  import { useEffect } from "react";
  import { Button, Grid, Skeleton, Typography, } from "@mui/material";
  import { useTypeUser } from "../../hooks/useTypeUser";
  import { useAuthStore } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import { Delete, Edit } from "@mui/icons-material";
import DeleteAlert from "../../components/ui/DeleteAlert";


  const CarrierDrivers = () => {
   const {rowsCarrierDrivers, loadCarrierDrivers, navigate} =  useUsers()
   const {user} =useAuthStore()

useEffect(() => {
    loadCarrierDrivers()
}, [user])

const Delete = (value)=>{
console.log(value);
}


    return (
      <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
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
          Transportistas
        </Typography>
      </Grid>
        <Button
             variant="contained"
             disableElevation
             color="secondary"
             sx={{ my: 5, p: 2, borderRadius: 5 }}
            onClick={()=>navigate('/auth/AltaTransportista')}
          >
            Registrar nuevo transportista
          </Button>

          {
              rowsCarrierDrivers ? (
  <DataGrid
          sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
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
              getActions: (params)=>[
              
                <DeleteAlert title='¿Desea eliminar el siguiente elemento?' callbackToDeleteItem={()=>Delete(params.row._id)} />
                
              ]
            },
          ]}
          rows={rowsCarrierDrivers}
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

 export default CarrierDrivers
