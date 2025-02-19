import * as React from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import {
  DataGrid,
  GridActionsCellItem,
  GridPagination,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { useUI } from "../../hooks/useUi";
import MuiPagination from "@mui/material/Pagination";
import { Add, Close, Delete, Download, Edit, Place } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Fab,
  Grid2,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useStoreHouse } from "../../hooks/useStoreHouse";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { useState } from "react";
import { HtmlTooltip } from "../../components/Tooltips/HtmlTooltip";
import { MarkerF, useLoadScript } from "@react-google-maps/api";
import MapGoogle from "../../components/Google/MapGoogle";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

const styleContainer = {
  width: "100%",
  height: "600px",
};

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}
export function SortedDescendingIcon() {
  return <ExpandMoreIcon className="icon" />;
}

export function SortedAscendingIcon() {
  return <ExpandLessIcon className="icon" />;
}

export function UnsortedIcon() {
  return <SortIcon className="icon" />;
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const StoreHouse = () => {
  const { loadStoreHouse, StoreHouses, navigate, deleteStoreHouse } =
    useStoreHouse();
  const [open, setOpen] = useState({ value: false, data: {} });
  const { loading } = useUI();
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_MAP_KEY,
  });

  const handleOpen = (info) => {
    setOpen({ value: true, data: info });
  };
  const handleClose = () => {
    setOpen({ value: false, data: {} });
  };
  console.log(open);

  useEffect(() => {
    loadStoreHouse();
  }, []);

  const rowsWithIds = StoreHouses.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));

  const createStoreHouse = () => {
    navigate("/CEDIS/agregar", { replace: true });
  };

  function CustomToolbar() {
    const apiRef = useGridApiContext();

    return (
      <GridToolbarContainer sx={{ justifyContent: "center" }}>
        <GridToolbarQuickFilter label="Buscar" placeholder="Buscar" />
      </GridToolbarContainer>
    );
  }
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container gap={2}>
      <Grid2
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Mis centros de distribución
        </Typography>
      </Grid2>
      <Grid2 size={12} display={"flex"} justifyContent={"end"}>
        <Fab
          title="Agregar nuevo almacen"
          onClick={createStoreHouse}
          color="primary"
        >
          <Add />
        </Fab>
      </Grid2>
      <DataGrid
        sx={{ fontSize: "12px" }}
        columns={[
          {
            field: "storehouse_key",
            hideable: false,
            headerName: "Código",
            flex: 0.5,
            sortable: "false",
          },
          {
            field: "name",
            hideable: false,
            headerName: "Nombre del cedis",
            flex: 1,
            sortable: false,
          },
          {
            field: "location",
            hideable: false,
            headerName: "Ubicacion",
            flex: 2,
            sortable: false,
            valueGetter: (value, row) =>
              `${value.state || ""} - ${value.municipality || ""}- ${value.neighborhood || ""}- ${value.direction || ""}- ${value.cp || ""}`,
          },
          {
            field: "phone_number",
            headerName: "Numero de telefono",
            flex: 1,
            align: "center",
          },
          {
            field: "Opciones",
            headerName: "Opciones",
            align: "center",
            flex: 1,
            sortable: false,
            type: "actions",
            getActions: (params) => [
              <GridActionsCellItem
                icon={<Place color="secondary" />}
                onClick={() => handleOpen(params.row)}
                label="Ver Ubicación"
                showInMenu
              />,
              <GridActionsCellItem
                icon={<Edit color="success" />}
                onClick={() => navigate(`/CEDIS/editar/${params.row._id}`)}
                label="Editar Cedis"
                showInMenu
              />,
              <GridActionsCellItem
                icon={<Delete color="error" />}
                onClick={() => deleteStoreHouse(params.row._id)}
                label="Eliminar"
                showInMenu
              />,
            ],
          },
        ]}
        rows={rowsWithIds}
        pagination
        slots={{
          pagination: CustomPagination,
          toolbar: CustomToolbar,
          columnSortedDescendingIcon: SortedDescendingIcon,
          columnSortedAscendingIcon: SortedAscendingIcon,
          columnUnsortedIcon: UnsortedIcon,
        }}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
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
      <Modal open={open.value} onClose={handleClose}>
        <Card sx={style} variant="outlined">
          <CardHeader
            action={
              <IconButton onClick={() => handleClose()} aria-label="Cerrar">
                <Close />
              </IconButton>
            }
            title={`Cedis: ${open?.data?.name}`}
          />
          <CardContent>
            <Grid2 size={5.7}>
              {isLoaded ? (
                open.data.location?.lat &&
                open.data.location?.lgt && (
                  <Box>
                    <MapGoogle
                      center={{
                        lat: open.data.location.lat,
                        lng: open.data.location.lgt,
                      }}
                      styles={styleContainer}
                      zoom={16}
                      onGetPosition={(e) => {
                        setInputsByMarker(e);
                      }}
                      typeCursor="pointer"
                      scrollable={false}
                    >
                      {open.data.location.lat && open.data.location.lgt && (
                        <MarkerF
                          position={{
                            lat: open.data.location.lat,
                            lng: open.data.location.lgt,
                          }}
                          animation={google.maps.Animation.DROP}
                        />
                      )}
                    </MapGoogle>
                  </Box>
                )
              ) : (
                <CircularProgress />
              )}
            </Grid2>
          </CardContent>
        </Card>
      </Modal>
    </Grid2>
  );
};

export default StoreHouse;
