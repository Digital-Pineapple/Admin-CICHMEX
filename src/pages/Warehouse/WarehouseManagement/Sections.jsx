// Importación de componentes y librerías necesarias
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
import { Add, Delete, Edit, MoreVert, QrCode } from "@mui/icons-material";
import { grey, teal } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import { FilePdfFilled } from "@ant-design/icons";

// Estilización personalizada de las celdas de la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: teal[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Estilización personalizada de las filas de la tabla
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Estilo para el modal
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

const Sections = () => {
  // Hooks personalizados para manejar datos y acciones relacionadas con las secciones
  const {
    loadAllSections, // Cargar todas las secciones
    allSections, // Lista de todas las secciones
    rows, // Transformar datos en filas
    loaderSections, // Indicador de carga
    allAisles, // Lista de pasillos
    loadDeleteSection, // Eliminar una sección
    loadAddSection, // Agregar una nueva sección
    loadUpdateSection, // Actualizar una sección existente
    loadSectionPDF, // Descargar PDF de una sección
  } = useWarehouse();

  // Estados locales para manejar el modal y el popover
  const [open, setOpen] = useState({ value: false, section: {}, type: "" });
  const [openPopover, setOpenPopover] = useState(null);

  // Controlador de formularios
  const { control, handleSubmit, reset } = useForm();

  // Información del usuario autenticado
  const { user } = useAuthStore();
  const typeUser = user.type_user.role;

  // Efecto para cargar las secciones al montar el componente
  useEffect(() => {
    loadAllSections();
  }, []);

  // Transformar las secciones en filas para la tabla
  const rowsSections = rows(allSections) || [];

  // Abrir el modal para agregar o editar una sección
  const handleOpen = (section = {}, type) => {
    setOpen({ value: true, section, type });
  };

  // Cerrar el modal
  const handleClose = () => {
    setOpen({ value: false, section: {}, type: "" });
    reset();
  };

  // Manejar el envío del formulario para agregar o actualizar una sección
  const OnSubmit = (data) => {
    if (open.type === "Add") {
      loadAddSection(data, handleClose);
    } else if (open.type === "Update") {
      const id = open.section._id;
      loadUpdateSection(id, data, handleClose);
    }
  };

  // Abrir el popover de opciones
  const handleOpenPopover = useCallback((event, row) => {
    setOpenPopover(event.currentTarget);
    setOpen((prev) => ({ ...prev, section: row }));
  }, []);

  // Cerrar el popover de opciones
  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  // Mostrar un indicador de carga si los datos aún no están disponibles
  if (loaderSections) {
    return <Skeleton variant="rounded" width={"100%"} height={"100%"} />;
  }

  return (
    <Grid2 container>
      {/* Encabezado con el título y botón para agregar secciones */}
      <Grid2
        size={12}
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
      >
        <Typography variant="h5">
          <strong>Secciones</strong>
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "capitalize", borderRadius: "10px" }}
          color="secondary"
          onClick={() => handleOpen({}, "Add")}
        >
          <Add /> Agregar Secciones
        </Button>
      </Grid2>

      {/* Tabla para mostrar las secciones */}
      <Grid2 size={12}>
        <TableContainer variant="elevation" component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Pasillo</StyledTableCell>
                <StyledTableCell>Cedis</StyledTableCell>
                <StyledTableCell align="right">Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsSections.map((row) => (
                <StyledTableRow key={row.id || row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell>{row.aisle.name}</StyledTableCell>
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

      {/* Modal para agregar o editar secciones */}
      <Modal open={open.value} onClose={handleClose}>
        <Grid2
          container
          sx={style}
          component="form"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <Typography marginBottom={3} variant="h6">
            {open.type === "Add" ? "Agregar sección" : "Editar sección"}
          </Typography>

          {/* Campo para seleccionar el pasillo */}
          <Controller
            name="aisle"
            control={control}
            defaultValue={open.section.aisle?._id}
            rules={{ required: "Campo requerido" }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={fieldState.invalid}>
                <InputLabel>Seleccione pasillo</InputLabel>
                <Select {...field} label="Seleccione pasillo">
                  {allAisles.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* Campo para ingresar el nombre de la sección */}
          <Controller
            name="name"
            control={control}
            defaultValue={open.section?.name}
            rules={{ required: "Valor requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Nombre de sección"
                placeholder="Ej 1, 2, 3"
                fullWidth
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />

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

      {/* Popover con opciones para cada sección */}
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
          {/* Opción para descargar el código QR */}
          <MenuItem
            onClick={() => {
              handleClosePopover();
              loadSectionPDF(open.section._id);
            }}
          >
            <QrCode fontSize="small" color="warning" /> Código
          </MenuItem>
          {/* Opción para editar la sección */}
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleOpen(open.section, "Update");
            }}
          >
            <Edit fontSize="small" color="info" /> Editar
          </MenuItem>
          {/* Opción para eliminar la sección */}
          <MenuItem
            onClick={() => {
              handleClosePopover();
              loadDeleteSection(open.section._id);
            }}
          >
            <Delete fontSize="small" color="warning" /> Eliminar
          </MenuItem>
        </MenuList>
      </Popover>
    </Grid2>
  );
};

export default Sections;
