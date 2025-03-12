import { Check, Search } from "@mui/icons-material";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { localDate } from "../../Utils/ConvertIsoDate";
import { purple } from "@mui/material/colors";

const TableDetailSupply = ({ supply_detail, products }) => {
  if (!supply_detail) {
    return null;
  }
  const combinedArray = supply_detail.map((item1) => {
    let matchingItem; // Definimos la variable antes del condicional

    if (item1.type === "variant_product") {
      matchingItem = products.find(
        (item2) => item1.product_id === item2.variant._id
      );
    } else {
      matchingItem = products.find(
        (item2) => item1.product_id === item2.item._id
      );
    }

    if (matchingItem) {
      return {
        ...item1,
        ...matchingItem,
      };
    }

    // Si no hay coincidencia, retornamos el objeto original
    return item1;
  });

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
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Fecha
            </TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Responsable
            </TableCell>
            <TableCell sx={{ color: "rgba(97, 96, 96, 0.75)" }}>
              Estado
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Cuerpo de la tabla */}
        <TableBody>
          {combinedArray.map((product, index) => (
            <TableRow key={product._id || index}>
              <TableCell
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "250px",
                }}
              >
                {/* <img
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
                /> */}
                <Typography
                  sx={{
                    p: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                >
                  {`${product.item?.name} - ${
                    product.variant ? product.variant.attributes.color : ""
                  } - ${
                    product.variant ? product.variant.attributes.size : ""
                  }`}
                </Typography>
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{localDate(product.date)}</TableCell>
              <TableCell>{product.user.fullname}</TableCell>
              <TableCell>
                {product.status ? (
                  <Chip
                    size="small"
                    variant="outlined"
                    icon={<Check />}
                    label={"surtido"}
                    color="success"
                  />
                ) : (
                  <Chip label={"pendiente"} color={purple[400]} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDetailSupply;
