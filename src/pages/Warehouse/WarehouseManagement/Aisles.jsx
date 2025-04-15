// Importaciones de componentes y librerías necesarias
import {
  Grid2,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Skeleton,
  styled,
  tableCellClasses,
  Button,
  Modal,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Popover,
  MenuList,
} from "@mui/material";
import { useAuthStore, useWarehouse } from "../../../hooks";
import { useCallback, useEffect, useState } from "react";
import { Add, Delete, Edit, MoreVert } from "@mui/icons-material";
import { grey, teal } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";

// Estilización de las celdas de la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: teal[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Estilización de las filas de la tabla
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Estilo del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  display: "flex",
  gap: 2,
  p: 4,
};

// Componente principal para la gestión de pasillos
const Aisles = ({ storehouses }) => {
  // Hooks personalizados para manejar datos de pasillos y autenticación
  const {
    loadAllAisles,
    allAisles,
    loaderAisles,
    allZones,
    rows,
    loadAddAisle,
    loadUpdateAisle,
    loadDeleteAisle,
  } = useWarehouse();

  // Estados locales para manejar el modal y el popover
  const [open, setOpen] = useState({ value: false, aisle: {}, type: "" });
  const [openPopover, setOpenPopover] = useState(null);

  // Hook para manejar formularios
  const { control, handleSubmit, reset } = useForm();

  // Obtener el tipo de usuario desde el estado de autenticación
  const { user } = useAuthStore();
  const typeUser = user.type_user.role;

  // Cargar todos los pasillos al montar el componente
  useEffect(() => {
    loadAllAisles();
  }, []);

  // Obtener las filas de los pasillos
  const rowsAisles = rows(allAisles) || [];

  // Abrir el modal para agregar o editar un pasillo
  const handleOpen = (aisle = {}, type) => {
    setOpen({ value: true, aisle, type });
  };

  // Cerrar el modal y resetear el formulario
  const handleClose = () => {
    setOpen({ value: false, aisle: {}, type: "" });
    reset();
  };

  // Manejar el envío del formulario para agregar o actualizar un pasillo
  const OnSubmit = (data) => {
    if (open.type === "Add") {
      loadAddAisle(data, handleClose);
    } else if (open.type === "Update") {
      const id = open.aisle._id;
      loadUpdateAisle(id, data, handleClose);
    }
  };

  // Abrir el popover para mostrar opciones de edición/eliminación
  const handleOpenPopover = useCallback((event, row) => {
    setOpenPopover(event.currentTarget);
    setOpen((prev) => ({ ...prev, aisle: row }));
  }, []);

  // Cerrar el popover
  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Mostrar un esqueleto de carga mientras se cargan los datos
  if (loaderAisles) {
    return <Skeleton variant="rounded" width={"100%"} height={"100%"} />;
  }

  return (
    <Grid2 container>
      {/* Encabezado de la página con el título y botón para agregar pasillo */}
      <Grid2
        size={12}
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        <Typography variant="h5">
          <strong>Pasillos</strong>
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "capitalize", borderRadius: "10px" }}
          color="secondary"
          onClick={() => handleOpen({}, "Add")}
        >
          <Add /> Agregar pasillo
        </Button>
      </Grid2>

      {/* Tabla para mostrar los pasillos */}
      <Grid2 size={12}>
        <TableContainer variant="elevation" component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Zona</StyledTableCell>
                {typeUser.includes("SUPER-ADMIN") || typeUser.includes("ADMIN") ? (
                  <StyledTableCell>Cedis</StyledTableCell>
                ) : null}
                <StyledTableCell align="right">Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsAisles.map((row) => (
                <StyledTableRow key={row.id || row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.zone?.name}</StyledTableCell>
                  {typeUser.includes("SUPER-ADMIN") || typeUser.includes("ADMIN") ? (
                    <StyledTableCell component="th" scope="row">
                      {row.storehouse.name}
                    </StyledTableCell>
                  ) : null}
                  <StyledTableCell align="right">
                    <IconButton onClick={(e) => handleOpenPopover(e, row)}>
                      <MoreVert />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>

      {/* Modal para agregar o editar pasillos */}
      <Modal open={open.value} onClose={handleClose}>
        <Grid2
          container
          sx={style}
          component="form"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <Typography marginBottom={3} variant="h6">
            {open.type === "Add" ? "Agregar pasillo" : "Editar pasillo"}
          </Typography>

          {/* Campo para seleccionar la zona */}
          <Controller
            name="zone"
            control={control}
            defaultValue={open.aisle?.zone?._id}
            rules={{ required: "Campo requerido" }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={fieldState.invalid}>
                <InputLabel>Seleccione zona</InputLabel>
                <Select {...field} label="Seleccione zona">
                  {allZones.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* Campo para ingresar el nombre del pasillo */}
          <Controller
            name="name"
            control={control}
            defaultValue={open.aisle?.name}
            rules={{ required: "Valor requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Nombre del pasillo"
                placeholder="E, A, B, C, etc."
                fullWidth
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Campo para seleccionar el CEDIS (solo para usuarios con permisos) */}
          {typeUser.includes("SUPER-ADMIN") || typeUser.includes("ADMIN") ? (
            <Controller
              name="storehouse"
              control={control}
              defaultValue={open.aisle?.storehouse?._id}
              rules={{ required: "Campo requerido" }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={fieldState.invalid}>
                  <InputLabel>CEDIS</InputLabel>
                  <Select {...field} label="Tipo de zona">
                    {storehouses.map((item) => (
                      <MenuItem key={item.key} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          ) : null}

          {/* Botones para cancelar o guardar */}
          <Grid2 display="flex" gap={1} size={12}>
            <Button
              fullWidth
              onClick={handleClose}
              variant="contained"
              color="error"
            >
              Cancelar
            </Button>
            <Button fullWidth type="submit" variant="contained" color="success">
              Guardar
            </Button>
          </Grid2>
        </Grid2>
      </Modal>

      {/* Popover para opciones de edición y eliminación */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleOpen(open.aisle, "Update");
            }}
          >
            <Edit fontSize="small" color="info" /> Editar
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              loadDeleteAisle(open.aisle._id);
            }}
          >
            <Delete fontSize="small" color="warning" /> Eliminar
          </MenuItem>
        </MenuList>
      </Popover>
    </Grid2>
  );
};

export default Aisles;