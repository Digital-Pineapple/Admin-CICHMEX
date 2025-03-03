import { Grid2, Typography, Grid } from '@mui/material'
import React from 'react'
import BreadcrumbCustom from '../../../components/ui/BreadCrumbCustom'
import Zones from './Zones';
import Aisles from './Aisles';

const WarehouseManagement = () => {

    const paths = [
        { path: "/warehouse/administracion", name: "Administración de almacén" },
      ];

  return (
    <Grid2 container paddingX={{sm:3, lg:15}}>
       <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4">
          <strong>Administración de almacén </strong>
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>
      <Grid2 size={6}>
        <Zones/>
      </Grid2>
      <Grid2 size={6}>
        <Aisles/>
      </Grid2>
    </Grid2>
  )
}

export default WarehouseManagement
