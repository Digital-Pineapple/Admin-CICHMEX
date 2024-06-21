
import {
    DataGrid,
    GridActionsCellItem,
  } from "@mui/x-data-grid";
  import { useEffect } from "react";
  import { Button, Skeleton, } from "@mui/material";
  import { useTypeUser } from "../../hooks/useTypeUser";
  import { useAuthStore } from "../../hooks";
import { useUsers } from "../../hooks/useUsers";
import { Delete } from "@mui/icons-material";
  
  
  const CarrierDrivers = () => {
   const {rowsCarrierDrivers, loadCarrierDrivers, navigate} =  useUsers()
   const {user} =useAuthStore()
useEffect(() => {
    loadCarrierDrivers()
}, [user])

  
  
    return (
      <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
        <h1>Transportistas</h1>
        <Button
            variant="contained"
            disableElevation
            sx={{ color: "primary", my: 5, p: 2, borderRadius: 5 }}
            onClick={()=>navigate('/auth/crear-tipo-usuario')}
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
              getActions: (params) => [
                <GridActionsCellItem icon={<Delete />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar Usuario" />,  
                <GridActionsCellItem icon={<Delete />} onClick={()=>redirectPages(navigate,(params.row._id))}  label="Editar Usuario" />,                
              ],
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
