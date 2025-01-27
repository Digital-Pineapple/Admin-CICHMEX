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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: teal[700],
    color: theme.palette.common.white,
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableSizesActions = ({ items = [], handleOpenUpdate, deleteVariant }) => {
  const rows = items?.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
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
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell acomponent="th" scope="row">
                <strong>{row.attributes.size}</strong>
              </StyledTableCell>
              <StyledTableCell acomponent="th" scope="row">
                {row?.purchase_price}
              </StyledTableCell>
              <StyledTableCell acomponent="th" scope="row">
                {row.price}
              </StyledTableCell>
              <StyledTableCell acomponent="th" scope="row">
                {row.porcentDiscount}
              </StyledTableCell>
              <StyledTableCell acomponent="th" scope="row">
                {row.discountPrice}
              </StyledTableCell>
              <StyledTableCell acomponent="th" scope="row">
                {row.weight}
              </StyledTableCell>
              <StyledTableCell acomponent="th" scope="row">
                {
                  <>
                    <IconButton
                      aria-label="Editar variante"
                      onClick={() => handleOpenUpdate(row)}
                      title="Editar"
                      color="info"
                    >
                      <Edit />
                    </IconButton>{" "}
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
