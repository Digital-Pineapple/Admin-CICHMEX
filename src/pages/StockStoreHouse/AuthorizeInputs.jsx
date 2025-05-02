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
import { Close, NoteAdd } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { teal } from "@mui/material/colors";
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";

// Estilo para el modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 15,
  gap: 1,
  p: 5,
};

const AuthorizeInputs = () => {
  // Hook personalizado para manejar datos del almacén
  const { loadEntryReport, EntryReport, loadAuthorizeEntries, loading } = useStockStorehouse();

  // Estado para manejar el modal de notas
  const [openModalForm, setopenModalForm] = useState({
    value: false,
    data: {},
    equality: 0,
    index: null,
  });

  // Obtener el parámetro "folio" de la URL
  const { folio } = useParams();

  // Cargar el reporte de entrada al montar el componente o cambiar el folio
  useEffect(() => {
    loadEntryReport(folio);
  }, [folio]);

  // Extraer información del responsable de la entrada
  const responsible = EntryReport.responsible;
  const { fullname, email, type_user } = responsible || {};

  // Mapeo de roles de usuario a nombres legibles
  const TYPE_USERS = {
    "SUPER-ADMIN": "Super Administrador",
    "ADMIN": "Administrador",
    "WAREHOUSE-MANAGER": "Encargado de almacén",
    "WAREHOUSEMAN": "Almacenista",
    "no_data": "Sin información",
  };
  const defaultTypeUser = "no_data";
  const RenderName = TYPE_USERS[type_user?.role[0]] || defaultTypeUser;

  // Preparar las filas de la tabla con los datos de entrada
  const rows = EntryReport.inputs?.map((i, index) => ({
    id: index.toString(),
    ...i,
  }));

  // Abrir el modal para agregar una nota
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

  // Cerrar el modal
  const handleClose = () => {
    setopenModalForm({ value: false, data: {}, missing: 0 });
  };

  // Configuración del formulario con react-hook-form
  const { control, getValues, reset, handleSubmit, watch } = useForm({
    defaultValues: {
      products: [],
    },
  });

  // Resetear los valores del formulario cuando cambien las entradas
  useEffect(() => {
    if (EntryReport.inputs) {
      reset({ products: rows });
    }
  }, [EntryReport.inputs, reset]);

  // Manejar el envío del formulario
  const onSubmit = (data) => {
    loadAuthorizeEntries(data, folio);
  };

  // Observar las notas actuales de un producto
  const CurrentNotes = (index) => watch(`products.${index}.notes`);

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: '/almacenista/entradas_de_producto', name: 'Entradas de producto' },
    { path: '/almacenista/entradas_de_producto/autorizar_entrada', name: 'Autorizar Entrada' }
  ];

  // Mostrar pantalla de carga si los datos están cargando
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid2 container paddingX={{ lg: 20 }} display={"flex"} gap={2}>
      {/* Encabezado con título y folio */}
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

      {/* Breadcrumb para navegación */}
      <Grid2 size={12}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Información del responsable */}
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

      {/* Tabla de productos */}
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
                    {/* Campo para ingresar la cantidad recibida */}
                    <Controller
                      name={`products.${index}.MyQuantity`}
                      control={control}
                      rules={{
                        required: "Este campo es obligatorio",
                        validate: (value) => {
                          // Validación: Si no hay nota, la cantidad debe ser igual a la existente
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
                          // Validación: La cantidad no puede ser mayor a la existente
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
                    {/* Botón para agregar una nota */}
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
        {/* Botón para guardar los cambios */}
        <Button
          type="submit"
          variant="contained"
          size="small"
          color="success"
          sx={{ mt: 2, width: 150 }}
        >
          Guardar
        </Button>
      </Grid2>

      {/* Modal para agregar notas */}
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
            Faltante: {openModalForm.equality}
          </Typography>
          <br />
          <Typography variant="h6" component="h2">
            Indica la razón de este faltante
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
            Guardar
          </Button>
        </Grid2>
      </Modal>
    </Grid2>
  );
};

export default AuthorizeInputs;
