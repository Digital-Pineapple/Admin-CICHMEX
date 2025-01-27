import {
  Grid,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid2,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FormSearch from "../../components/Filters/FormSearch";
import { useAuthStore, useProducts } from "../../hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TableQuantity from "../../components/Tables/TableQuantity";

const AddOutputs = () => {
  const { loadStockProducts, addMultipleOutputs, navigate } = useProducts();
  const { user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      user_delivery: "",
      user_received: "",
      reason: "",
      products: [],
    },
  });

  const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ' ]{8,}$/;

  const validateQuantities = (rows) => {
    // Verificamos si hay alguna fila con cantidad vacía
    return rows.every((row) => row.quantity !== "");
  };

  const onSubmit = async (data) => {
    if (!validateQuantities(rowsIds)) {
      Swal.fire("Por favor, completa todas las cantidades.", "", "error");
      return;
    }
    setValue("products", allProducts);
    const values = getValues();
    addMultipleOutputs(values);
  };

  useEffect(() => {
    loadStockProducts();
  }, [user]);

  useEffect(() => {
    if (product) {
      setAllProducts((prevProducts) => [...prevProducts, product]);
    }
  }, [product]);

  const rowsIds = allProducts?.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <Grid2
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault(); // Previene el envío por defecto
        handleSubmit(onSubmit)(); // Llama a tu función de envío
      }}
      container
      gap={2}
    >
      <Grid2
        marginTop={{ xs: "-30px" }}
        size={12}
        minHeight={"100px"}
        className="Titles"
      >
        <Typography
          textAlign={"center"}
          variant="h1"
          fontSize={{ xs: "20px", sm: "30px", lg: "40px" }}
        >
          Agregar salida
        </Typography>
      </Grid2>

      <Grid2 container gap={2} paddingX={10} justifyContent={"center"}>
        <Grid2
          size={{xs:12, lg:5.8}}
        >
          <Typography variant="h6" textAlign={"center"} color="initial">
            Introduzca el motivo de la salida del producto
          </Typography>
          <Controller
            control={control}
            name="reason"
            rules={{
              required: { message: "Campo requerido", value: true },
            }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Motivo</InputLabel>
                <Select
                  {...field}
                  id="reason"
                  label="Motivo"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.reason}
                  helperText={errors.reason && errors.reason.message}
                  autoComplete="off"
                >
                  <MenuItem value={"Muestra"}>Muestra</MenuItem>
                  <MenuItem value={"Exhibición"}>Exhibición</MenuItem>
                  <MenuItem value={"Préstamo"}>Préstamo</MenuItem>
                  <MenuItem value={"Préstamo"}>Falta de producto</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid2>

        <Grid2
          size={{xs:12, lg:5.8}}
        >
          <Typography variant="h6" textAlign={"center"} color="initial">
            Introduzca el nombre o código de barras del producto
          </Typography>
          <FormSearch
            setSelected={setProduct}
            allValues={allProducts}
            titleAlert={"Ya se agrego este producto"}
          />
        </Grid2>

        <Grid2 size={12}>
          <TableQuantity
            values={rowsIds}
            setValues={setAllProducts}
            allValues={allProducts}
          />
        </Grid2>
        <Grid2 size={12} display={'flex'} gap={2}>
          
            <Button
              variant="contained"
              fullWidth
              size="small"
              onClick={() => navigate("/mi-almacen/productos/salidas")}
              color="error"
            >
              Salir
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="small"
              onClick={handleSubmit(onSubmit)}
              color="success"
            >
              Subir salida
            </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default AddOutputs;
