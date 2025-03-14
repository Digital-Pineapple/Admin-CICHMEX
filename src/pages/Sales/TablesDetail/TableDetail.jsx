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
const TableDetail = ({ user, location, typeDelivery, status, date }) => {
  
  if (!user) return null;
  return (
    <Grid2 size={12}>
      <TableContainer
        variant="outlined"
        sx={{ borderRadius: "20px" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 500 }} aria-label="User Table">
          <TableBody>
            <TableRow>
              <TableCell sx={{color:'gray'}} >Cliente</TableCell>
              <TableCell>
                <Typography variant="body1" color="success">
                  <strong>{user.fullname}</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{color:'gray'}} >Correo Electrónico</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{color:'gray'}} >Fecha</TableCell>
              <TableCell>{date}</TableCell>
            </TableRow>
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
            <TableRow>
              <TableCell sx={{color:'gray'}} >Tipo de envio</TableCell>
              <TableCell>
                {typeDelivery === "homedelivery"
                  ? "Envio a domicilio"
                  : "En punto de entrega"}
              </TableCell>
            </TableRow>
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
