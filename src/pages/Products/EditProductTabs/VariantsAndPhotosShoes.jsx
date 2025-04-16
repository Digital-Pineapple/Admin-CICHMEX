import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import { Add, Close, MoreVertOutlined, Refresh } from "@mui/icons-material";
import {
  Grid2,
  Box,
  IconButton,
  Modal,
  Fab,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import { useProducts } from "../../../hooks";
import LoadingScreenBlue from "../../../components/ui/LoadingScreenBlue";
import { useParams } from "react-router-dom";
import UpdateVariant from "./UpdateVariant";
import SlideSwiperVariantImages from "../../../components/Images/SlideSwiperVariantImages";
import TableSizesActions from "../../../components/Tables/TableSizesActions";
import UpdateVariantColor from "./UpdateVariantColor";
import VariantImagesUpdate from "../../../components/Forms/VariantImagesUpdate";
import AddVariantModal from "./AddVariantModal";
import AddSizeModal from "./AddSizeModal";
import Swal from "sweetalert2";
import { green } from "@mui/material/colors";

// Estilos para los modales
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
  maxHeight: "90vh",
  p: 4,
};

const VariantsAndPhotosShoes = () => {
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const { loading, loadProduct, product, deleteVariant, assignMain } =
    useProducts(); // Hook personalizado para manejar productos

  // Estados para manejar la apertura y cierre de modales
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
  const [openAddSize, setOpenAddSize] = useState({
    value: false,
    sizes: [],
    variant: {},
    product_id: "",
  });

  // Estado para manejar el menú contextual
  const [anchorEl, setAnchorEl] = useState({ value: null, color: null });
  const openMore = Boolean(anchorEl.value);

  // Función para abrir el menú contextual
  const handleClickMore = (event, color) => {
    setAnchorEl({ value: event.currentTarget, color: color });
  };

  // Función para cerrar el menú contextual
  const handleCloseMore = () => {
    setAnchorEl({ value: null, color: null });
  };

  // Función para abrir el modal de actualización de color
  const handleOpenColor = (data) => {
    setOpenUpdateColor({ data: data, color: anchorEl.color, value: true });
  };

  // Función para cerrar el modal de actualización de color
  const handleCloseColor = () => {
    setOpenUpdateColor({ data: {}, variants_ids: [], value: false });
  };

  // Función para abrir el modal de agregar variante
  const handleOpenAddOneVariant = () => {
    setOpenAddVariant(true);
  };

  // Función para cerrar el modal de agregar variante
  const handleCloseAddOneVariant = () => {
    setOpenAddVariant(false);
  };

  // Función para abrir el modal de agregar talla
  const handleOpenAddSize = (data, product) => {
    const dataSize = product.size_guide.dimensions.length;
    const variant = data.find((i) => i.color === anchorEl.color);
    if (variant.items.length >= dataSize) {
      return Swal.fire("No se pueden agregar más tallas", "", "error");
    }
    setOpenAddSize({
      product_id: id,
      variant: variant,
      value: true,
      sizes: product.size_guide.dimensions,
    });
  };

  // Función para cerrar el modal de agregar talla
  const handleCloseAddSize = () => {
    setOpenAddSize({ product_id: "", variant: {}, value: false, sizes: [] });
  };

  // Función para abrir el modal de imágenes
  const handleOpenImages = (data) => {
    const variant = data.find((i) => i.color === anchorEl.color);
    setOpenUpdateImages({
      images: variant.images,
      color: anchorEl.color,
      product_id: id,
      value: true,
    });
  };

  // Función para cerrar el modal de imágenes
  const handleCloseImages = () => {
    setOpenUpdateImages({ images: [], items: [], value: false });
  };

  // Función para abrir el modal de visualización de imagen
  const handleOpen = (image) => {
    setOpen({ image: image, value: true });
  };

  // Función para cargar el producto al montar el componente
  const callbackProduct = useCallback(() => {
    loadProduct(id);
  }, [id]);

  useEffect(() => {
    callbackProduct();
  }, [callbackProduct]);

  // Función para cerrar el modal de visualización de imagen
  const handleClose = () => setOpen({ image: null, value: false });

  // Agrupa las variantes del producto por color
  const grouped = product?.variants?.reduce((acc, item) => {
    const color = item.attributes.color;

    // Inicializar la estructura del grupo si no existe
    if (!acc[color]) {
      acc[color] = {
        items: [],
        images: new Set(), // Usar Set para evitar imágenes duplicadas
        design: new Set(),
        is_main: new Set(),
      };
    }

    // Agregar el objeto actual al grupo
    acc[color].items.push(item);
    acc[color].design.add(item.design);
    acc[color].is_main.add(item.is_main ? item.is_main : false);
    item.images.forEach((image) => acc[color].images.add(image.url)); // Iterar sobre imágenes

    return acc;
  }, {});

  // Convierte el objeto agrupado en un array para iterar
  const groupedArray = Object.entries(grouped)?.map(
    ([color, { items, images, design, is_main }]) => ({
      color,
      items,
      design: Array.from(design),
      is_main: Array.from(is_main),
      images: Array.from(images),
    })
  );

  // Función para abrir el modal de actualización de variante
  const handleOpenUpdate = (variant) => {
    setOpenUpdateVariant({ variant: variant, value: true });
  };

  // Función para cerrar el modal de actualización de variante
  const handleCloseUpdate = () => {
    setOpenUpdateVariant({ variant: {}, value: false });
  };

  // Función para asignar una variante como principal
  const handleAssignMain = ({ product_id, color }) => {
    assignMain({ product_id: product_id, color: color });
  };

  // Función para obtener el avatar que indica si una variante es principal
  const getAvatarForMain = ({ is_main, index }) => {
    if (Array.isArray(is_main) && is_main[0] === true) {
      return <Avatar sx={{ bgcolor: green[400] }}>P</Avatar>;
    } else if (index === 0 && is_main?.[0]) {
      return <Avatar sx={{ bgcolor: green[400] }}>P</Avatar>;
    }
    return null; // Maneja el caso en el que no se retorna un Avatar
  };

  // Muestra una pantalla de carga si el producto está cargando
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <>
      {/* Botón para recargar el producto */}
      <Grid2
        container
        display={"flex"}
        alignContent={"center"}
        padding={1}
        justifyContent={"start"}
      >
        <Button
          variant="contained"
          onClick={() => loadProduct(id)}
          color="primary"
          size="small"
        >
          <Refresh /> Recargar
        </Button>
      </Grid2>

      {/* Tarjeta principal que contiene las variantes */}
      <Card variant="elevation">
        <CardHeader
          title="Variantes y fotos (ropa y zapatos)"
          action={
            <Button
              aria-label="add-variant"
              onClick={() => handleOpenAddOneVariant()}
            >
              <Add />
              Agregar variante
            </Button>
          }
        />
        <CardContent>
          <Grid2 container display={"flex"} gap={2} size={12}>
            {groupedArray.map((item, index) => {
              const avatar = getAvatarForMain({ is_main: item.is_main, index });
              return (
                <Grid2 size={{ xs: 3.8 }} key={`${item.color}-${index}`}>
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
                      avatar={avatar}
                      title={item.color}
                      subheader={item.design}
                    />

                    <CardContent>
                      {/* Componente para mostrar imágenes de la variante */}
                      <SlideSwiperVariantImages images={item.images} />
                      {/* Tabla para mostrar las tallas y acciones de la variante */}
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

      {/* Modales para diferentes funcionalidades */}
      {/* Modal para visualizar una imagen */}
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

      {/* Modal para actualizar una variante */}
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

      {/* Modal para actualizar el color de una variante */}
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

      {/* Modal para actualizar imágenes de una variante */}
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

      {/* Modal para agregar una nueva variante */}
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
          <AddVariantModal handleCloseModal={handleCloseAddOneVariant} />
        </Box>
      </Modal>

      {/* Modal para agregar una nueva talla */}
      <Modal
        open={openAddSize.value}
        onClose={handleCloseAddSize}
        aria-labelledby="modal-add-size"
        aria-describedby="modal-add-size"
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
            onClick={handleCloseAddSize}
          >
            <Close />
          </Fab>
          <AddSizeModal
            handleClose={handleCloseAddSize}
            productId={openAddSize.product_id}
            variant={openAddSize.variant}
            sizes={openAddSize.sizes}
          />
        </Box>
      </Modal>

      {/* Menú contextual para acciones sobre variantes */}
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
        <MenuItem
          onClick={() =>
            handleAssignMain({ product_id: id, color: anchorEl.color })
          }
        >
          Asignar como principal
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleOpenImages(groupedArray)}>
          Editar imágenes
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleOpenAddSize(groupedArray, product)}>
          Agregar talla
        </MenuItem>
      </Menu>
    </>
  );
};

export default VariantsAndPhotosShoes;
