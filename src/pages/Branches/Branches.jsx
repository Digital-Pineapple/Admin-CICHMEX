import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import {
  Box,
  Typography,
  Grid,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useBranches } from "../../hooks/useBranches";
import { DataGrid } from "@mui/x-data-grid";
import DeleteAlert from "../../components/ui/DeleteAlert";
import { Add, Check, Clear, DownloadDone, Info, InfoOutlined } from "@mui/icons-material";
export const Branches = () => {
  const {
    branches,
    loadBranches,
    pendingToVerify,
    activeBranches,
    navigate,
    rowsBranches,
  } = useBranches();
  useEffect(() => {
    loadBranches();
  }, []);

  return (
    <div style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
      <h1>Sucursales</h1>

      {rowsBranches ? (
        <DataGrid
          sx={{ fontSize: "20px", fontFamily: "BikoBold" }}
          columns={[
            {
              field: "name",
              hideable: false,
              headerName: "Nombre",
              flex: 2,
              sortable: false,
            },
            {
              field: "description",
              hideable: false,
              headerName: "Descripción",
              flex: 2,
              sortable: false,
            },
            {
              field: "activated",
              hideable: false,
              headerName: "Activo",
              flex: 2,
              renderCell: (params) =>
                params.value === false ? (
                  <Chip
                    icon={<Clear />}
                    label="No activo"
                    variant="filled"
                    color="warning"
                  />
                ) : (
                  <Chip
                    icon={<Check />}
                    label="Activo"
                    variant="filled"
                    color="success"
                  />
                ),
            },
            {
              field: "Opciones",
              headerName: "Opciones",
              align: "center",
              flex: 1,
              sortable: false,
              type: "actions",
              renderCell: (params) =>
                params.row.activated === false ? (
                  <Tooltip title='Activar sucursal'>
                  <IconButton aria-label="Activar" onClick={()=>navigate(`/auth/Sucursales/${params.row?._id}`,{replace:true})} color="success">
                    <Add />
                  </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title='Información de la sucursal'>
                  <IconButton aria-label="Información" onClick={()=>navigate(`/auth/Sucursales/${params.row?._id}`,{replace:true})} color="info">
                    <InfoOutlined />
                  </IconButton>
                  </Tooltip>
                ),
            },
          ]}
          rows={rowsBranches}
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
      ) : (
        <Skeleton title="Cargando..." variant="rectangular" />
      )}
    </div>
  );
};
