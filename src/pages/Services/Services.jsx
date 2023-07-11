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
import { useCategories } from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { ImputSearchServices } from "../../components/ui/ImputSearchServices";
import { useServices } from "../../hooks/useServices";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CC3C5C",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Services = () => {
  
  const { loadServices,deleteService} = useServices();
  const { services } = useSelector((state) => state.services);
  const [filteredServices, setFilteredServices] = useState(services);
  const [serv, setServ] = useState(services);
  const navigate = useNavigate();
  
  const handleServicesChange = (newServices) => {
    setServ([]);
    setFilteredServices(newServices);
  };

  useEffect(() => {
    if (services) {
        setServ(services);
    }
  }, [services]);
  
  useEffect(() => {
    loadServices();
  }, []);

  
const createService = () => {
  navigate('/auth/createService', {replace:true})
}
  return (
    <>
      <Grid marginX={"240px"}>
        <Titles name={<h2 align="center">Servicios</h2>} />
        <Button
          variant="contained"
          disableElevation
          sx={{ color: "#CC3C5C", my: 5, p: 2, borderRadius: 5 }}
          onClick={createService}
        >
          Registrar nuevo servicio
        </Button>
        <ImputSearchServices
          services={services}
          values={handleServicesChange}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell align="center">Descripcion</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Opciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            {filteredServices.length != 0
                ? filteredServices.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell component="th" scope="row">
                        {service.name}
                      </TableCell>
                      <TableCell align="center">{service?.description}</TableCell>
                      <TableCell component="th" scope="row" align="center">{service?.services !== true ? 'Activo' : 'Inactivo'}</TableCell>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <WarningAlert
                          route={service._id}
                          title="Estas seguro que deseas eliminar la categoria?"
                          callbackToDeleteItem={() =>
                            deleteService(service._id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                : 
               ( serv.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell component="th" scope="row">
                        {service.name}
                      </TableCell>
                      <TableCell align="center">{service?.description}</TableCell>
                      <TableCell component="th" scope="row" align="center">{service?.services !== true ? 'Activo' : 'Inactivo'}</TableCell>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <WarningAlert
                          route={service._id}
                          title="¿Estas seguro que deseas eliminar a la categoria?"
                          callbackToDeleteItem={() =>
                            deleteService(service._id)
                          }
                        />
                      </TableCell>
                    </TableRow>)
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

export default Services;
