import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { fontSize } from "@mui/system";
import { teal } from "@mui/material/colors";

// Estiliza las celdas de la tabla, diferenciando entre encabezados y cuerpo
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: teal[700], // Color de fondo para el encabezado
    color: theme.palette.common.white, // Color de texto blanco
    fontSize: 12, // Tamaño de fuente para el encabezado
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, // Tamaño de fuente para el cuerpo
  },
}));

// Estiliza las filas de la tabla, incluyendo un fondo alternado para filas impares
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover, // Fondo para filas impares
  },
  // Oculta el borde de la última fila
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Componente principal que renderiza una tabla con datos y acciones
const TableSizesActions = ({ items = [], handleOpenUpdate, deleteVariant }) => {
  // Mapea los elementos recibidos y les asigna un id único
  const rows = items?.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));

  return (
    <TableContainer component={Paper}>
      {/* Tabla personalizada */}
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          {/* Encabezado de la tabla */}
          <TableRow>
            <StyledTableCell>Talla</StyledTableCell>
            <StyledTableCell>Precio de compra </StyledTableCell>
            <StyledTableCell>Precio neto</StyledTableCell>
            <StyledTableCell>
              Descuento <br /> (%)
            </StyledTableCell>
            <StyledTableCell>Precio Total</StyledTableCell>
            <StyledTableCell>Peso</StyledTableCell>
            <StyledTableCell>Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Renderiza las filas de la tabla con los datos */}
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              {/* Columna: Talla */}
              <StyledTableCell acomponent="th" scope="row">
                <strong>{row.attributes.size}</strong>
              </StyledTableCell>
              {/* Columna: Precio de compra */}
              <StyledTableCell acomponent="th" scope="row">
                {row?.purchase_price}
              </StyledTableCell>
              {/* Columna: Precio neto */}
              <StyledTableCell acomponent="th" scope="row">
                {row.price}
              </StyledTableCell>
              {/* Columna: Descuento */}
              <StyledTableCell acomponent="th" scope="row">
                {row.porcentDiscount}
              </StyledTableCell>
              {/* Columna: Precio Total */}
              <StyledTableCell acomponent="th" scope="row">
                {row.discountPrice}
              </StyledTableCell>
              {/* Columna: Peso */}
              <StyledTableCell acomponent="th" scope="row">
                {row.weight}
              </StyledTableCell>
              {/* Columna: Opciones (Editar y Eliminar) */}
              <StyledTableCell acomponent="th" scope="row">
                {
                  <>
                    {/* Botón para editar la variante */}
                    <IconButton
                      aria-label="Editar variante"
                      onClick={() => handleOpenUpdate(row)}
                      title="Editar"
                      color="info"
                    >
                      <Edit />
                    </IconButton>{" "}
                    {/* Botón para eliminar la variante */}
                    <IconButton
                      title="Eliminar"
                      color="warning"
                      aria-label="Eliminar variante"
                      onClick={() => deleteVariant(row._id)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSizesActions;
