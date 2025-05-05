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
  const { loadStockProducts, addMultipleOutputs, navigate } = useProducts(); // Hooks personalizados para cargar productos, agregar salidas y navegar
  const { user } = useAuthStore(); // Hook para obtener información del usuario autenticado
  const [product, setProduct] = useState(null); // Estado para almacenar el producto seleccionado
  const [allProducts, setAllProducts] = useState([]); // Estado para almacenar todos los productos seleccionados
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
  }); // Configuración del formulario con react-hook-form

  // Función para validar que todas las cantidades estén completas
  const validateQuantities = (rows) => {
    return rows.every((row) => row.quantity !== "");
  };

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    if (!validateQuantities(rowsIds)) {
      Swal.fire("Por favor, completa todas las cantidades.", "", "error"); // Alerta si faltan cantidades
      return;
    }
    setValue("products", allProducts); // Asigna los productos seleccionados al formulario
    const values = getValues(); // Obtiene los valores del formulario
    addMultipleOutputs(values); // Llama a la función para agregar múltiples salidas
  };

  // Carga los productos del stock al montar el componente
  useEffect(() => {
    loadStockProducts();
  }, [user]);

  // Agrega un producto al estado cuando se selecciona
  useEffect(() => {
    if (product) {
      setAllProducts((prevProducts) => [...prevProducts, product]);
    }
  }, [product]);

  // Mapea los productos seleccionados para generar filas con IDs
  const rowsIds = allProducts?.map((item, index) => ({
    id: index,
    ...item,
  }));

  // Rutas para el componente de breadcrumb
  const paths = [
    { path: `/almacen/productos/salidas`, name: "Todas mis salidas" },
    { path: `/almacen/salida-productos`, name: "Crear salida" },
  ];

  return (
    <Grid2
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault(); // Previene el envío por defecto
        handleSubmit(onSubmit)(); // Llama a la función de envío del formulario
      }}
      container paddingX={{ xs: 0, lg: 10 }} gap={1}
    >
      {/* Título del formulario */}
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

      {/* Breadcrumb para navegación */}
      <Grid2 size={12} display={"flex"} justifyContent={"space-between"}>
        <BreadcrumbCustom paths={paths} />
      </Grid2>

      {/* Contenedor principal del formulario */}
      <Grid2 container gap={2} paddingX={10} justifyContent={"center"}>
        {/* Campo para seleccionar el motivo de la salida */}
        <Grid2 size={{ xs: 12, lg: 5.8 }}>
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

        {/* Campo para buscar productos por nombre o código de barras */}
        <Grid2 size={{ xs: 12, lg: 5.8 }}>
          <Typography variant="h6" textAlign={"center"} color="initial">
            Introduzca el nombre o código de barras del producto
          </Typography>
          <FormSearch
            setSelected={setProduct} // Actualiza el producto seleccionado
            allValues={allProducts} // Lista de productos ya seleccionados
            titleAlert={"Ya se agrego este producto"} // Mensaje de alerta si el producto ya fue agregado
          />
        </Grid2>

        {/* Tabla para mostrar y editar las cantidades de los productos */}
        <Grid2 size={12}>
          <TableQuantity
            values={rowsIds} // Filas de la tabla con IDs
            setValues={setAllProducts} // Actualiza la lista de productos
            allValues={allProducts} // Lista completa de productos seleccionados
          />
        </Grid2>

        {/* Botones para salir o subir la salida */}
        <Grid2 size={12} display={"flex"} gap={2}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => navigate("/mi-almacen/productos/salidas")} // Navega a la página de salidas
            color="error"
          >
            Salir
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={handleSubmit(onSubmit)} // Llama a la función de envío del formulario
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
