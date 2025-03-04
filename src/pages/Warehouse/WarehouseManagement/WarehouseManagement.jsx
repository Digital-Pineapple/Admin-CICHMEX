import { Grid2, Typography, Grid } from '@mui/material'
import React from 'react'
import BreadcrumbCustom from '../../../components/ui/BreadCrumbCustom'
import Zones from './Zones';
import Aisles from './Aisles';
import Sections from './Sections';

const WarehouseManagement = () => {

    const paths = [
        { path: "/warehouse/administracion", name: "Administración de almacén" },
      ];

  return (
    <Grid2 display={'grid'} gridTemplateColumns={'repeat(5,1fr'}
    gridTemplateRows={'repeat(5,1fr'} 
    container
    spacing={2}
     paddingX={{sm:3, lg:15}}>
       <Grid2
       gridArea={'1/1/2/4'}
      >
        <Typography variant="h4">
          <strong>Administración de almacén </strong>
        </Typography>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2 gridArea={'2 / 1 / 3 / 4'}>
        <Zones/>
      </Grid2>
      <Grid2 gridArea={'3 / 1 / 6 / 4'}>
        <Aisles/>
      </Grid2>
      <Grid2 gridArea={'2 / 4 / 6 / 6'} >
        <Sections />
      </Grid2>
    </Grid2>
  )
}

export default WarehouseManagement
