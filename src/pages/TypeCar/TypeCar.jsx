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
import InputSearch1 from "../../components/ui/InputSearch";
import { useSelector } from "react-redux";
import { useCategories } from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { useTypeCars } from "../../hooks/UseTypeCars";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CC3C5C",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TypeCar = () => {
  const { loadTypeCars,deleteTypeCar} = useTypeCars();
  const { typeCars } = useSelector((state) => state.typeCars);
  const [carx, setCarx] = useState(typeCars);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (typeCars) {
        setCarx(typeCars);
    }
  }, [typeCars]);
  
  useEffect(() => {
    loadTypeCars();
  }, []);
  
const createTypeCar = () => {
  navigate('/auth/createTypeCar', {replace:true})
}
  return (
    <>
      <Grid marginX={"240px"}>
        <Titles name={<h2 align="center">Tipos de autos</h2>} />
        <Button
          variant="contained"
          disableElevation
          sx={{ color: "#CC3C5C", my: 5, p: 2, borderRadius: 5 }}
          onClick={createTypeCar}
        >
          Registrar nuevo tipo de auto
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="tabla de autos">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Estado</StyledTableCell>
                <StyledTableCell align="center">Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carx.map((typeCar) => (
                    <TableRow key={typeCar._id}>
                      <TableCell component="th" scope="row">
                        {typeCar.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">{typeCar?.status === true ? 'Activo': 'Inactivo'}</TableCell>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <WarningAlert
                          route={typeCar._id}
                          title="¿Estas seguro que deseas eliminar el tipo de auto?"
                          callbackToDeleteItem={() =>
                            deleteTypeCar(typeCar._id)
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

export default TypeCar;