import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { CardContent, IconButton, Skeleton, Grid, Avatar } from "@mui/material";
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

const ProductDetailModal = ({ openModal, handleClose, product = {} }) => {
  const videoVertical = product?.videos?.find((i) => i.type === "vertical");
  const videoHorizontal = product?.videos?.find((i) => i.type === "horizontal");

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
          backdrop: { timeout: 500 },
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
                    <IconButton title="Cerrar" onClick={handleClose}>
                      <Close />
                    </IconButton>
                  }
                />
                <Grid container justifyContent={"center"} spacing={2}>
                  <Grid item xs={videoHorizontal || videoVertical ? 4 : 12} sx={{ maxHeight: "300px" }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: "200px",
                        borderRadius: "10px",
                        objectFit: "contain",
                        display: product.images?.[0]?.url ? 'block' : 'none'
                      }}
                      
                      image={product.images?.[0]?.url || ""}
                      title="Imagen principal"
                    />
                  </Grid>
                  {(videoHorizontal || videoVertical) && (
                    <Grid item xs={8}>
                      <Grid container spacing={1}>
                        {videoVertical && (
                          <Grid item xs={videoHorizontal ? 6 : 12}>
                            <Typography variant="body1" textAlign={"center"}>Video Vertical</Typography>
                            <CardMedia
                              sx={{ height: "200px", borderRadius: "10px" }}
                              component="video"
                              controls
                              title="Video Vertical"
                              src={videoVertical.url}
                            />
                          </Grid>
                        )}
                        {videoHorizontal && (
                          <Grid item xs={videoVertical ? 6 : 12}>
                            <Typography variant="body1" textAlign={"center"}>Video Horizontal</Typography>
                            <CardMedia
                              sx={{ height: "200px", borderRadius: "10px" }}
                              component="video"
                              controls
                              title="Video Horizontal"
                              src={videoHorizontal.url}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <SlideSwiperImages images={product.images} />
                  </Grid>
                </Grid>
              </>
            ) : (
              <Skeleton variant="rectangular" width={"500px"} height={"500px"} />
            )}
            <CardContent>
              <Typography variant="body1" color="initial">
                <i>Precio de producto:</i> <strong>${product?.price}</strong>{" "}
                <br />
                <i>Descuento:</i> <strong>{product?.porcentDiscount}%</strong>
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
                <i>Subcategoría:</i> <strong>{product.subCategory?.name}</strong>
              </Typography>
            </CardContent>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ProductDetailModal;
