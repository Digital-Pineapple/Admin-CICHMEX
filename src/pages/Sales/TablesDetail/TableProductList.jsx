import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import noImage from '../../../assets/Images/CHMX/Imagotipo Cuadrado CHMX.png'

const TableProductList = ({ products, shippingCost, discount, handleOpen }) => {
  // Verifica si no hay productos y retorna null para evitar errores
  if (!products) return null;

  // Calcula el subtotal sumando el precio de cada producto multiplicado por su cantidad
  const subTotal = products.reduce(
    (sum, i) =>
      sum +
      (i.variant?.price
        ? i.variant.price * i.quantity
        : i.item.price * i.quantity),
    0
  );

  // Calcula el total sumando el subtotal y el costo de envío
  const total = (subTotal + shippingCost).toFixed(2);

  return (
    <TableContainer
      variant="outlined"
      sx={{ borderRadius: "20px" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 500 }} aria-label="User Table">
        {/* Encabezado de la tabla */}
        <TableHead sx={{ bgcolor: "rgba(224, 224, 224, 0.21)" }}>
          <TableRow>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Producto
            </TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Cantidad
            </TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>P.U.</TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Monto
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo de la tabla */}
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product._id || index}>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "250px",
                }}
              >
                {/* Muestra la imagen del producto o una imagen por defecto si no hay */}
                <img
                  src={
                    product.variant
                      ? product.variant.images[0]?.url
                      : product.item.images[0]?.url
                      ? product.item.images[0]?.url
                      : noImage
                  }
                  alt={index}
                  style={{
                    cursor: "pointer",
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  // Abre el modal con las imágenes del producto
                  onClick={() =>
                    handleOpen(
                      product.variant ? product.variant.images : product.item.images
                    )
                  }
                />
                {/* Muestra el nombre del producto y sus atributos (color y tamaño) */}
                <Typography
                  sx={{
                    p: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {`${product.item.name} - ${
                    product.variant ? product.variant.attributes.color : ""
                  } - ${
                    product.variant ? product.variant.attributes.size : ""
                  }`}
                </Typography>
              </TableCell>
              {/* Muestra la cantidad del producto */}
              <TableCell>{product.quantity}</TableCell>
              {/* Muestra el precio unitario del producto */}
              <TableCell>
                $
                {product.variant?.price
                  ? product.variant.price.toFixed(2)
                  : product.item?.price?.toFixed(2) || "0.00"}
              </TableCell>
              {/* Muestra el monto total por producto (precio unitario * cantidad) */}
              <TableCell>
                $
                {product.variant?.price
                  ? (product.variant.price * product.quantity).toFixed(2)
                  : (product.item?.price * product.quantity).toFixed(2) ||
                    "0.00"}
              </TableCell>
            </TableRow>
          ))}
          {/* Fila del subtotal */}
          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{`$${(subTotal || 0).toFixed(2)}`}</TableCell>
          </TableRow>
          {/* Fila del descuento */}
          <TableRow>
            <TableCell colSpan={2}>Descuento</TableCell>
            <TableCell align="right">
              {discount ? `$${discount.toFixed(2)}` : "-"}
            </TableCell>
          </TableRow>
          {/* Fila del costo de envío */}
          <TableRow>
            <TableCell colSpan={2}>Envío</TableCell>
            <TableCell align="right">{`$${(shippingCost || 0).toFixed(2)}`}</TableCell>
          </TableRow>
          {/* Fila del total */}
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{`$${total}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProductList;
