import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, Typography, Grid } from "@mui/material";
import { useBranches } from "../../hooks/useBranches";
export const Branches = () => {
   const { branches, loadBranches, pendingToVerify, activeBranches, navigate } =  useBranches()
   useEffect(() => {
    loadBranches()
}, [])

const res = pendingToVerify(branches)

const res1 = activeBranches(branches)
  
   
  return (
    <Grid
      container
      minHeight={"90vh"}
      display={"block"}
      columnSpacing={2}
      justifyContent={"center"}
      paddingLeft={"80px"}
    >
      <Grid item width={"100%"} height={"60px"}>
        <Typography textAlign={"center"} variant="h1" color={'primary'} fontSize={"50px"}>
          Sucursales
        </Typography>
      </Grid>

      <Grid
        container
        boxSizing={"border-box"}
        display={"flex"}
        justifyContent={"space-around"}
        padding={'5%'}

      >
        {/* CARD Sucursales por verificar */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5">Sucursales por activar</Typography>
            <Typography textAlign={'center'} variant="h3">{res}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navigate('/auth/Sucursales/pending')} size="small">Ver detalles</Button>
          </CardActions>
        </Card>
        {/* Sucursales activas */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5">Sucursales activas</Typography>
            <Typography textAlign={'center'} variant="h3">{res1}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Ver detalles</Button>
          </CardActions>
        </Card>

        


      </Grid>
    </Grid>
  );
};
