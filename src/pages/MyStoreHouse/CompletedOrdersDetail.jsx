import { Grid, Skeleton, Button, Typography, Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductOrder } from "../../hooks/useProductOrder";
import { DataGrid } from "@mui/x-data-grid";
import { replace } from "formik";
import { QRCodeSVG } from "qrcode.react";
import { localDate } from "../../Utils/ConvertIsoDate";
import LoadingScreenBlue from "../../components/ui/LoadingScreenBlue";
import Image from "mui-image";
import { ArrowBack } from "@mui/icons-material";

const CompletedOrdersDetail = () => {
  const { id } = useParams(); // Obtiene el parámetro `id` de la URL.
  const {
    loadProductOrder, // Función para cargar la orden de productos.
    productOrder, // Datos de la orden de productos.
    rowsProducts, // Función para obtener las filas de productos.
    completeProductOrder, // Función para completar la orden de productos.
    loadPrintPDFOrder, // Función para cargar el PDF de la orden.
    loading, // Estado de carga.
    navigate // Función para navegar entre rutas.
  } = useProductOrder();

  const [rowSelection, setRowSelection] = useState([]); // Estado para manejar la selección de filas.
  const [activeButton1, setActiveButton] = useState(false); // Estado para habilitar/deshabilitar un botón.

  useEffect(() => {
    loadProductOrder(id); // Carga la orden de productos al montar el componente.
  }, [id]);

  const rows = rowsProducts(); // Obtiene las filas de productos.

  // Función para activar/desactivar el botón según la cantidad de filas seleccionadas.
  function activeButton(i) {
    const a1 = rows.length;
    if (a1 === i) {
      setActiveButton(true);
    }
    if (a1 !== i) {
      setActiveButton(false);
    }
  }

  // Función para completar la orden.
  const completeOrder = () => {
    completeProductOrder(id);
  };

  // Función para imprimir el PDF de la orden.
  const printPDF = (id) => {
    loadPrintPDFOrder(id);
  };

  // Función para traducir el estado de pago.
  const status = (value) => {
    if (value === "approved") {
      return "Aprobado";
    } else if (value === "pending") {
      return "Pendiente";
    } else if (value === "rejected") {
      return "Rechazado";
    }
    return "Desconocido"; // Valor por defecto.
  };

  // Función para determinar el tipo de entrega.
  const typeDelivery = (value) => {
    return value.deliveryLocation ? "Entrega a domicilio" : "Punto de entrega";
  };

  // Función para obtener la información de la ubicación de entrega.
  const deliveryLocation = (data) => {
    if (data.deliveryLocation) {
      return [
        `Código Postal: ${data.deliveryLocation?.cp}`,
        `Estado: ${data.deliveryLocation?.state}`,
        `Municipio: ${data.deliveryLocation?.municipality}`,
        `Dirección: ${data.deliveryLocation?.direction}`,
        `Referencia: ${
          data.deliveryLocation?.reference
            ? data.deliveryLocation.reference
            : "Sin información"
        }`,
        `Destinatario: ${
          data.deliveryLocation?.receiver
            ? data.deliveryLocation.receiver
            : "Sin información"
        }`,
      ];
    } else {
      return [
        `Código Postal: ${data.branch?.location?.cp}`,
        `Estado: ${data.branch?.location?.state}`,
        `Municipio: ${data.branch?.location?.municipality}`,
        `Dirección: ${data.branch?.location?.direction}`,
      ];
    }
  };

  // Información del responsable de surtido.
  const supplyInfo = {
    responsible: productOrder?.supply_detail?.user?.fullname,
    email: productOrder?.supply_detail?.user?.email,
    date: localDate(productOrder?.supply_detail?.date),
  };

  // Muestra una pantalla de carga si el estado `loading` es verdadero.
  if (loading) {
    return <LoadingScreenBlue />;
  }

  return (
    <Grid container>
      {/* Título principal */}
      <Grid
        item
        marginTop={{ xs: "-30px" }}
        xs={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h2"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Detalle de surtido: {productOrder?.order_id}
        </Typography>
      </Grid>

      <Grid container alignContent={"center"}>
        {/* Botones de navegación e impresión */}
        <Grid item display={"flex"} justifyContent={"space-between"} padding={2} xs={12}>
          <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBack />}
            onClick={() => navigate(`/almacenista/mis-ventas`)} // Navega a la página anterior.
            color="primary"
          >
            Regresar
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={() => printPDF(id)} // Imprime el PDF de la orden.
            color="secondary"
          >
            Imprimir PDF
          </Button>
        </Grid>

        {/* Código QR */}
        <Grid
          item
          xs={12}
          lg={3}
          alignContent={"center"}
          justifyContent={"center"}
          display={"flex"}
          padding={2}
        >
          <QRCodeSVG
            width={"200px"}
            height={"200px"}
            value={productOrder?.order_id} // Genera un código QR con el ID de la orden.
          />
        </Grid>

        {/* Información del cliente y la orden */}
        <Grid item xs={12} lg={4} padding={2}>
          <Typography variant="body1" color="inherit">
            <strong>Cliente:</strong> {productOrder.user_id?.fullname} <br />
            <strong>Fecha de compra:</strong>
            {localDate(productOrder.createdAt)} <br />
            <strong>Estado de pago:</strong>
            {status(productOrder.payment_status)} <br />
            <strong>Tipo de envío:</strong>
            {typeDelivery(productOrder)} <br />
            <strong>Dirección:</strong>
            <br />
            {deliveryLocation(productOrder).map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Typography>
        </Grid>

        {/* Información del responsable de surtido */}
        <Grid item xs={12} lg={5} padding={2}>
          <Typography variant="body1" color="inherit">
            <strong>Responsable de surtido:</strong> {supplyInfo.responsible} <br />
            <strong>Email:</strong>
            {supplyInfo.email} <br />
            <strong>Fecha de surtido:</strong> {supplyInfo.date}
          </Typography>
        </Grid>

        {/* Tabla de productos */}
        <Grid item xs={12}>
          {rows ? (
            <Grid container display={"flex"} flexDirection={"column"}>
              <Typography variant="body1" textAlign={"center"} color="inherit">
                <strong><i>Lista de productos</i></strong>
              </Typography>
              <DataGrid
                onRowSelectionModelChange={(value) => {
                  setRowSelection(value); // Actualiza las filas seleccionadas.
                  activeButton(value.length); // Activa/desactiva el botón según la selección.
                }}
                rowSelectionModel={rowSelection}
                hideFooterSelectedRowCount={true}
                columns={[
                  {
                    field: "image",
                    headerName: "Imagen",
                    flex: 1,
                    align: "center",
                    headerAlign: "center",
                    renderCell: (params) => (
                      <Box
                        width={"100%"}
                        height={"100%"}
                        display={"flex"}
                        padding={0.5}
                        justifyContent={"center"}
                      >
                        <Avatar src={params.row.image} alt={params.row.name} />
                      </Box>
                    ),
                  },
                  {
                    field: "name",
                    headerName: "Nombre del producto",
                    flex: 1,
                    align: "center",
                  },
                  {
                    field: "quantity",
                    headerName: "Cantidad de producto",
                    flex: 1,
                    align: "center",
                  },
                ]}
                rows={rows} // Filas de productos.
              />
            </Grid>
          ) : (
            <Skeleton variant="rectangular" /> // Muestra un esqueleto mientras se cargan los datos.
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompletedOrdersDetail;
