import React, { useEffect } from "react";
import { Typography, Grid, Chip, IconButton, Tooltip, Button } from "@mui/material";
import { useBranches } from "../../hooks/useBranches";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Check, Clear, InfoOutlined } from "@mui/icons-material";
export const Branches = () => {
  const { loadBranches, navigate, rowsBranches } = useBranches();
  useEffect(() => {
    loadBranches();
  }, []);

  return (
    <Grid container style={{ marginLeft: "10%", height: "70%", width: "80%" }}>
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
          Sucursales
        </Typography>
      </Grid>
      <Grid item mt={2} xs={12}>
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
                    <Tooltip title="Activar sucursal">
                      <Button
                        aria-label="Activar"
                        onClick={() =>
                          navigate(`/auth/Sucursales/${params.row?._id}`)
                        }
                        color="success"
                      >
                        Activar
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Información de la sucursal">
                      <Button
                        aria-label="Información"
                        onClick={() =>navigate(`/auth/Sucursales/${params.row?._id}`)}
                        color="info"
                      >
                        Información
                      </Button>
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
      </Grid>
    </Grid>
  );
};
