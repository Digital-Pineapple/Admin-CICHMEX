import React, { useEffect, useState } from "react";
import { useStockStorehouse } from "../../hooks/useStockStorehouse";
import { useParams } from "react-router-dom";
import {
  Grid2,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Avatar,
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
  Box,
  Tooltip,
} from "@mui/material";
import { EnterOutlined } from "@ant-design/icons";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Close, ErrorRounded, NoteAdd } from "@mui/icons-material";
import { esES } from "@mui/x-data-grid/locales";
import { Controller, useForm } from "react-hook-form";
import { current } from "@reduxjs/toolkit";
import { teal } from "@mui/material/colors";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

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

const AuthorizeInputs = () => {
  const { loadEntryReport, EntryReport } = useStockStorehouse();
  const [openModalForm, setopenModalForm] = useState({
    value: false,
    data: {},
    equality: 0,
    index: null,
  });
  const { folio } = useParams();

  useEffect(() => {
    loadEntryReport(folio);
  }, [folio]);
  console.log(EntryReport, "informacion");
  const responsible = EntryReport.responsible?.[0];
  const { fullname, email, type_user } = responsible || {};

  const TYPE_USERS = {
    "SUPER-ADMIN": "Super Administrador",
    ADMIN: "Administrador",
    "WAREHOUSE-MANAGER": "Encargado de almacén",
    WAREHOUSEMAN: "Almacenista",
    no_data: "Sin información",
  };
  const defaultTypeUser = "no_data";
  const RenderName = TYPE_USERS[type_user?.role[0]] || defaultTypeUser;

  const rows = EntryReport.inputs?.map((i, index) => ({
    id: index.toString(),
    ...i,
  }));

  const handleOpen = (data, index) => {
    const quantity = data.quantity;
    const myQuantity = JSON.parse(data.MyQuantity);
    const missing = quantity - myQuantity;
    setopenModalForm({
      value: true,
      data: data,
      equality: missing,
      index: index,
    });
  };
  const handleClose = () => {
    setopenModalForm({ value: false, data: {}, missing: 0 });
  };

  const { control, setValue, getValues, reset, handleSubmit, watch } = useForm({
    defaultValues: {
      products: [],
    },
  });

  useEffect(() => {
    if (EntryReport.inputs) {
      reset({ products: rows });
    }
  }, [EntryReport.inputs, reset]);

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };
  const onSubmitModal = (data) => {
    console.log("Datos enviados:", data);
  };

  const CurrentNotes = (index) => watch(`products.${index}.notes`);
  const paths = [
    {path:'/almacenista/entradas_de_producto',name: 'Entradas de producto'},
    {path:'/almacenista/entradas_de_producto/autorizar_entrada', name: 'Autorizar Entrada'}
  ]

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
        <Typography variant="h4"><strong>Autorizar entrada</strong></Typography>

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
      >
        <Typography variant="body2" color="initial">
          <strong>Responsable de entrada </strong> <br />
          <strong>Nombre:</strong>
          {fullname} <br />
          <strong>Correo:</strong>
          {email} <br />
          <strong>Tipo de usuario:</strong>
          {RenderName}
        </Typography>
      </Grid2>

      <Grid2 size={12} component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
              {getValues("products").map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{product.product_detail?.tag}</TableCell>
                  <TableCell>{product.product_detail?.name}</TableCell>
                  <TableCell>{product.product_detail?.quantity}</TableCell>
                  <TableCell>
                    <Controller
                      name={`products.${index}.MyQuantity`}
                      control={control}
                      rules={{
                        required: "Este campo es obligatorio",
                        validate: (value) => {
                          // Regla 1: Si no tiene nota, debe ser igual a la cantidad existente
                          if (
                            !CurrentNotes(index) &&
                            JSON.parse(value) !==
                              product.product_detail.quantity
                          ) {
                            return (
                              "La cantidad debe ser exactamente " +
                              product.product_detail.quantity
                            );
                          }
                          // Regla 2: En todos los casos, la cantidad no puede ser mayor a la existente
                          if (value > product.product_detail.quantity) {
                            return (
                              "La cantidad no puede ser mayor que " +
                              product.product_detail.quantity
                            );
                          }
                          return undefined; // Pasa la validación
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                          size="small"
                          type="number"
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title='Agregar nota'>
                    <IconButton
                      onClick={() => handleOpen(product, index)}
                      color="error"
                    >
                      <NoteAdd />
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
          color="primary"
          sx={{ mt: 2 }}
        >
          Guardar
        </Button>
      </Grid2>

      <Modal open={openModalForm.value} onClose={handleClose}>
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
            Faltante:{openModalForm.equality}
          </Typography>
          <br />
          <Typography variant="h6" component="h2">
            Indica la razon de este faltante
          </Typography>
          <Controller
            name={`products.${openModalForm.index}.notes`}
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: "Valor requerido" },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Comentarios"
                multiline
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
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

export default AuthorizeInputs;
