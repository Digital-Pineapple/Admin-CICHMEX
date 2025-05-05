import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Grid2, Grow, IconButton, Grid } from "@mui/material";
import { Close } from "@mui/icons-material";
import TableDetail from "./TablesDetail/TableDetail";
import TableProductList from "./TablesDetail/TableProductList";
import { maxHeight } from "@mui/system";

// Estilo del modal
const style = {
  position: "absolute",
  top: "4%",
  right: 20,
  width: 600,
  height: "92%",
  bgcolor: "background.paper",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 4,
};

const ModalDetailSale = ({ open, handleClose, sale = {} }) => {
 
  
  return (
    <div>
      {/* Modal principal con transición */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.49)", // Fondo semitransparente
            },
          },
        }}
      >
        {/* Contenido del modal con efecto de desvanecimiento */}
        <Fade in={open}>
          <Grid2 container sx={style}>
            {/* Encabezado del modal */}
            <Grid2
              size={12}
              height={"25px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              {/* Título del modal que muestra el ID del pedido */}
              <Typography
                id="transition-modal-title"
                variant="h6"
                fontSize={"18px"}
                component="h2"
              >
                {sale?.order_id}
              </Typography>
              {/* Botón para cerrar el modal */}
              <IconButton
                sx={{ borderRadius: "5px" }}
                aria-label=""
                onClick={() => handleClose()}
              >
                <Close />
              </IconButton>
            </Grid2>

            {/* Contenido principal del modal */}
            <Grid2 sx={{ maxHeight: "100%", overflow: "auto" }} container>
              {/* Sección de detalles */}
              <Grid2 size={12}>
                <Typography
                  marginY={2}
                  fontSize={"18px"}
                  id="transition-modal-description"
                  sx={{ mt: 2 }}
                >
                  <strong>Detalles</strong>
                </Typography>
                {/* Tabla con detalles del pedido */}
                <TableDetail
                  user={sale?.user_id}
                  typeDelivery={sale?.typeDelivery}
                  status={sale?.payment_status}
                  date={sale?.date}
                  location={
                    sale?.branch ? sale.branch.location : sale?.deliveryLocation
                  }
                  order_status={sale?.order_status}
                />
              </Grid2>

              {/* Sección de lista de productos */}
              <Grid2 size={12}>
                <Typography
                  marginY={2}
                  fontSize={"18px"}
                  id="product-modal-list"
                  sx={{ mt: 2 }}
                >
                  <strong>Lista de productos</strong>
                </Typography>
                {/* Tabla con la lista de productos */}
                <TableProductList
                  products={sale?.products}
                  shippingCost={sale?.shipping_cost}
                  discount={sale?.discount}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalDetailSale;
