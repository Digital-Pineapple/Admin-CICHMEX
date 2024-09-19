
import {
    DataGrid,
    GridActionsCellItem,
  } from "@mui/x-data-grid";
  import { useEffect } from "react";
  import { Button, Fab, Grid, Skeleton, Typography, } from "@mui/material";
  import { useTypeUser } from "../../hooks/useTypeUser";
  import { useAuthStore } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import { Add, Delete, Edit } from "@mui/icons-material";
import DeleteAlert from "../../components/ui/DeleteAlert";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import EditButton from "../../components/Buttons/EditButton";


  const CarrierDrivers = () => {
   const {rowsCarrierDrivers, loadCarrierDrivers, navigate, loading} =  useUsers()
   const {user} =useAuthStore()

useEffect(() => {
    loadCarrierDrivers()
}, [user])

const Delete = (value)=>{
console.log(value);
}
if (loading) {
  return(<LoadingScreenBlue/>)
}


    return (
      <Grid container gap={2} style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
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
      <Grid item xs={12}>
        <Fab
          sx={{ right: "-80%" }}
          onClick={() => navigate("/usuarios/agregar-transportista",{replace:true})}
          color="secondary"
          aria-label="Alta de transportista"
          title="Alta de transportista"
        >
          <Add />
        </Fab>
      </Grid>
      <Grid item xs={12}>
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
                <DeleteAlert title='¿Desea eliminar el siguiente elemento?' callbackToDeleteItem={()=>Delete(params.row._id)} />,
                <EditButton
                title={`Desea editar ${params.row.fullname}?`}
                callbackToEdit={() =>
                  navigate(`/usuarios/transportistas/editar/${params.row._id}`)
                }
              />,
                
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
          style={{fontFamily:'sans-serif', fontSize:'15px'}}
          initialState={{
            sorting: {
              sortModel: [{ field: "name", sort: "desc" }],
            },
            pagination:{
              paginationModel:{pageSize:20, page:0}
            }
          }}
          
        />
              ):(<Skeleton  title="Cargando..." variant="rectangular" />)
          }
      </Grid>
         

      </Grid>
    );
  }

 export default CarrierDrivers
