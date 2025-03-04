import React, { useEffect, useState } from "react";
import { useStockStorehouse } from "../../hooks/useStockStorehouse";
import { useParams } from "react-router-dom";
import {
  Grid2,
  Typography,
  Button,
  IconButton,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Modal,
  Tooltip,
} from "@mui/material";
import { Close, NoteAdd, Search } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { teal } from "@mui/material/colors";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import { convertirCadenaHoraAFecha, handleHoursChange } from "../../helpers/hoursDate";
import { localDate } from "../../Utils/ConvertIsoDate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 15,
  gap:1,
  p: 5,
};

const ArrangeProducts = () => {
  const { loadEntryReport, EntryReport, loading } = useStockStorehouse();
  const [openModal, setopenModal] = useState({
    value: false,
    data: {},
    index: null,
  });
  const { folio } = useParams();

  useEffect(() => {
    loadEntryReport(folio);
  }, [folio]);
  const responsible = EntryReport.responsible?.[0];
  const { fullname, email, type_user } = responsible || {};

  const userReceived = EntryReport.user_received?.[0];


  const TYPE_USERS = {
    "SUPER-ADMIN": "Super Administrador",
    "ADMIN": "Administrador",
    "WAREHOUSE-MANAGER": "Encargado de almacén",
    "WAREHOUSEMAN": "Almacenista",
    "no_data": "Sin información",
  };
  const defaultTypeUser = "no_data";
  const RenderName = TYPE_USERS[type_user?.role[0]] || defaultTypeUser;
  const RenderName_r = TYPE_USERS[userReceived?.type_user?.role[0]] || defaultTypeUser;

  const rows = EntryReport.inputs?.map((i, index) => ({
    id: index.toString(),
    ...i,
  }));

  const handleOpen = (data, index) => {
    setopenModal({
      value: true,
      data: data,
      index: index,
    });
  };
  const handleClose = () => {
    setopenModal({ value: false, data: {} });
  };
  const paths = [
    {path:'/almacenista/entradas_de_producto',name: 'Entradas de producto'},
    {path:'/almacenista/entradas_de_producto/acomodar_producto', name: 'Acomodar producto'}
  ]

  if (loading) {
    return <LoadingScreenBlue/>
  }

  return (
    <Grid2 container paddingX={{lg:20}} display={"flex"} gap={2}>
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4"><strong>Acomodo de poducto</strong></Typography>

        <Typography variant="h5">
          <strong>Folio:</strong> {EntryReport._id} <br />
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths}/>
        
      </Grid2>

      <Grid2
        bgcolor={"#fff"}
        sx={{ boxShadow: "0px 0px 4px -1px #7a7a7a" }}
        padding={2}
        borderRadius={"15px"}
        size={3}
      >
        <Typography variant="body2" color="initial">
          <strong>Responsable de entrada </strong> <br />
          <strong>Nombre:</strong>
          {fullname} <br />
          <strong>Correo:</strong>
          {email} <br />
          <strong>Tipo de usuario:</strong>
          {RenderName}<br />
          <strong>Fecha de creación:</strong>
          {localDate(EntryReport?.createdAt?.[0])}
        </Typography>
      </Grid2>

      <Grid2
        bgcolor={"#fff"}
        sx={{ boxShadow: "0px 0px 4px -1px #7a7a7a" }}
        padding={2}
        size={3}
        borderRadius={"15px"}
      >
        <Typography variant="body2" color="initial">
          <strong>Responsable de entrada en almacén </strong> <br />
          <strong>Nombre:</strong>
          {userReceived?.fullname} <br />
          <strong>Correo:</strong>
          {userReceived?.email} <br />
          <strong>Tipo de usuario:</strong>
          {RenderName_r} <br />
          <strong>Fecha de recepción:</strong> 
          {localDate(EntryReport?.date_received?.[0])}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <TableContainer component={Paper} sx={{ borderRadius: "20px" }}>
          <Table>
            <TableHead sx={{ bgcolor: teal[800] }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Código</TableCell>
                <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                <TableCell sx={{ color: "white" }}>Cantidad</TableCell>
                <TableCell sx={{ color: "white" }}>Cantidad recibida</TableCell>
                <TableCell sx={{ color: "white" }}>Opciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {EntryReport?.inputs?.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{product.product_detail?.tag}</TableCell>
                  <TableCell>{product.product_detail?.name}</TableCell>
                  <TableCell>{product.product_detail?.quantity}</TableCell>
                  <TableCell>
                    {product.quantity_received}
                  </TableCell>
                  <TableCell>
                    <Tooltip title=''>
                    <IconButton
                      onClick={() => console.log(product.product_detail)}
                      color="error"
                      size="small"
                      variant="container"
                    >
                      <Search/>
                    </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          type="submit"
          variant="contained"
          size="small"
          color="success"
          sx={{ mt: 2, width:150  }}
        >
          Guardar
        </Button>
      </Grid2>

      <Modal open={openModal.value} onClose={handleClose}>
        <Grid2 container sx={style}>
          <IconButton
            disableRipple
            aria-label="Cerrar"
            onClick={() => handleClose()}
            sx={{ position: "absolute", transform: "translate(790%, -90%)" }}
          >
            <Close />
          </IconButton>

          <Typography variant="h4" component="h2">
            Faltante:{openModal?.data?.quantity_received}
          </Typography>
          <br />
          <Typography variant="h6" component="h2">
            Indica la razon de este faltante
          </Typography>
         
          <Button
            variant="contained"
            onClick={() => handleClose()}
            fullWidth
            color="success"
          >
            guardar
          </Button>
        </Grid2>
      </Modal>
    </Grid2>
  );
};

export default ArrangeProducts
