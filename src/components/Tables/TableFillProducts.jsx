import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  TableFooter,
  Typography,
} from "@mui/material";
import noImage from "../../assets/Images/CHMX/Imagotipo Cuadrado CHMX.png";


const TableFillProducts = ({ products, shippingCost, discount, handleOpen }) => {
  if (!products) return null; // Evita errores si no hay usuario

  const renderLocation = (product) => {
    if (product?.locationInfo) {
      const name = product?.locationInfo?.name?.split("_");
      return (
       < Typography sx={{ fontSize: "12px" }}>
          {product?.locationInfo?.zone}
          <br />
          {product?.locationInfo?.aisle}
          <br />
          {product?.locationInfo?.section}
          <br />
         <strong>Ubicación</strong> {name[2]}
        </Typography>
      );
    } else {
      return <Typography sx={{ fontSize: "12px" }}>Sin ubicación</Typography>;
    }
  }
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
      sx={{ 
        borderRadius: "20px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Order details table">
        {/* Encabezado de la tabla */}
        <TableHead sx={{ bgcolor: "rgba(224, 224, 224, 0.21)" }}>
          <TableRow>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)", fontWeight: "bold" }}>Producto</TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)", fontWeight: "bold" }}>SKU</TableCell>
            <TableCell align="center" sx={{ color: "rgba(97, 96, 96, 0.75)", fontWeight: "bold" }}>Cantidad</TableCell>
            <TableCell align="right" sx={{ color: "rgba(97, 96, 96, 0.75)", fontWeight: "bold" }}>Ubicación</TableCell>
            <TableCell align="right" sx={{ color: "rgba(97, 96, 96, 0.75)", fontWeight: "bold" }}>P.U.</TableCell>
            <TableCell align="right" sx={{ color: "rgba(97, 96, 96, 0.75)", fontWeight: "bold" }}>Subtotal</TableCell>
            
          </TableRow>
        </TableHead>
  
        {/* Cuerpo de la tabla */}
        <TableBody>
          {products.map((product, index) => (
            <TableRow 
              key={product._id || index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={
                    product.variant?.images[0]?.url || 
                    product.item?.images[0]?.url || 
                    noImage
                  }
                  alt={`Producto ${index}`}
                  sx={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    '&:hover': {
                      transform: "scale(1.05)"
                    }
                  }}
                  onClick={() => handleOpen(product.variant?.images || product.item?.images)}
                />
                <Box>
                  <Typography fontWeight="bold">{product.item.name}</Typography>
                  {product.variant && (
                    <Typography variant="body2" color="text.secondary">
                      {`${product.variant.attributes.color} - ${product.variant.attributes.size}`}
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell align="center">
              {product.variant ? (
                    <Typography variant="body2" color="text.secondary">
                      {`${product.variant.sku}`}
                    </Typography>
                  ):
                  (
                    <Typography variant="body2" color="text.secondary">
                      {`${product.item.sku}`}
                    </Typography>
                  )}
              </TableCell>
              <TableCell align="center">{product.quantity}</TableCell>
              <TableCell align="right">
                {renderLocation(product)}
              </TableCell>
              
              <TableCell align="right">
                ${(product.variant?.price || product.item?.price || 0).toFixed(2)}
              </TableCell>
              
              <TableCell align="right">
                ${((product.variant?.price || product.item?.price || 0) * product.quantity).toFixed(2)}
              </TableCell>
              
             
            </TableRow>
          ))}
        </TableBody>
  
        {/* Resumen de la orden */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} />
            <TableCell align="right" colSpan={1} sx={{ fontWeight: "bold" }}>Subtotal</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>${(subTotal || 0).toFixed(2)}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell colSpan={4} />
            <TableCell align="right" colSpan={1} sx={{ fontWeight: "bold" }}>Descuento</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", color: discount ? "error.main" : "text.secondary" }}>
              {discount ? `-$${discount.toFixed(2)}` : "-"}
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell colSpan={4} />
            <TableCell align="right" colSpan={1} sx={{ fontWeight: "bold" }}>Envío</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>${(shippingCost || 0).toFixed(2)}</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell colSpan={4} />
            <TableCell align="right" colSpan={1} sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Total</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              ${typeof total === 'number' ? total.toFixed(2) : total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableFillProducts;
