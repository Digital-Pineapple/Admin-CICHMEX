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
import BreadcrumbCustom from "../../components/ui/BreadCrumbCustom";

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

  const paths = [
    { path: `/mi-almacen/productos/salidas`, name: "Todas mis salidas" },
    { path: `/mi-almacen/salida-productos`, name: "Crear salida" },
  ];

  return (
    <Grid2
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault(); // Previene el envío por defecto
        handleSubmit(onSubmit)(); // Llama a tu función de envío
      }}
      container paddingX={{ xs: 0, lg: 10 }} gap={1}
    >
      <Grid2
        size={12}
        paddingRight={15}
        flexGrow={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={2}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "16px", lg: "25px" } }}>
          <strong>Crear salida de producto</strong>
        </Typography>
      </Grid2>
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
        
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
