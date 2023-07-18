import { useEffect, useLayoutEffect, useState } from "react";
import Titles from "../../components/ui/Titles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import WarningAlert from "../../components/ui/WarningAlert";
import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCommissions } from "../../hooks/useCommissions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CC3C5C",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Commissions = () => {
  const { loadCommissions, deleteCommission } = useCommissions();
  const { commissions } = useSelector((state) => state.commissions);
  const [comx, setComx] = useState(commissions);
  const navigate = useNavigate();

  useEffect(() => {
    if (commissions) {
      setComx(commissions);
    }
  }, [commissions]);

  useEffect(() => {
    loadCommissions();
  }, []);

  const createCommission = () => {
    navigate("/auth/crearComisiones", { replace: true });
  };
  return (
    <>
      <Grid marginX={"240px"}>
        <Titles name={<h2 align="center">Comisiones</h2>} />
        <Button
          variant="contained"
          disableElevation
          sx={{ color: "#CC3C5C", my: 5, p: 2, borderRadius: 5 }}
          onClick={createCommission}
        >
          Registrar nueva comision
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="tabla de comisiones">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Monto</StyledTableCell>
                <StyledTableCell align="center">Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comx.map((commission) => (
                <TableRow key={commission._id}>
                  <TableCell component="th" scope="row">
                    {commission.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {commission?.amount}
                  </TableCell>
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <WarningAlert
                      route={commission._id}
                      title="¿Estas seguro que deseas eliminar esta comisión?"
                      callbackToDeleteItem={() =>
                        deleteCommission(commission._id)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Box display="flex" justifyContent="center" py={10}>
        <Pagination count={10} color="primary" />
      </Box>
    </>
  );
};

export default Commissions;
