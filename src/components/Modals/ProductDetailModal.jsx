import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { CardContent, IconButton, Skeleton, Grid } from "@mui/material";
import { Close } from "@mui/icons-material";
import SlideSwiperImages from "../Images/SlideSwiperImages";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const ProductDetailModal = ({ openModal, handleClose, product }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            {product ? (
              <>
                <CardHeader
                  title={`Nombre : ${product?.name}`}
                  subheader={`SKU: ${product?.sku}, STOCK: ${product.stock}`}
                  action={
                    <IconButton title="Cerrar" onClick={() => handleClose()}>
                      <Close />
                    </IconButton>
                  }
                />
                <Grid container justifyContent={"center"} spacing={2}>
                  <Grid item xs={5.5}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: "200px",
                        borderRadius: "10px",
                        objectFit: "contain",
                      }}
                      image={product.images ? product.images[0]?.url : ""}
                      title="Imagen principal"
                    />
                  </Grid>
                  <Grid item xs={5.5}>
                    <CardMedia
                      sx={{ height: "200px", borderRadius: "10px" }}
                      component={"video"}
                      controls
                      title="Video"
                      src={product?.videos}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SlideSwiperImages images={product.images} />
                  </Grid>
                </Grid>
              </>
            ) : (
              <Skeleton
                variant="rectangular"
                width={"500px"}
                height={"500px"}
              />
            )}
            <CardContent>
              <Typography variant="body1" color="initial">
                <i>Precio de producto:</i> <strong>${product?.price}</strong>{" "}
                <br />
                <i>Descuento:</i> <strong> {product?.porcentDiscount}%</strong>
                <br />
                <i>Precio con descuento:</i>{" "}
                <strong>${product?.discountPrice}</strong>
                <br />
                <i>Descripción:</i> <strong>{product?.description}</strong>
                <br />
                <i>Descripción corta:</i>{" "}
                <strong>{product?.shortDescription}</strong>
                <br />
                <i>Marca:</i> <strong>{product?.brand}</strong>
                <br />
                <i>Categoría:</i> <strong>{product.category?.name}</strong>{" "}
                <br />
                <i>Subcategoría:</i>{" "}
                <strong>{product.subCategory?.name}</strong>
              </Typography>
            </CardContent>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ProductDetailModal;
