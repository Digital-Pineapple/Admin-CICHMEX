import {
  Avatar,
  Chip,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import renderStatus from "./RenderStatus";
import { localDate } from "../../../Utils/ConvertIsoDate";

// Componente principal que muestra los detalles de una tabla
const TableDetail = ({ user, location, typeDelivery, status, date }) => {
  
  // Si no hay información del usuario, no renderiza nada
  if (!user) return null;

  return (
    <Grid2 size={12}>
      {/* Contenedor de la tabla con estilo personalizado */}
      <TableContainer
        variant="outlined"
        sx={{ borderRadius: "20px" }}
        component={Paper}
      >
        {/* Tabla que muestra los detalles del usuario */}
        <Table sx={{ minWidth: 500 }} aria-label="User Table">
          <TableBody>
            {/* Fila que muestra el nombre completo del cliente */}
            <TableRow>
              <TableCell sx={{color:'gray'}} >Cliente</TableCell>
              <TableCell>
                <Typography variant="body1" color="success">
                  <strong>{user.fullname}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            {/* Fila que muestra el correo electrónico del cliente */}
            <TableRow>
              <TableCell sx={{color:'gray'}} >Correo Electrónico</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            {/* Fila que muestra la fecha */}
            <TableRow>
              <TableCell sx={{color:'gray'}} >Fecha</TableCell>
              <TableCell>{localDate(date)}</TableCell>
            </TableRow>
            {/* Fila que muestra la dirección del cliente */}
            <TableRow>
              <TableCell sx={{color:'gray'}} >Dirección</TableCell>
              <TableCell>{`${location?.street ? location?.street : location?.direction},
             ${location?.numext ? location?.numext : ""},
             ${location?.numint ? location?.numint : ""},
             ${location?.neighborhood},
             ${location?.municipality},
              ${location?.state},
              ${location?.country ? location?.country : ""},
              ${location?.zipcode ? location?.zipcode : location?.cp},
             `}</TableCell>
            </TableRow>
            {/* Fila que muestra el tipo de envío */}
            <TableRow>
              <TableCell sx={{color:'gray'}} >Tipo de envio</TableCell>
              <TableCell>
                {typeDelivery === "homedelivery"
                  ? "Envio a domicilio"
                  : "En punto de entrega"}
              </TableCell>
            </TableRow>
            {/* Fila que muestra el estado del pedido */}
            <TableRow>
              <TableCell sx={{color:'gray'}} >Status</TableCell>
              <TableCell>{renderStatus(status)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid2>
  );
};

export default TableDetail;
