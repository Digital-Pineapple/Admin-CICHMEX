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

const style = {
  position: "absolute",
  top: "4%",
  right: 20,
  width: 600,
  height: "92%",
  // maxHeight:'92%',
  // overflow:'auto',
  bgcolor: "background.paper",
  borderRadius: "10px ",
  boxShadow: 24,
  p: 4,
};

const ModalDetailSale = ({ open, handleClose, sale = {} }) => {

  return (
    <div>
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
              backgroundColor: "rgba(0, 0, 0, 0.49)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Grid2 container sx={style}>
            <Grid2
              size={12}
              height={"25px"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                fontSize={"18px"}
                component="h2"
              >
                {sale?.order_id}
              </Typography>
              <IconButton
                sx={{ borderRadius: "5px" }}
                aria-label=""
                onClick={() => handleClose()}
              >
                <Close />
              </IconButton>
            </Grid2>
            <Grid2 sx={{maxHeight:'100%', overflow:'auto'}} container>  
            <Grid2 size={12}>
              <Typography
                marginY={2}
                fontSize={"18px"}
                id="transition-modal-description"
                sx={{ mt: 2 }}
              >
                <strong>Detalles</strong>
              </Typography>
              <TableDetail
                user={sale?.user_id}
                typeDelivery={sale?.typeDelivery}
                status={sale?.payment_status}
                date={sale?.date}
                location={
                  sale?.branch ? sale.branch.location : sale?.deliveryLocation
                }
              />
            </Grid2>
            <Grid2 size={12}>
            <Typography
                marginY={2}
                fontSize={"18px"}
                id="product-modal-list"
                sx={{ mt: 2 }}
              >
                <strong>Lista de productos</strong>
              </Typography>
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
