import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Typography,
} from "@mui/material";
import noImage from "../../assets/Images/CHMX/Imagotipo Cuadrado CHMX.png";
import { Search } from "@mui/icons-material";

const TableFillProducts = ({ products, handleOpen, handleSearch}) => {
  if (!products) return null; // Evita errores si no hay usuario

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
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Acciones
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
                  onClick={() =>
                    handleOpen(
                      product.variant
                        ? product.variant.images
                        : product.item.images
                    )
                  }
                />
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
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                $
                {product.variant?.price
                  ? product.variant.price.toFixed(2)
                  : product.item?.price?.toFixed(2) || "0.00"}
              </TableCell>
              <TableCell>
                $
                {product.variant?.price
                  ? (product.variant.price * product.quantity).toFixed(2)
                  : (product.item?.price * product.quantity).toFixed(2) ||
                    "0.00"}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    handleSearch(product)
                  }
                  startIcon={<Search />}
                >
                  Buscar
                </Button>
              </TableCell>
            </TableRow>
          ))}

         
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableFillProducts;
