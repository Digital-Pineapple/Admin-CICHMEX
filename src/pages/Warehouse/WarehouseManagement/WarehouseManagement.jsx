import { Grid2, Typography, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import BreadcrumbCustom from '../../../components/ui/BreadCrumbCustom'
import Zones from './Zones';
import Aisles from './Aisles';
import Sections from './Sections';
import { useStoreHouse } from '../../../hooks/useStoreHouse';
import { useAuthStore, useUsers } from '../../../hooks';

const WarehouseManagement = () => {
  // Hook personalizado para cargar los almacenes
  const { loadStoreHouse, StoreHouses } = useStoreHouse();
  
  // Hook para obtener la información del usuario autenticado
  const { user } = useAuthStore();
  
  // Rol del usuario autenticado
  const typeUser = user.type_user.role;

  // useEffect para cargar los almacenes si el usuario tiene permisos de SUPER-ADMIN o ADMIN
  useEffect(() => {
    if (typeUser.includes('SUPER-ADMIN') || typeUser.includes('ADMIN')) {
      loadStoreHouse();
    }
  }, [user]);

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: "/warehouse/administracion", name: "Administración de almacén" },
  ];

  return (
    <Grid2 
      display={'grid'} 
      gridTemplateColumns={'repeat(5,1fr'} 
      gridTemplateRows={'repeat(5,1fr'} 
      container
      spacing={2}
      paddingX={{ sm: 3, lg: 15 }}
    >
      {/* Encabezado con el título y el breadcrumb */}
      <Grid2 gridArea={'1/1/2/4'}>
        <Typography variant="h4">
          <strong>Zonas pasillos y secciones</strong>
        </Typography>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Componente para mostrar las zonas del almacén */}
      <Grid2 gridArea={'2 / 1 / 3 / 4'}>
        <Zones storehouses={StoreHouses} />
      </Grid2>

      {/* Componente para mostrar los pasillos del almacén */}
      <Grid2 gridArea={'3 / 1 / 6 / 4'}>
        <Aisles storehouses={StoreHouses} />
      </Grid2>

      {/* Componente para mostrar las secciones del almacén */}
      <Grid2 gridArea={'2 / 4 / 6 / 6'}>
        <Sections storehouses={StoreHouses} />
      </Grid2>
    </Grid2>
  );
}

export default WarehouseManagement;
