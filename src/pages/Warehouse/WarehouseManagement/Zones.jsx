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
  menuItemClasses,
} from "@mui/material";
import { useWarehouse } from "../../../hooks";
import { useCallback, useEffect, useState } from "react";
import { Add, Edit, MoreVert } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: teal[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

const Zones = () => {
  const {
    loadAllZones,
    allZones,
    loaderZones,
    rows,
    RenderTypeZone,
    TypesZones,
    loadAddZone,
  } = useWarehouse();

  const [open, setOpen] = useState({ value: false, zone: {}, type: "" });
  const [openPopover, setOpenPopover] = useState(null);

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    loadAllZones();
  }, []);

  const rowsZones = rows(allZones) || [];

  const handleOpen = (zone = {}, type) => {
    setOpen({ value: true, zone, type });
  };
  const handleClose = () => {
    setOpen({ value: false, zone: {}, type: "" });
    reset();
  };

  console.log(open);

  const OnSubmit = (data) => {
    if (open.type === "Add") {
      loadAddZone(data, handleClose);
    } else if (open.type === "Update") {
      console.log("Actualizar zona:", open.zone.id, data);
      // Aquí debes agregar la función que actualiza la zona
    }
  };

  const handleOpenPopover = useCallback((event, row) => {
    setOpenPopover(event.currentTarget);
    setOpen((prev) => ({ ...prev, zone: row }));
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  

  return (
    <Grid2 container paddingX={{ xs: 5, lg: 15 }}>
      {loaderZones ? (
        <Skeleton variant="rounded" width={"100%"} height={"100%"} />
      ) : (
        <>
          <Grid2
            size={12}
            flexGrow={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={1}
          >
            <Typography variant="h5">
              <strong>Zonas</strong>
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "capitalize", borderRadius: "10px" }}
              color="success"
              onClick={() => handleOpen({}, "Add")}
            >
              <Add /> Nueva zona
            </Button>
          </Grid2>

          <Grid2 size={12}>
            <TableContainer variant="elevation" component={Paper}>
              <Table sx={{ minWidth: 700 }} size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nombre</StyledTableCell>
                    <StyledTableCell>Tipo de zona</StyledTableCell>
                    <StyledTableCell align="right">Opciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsZones.map((row) => (
                    <StyledTableRow key={row.id || row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>
                        {RenderTypeZone(row.type)}
                      </StyledTableCell>
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
        </>
      )}

      <Modal open={open.value} onClose={handleClose}>
        <Grid2
          container
          sx={style}
          component="form"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <Typography marginBottom={3} variant="h6">
            Agregar nueva zona
          </Typography>

          <Controller
            name="name"
            control={control}
            defaultValue={open.zone?.name}
            rules={{ required: "Valor requerido" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Nombre de la zona"
                fullWidth
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            defaultValue={open.zone?.type}
            rules={{ required: "Campo requerido" }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={fieldState.invalid}>
                <InputLabel>Tipo de zona</InputLabel>
                <Select {...field} label="Tipo de zona">
                  {TypesZones.map((item) => (
                    <MenuItem key={item.key} value={item.key}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
              </FormControl>
            )}
          />

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
              handleOpen(open.zone, "Update");
            }}
          >
            <Edit fontSize="small" color="info" /> Editar
          </MenuItem>
        </MenuList>
      </Popover>
    </Grid2>
  );
};

export default Zones;
