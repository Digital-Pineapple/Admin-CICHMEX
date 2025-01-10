import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { Add, Close, MoreVertOutlined } from "@mui/icons-material";
import {
  Grid2,
  Box,
  IconButton,
  Modal,
  Fab,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useSizeGuide } from "../../../hooks/useSizeGuide";
import { useProducts } from "../../../hooks";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";
import { useParams } from "react-router-dom";
import UpdateVariant from "./UpdateVariant";
import SlideSwiperVariantImages from "../../../components/Images/SlideSwiperVariantImages";
import TableSizesActions from "../../../components/Tables/TableSizesActions";
import UpdateVariantColor from "./UpdateVariantColor";
import VariantImagesUpdate from "../../../components/Forms/VariantImagesUpdate";
import AddVariantModal from "./AddVariantModal";
import { maxHeight } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #bbdefb",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
};
const styleFull = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #bbdefb",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  boxShadow: 24,
  maxHeight:'90vh',
  p: 4,
};
const VariantsAndPhotosShoes = () => {
  const { id } = useParams();
  const { loading, loadProduct, product, deleteVariant } = useProducts();
  const [open, setOpen] = useState({ image: null, value: false });
  const [openUpdateVariant, setOpenUpdateVariant] = useState({
    variant: {},
    value: false,
  });
  const [openUpdateColor, setOpenUpdateColor] = useState({
    data: {},
    color: "",
    value: false,
  });
  const [openUpdateImages, setOpenUpdateImages] = useState({
    images: [],
    product_id: null,
    color: null,
    value: false,
  });

  const [openAddVariant, setOpenAddVariant] = useState(false);

  const [anchorEl, setAnchorEl] = useState({ value: null, color: null });
  const openMore = Boolean(anchorEl.value);

  const handleClickMore = (event, color) => {
    setAnchorEl({ value: event.currentTarget, color: color });
  };
  const handleCloseMore = () => {
    setAnchorEl({ value: null, color: null });
  };

  const handleOpenColor = (data) => {
    setOpenUpdateColor({ data: data, color: anchorEl.color, value: true });
  };
  const handleCloseColor = () => {
    setOpenUpdateColor({ data: {}, variants_ids: [], value: false });
  };

  const handleOpenAddOneVariant = () => {
    setOpenAddVariant(true)
   };
  const handleCloseAddOneVariant = () => {
    setOpenAddVariant(false);
  };

  const handleOpenImages = (data) => {
    const variant = data.find((i) => i.color === anchorEl.color);
    setOpenUpdateImages({
      images: variant.images,
      color: anchorEl.color,
      product_id: id,
      value: true,
    });
  };
  const handleCloseImages = () => {
    setOpenUpdateImages({ images: [], items: [], value: false });
  };

  const handleOpen = (image) => {
    setOpen({ image: image, value: true });
  };

  const callbackProduct = useCallback(() => {
    loadProduct(id);
  }, [id]);

  useEffect(() => {
    callbackProduct();
  }, [callbackProduct]);

  const handleClose = () => setOpen({ image: null, value: false });

  const grouped = product.variants?.reduce((acc, item) => {
    const color = item.attributes.color;

    // Inicializar la estructura del grupo si no existe
    if (!acc[color]) {
      acc[color] = {
        items: [],
        images: new Set(), // Usar Set para evitar imágenes duplicadas
        design: new Set(),
      };
    }

    // Agregar el objeto actual al grupo
    acc[color].items.push(item);
    acc[color].design.add(item.design);
    item.images.forEach((image) => acc[color].images.add(image.url)); // Iterar sobre imágenes

    return acc;
  }, {});

  const groupedArray = Object.entries(grouped)?.map(
    ([color, { items, images, design }]) => ({
      color,
      items,
      design: Array.from(design),
      images: Array.from(images),
    })
  );

  const handleOpenUpdate = (variant) => {
    setOpenUpdateVariant({ variant: variant, value: true });
  };
  const handleCloseUpdate = () => {
    setOpenUpdateVariant({ variant: {}, value: false });
  };

  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <>
      <Card variant="elevation">
        <CardHeader
          title="Variantes y fotos (ropa y zapatos)"
          action={
            <Button aria-label="add-variant" onClick={()=>handleOpenAddOneVariant()}>
            <Add />Agregar variante
          </Button>
          }
        />
        <CardContent>
          <Grid2 container display={"flex"} gap={2} size={12}>
            {groupedArray.map((item, index) => {
              return (
                <Grid2 size={{ xs: 3.8 }}>
                  <Card variant="elevation">
                    <CardHeader
                      action={
                        <IconButton
                          onClick={(e) => handleClickMore(e, item.color)}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={openMore ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openMore ? "true" : undefined}
                        >
                          <MoreVertOutlined />
                        </IconButton>
                      }
                      title={item.color}
                      subheader={item.design}
                    />
                    <CardContent>
                      <SlideSwiperVariantImages images={item.images} />
                      <TableSizesActions
                        items={item.items}
                        handleOpenUpdate={handleOpenUpdate}
                        deleteVariant={deleteVariant}
                      />
                    </CardContent>
                    <CardActions></CardActions>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </CardContent>
      </Card>

      <Modal
        open={open.value}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleClose}
          >
            <Close />
          </Fab>
          <img
            src={open.image}
            style={{ maxWidth: "80vh", maxHeight: "80vh" }}
          />
        </Box>
      </Modal>
      <Modal
        open={openUpdateVariant.value}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleCloseUpdate}
          >
            <Close />
          </Fab>
          <UpdateVariant
            variantValues={openUpdateVariant.variant}
            handleClose={handleCloseUpdate}
          />
        </Box>
      </Modal>

      <Modal
        open={openUpdateColor.value}
        onClose={handleCloseColor}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleCloseColor}
          >
            <Close />
          </Fab>
          <UpdateVariantColor
            values={openUpdateColor.data}
            color={openUpdateColor.color}
            handleClose={handleCloseColor}
          />
        </Box>
      </Modal>

      <Modal
        open={openUpdateImages.value}
        onClose={handleCloseImages}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleCloseImages}
          >
            <Close />
          </Fab>
          <VariantImagesUpdate
            imagesProduct={openUpdateImages.images}
            idProduct={openUpdateImages.product_id}
            color={openUpdateImages.color}
            handleClose={handleCloseImages}
          />
        </Box>
      </Modal>

      <Modal
        open={openAddVariant}
        onClose={handleCloseAddOneVariant}
        aria-labelledby="modal-add-variant"
        aria-describedby="modal-add-variant"
      >
        <Box sx={styleFull}>
          <Fab
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "red",
              bgcolor: "#fff",
            }}
            onClick={handleCloseAddOneVariant}
          >
            <Close />
          </Fab>
          <AddVariantModal handleCloseModal={handleCloseAddOneVariant}/>
        </Box>
      </Modal>
      <Menu
        anchorEl={anchorEl.value}
        id="variant-menu"
        open={openMore}
        onClose={handleCloseMore}
        onClick={handleCloseMore}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleOpenColor(groupedArray)}>
          Editar color y diseño
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleOpenImages(groupedArray)}>
          Editar imagenes
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Agregar talla</MenuItem>
      </Menu>
    </>
  );
};

export default VariantsAndPhotosShoes;
